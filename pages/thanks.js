import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Typography } from "@material-ui/core";
import { format } from "date-fns";
import { ReservationComponent } from "../components/ReservationComponent/ReservationComponent";

const Thanks = () => {
  const state = useSelector((state) => state);
  const dispatch = useDispatch();

  useEffect(() => {
    if (state.phone.length) sendMessage();
  }, []);

  const sendMessage = () => {
    const baseUrl = `https://api-mapper.clicksend.com/http/v2/send.php?method=http&username=itwaze@gmail.com&key=F8532B0F-E18A-33FB-0BC2-0D01F4D0BF1F&to=${state.phone}&message=`;
    const data = `Checkin: ${format(
      new Date(state.checkin),
      "yyyy-MM-dd HH:mm"
    )}%0D%0ACheckout: ${format(
      new Date(state.checkout),
      "yyyy-MM-dd HH:mm"
    )}%0D%0APlace: ${state.place.main} ${state.place.secondary}`;

    fetch(`${baseUrl}${data}`, {
      method: "POST",
    }).catch(() =>
      dispatch({ type: "ERROR", payload: "Error sending an SMS" })
    );
  };

  return (
    <ReservationComponent>
      {state.phone.length ? (
        <Typography align="center" variant="body1">
          Your reservation has been successfully created, you will receive an
          SMS with information.
        </Typography>
      ) : (
        <Typography variant="body1" align="center">
          Thanks for your reservation!
        </Typography>
      )}
    </ReservationComponent>
  );
};

export default Thanks;
