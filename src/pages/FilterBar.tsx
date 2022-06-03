import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import { Button, FormControl, MenuItem, Select, SelectChangeEvent, Tooltip } from "@mui/material";
import React from "react";
import { useContextMainPage } from "../contexts/MainPageProvider";
import GridViewRoundedIcon from '@mui/icons-material/GridViewRounded';
import TableRowsRoundedIcon from '@mui/icons-material/TableRowsRounded';
import { useTranslation } from 'react-i18next';

const FilterBarComponent = (): JSX.Element => {
    const {t} = useTranslation();
    const {
        state: {
            dataSource,
            sortState,
            toggleListGrid,
            lang
        },
        dispatch: dispatchMainPage
    } = useContextMainPage();

    const handleSort = (sortType: SortType) => {
        let payload = null;
        
        if(sortType !== 'created_at') {
            const sorted = dataSource?.sort((a, b) => a[sortType] > b[sortType]  && sortState[sortType] ? 1 : -1);
            payload = sorted ? [...sorted] : null;
        }
        else{
            const sorted = dataSource?.sort((a, b) => new Date(a[sortType]).getTime() - new Date(b[sortType]).getTime() ? -1 : 1);
            payload = sorted ? [...sorted] : null;
        }
        dispatchMainPage({type: 'SET_DATA_SOURCE', payload});

        const pre = {...sortState};
        pre[sortType] = !pre[sortType];
        dispatchMainPage({type: 'SET_SORT_STATE', payload: pre});
    }

    const handleToggleView = () => {
        dispatchMainPage({type: 'TOGGLE_LIST_GRID'})
    }

    const handleChangeLang = (e: SelectChangeEvent) => {
        dispatchMainPage({type: 'SET_LANG', payload: e.target.value as LangType});
    }


    return (
        <div className="py-2 w-full flex items-center flex-wrap">
            <Tooltip title={`${t('sortBy')} ${t('name')}`}>
                <Button
                    color="primary"
                    className="!mr-2 !my-1 !capitalize"
                    onClick={() => handleSort('name')}
                    variant="contained">
                    {
                        sortState['name'] ? <ArrowDownwardIcon/> : <ArrowUpwardIcon/>
                    }
                    {t('name')}
                </Button>
            </Tooltip>

            <Tooltip title={`${t('sortBy')} ${t('date')}`}>
                <Button
                    className="!mr-2 !my-1 !capitalize"
                    color="primary"
                    onClick={() => handleSort('created_at')}
                    variant="contained">
                    {
                        sortState['created_at'] ? <ArrowDownwardIcon/> : <ArrowUpwardIcon/>
                    }
                    {t('date')} 
                </Button>
            </Tooltip>

            <Tooltip title={t('toggleListOrGrid')}>
                <Button
                    className="!mr-2 !my-1"
                    color="primary"
                    onClick={handleToggleView}
                    variant="contained">
                    {
                        toggleListGrid ? 
                            <GridViewRoundedIcon/> :
                            <TableRowsRoundedIcon/>
                    }
                </Button>
            </Tooltip>
            <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
                <Select
                    value={lang ?? 'en'}
                    defaultValue={lang ?? 'en'}
                    onChange={handleChangeLang}
                >
                    <MenuItem value={'en'}>EN</MenuItem>
                    <MenuItem value={'vn'}>VN</MenuItem>
                    <MenuItem value={'pl'}>PL</MenuItem>
                </Select>
            </FormControl>
        </div>
    )
}

const FilterBar = React.memo(FilterBarComponent);
export default FilterBar;