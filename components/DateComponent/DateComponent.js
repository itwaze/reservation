import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/router";
import { makeStyles } from "@material-ui/core/styles";
import { DatePickerComponent } from "../DatePickerComponent/DatePickerComponent";
import { Buttons } from '../Buttons'
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";

const useStyles = makeStyles((theme) => ({
  dateTitle: {
    fontWeight: 100,
    textAlign: "center",
    fontSize: "1.2rem",
    fontFamily: "sans-serif",
    "@media only screen and (max-width: 320px)": {
      marginTop: "2rem",
    },
  },
  picker: {
    marginRight: "1rem",
    "@media only screen and (max-width: 425px)": {
      margin: "0 0 1rem",
    },
  },
  pickerWrapper: {
    display: "flex",
    justifyContent: "space-between",
    margin: "2rem 0",
    "@media only screen and (max-width: 425px)": {
      flexDirection: "column",
      alignItems: "center",
    },
    "@media only screen and (max-width: 375px)": {
      margin: "2rem 0 1rem",
    },
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
  const state = useSelector(state => state);
  const dispatch = useDispatch();

  const router = useRouter();

  const schema = Yup.object().shape({
    checkin: Yup.date()
      .required()
      .min(
        new Date(new Date().getTime() + 120 * 60000),
        "Checkin can be only in the next 2 hours"
      ),
    checkout: Yup.date()
      .required()
      .min(Yup.ref("checkin"), "Checkout can't be before checkin"),
  });

  return (
    <>
      <p className={classes.dateTitle}>Select a reservation date</p>
      <Formik
        initialValues={{ checkin: new Date(state.checkin), checkout: new Date(state.checkout) }}
        validationSchema={schema}
        onSubmit={({ checkin, checkout }) => {
          dispatch({
            type: "ADD_CHECKIN",
            payload: checkin,
          });
          dispatch({
            type: "ADD_CHECKOUT",
            payload: checkout,
          });
          router.push("/location");
        }}
        render={(props) => {
          return (
            <Form>
              <div className={classes.pickerWrapper}>
                <Field
                  name="checkin"
                  component={(fieldProps) => (
                    <DatePickerComponent
                      style={{ marginRight: "15px" }}
                      {...fieldProps}
                      {...props}
                    />
                  )}
                />
                <Field
                  name="checkout"
                  component={(fieldProps) => (
                    <DatePickerComponent {...fieldProps} {...props} />
                  )}
                />
              </div>
              <Buttons />
            </Form>
          );
        }}
      />
    </>
  );
};
