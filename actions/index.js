export const fetchPlaceData = (place) => (dispatch) => {
  const baseUrl = "https://api.opencagedata.com/geocode/v1/json?q=";
  const apiKey = "&key=afee0d3bb2754511b31cca1c2d4d7c79";

  fetch(`${baseUrl}${place.main}, ${place.secondary}${apiKey}`)
    .then((res) => res.json())
    .then((data) => {
      dispatch({ type: "ADD_MARKER", payload: data.results[0].geometry });
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