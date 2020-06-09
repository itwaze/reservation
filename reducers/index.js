const initialState = {
  checkin: new Date(),
  checkout: new Date(),
  error: "",
  isCorrectDate: false,
  marker: {},
  place: {},
  phone: "",
  activeStep: 0,
};

export const reducer = (state = initialState, action) => {
  switch (action.type) {
    case "ADD_CHECKIN":
      return { ...state, checkin: action.payload, error: "" };
    case "ADD_CHECKOUT":
      return {
        ...state,
        checkout: action.payload,
        error: "",
        isCorrectDate: true,
      };
    case "NOT_CORRECT_DATE":
      return { ...state, isCorrectDate: false };
    case "ADD_MARKER":
      return { ...state, marker: action.payload };
    case "ADD_PLACE":
      return { ...state, place: action.payload };
    case "ADD_PHONE":
      return { ...state, phone: action.payload };
    case "NEXT_STEP":
      return { ...state, activeStep: state.activeStep + 1 };
    case "PREV_STEP":
      return { ...state, activeStep: state.activeStep - 1 };
    case "CHANGE_STEP":
      return { ...state, activeStep: action.payload };
    case "ERROR":
      return { ...state, error: action.payload, isCorrectDate: false };
    default:
      return state;
  }
};
