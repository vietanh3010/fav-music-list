import { Button, TextField } from "@mui/material";
import React, { useCallback } from "react";
import { useTranslation } from "react-i18next";
import { useContextMainPage } from "../contexts/MainPageProvider";


const AddAlbumComponent = (): JSX.Element => {
    const {t} = useTranslation();
    const {
        state: {
            dataSource,
            inputValue,
        },
        dispatch: dispatchMainPage
    } = useContextMainPage();

    
    const handleOnchange = (e: React.ChangeEvent<HTMLInputElement>) => {
        dispatchMainPage({type: 'SET_INPUT_VALUE', payload: e.target.value})
    }

    const handleAdd = useCallback(() => {
        if(!inputValue) return;
        const payload =
            [...(dataSource ?? []), ...[{
                name: inputValue,
                created_at: new Date(),
            }]]
        dispatchMainPage({type: 'SET_DATA_SOURCE', payload});
        dispatchMainPage({type: 'SET_INPUT_VALUE', payload: ''})

    },[inputValue])
    
    return (
        <div className="py-2 w-full flex items-center">
            <div className="flex items-center flex-wrap">
                <TextField 
                    hiddenLabel
                    onInput={handleOnchange}
                    value={inputValue}
                    placeholder={t('addAnAlbum')}
                    size="small"
                    className="!mr-2 !my-1"
                    variant="outlined" />
                <Button
                    className="!mr-2 !my-1"
                    color="primary"
                    onClick={handleAdd}
                    disabled={!inputValue}
                    variant="contained">
                    {t('addToList')}
                </Button>
            </div>
        </div>
    )
}

const AddAlbum = React.memo(AddAlbumComponent);
export default AddAlbum;