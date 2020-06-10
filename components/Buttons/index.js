import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { useRouter } from 'next/router'

const useStyles = makeStyles((theme) => ({
  btnWrapper: {
    display: "flex",
    justifyContent: "flex-end",
    alignItems: "baseline",
  },
  button: {
    display: 'block',
    marginTop: "2rem",
    marginLeft: "1rem",
    padding: "8px 16px",
    border: "none",
    color: theme.palette.secondary.main,
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
    color: theme.palette.secondary.main,
    "&:hover": {
      backgroundColor: theme.palette.primary.hover,
    },
  },
}));

export const Buttons = ({ backLink, withBack = false }) => {
  const classes = useStyles();
  const router = useRouter();

  const handleBack = () => router.push(backLink)

  const onClickProperty = router.pathname === '/review' ? {onClick: () => router.push('/thanks')} : null

  return (
    <div className={classes.btnWrapper}>
      {withBack ? (
        <>
          <button type='button' onClick={handleBack} className={classes.button}>BACK</button>
          <button
            {...onClickProperty}
            className={`${classes.button} ${classes.nextButton}`}
            type="submit"
          >
            {router.pathname === '/review' ? 'Confirm' : 'Next'}
          </button>
        </>
      ) : (
        <button
          className={`${classes.button} ${classes.nextButton}`}
          type="submit"
        >
          NEXT
        </button>
      )}
    </div>
  );
};
