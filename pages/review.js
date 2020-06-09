import React from "react";
import { SummaryComponent } from "../components/SummaryComponent/SummaryComponent";
import { NoSsr } from "@material-ui/core";
import { ReservationComponent } from "../components/ReservationComponent/ReservationComponent";

const Review = () => {
  return (
    <NoSsr>
      <ReservationComponent prevHref='/location' nextHref='/thanks'>
        <SummaryComponent />
      </ReservationComponent>
    </NoSsr>
  );
};

export default Review;
