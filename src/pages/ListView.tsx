import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import StarIcon from '@mui/icons-material/Star';
import StarBorderIcon from '@mui/icons-material/StarBorder';
import { IconButton, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Tooltip } from "@mui/material";
import React, { useCallback } from "react";
import { useTranslation } from 'react-i18next';
import { useContextMainPage } from "../contexts/MainPageProvider";

const ListViewComponent = (): JSX.Element => {
    const {t} = useTranslation();
    const {
        state: {
            dataSource,
            bestAlbum,
        },
        dispatch: dispatchMainPage
    } = useContextMainPage();

    const handleRemove = useCallback((row: TableDataSource) => {
        const payload = dataSource ? dataSource.filter(v => !isSameAlbum(row,v)) : null;
        dispatchMainPage({type: 'SET_DATA_SOURCE', payload});
        const isSelfSelect = isSameAlbum(row, bestAlbum);
        if(!isSelfSelect) return;
        dispatchMainPage({type: 'SET_BEST_ALBUM', payload: null});
    },[dataSource, bestAlbum, dispatchMainPage])

    const handleSetBest = useCallback((row: TableDataSource) => {
        const isSelfSelect = isSameAlbum(row, bestAlbum);
        dispatchMainPage({type: 'SET_BEST_ALBUM', payload: isSelfSelect ? null : row});
    },[bestAlbum, dispatchMainPage])

    const isSameAlbum = (pre: TableDataSource | null, cur: TableDataSource | null) => {
        if(pre) pre.created_at = new Date(pre.created_at);
        if(cur) cur.created_at = new Date(cur.created_at);
        return pre?.name === cur?.name && cur?.created_at.getTime() === pre?.created_at.getTime();
    }

    return (
        <div className="w-full">
            <TableContainer component={Paper} style={{maxHeight: 'calc(100vh - 200px)'}}>
                <Table 
                    stickyHeader  
                    sx={{ minWidth: '576px' }} 
                    aria-label="simple table">
                    <TableHead>
                        <TableRow className="select-none">
                            <TableCell><span className="font-bold">{t('albumName')}</span></TableCell>
                            <TableCell><span className="font-bold">{t('dateCreated')}</span></TableCell>
                            <TableCell align="right">
                                <span className="font-bold">{t('action')}</span>
                            </TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                    {
                        dataSource?.length ? dataSource.map((row, i) => (
                            <TableRow
                                key={i}
                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                            >
                                <TableCell 
                                    component="th" 
                                    scope="row">
                                   {row.name}
                                </TableCell>
                                <TableCell 
                                    component="th" 
                                    scope="row">
                                    {new Date(row.created_at).toLocaleString()}
                                </TableCell>
                                <TableCell 
                                    component="th" 
                                    scope="row" 
                                    align="right">
                                    <Tooltip title={t('setBestOfTheBest')}>
                                        <IconButton 
                                            className="!mx-1"
                                            color="primary"
                                            onClick={() => handleSetBest(row)}>
                                            {
                                                isSameAlbum(bestAlbum, row) ? <StarIcon color="warning"/> : <StarBorderIcon/>
                                            }
                                        </IconButton>
                                    </Tooltip>
                                    <Tooltip title={t('remove')}>
                                        <IconButton 
                                            className="!mx-1"
                                            color="primary"
                                            onClick={() => handleRemove(row)}>
                                            <DeleteForeverIcon/>
                                        </IconButton>
                                    </Tooltip>
                                </TableCell>
                            </TableRow>
                        ))
                        :
                        <TableRow>
                            <TableCell 
                                component="th" 
                                scope="row" 
                                colSpan={3} 
                                rowSpan={3}>
                                <div className="w-full flex justify-center items-center select-none">
                                    {t('noData')}
                                </div>
                            </TableCell>
                        </TableRow>
                    }
                    </TableBody>
                </Table>
            </TableContainer>
       </div>
    )
}

const ListView = React.memo(ListViewComponent);
export default ListView;