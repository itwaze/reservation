import { createMuiTheme } from "@material-ui/core/styles";

const theme = createMuiTheme({
  palette: {
    primary: {
      main: "#1e90ff",
      hover: '#64b5f6'
    },
    secondary: {
      main: "rgba(0,0,0,.8)"
    },
    error: {
      main: "#f44336"
    },
    background: {
      default: 'rgba(255, 255, 255, .5)',
      disabled: '#d3d3d3'
    },
    shadow: {
      default: '0 0 15px 0 rgba(65,69,146,.2)'
    }
  },
  overrides: {
    MuiStepConnector: {
      alternativeLabel: {
        top: '22px',
      },
      active: {
        "& $line": {
          background: "#1e90ff",
        },
      },
      completed: {
        "& $line": {
          background: "#1e90ff",
        },
      },
      line: {
        height: '2px',
        border: 0,
        backgroundColor: 'rgba(255, 255, 255, .5)',
        borderRadius: '1px',
      },
    }
  }
});

export default theme