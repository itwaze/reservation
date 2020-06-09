import { differenceInHours } from "date-fns";

export const handlePicker = (date, isCheckin = false) => (dispatch, getState) => {
  const state = getState();

  const difference = isCheckin
    ? differenceInHours(date, new Date())
    : differenceInHours(date, state.checkin);

  if (isCheckin && difference >= 2) {
    if (differenceInHours(state.checkout, date) < 0) {
      dispatch({
        type: "NOT_CORRECT_DATE",
      })
    }
    dispatch({
      type: "ADD_CHECKIN",
      payload: date,
    }) 
  } else if (
    !isCheckin &&
    difference >= 4 &&
    differenceInHours(state.checkin, new Date()) >= 2
  ) {
    dispatch({
      type: "ADD_CHECKOUT",
      payload: date,
    })
  } else if (
    (isCheckin && difference < 2) ||
    (!isCheckin && differenceInHours(state.checkin, new Date()) < 2)
  ) {
    dispatch({
      type: "ERROR",
      payload: "Checkin can be only in the next 2 hours",
    })
  } else if (!isCheckin && difference >= 0 && difference < 4) {
    dispatch({
      type: "ERROR",
      payload: "The total time of booking must be more than 4 hours",
    })
  } else if (!isCheckin && difference < 0) {
    dispatch({
      type: "ERROR",
      payload: "Checkout time must be bigger than checkin",
    })
  } else dispatch({
    type: "ERROR",
    payload: "Something went wrong",
  })
};

export const fetchPlaceData = (place) => (dispatch) => {
  const baseUrl = "https://api.opencagedata.com/geocode/v1/json?q=";
  const apiKey = "&key=afee0d3bb2754511b31cca1c2d4d7c79";

  fetch(`${baseUrl}${place.main}, ${place.secondary}${apiKey}`)
    .then((res) => res.json())
    .then((data) => {
      dispatch({ type: "ADD_MARKER", payload: data.results[0].geometry });
      dispatch({ type: "ADD_PLACE", payload: place });
    })
    .catch(() => dispatch({ type: "ERROR", payload: 'Fetching error' }));
};

export const handleChangePhone = (e) => {
  const value = e.target.value.replace(/[()| |-]/gi, "");

  if (!value.includes("+9720")) {
    const updatedValue = `+9720${value}`;
    if (value[0] === "0") {
      const newValue = value.replace(/^./, "");
      return { type: "ADD_PHONE", payload: `+9720${newValue}` }
    } else return { type: "ADD_PHONE", payload: updatedValue }
  } else return { type: "ADD_PHONE", payload: value }
};