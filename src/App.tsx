import {
  Container,
  createTheme,
  Grid,
  ThemeProvider,
  Typography,
} from "@mui/material";
import "react-datepicker/dist/react-datepicker.css";
import CssBaseline from "@mui/material/CssBaseline";
import AddJobForm from "./components/AddJobForm";
import JobsWrapper from "./components/JobsWrapper";

declare module "@mui/material/styles" {
  interface BreakpointOverrides {
    xxs: true;
    xs: true;
    sm: true;
    md: true;
    lg: true;
    xl: true;
  }
}

const theme = createTheme({
  palette: {
    primary: {
      main: "#4535C1",
    },
    secondary: {
      main: "#f3f3f3",
    },
  },
  typography: {
    fontFamily:
      "system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif",
  },
  components: {
    MuiTextField: {
      styleOverrides: {
        root: {
          "& .MuiOutlinedInput-root": {
            "& fieldset": {
              borderColor: "white",
            },
            "& input": {
              color: "white",
            },
            "&:hover fieldset": {
              borderColor: "white",
            },
            "&.Mui-focused fieldset": {
              borderColor: "white",
            },
          },
          "& .MuiInputLabel-root": {
            color: "white",
          },
          "& .MuiInputLabel-root.Mui-focused": {
            color: "white",
          },
        },
      },
    },
  },
  breakpoints: {
    values: {
      xxs: 0,
      xs: 400,
      sm: 600,
      md: 960,
      lg: 1280,
      xl: 1920,
    },
  },
});
function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Container
        sx={{
          width: {
            xs: "100%",
            sm: "600px",
            md: "960px",
            lg: "1280px",
            xl: "1920px",
          },
        }}
      >
        <Typography
          my={6}
          fontWeight={700}
          variant="h2"
          textAlign="center"
          component="h1"
        >
          Job App
        </Typography>
        <Grid container spacing={{ md: 2, lg: 4 }}>
          <Grid item xxs={12} md={6}>
            <AddJobForm />
          </Grid>
          <Grid item xxs={12} md={6}>
            <JobsWrapper />
          </Grid>
        </Grid>
      </Container>
    </ThemeProvider>
  );
}

export default App;
