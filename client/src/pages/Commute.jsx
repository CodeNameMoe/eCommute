import React from "react";
import { useState, useEffect } from "react";
import styles from "../styles/commute.module.css";
import { useRouter } from "next/router";
import { useUser } from "@auth0/nextjs-auth0/client";
import Link from "next/link";
import Image from "next/image";
import bell from "../../public/assets/bell.png";
import menu from "../../public/assets/menu.png";
import userImg from "../../public/assets/user.png";
import logout from "../../public/assets/logout.png";
import one from "../../public/assets/1.png";
import two from "../../public/assets/2.png";
import three from "../../public/assets/3.png";
import four from "../../public/assets/4.png";

const mapping = {
  car: "passenger_vehicle-vehicle_type_automobile-fuel_source_na-distance_na-engine_size_na",
  bus: "passenger_vehicle-vehicle_type_local_bus-fuel_source_na-distance_na-engine_size_na",
  train: "passenger_train-route_type_underground-fuel_source_na",
};

function Commute() {
  const { push } = useRouter();
  const [selectedOption, setSelectedOption] = useState("");
  const [date, setDate] = useState(new Date());
  const [distance, setDistance] = useState("");
  const [passengers, setPassengers] = useState("");
  const [responseData, setresponseData] = useState(null);

  const { user, error, isLoading } = useUser();

  const handleSubmit = (event) => {
    event.preventDefault();

    const mappedValue = mapping[selectedOption];
    const selectedDate = new Date(date).toISOString();
    const selectedDistance = parseInt(distance);
    const selectedPassengers = parseInt(passengers);

    let userId = user.email;

    fetch("http://localhost:5000/submit-form", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        userId,
        mappedValue,
        selectedDate,
        selectedDistance,
        selectedPassengers,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        setresponseData(data);
      });
  };
  const router = useRouter();
  useEffect(() => {
    if (responseData) {
      router.push({
        pathname: "/Results",
        query: responseData,
      });
    }
  }, [responseData]);

  const handleLogout = () => push("/api/auth/logout");
  return (
    <main className={styles.main}>
      <nav className={styles.nav}>
        <Link className={styles.Link} href="/">
          <span className={styles.logo}>eCommute</span>
        </Link>
        <section className={styles.icons}>
          <Image src={bell} alt="bell" width={24} height={24} />
          <Image src={userImg} alt="user" width={24} height={24} />
          <a onClick={handleLogout} className={styles.logoutIcon}>
            <Image src={logout} alt="logout" width={24} height={24} />
          </a>
          <Image
            className={styles.navBarIcon}
            src={menu}
            alt="menu"
            width={24}
            height={24}
          />
        </section>
      </nav>
      <section className={styles.formSection}>
        <div className={styles.tab}>
          <div className={styles.left}>
            <h2>Morning</h2>
          </div>
          <div className={styles.right}>
            <h2>Evening</h2>
          </div>
        </div>
        <form onSubmit={handleSubmit}>
          <div className={styles.formItem}>
            <div className={styles.formItemText}>
              <Image src={one} alt="menu" width={24} height={24} />
              <h3>What was the date of this commute?</h3>
            </div>
            <div className={styles.formItemInput}>
              <input
                type="date"
                value={date}
                onChange={(event) => setDate(event.target.value)}
              />
            </div>
          </div>
          <div className={styles.formItem}>
            <div className={styles.formItemText}>
              <Image src={two} alt="menu" width={24} height={24} />
              <h3>What was the means of transport?</h3>
            </div>
            <div className={styles.formItemInput}>
              <select
                value={selectedOption}
                onChange={(event) => setSelectedOption(event.target.value)}
              >
                <option value="car">Car</option>
                <option value="bus">Bus</option>
                <option value="train">Train</option>
              </select>
            </div>
          </div>
          <div className={styles.formItem}>
            <div className={styles.formItemText}>
              <Image src={three} alt="menu" width={24} height={24} />
              <h3>What was the distance travled in km?</h3>
            </div>
            <div className={styles.formItemInput}>
              <input
                type="number"
                value={distance}
                onChange={(event) => setDistance(event.target.value)}
              />
            </div>
          </div>
          <div className={styles.formItem}>
            <div className={styles.formItemText}>
              <Image src={four} alt="menu" width={24} height={24} />
              <h3>Number of passengers?</h3>
            </div>
            <div className={styles.formItemInput}>
              <input
                type="number"
                value={passengers}
                onChange={(event) => setPassengers(event.target.value)}
              />
            </div>
          </div>
          <div className={styles.submitBtn}>
            <button type="submit">Submit</button>
          </div>
        </form>
      </section>
    </main>
  );
}

export default Commute;
