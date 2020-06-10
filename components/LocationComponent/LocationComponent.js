import React from "react";
import { useDispatch, useSelector } from "react-redux";
import GooglePlacesAutocomplete from "react-google-places-autocomplete";
import { fetchPlaceData } from "../../actions";
import {
  TextField,
  CircularProgress,
  MenuList,
  MenuItem,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { Buttons } from "../Buttons";
import { useRouter } from "next/router";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";

const useStyles = makeStyles((theme) => ({
  inputWrapper: {
    boxShadow: "0 0 15px 0 rgba(65,69,146,.2)",
    "@media only screen and (max-width: 320px)": {
      marginTop: "2rem",
    },
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
}));

export const LocationComponent = () => {
  const classes = useStyles();
  const place = useSelector((state) => state.place);
  const dispatch = useDispatch();
  const router = useRouter();

  const handleSelectPlace = (e, setFieldValue) => {
    const choosedPlace = {
      main: e.structured_formatting.main_text,
      secondary: e.structured_formatting.secondary_text || "",
    };

    setFieldValue(
      "location",
      `${choosedPlace.main} ${choosedPlace.secondary}`,
      true
    );

    dispatch({ type: "ADD_PLACE", payload: choosedPlace });
    dispatch(fetchPlaceData(choosedPlace));
  };

  const schema = Yup.object().shape({
    location: Yup.string().required("Please, choose a place"),
  });

  return (
    <Formik
      initialValues={{ location: `${place.main} ${place.secondary}`.trim() }}
      validationSchema={schema}
      onSubmit={(e) => {
        router.push('/review')
      }}
      render={({ values, errors, setFieldValue }) => {
        return (
          <Form>
            <div className={classes.inputWrapper}>
              <GooglePlacesAutocomplete
                loader={<CircularProgress className={classes.progress} />}
                renderInput={(props) => {
                  return (
                    <Field
                      name="location"
                      component={() => {
                        return (
                          <TextField
                            name="location"
                            error={Boolean(errors.location)}
                            helperText={
                              errors.location ? `${errors.location}` : null
                            }
                            value={values.location}
                            onChange={(e) => {
                              setFieldValue("location", e.target.value, true);
                              props.onChange(e);
                            }}
                            autoFocus={true}
                            className={classes.input}
                          />
                        );
                      }}
                    />
                  );
                }}
                renderSuggestions={(
                  active,
                  suggestions,
                  onSelectSuggestion
                ) => (
                  <MenuList className={classes.list}>
                    {suggestions.map((suggestion, i) => (
                      <MenuItem
                        key={i}
                        onClick={(event) =>
                          onSelectSuggestion(suggestion, event)
                        }
                      >
                        {suggestion.description}
                      </MenuItem>
                    ))}
                  </MenuList>
                )}
                onSelect={(e) => handleSelectPlace(e, setFieldValue)}
              />
            </div>
            <Buttons backLink='/' withBack />
          </Form>
        );
      }}
    />
  );
};
