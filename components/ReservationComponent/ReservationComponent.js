import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import Link from "next/link";
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
  buttons: {
    display: "flex",
    justifyContent: "flex-end",
    alignItems: "baseline",
  },
  button: {
    marginTop: "2rem",
    marginLeft: "1rem",
    padding: "8px 16px",
    border: "none",
    color: theme.palette.secondary.main,
    fontWeight: 500,
    cursor: "pointer",
    userSelect: "none",
    borderRadius: "4px",
    outline: "none",
    textTransform: "uppercase",
    transition:
      "background-color 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms,box-shadow 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms,border 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms",
    boxShadow:
      "0px 3px 1px -2px rgba(0,0,0,0.2), 0px 2px 2px 0px rgba(0,0,0,0.14), 0px 1px 5px 0px rgba(0,0,0,0.12)",
    backgroundColor: theme.palette.background.default,
    "&:hover": {
      backgroundColor: theme.palette.background.disabled,
    },
  },
  nextButton: {
    backgroundColor: theme.palette.primary.main,
    color: "white",
    "&:hover": {
      backgroundColor: theme.palette.primary.hover,
    },
  },
  stepperIcon: {
    color: theme.palette.primary.main,
  },
}));

export const ReservationComponent = ({
  children,
  prevHref = "/",
  nextHref,
}) => {
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
  }, []);

  const steps = ["Checkin", "Location", "Review"];

  const handleNext = () => {
    dispatch({ type: "NEXT_STEP" });
  };

  const handleBack = () => {
    dispatch({ type: "PREV_STEP" });
  };

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
  const nextBtnHoverStyles = isDisabled
    ? { backgroundColor: "lightgrey", cursor: "not-allowed" }
    : null;

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
            <React.Fragment>
              {children}
              {nextHref ? (
                <div className={classes.buttons}>
                  {state.activeStep !== 0 && (
                    <Link href={prevHref}>
                      <a
                        aria-label="previous step"
                        onClick={handleBack}
                        className={classes.button}
                      >
                        Back
                      </a>
                    </Link>
                  )}
                  <Link href={nextHref}>
                    <a
                      disabled={isDisabled}
                      style={nextBtnHoverStyles}
                      onClick={handleNext}
                      className={`${classes.button} ${classes.nextButton}`}
                      aria-label="next step"
                    >
                      {state.activeStep === 2
                        ? "Confirm"
                        : "Next"}
                    </a>
                  </Link>
                </div>
              ) : null}
            </React.Fragment>
          </React.Fragment>
        </Paper>
        <Copyright />
      </main>
    </NoSsr>
  );
};
