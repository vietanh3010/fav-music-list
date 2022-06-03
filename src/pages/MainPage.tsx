import { useContextMainPage } from "../contexts/MainPageProvider";
import React from "react";
import AddAlbum from "./AddAlbum";
import FilterBar from "./FilterBar";
import ListView from "./ListView";
import GridView from "./GridView";

const MainPageComponent = (): JSX.Element => {
    const {
        state: {
            toggleListGrid
        },
        dispatch: dispatchMainPage
    } = useContextMainPage();


    return (
        <div className="w-full h-full bg-slate-200 p-6 flex flex-col custom-scroll">
            <AddAlbum/>
            <FilterBar/>
            {
                toggleListGrid ? 
                    <GridView/> :
                    <ListView/>
            }
        </div>
    )
}

const MainPage = React.memo(MainPageComponent);
export default MainPage;