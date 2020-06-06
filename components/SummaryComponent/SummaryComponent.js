import React, { useContext } from "react";
import { Context } from "../../pages";
import GoogleMapReact from "google-map-react";
import { Room, ExitToApp, PhoneIphone } from "@material-ui/icons";
import { Typography, Input } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { format } from "date-fns";

const useStyles = makeStyles({
  mapWrapper: {
    height: "370px",
    marginTop: "1rem",
  },
  marker: {
    color: "rgb(232, 69, 60)",
    fontSize: "3rem",
  },
  textWrapper: {
    display: "flex",
    alignItems: "center",
  },
  textField: {
    fontSize: "1rem",
    fontWeight: 100,
    marginLeft: "5px",
  },
  text: {
    fontWeight: 100,
    marginLeft: "5px",
  },
  checkoutIcon: {
    transform: "rotate(180deg)",
  },
  phoneInput: {
    padding: "5px",
    marginLeft: "5px",
  },
});

export const SummaryComponent = () => {
  const { state, dispatch } = useContext(Context);
  const classes = useStyles();

  const Marker = () => <Room className={classes.marker} />;

  const handleChangePhone = (e) => {
    const value = e.target.value.replace(/[()| |-]/gi, "");

    if (!value.includes("+9720")) {
      const updatedValue = `+9720${value}`;
      if (value[0] === "0") {
        const newValue = value.replace(/^./, "");
        dispatch({ type: "ADD_PHONE", payload: `+9720${newValue}` });
      } else dispatch({ type: "ADD_PHONE", payload: updatedValue });
    } else dispatch({ type: "ADD_PHONE", payload: value });
  };

  return (
    <>
      <div className={classes.textWrapper}>
        <ExitToApp />
        <Typography className={classes.textField} variant="overline">
          Checkin:{" "}
        </Typography>
        <Typography className={classes.text} variant="body1">
          {format(state.checkin, "yyyy-MM-dd HH:mm")}
        </Typography>
      </div>
      <div className={classes.textWrapper}>
        <ExitToApp className={classes.checkoutIcon} />
        <Typography className={classes.textField} variant="overline">
          Checkout:{" "}
        </Typography>
        <Typography className={classes.text} variant="body1">
          {format(state.checkout, "yyyy-MM-dd HH:mm")}
        </Typography>
      </div>
      <div className={classes.textWrapper}>
        <Room />
        <Typography className={classes.textField} variant="overline">
          Place:{" "}
        </Typography>
        <Typography className={classes.text} variant="body1">
          {state.place.main} {state.place.secondary}
        </Typography>
      </div>
      <div className={classes.textWrapper}>
        <PhoneIphone />
        <Typography className={classes.textField} variant="overline">
          Phone:
        </Typography>
        <Input
          onChange={handleChangePhone}
          autoComplete="tel"
          name="phone"
          className={classes.phoneInput}
          type="tel"
          autoFocus={true}
          color="primary"
          placeholder="0531234567"
        />
      </div>
      <Typography className={classes.text} variant="caption">
        Optional, for getting reservation info
      </Typography>
      <div className={classes.mapWrapper}>
        <GoogleMapReact
          bootstrapURLKeys={{
            key: "AIzaSyAQVF4N0q1oDyyvSdHq0XI3iwMuLtxWVQs",
          }}
          center={{ lat: state.marker.lat, lng: state.marker.lng }}
          zoom={11}
        >
          <Marker lat={state.marker.lat} lng={state.marker.lng} />
        </GoogleMapReact>
      </div>
    </>
  );
};
