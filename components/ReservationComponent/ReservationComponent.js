import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useRouter } from "next/router";
import {
  Stepper,
  Step,
  StepLabel,
  Paper,
  Typography,
  NoSsr,
  StepConnector,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { Room, CalendarToday, AssignmentTurnedIn } from "@material-ui/icons";
import { differenceInHours } from "date-fns";

const Copyright = () => {
  return (
    <Typography variant="body2" color="secondary" align="center">
      Made with ♥️ in Israel
    </Typography>
  );
};

const useStyles = makeStyles((theme) => ({
  appBar: {
    position: "relative",
  },
  typography: {
    fontWeight: 100,
  },
  layout: {
    width: "40%",
    margin: "0 auto",
    "@media only screen and (max-width: 768px)": {
      width: "90%",
    },
  },
  paper: {
    marginTop: "2rem",
    marginBottom: "2rem",
    padding: "2rem",
    boxShadow: theme.palette.shadow.default,
    background: theme.palette.background.default,
    "@media only screen and (max-width: 375px)": {
      padding: "1rem",
    },
  },
  stepper: {
    margin: "1rem 0 2rem",
    background: "none",
    "@media only screen and (max-width: 375px)": {
      padding: "1rem 0",
    },
    "@media only screen and (max-width: 320px)": {
      display: "none",
    },
  },
  stepperIcon: {
    color: theme.palette.primary.main,
  },
}));

export const ReservationComponent = ({ children }) => {
  const classes = useStyles();

  const state = useSelector((state) => state);

  const dispatch = useDispatch();

  const router = useRouter();

  useEffect(() => {
    if (router.pathname === "/") dispatch({ type: "CHANGE_STEP", payload: 0 });
    if (router.pathname === "/location")
      dispatch({ type: "CHANGE_STEP", payload: 1 });
    if (router.pathname === "/review")
      dispatch({ type: "CHANGE_STEP", payload: 2 });

    stateChecker();
  }, []);

  const stateChecker = () => {
    const difference = differenceInHours(new Date(), new Date(state.checkin));

    if (
      (router.pathname === "/location" && difference >= 0) ||
      (router.pathname === "/review" && difference >= 0) ||
      (router.pathname === "/review" && !state.place.main.length)
    )
      router.push("/");
  };

  const steps = ["Checkin", "Location", "Review"];

  const getDisabled = () => {
    if (state.activeStep === 0 && !state.isCorrectDate) return true;
    if (state.activeStep === 1 && !state.place.main) return true;
  };

  const renderStepIcon = (i) => {
    if (i === 0) return <CalendarToday className={classes.stepperIcon} />;
    if (i === 1) return <Room className={classes.stepperIcon} />;
    if (i === 2) return <AssignmentTurnedIn className={classes.stepperIcon} />;
  };

  const isDisabled = getDisabled();

  return (
    <NoSsr>
      <main className={classes.layout}>
        <Paper className={classes.paper}>
          <Typography
            className={classes.typography}
            component="h1"
            variant="h4"
            align="center"
          >
            Reservation
          </Typography>
          <Stepper
            connector={<StepConnector />}
            activeStep={state.activeStep}
            className={classes.stepper}
          >
            {steps.map((label, i) => (
              <Step key={label}>
                <StepLabel StepIconComponent={() => renderStepIcon(i)}>
                  {label}
                </StepLabel>
              </Step>
            ))}
          </Stepper>
          <React.Fragment>
            <React.Fragment>{children}</React.Fragment>
          </React.Fragment>
        </Paper>
        <Copyright />
      </main>
      <style jsx global>{`
          * {
            box-sizing: border-box;
            margin: 0;
            padding: 0;
          }
          body {
            background: linear-gradient(to right, #757f9a, #d7dde8);
          }
        `}</style>
    </NoSsr>
  );
};
