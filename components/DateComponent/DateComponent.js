import React, { useContext } from "react";
import { Typography, NoSsr } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { DatePickerComponent } from "../DatePickerComponent/DatePickerComponent";
import { Context } from "../../pages";
import { differenceInHours } from "date-fns";
import { Alert } from "@material-ui/lab";

const useStyles = makeStyles({
  typography: {
    fontWeight: 100,
    textAlign: "center",
    fontSize: '1.2rem',
    fontFamily: 'sans-serif',
    '@media only screen and (max-width: 320px)': {
      marginTop: '2rem'
    }
  },
  picker: {
    marginRight: "1rem",
    '@media only screen and (max-width: 425px)': {
      margin: '0 0 1rem'
    }
  },
  pickerWrapper: {
    display: "flex",
    justifyContent: "space-between",
    margin: "2rem 0",
    '@media only screen and (max-width: 425px)': {
      flexDirection: 'column',
      alignItems: 'center',
    },
    '@media only screen and (max-width: 375px)': {
      margin: '2rem 0 1rem'
    }
  },
  error: {
    marginTop: "2rem",
  },
  nextStep: {
    marginTop: "4rem",
    margin: "0 auto",
    display: "flex",
  },
});

export const DateComponent = () => {
  const classes = useStyles();

  const { state, dispatch } = useContext(Context);

  const handlePicker = (date, isCheckin = false) => {
    const difference = isCheckin
      ? differenceInHours(date, new Date())
      : differenceInHours(date, state.checkin);

    if (isCheckin && difference >= 2) {
      dispatch({
        type: "ADD_CHECKIN",
        payload: date,
      });
      if (differenceInHours(state.checkout, date) < 0) {
        dispatch({
          type: "NOT_CORRECT_DATE",
        });
      }
    } else if (
      !isCheckin &&
      difference >= 4 &&
      differenceInHours(state.checkin, new Date()) >= 2
    ) {
      dispatch({
        type: "ADD_CHECKOUT",
        payload: date,
      });
    } else if (
      (isCheckin && difference < 2) ||
      (!isCheckin && differenceInHours(state.checkin, new Date()) < 2)
    ) {
      dispatch({
        type: "ERROR",
        payload: "Checkin can be only in the next 2 hours",
      });
    } else if (!isCheckin && difference >= 0 && difference < 4) {
      dispatch({
        type: "ERROR",
        payload: "The total time of booking must be more than 4 hours",
      });
    } else if (!isCheckin && difference < 0) {
      dispatch({
        type: "ERROR",
        payload: "Checkout time must be bigger than checkin",
      });
    } else console.log("another error");
  };

  return (
    <NoSsr>
      <p className={classes.typography} >
        Select a reservation date
      </p>
      <div className={classes.pickerWrapper}>
        <DatePickerComponent
          className={classes.picker}
          label="Check-in"
          value={state.checkin}
          handleDateChange={(date) => handlePicker(date, true)}
        />
        <DatePickerComponent
          label="Check-out"
          value={state.checkout}
          handleDateChange={(date) => handlePicker(date)}
        />
      </div>
      {state.error.length ? (
        <Alert className={classes.error} variant="filled" severity="error">
          {state.error}
        </Alert>
      ) : null}
    </NoSsr>
  );
};
