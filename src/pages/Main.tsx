import MainPageProvider from "../contexts/MainPageProvider"
import React from "react";
import MainPage from "./MainPage"


const MainComponent = (): JSX.Element => {

    return (
        <MainPageProvider>
            <MainPage/>
        </MainPageProvider>

    )
}

const Main = React.memo(MainComponent);
export default Main;