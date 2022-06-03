import i18n from "../common/i18n";
import React, { useContext, useEffect, useReducer } from "react";

interface MainPageState {
    dataSource: TableDataSource[] | null,
    inputValue: string,
    bestAlbum: TableDataSource | null,
    sortState: SortState,
    toggleListGrid: boolean | null,
    lang: LangType | null
}

type MainPageAction = 
    {type: "SET_DATA_SOURCE", payload: TableDataSource[] | null} |
    {type: "SET_INPUT_VALUE", payload: string} |
    {type: "SET_BEST_ALBUM", payload: TableDataSource | null} |
    {type: "SET_SORT_STATE", payload: SortState} | 
    {type: "TOGGLE_LIST_GRID"} | 
    {type: "SET_LIST_GRID", payload: boolean} |
    {type: "SET_LANG", payload: LangType} 


interface ResultMainPageContext {
    state: MainPageState,
    dispatch: React.Dispatch<MainPageAction>,
}

export const MainPageContext = React.createContext<ResultMainPageContext | undefined>(undefined);
export function useContextMainPage(): ResultMainPageContext {
    return useContext(MainPageContext) as ResultMainPageContext;
}

const initState: MainPageState = {
    dataSource:  null,
    inputValue: '',
    bestAlbum: null,
    sortState: {
        name: false, 
        created_at: false
    },
    toggleListGrid: null,
    lang: null
}
function reducer(state: MainPageState, action: MainPageAction): MainPageState {
    switch (action.type) {
        case "SET_DATA_SOURCE": {
            return {...state, ...{dataSource: action.payload}};
        }
        case "SET_INPUT_VALUE": {
            return {...state, ...{inputValue: action.payload}};
        }
        case "SET_BEST_ALBUM": {
            return {...state, ...{bestAlbum: action.payload}};
        }
        case "SET_SORT_STATE": {
            return {...state, ...{sortState: action.payload}};
        }
        case "TOGGLE_LIST_GRID": {
            return {...state, ...{toggleListGrid: !state.toggleListGrid}};
        }
        case "SET_LIST_GRID": {
            return {...state, ...{toggleListGrid: action.payload}};
        }
        case "SET_LANG": {
            return {...state, ...{lang: action.payload}};
        }
    }
}

function useReducerMainPage(): ResultMainPageContext {
    const [state, dispatch] = useReducer(reducer, initState);

    // dataSource
    useEffect(() => {
        const dataSourceLS = localStorage.getItem('data_source');
        const payload = dataSourceLS ? JSON.parse(dataSourceLS) : [];
        dispatch({type: 'SET_DATA_SOURCE', payload});
    }, [])

    useEffect(() => {
        if(!state.dataSource) return;
        localStorage.setItem('data_source', JSON.stringify(state.dataSource));
    }, [state.dataSource])

    // bestAlbum
    useEffect(() => {
        const bestAlbumLS = localStorage.getItem('best_album');
        const payload = bestAlbumLS ? JSON.parse(bestAlbumLS) : [];
        dispatch({type: 'SET_BEST_ALBUM', payload});
    }, [])

    useEffect(() => {
        if(!state.bestAlbum) return;
        localStorage.setItem('best_album', JSON.stringify(state.bestAlbum));
    }, [state.bestAlbum])

    // grid list

    useEffect(() => {
        const listGridLS = localStorage.getItem('list_grid');
        const payload = listGridLS ? JSON.parse(listGridLS) : false;
        dispatch({type: 'SET_LIST_GRID', payload});
    }, [])

    useEffect(() => {
        if(state.toggleListGrid === null) return;
        localStorage.setItem('list_grid', JSON.stringify(state.toggleListGrid));
    }, [state.toggleListGrid])

    //lang

    useEffect(() => {
        const langLS = localStorage.getItem('lang');
        const payload = (langLS ?? 'en') as LangType;
        console.log(payload)
        i18n.changeLanguage(payload);
        dispatch({type: 'SET_LANG', payload });
    }, [])

    useEffect(() => {
        if(!state.lang) return;
        i18n.changeLanguage(state.lang);
        localStorage.setItem('lang', state.lang);
    }, [state.lang])

    return {
        state, 
        dispatch
    }
}

export default function MainPageProvider({children}: any): JSX.Element {
    const value = useReducerMainPage();
    return (
        <MainPageContext.Provider value={value}>
            {children}
        </MainPageContext.Provider>
    )
}


