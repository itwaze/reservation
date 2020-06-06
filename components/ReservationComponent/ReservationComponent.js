import React, { useContext, useState } from "react";
import { format } from "date-fns";
import { Context } from "../../pages";
import {
  Stepper,
  Step,
  StepLabel,
  Paper,
  Typography,
  NoSsr,
  StepConnector,
} from "@material-ui/core";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import { DateComponent } from "../DateComponent/DateComponent";
import { LocationComponent } from "../LocationComponent/LocationComponent";
import { SummaryComponent } from "../SummaryComponent/SummaryComponent";
import { Room, CalendarToday, AssignmentTurnedIn } from "@material-ui/icons";

const Copyright = () => {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      Made with ♥️ in Israel
    </Typography>
  );
};

const useStyles = makeStyles({
  appBar: {
    position: "relative",
  },
  typography: {
    fontWeight: 100,
  },
  layout: {
    width: "40%",
    margin: "0 auto",
  },
  paper: {
    marginTop: "2rem",
    marginBottom: "2rem",
    padding: "2rem",
    boxShadow: "0 0 15px 0 rgba(65,69,146,.2)",
    background: "rgba(255, 255, 255, .5)",
  },
  stepper: {
    margin: "1rem 0 2rem",
    background: "none",
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
    color: 'rgba(0, 0, 0, 0.87)',
    fontWeight: 500,
    cursor: "pointer",
    userSelect: "none",
    borderRadius: "4px",
    outline: 'none',
    textTransform: "uppercase",
    transition:
      "background-color 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms,box-shadow 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms,border 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms",
    boxShadow:
      "0px 3px 1px -2px rgba(0,0,0,0.2), 0px 2px 2px 0px rgba(0,0,0,0.14), 0px 1px 5px 0px rgba(0,0,0,0.12)",
    backgroundColor: '#e0e0e0',
    '&:hover': {
      backgroundColor: 'lightgrey'
    }
  },
  nextButton: {
    backgroundColor: "dodgerblue",
    color: 'white',
    "&:hover": {
      backgroundColor: "cornflowerblue",
    },
  },
});

const ColorlibConnector = withStyles({
  alternativeLabel: {
    top: 22,
  },
  active: {
    "& $line": {
      background: "dodgerblue",
    },
  },
  completed: {
    "& $line": {
      background: "dodgerblue",
    },
  },
  line: {
    height: 2,
    border: 0,
    backgroundColor: "darkgray",
    borderRadius: 1,
  },
})(StepConnector);

export const ReservationComponent = () => {
  const classes = useStyles();

  const { state } = useContext(Context);

  const steps = ["Checkin", "Location", "Review"];

  const [activeStep, setActiveStep] = useState(0);

  const sendMessage = () => {
    const baseUrl = `https://api-mapper.clicksend.com/http/v2/send.php?method=http&username=itwaze@gmail.com&key=F8532B0F-E18A-33FB-0BC2-0D01F4D0BF1F&to=${state.phone}&message=`;
    const data = `Checkin: ${format(
      state.checkin,
      "yyyy-MM-dd HH:mm"
    )}%0D%0ACheckout: ${format(
      state.checkout,
      "yyyy-MM-dd HH:mm"
    )}%0D%0APlace: ${state.place.main} ${state.place.secondary}`;

    fetch(`${baseUrl}${data}`, {
      method: "POST",
    }).catch((err) => console.log(err));

    return (
      <Typography align="center" variant="body1">
        Your reservation has been successfully created, you will receive an SMS
        with information.
      </Typography>
    );
  };

  const handleNext = () => {
    setActiveStep(activeStep + 1);
  };

  const handleBack = () => {
    setActiveStep(activeStep - 1);
  };

  const getStepContent = (step) => {
    switch (step) {
      case 0:
        return <DateComponent />;
      case 1:
        return <LocationComponent />;
      case 2:
        return <SummaryComponent />;
      default:
        throw new Error("Unknown step");
    }
  };

  const getDisabled = () => {
    if (activeStep == 0 && !state.isCorrectDate) return true;
    if (activeStep == 1 && !state.place.main) return true;
  };

  const renderStepIcon = (i) => {
    if (i === 0) return <CalendarToday style={{ color: "dodgerblue" }} />;
    if (i === 1) return <Room style={{ color: "dodgerblue" }} />;
    if (i === 2) return <AssignmentTurnedIn style={{ color: "dodgerblue" }} />;
  };

  const isDisabled = getDisabled();
  const nextBtnHoverStyles = isDisabled ? {backgroundColor: 'lightgrey', cursor: 'not-allowed'} : null;
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
            connector={<ColorlibConnector />}
            activeStep={activeStep}
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
            {activeStep === steps.length ? (
              state.phone.length ? (
                sendMessage()
              ) : (
                <Typography
                  className={classes.typography}
                  variant="body1"
                  align="center"
                >
                  Thanks for your reservation!
                </Typography>
              )
            ) : (
              <React.Fragment>
                {getStepContent(activeStep)}
                <div className={classes.buttons}>
                  {activeStep !== 0 && (
                    <button
                      aria-label="previous step"
                      onClick={handleBack}
                      className={classes.button}
                    >
                      Back
                    </button>
                  )}
                  <button
                    disabled={isDisabled}
                    style={nextBtnHoverStyles}
                    onClick={handleNext}
                    className={`${classes.button} ${classes.nextButton}`}
                    aria-label="next step"
                  >
                    {activeStep === steps.length - 1 ? "Confirm" : "Next"}
                  </button>
                </div>
              </React.Fragment>
            )}
          </React.Fragment>
        </Paper>
        <Copyright />
      </main>
    </NoSsr>
  );
};
