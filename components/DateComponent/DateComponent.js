import React from "react";
import { useDispatch, useSelector } from 'react-redux'
import { makeStyles } from "@material-ui/core/styles";
import { DatePickerComponent } from "../DatePickerComponent/DatePickerComponent";
import { handlePicker } from "../../actions";
import { Alert } from "@material-ui/lab";

const useStyles = makeStyles(theme => ({
  dateTitle: {
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
}));

export const DateComponent = () => {
  const classes = useStyles();

  const dispatch = useDispatch()
  const state = useSelector(state => state)

  return (
    <>
      <p className={classes.dateTitle} >
        Select a reservation date
      </p>
      <div className={classes.pickerWrapper}>
        <DatePickerComponent
          className={classes.picker}
          label="Check-in"
          value={state.checkin}
          handleDateChange={(date) => dispatch(handlePicker(date, true))}
        />
        <DatePickerComponent
          label="Check-out"
          value={state.checkout}
          handleDateChange={(date) => dispatch(handlePicker(date))}
        />
      </div>
      {state.error.length ? (
        <Alert className={classes.error} variant="filled" severity="error">
          {state.error}
        </Alert>
      ) : null}
    </>
  );
};
