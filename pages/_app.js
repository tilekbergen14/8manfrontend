import "../styles/globals.css";
import Navbar from "../components/Navbar";
import { createTheme, ThemeProvider } from "@mui/material/styles";

const theme = createTheme({
  typography: {
    fontFamily: "Montserrat Alternates sans-serif",
  },
  palette: {
    primary: {
      main: "#111f4d",
      contrastText: "#fff",
    },
    secondary: {
      main: "#f2f4f7",
      contrastText: "#757575",
    },
    danger: {
      main: "#e41749",
      contrastText: "#fff",
    },
  },
});

function MyApp({ Component, pageProps }) {
  return (
    <ThemeProvider theme={theme}>
      <Navbar />

      <Component {...pageProps} />
    </ThemeProvider>
  );
}

export default MyApp;
