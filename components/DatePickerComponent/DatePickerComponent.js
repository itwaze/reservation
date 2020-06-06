import DateFnsUtils from "@date-io/date-fns";
import {
  KeyboardDateTimePicker,
  MuiPickersUtilsProvider,
} from "@material-ui/pickers";


export const DatePickerComponent = ({ value, handleDateChange, label, className }) => {
  return (
    <MuiPickersUtilsProvider utils={DateFnsUtils}>
      <KeyboardDateTimePicker
        KeyboardButtonProps={{['aria-label']: value}}
        leftArrowButtonProps={{['aria-label']: label}}
        rightArrowButtonProps={{['aria-label']: label}}
        className={className}
        value={value}
        onChange={handleDateChange}
        label={label}
        format="yyyy-MM-dd hh:mm"
        ampm={false}
        disablePast
      />
    </MuiPickersUtilsProvider>
  );
};
