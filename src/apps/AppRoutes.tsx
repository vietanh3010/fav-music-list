import Main from '../pages/Main';
import React from 'react';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
interface AppRoutes {
    path: string,
    element: JSX.Element,
    children?: AppRoutes[],
}

const AppRoutesComponent = (): JSX.Element => {

    const routes: AppRoutes[] = [
        {
            path: '/',
            element: <Navigate to="/main" replace />,
        },
        {
            path: 'main',
            element: <Main/>,
        },
        {
            path: '*',
            element: <Navigate to="/" replace />
        }
    ];

    return (
        <BrowserRouter>
            <Routes>
                {
                    routes.map((route, i) => 
                        <Route 
                            key={i}
                            path={route.path}
                            element={route.element}/>
                    )
                    
                }
            </Routes>
        </BrowserRouter>
    );
}

const AppRoutes = React.memo(AppRoutesComponent);
export default AppRoutes;