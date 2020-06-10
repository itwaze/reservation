import React from "react";
import Head from "next/head";
import { ReservationComponent } from "../components/ReservationComponent/ReservationComponent";
import { DateComponent } from "../components/DateComponent/DateComponent";

const Home = () => {
  return (
    <div className="container">
      <Head>
        <meta name="description" content="Awesome Reservation App" />
        <title>Reservation App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <ReservationComponent>
        <DateComponent />
      </ReservationComponent>
    </div>
  );
};

export default Home;
