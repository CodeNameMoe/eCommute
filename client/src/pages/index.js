import Head from "next/head";
import Image from "next/image";
import { Inter } from "@next/font/google";
import styles from "@/styles/Home.module.css";
import Navbar from "@/components/navbar/Navbar";
import heroImage from "../../public/assets/heroImage.png";
import { useUser } from "@auth0/nextjs-auth0/client";
import Commute from "./Commute.jsx";
import Link from "next/link";
import { useRouter } from "next/router";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  const { push } = useRouter();

  const handleLogin = () => push("/api/auth/login");

  const { user, error, isLoading } = useUser();
  console.log(user.email);
  if (isLoading) {
    return <div> Loading...</div>;
  }
  if (error) {
    return <div>{error.message}</div>;
  }
  if (user) {
    return (
      <>
        <Commute />
      </>
    );
  }

  return (
    <>
      <Head>
        <title>eCommute</title>
        <meta
          name="description"
          content="Reduce Your Carbon Footprint with eCommute"
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={styles.main}>
        <Navbar />
        <section className={styles.hero}>
          <div className={styles.text}>
            <div className={styles.heroText}>
              <h1>Reduce Your Carbon Footprint with eCommute</h1>
              <h2>
                Take Charge of Your Commuting Carbon Emissions and Make a
                Difference Today
              </h2>
            </div>
            <div className={styles.btn}>
              <button onClick={handleLogin}>GET STARTED</button>
            </div>
          </div>

          <div className={styles.heroImage}>
            <Image
              src={heroImage}
              alt="Hero image of man on scooter"
              width={500}
              height={500}
            />
          </div>
        </section>
      </main>
    </>
  );
}
