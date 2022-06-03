import { createTheme, ThemeProvider } from "@mui/material";
import React from "react";
import { withTranslation } from "react-i18next";
import AppRoutes from "./apps/AppRoutes";
import { I18nextProvider } from 'react-i18next';
import i18n from "./common/i18n";

const theme = createTheme({
    palette: {
      primary: {
        main: '#169CD8',
      },
      warning: {
          main: '#d97706',
      }
    },
    typography: {
        button: {
          textTransform: 'none'
        }
    }
});

const AppComponent = (): JSX.Element => {
    const AppContainer = withTranslation()(AppRoutes); 

    return (
        <I18nextProvider i18n={i18n}>
            <ThemeProvider theme={theme}>
                <AppContainer/>
            </ThemeProvider>
        </I18nextProvider>
       
    )
}

const App = React.memo(AppComponent);
export default App;