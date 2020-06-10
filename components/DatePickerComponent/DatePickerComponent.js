import DateFnsUtils from "@date-io/date-fns";
import {
  KeyboardDateTimePicker,
  MuiPickersUtilsProvider,
} from "@material-ui/pickers";

export const DatePickerComponent = ({ field, form, ...props }) => {
  const currentError = form.errors[field.name];

  return (
    <MuiPickersUtilsProvider utils={DateFnsUtils}>
      <KeyboardDateTimePicker
        label={field.name}
        ariaLabel={field.name}
        disablePast
        ampm={false}
        error={Boolean(currentError)}
        helperText={currentError}
        format="yyyy-MM-dd hh:mm"
        value={props.values[field.name]}
        onChange={(value) => props.setFieldValue(field.name, value, true)}
        KeyboardButtonProps={{
          "aria-label": "change date",
        }}
      />
    </MuiPickersUtilsProvider>
  );
};
