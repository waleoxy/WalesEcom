import { SnackbarProvider } from "notistack";
import { useEffect } from "react";
import { StoreProvider } from "../components/utils/store";
import "../styles/globals.css";

function MyApp({ Component, pageProps }) {
  useEffect(() => {
    const jssStyles = document.querySelector("#jss-server-side");
    if (jssStyles) {
      jssStyles.parentElement.removeChild(jssStyles);
    }
  }, []);
  return (
    <SnackbarProvider anchorOrigin={{ vertical: "top", horizontal: "center" }}>
      <StoreProvider>
        <Component {...pageProps} />;
      </StoreProvider>
    </SnackbarProvider>
  );
}

export default MyApp;
