import React from "react";
import { useDispatch } from 'react-redux'
import GooglePlacesAutocomplete from "react-google-places-autocomplete";
import { fetchPlaceData } from '../../actions'
import {
  TextField,
  CircularProgress,
  MenuList,
  MenuItem,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles({
  inputWrapper: {
    boxShadow: "0 0 15px 0 rgba(65,69,146,.2)",
    '@media only screen and (max-width: 320px)': {
      marginTop: '2rem'
    }
  },
  progress: {
    position: "relative",
    left: "50%",
    transform: "translateX(-50%)",
  },
  input: {
    height: "auto",
    outline: "none",
    borderRadius: "5px",
    width: "100%",
    padding: "1rem",
  },
  list: {
    paddingTop: 0,
  },
});

export const LocationComponent = () => {
  const classes = useStyles();

  const dispatch = useDispatch()

  const handleSelectPlace = (e) => {
    const place = {
      main: e.structured_formatting.main_text,
      secondary: e.structured_formatting.secondary_text || "",
    };

    dispatch(fetchPlaceData(place))
  };

  return (
    <div className={classes.inputWrapper}>
      <GooglePlacesAutocomplete
        loader={<CircularProgress className={classes.progress} />}
        renderInput={(props) => {
          return (
            <TextField {...props} autoFocus={true} className={classes.input} />
          );
        }}
        renderSuggestions={(active, suggestions, onSelectSuggestion) => (
          <MenuList className={classes.list}>
            {suggestions.map((suggestion, i) => (
              <MenuItem
                key={i}
                onClick={(event) => onSelectSuggestion(suggestion, event)}
              >
                {suggestion.description}
              </MenuItem>
            ))}
          </MenuList>
        )}
        onSelect={handleSelectPlace}
      />
    </div>
  );
};
