import React from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import Image from "next/image";
import bell from "../../public/assets/bell.png";
import menu from "../../public/assets/menu.png";
import userImg from "../../public/assets/user.png";
import logout from "../../public/assets/logout.png";
import styles from "../styles/results.module.css";

function Results() {
  const handleLogout = () => push("/api/auth/logout");
  const router = useRouter();
  const data = router.query;
  let commuteDateData = data.commuteDate.substring(0, 10);
  return (
    <main className={styles.main}>
      <nav className={styles.nav}>
        <Link className={styles.Link} href="/">
          <span className={styles.logo}>eCommute</span>
        </Link>
        <section className={styles.icons}>
          <button className={styles.button} type="submit">
            View your total commute emissions
          </button>
          <Image src={bell} alt="bell" width={24} height={24} />
          <Image src={userImg} alt="user" width={24} height={24} />
          <a onClick={handleLogout} className={styles.logoutIcon}>
            <Image
              className={styles.navBarIcon}
              src={logout}
              alt="logout"
              width={24}
              height={24}
            />
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
      <section className={styles.resultsSection}>
        <div className={styles.title}>
          <h1>
            Here is the <span>emissions' breakdown</span> for your commute for
            the date <span>{JSON.stringify(commuteDateData)}</span>
          </h1>
        </div>
        <div className={styles.result}>
          <h2>
            CO2e <span>{data.co2_emissions} </span>kg
          </h2>
          {data.co2_emissions < 1.36 ? (
            <span className={styles.low}>👍 Low Emission</span>
          ) : (
            <span className={styles.high}>👎 High Emission</span>
          )}
          <p>
            “Carbon dioxide equivalent” or “CO2e” is a term for describing
            different greenhouse gases in a common unit. For any quantity and
            type of greenhouse gas, CO2e signifies the amount of CO2 which would
            have the equivalent global warming impact.
          </p>
        </div>
      </section>
    </main>
  );
}

export default Results;
