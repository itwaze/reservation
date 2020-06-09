import React from "react";
import { LocationComponent } from "../components/LocationComponent/LocationComponent";
import { NoSsr } from "@material-ui/core";
import { ReservationComponent } from "../components/ReservationComponent/ReservationComponent";

const Location = () => {
  return (
    <NoSsr>
      <ReservationComponent prevHref='/' nextHref='/review'>
        <LocationComponent />
      </ReservationComponent>
    </NoSsr>
  );
};

export default Location;
