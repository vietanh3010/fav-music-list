import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import StarIcon from '@mui/icons-material/Star';
import StarBorderIcon from '@mui/icons-material/StarBorder';
import { Card, CardActions, CardContent, IconButton, Tooltip, Typography } from "@mui/material";
import React, { useCallback } from "react";
import { useTranslation } from 'react-i18next';
import { useContextMainPage } from "../contexts/MainPageProvider";

const GridViewComponent = (): JSX.Element => {
    const {t} = useTranslation();
    const {
        state: {
            dataSource,
            bestAlbum
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
        <div 
            className="grid grid-cols-1 gap-6 w-full h-full 2xl:grid-cols-5 xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1 overflow-auto "
            style={{maxHeight: 'calc(100vh - 200px)'}}>
            {
                dataSource?.length ? 
                    dataSource.map((v,i) => 
                        <Card 
                            className="cursor-pointer hover:shadow-md"
                            key={i}
                            // sx={{ minWidth: 275 }}
                            >
                            <CardContent className="flex justify-between">
                                <div>
                                    <Typography variant="h5" component="div">
                                        {v.name}
                                    </Typography>
                                    <Typography sx={{ mb: 1.5 }} color="text.secondary">
                                        {v.created_at.toLocaleString()}
                                    </Typography>
                                </div>
                                <div>
                                    <Tooltip title={t('setBestOfTheBest')}>
                                        <IconButton 
                                            className="!mx-1"
                                            color="primary"
                                            onClick={() => handleSetBest(v)}>
                                            {
                                                isSameAlbum(bestAlbum, v) ? 
                                                    <StarIcon color="warning" sx={{ fontSize: 30 }}/> : 
                                                    <StarBorderIcon sx={{ fontSize: 30 }}/>
                                            }
                                        </IconButton>
                                    </Tooltip>
                                </div>
                            </CardContent>
                            <CardActions className="flex justify-end bg-gray-300">
                                    <Tooltip title={t('remove')}>
                                        <IconButton 
                                            className="!mr-3.5"
                                            color="primary"
                                            onClick={() => handleRemove(v)}>
                                            <DeleteForeverIcon/>
                                        </IconButton>
                                    </Tooltip>
                            </CardActions>
                        </Card>
                    )
                    :
                    <div>no data</div>
            }
        </div>
    )
}

const GridView = React.memo(GridViewComponent);
export default GridView;