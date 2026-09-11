import React, { ReactElement, useEffect } from "react";
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import {useAppDispatch} from "../../hooks/useAppDispatch";
import {useAppSelector} from "../../hooks/useAppSelector";
import checkAuthService from "../../service/checkAuthService";

import Header from "../header";
import Navigation from "../navigation";
import Home from "../home";
import Task from "../task";
import Footer from "../footer";
import TaskDetails from "../taskDetails";
import AuthPage from "../authPage";
import RegisterPage from "../registerPage";
import LogOutPage from "../logOutPage";
import ErrorBoundary from "../errorBoundary/errorBoundary";
import RedirectToErrorPage from "../errorPage/RedirectToErrorPage";
import FullScreenSpinner from "../fullScreenSpinner";

import styles from "./App.module.scss";

const App = (): ReactElement => {
    const dispatch = useAppDispatch();
    const { loading } = useAppSelector((state) => state.auth);

    useEffect(() => {
        dispatch(checkAuthService());
    }, [dispatch]);

    if (loading) {
        return <FullScreenSpinner />;
    }

    return (
            <ErrorBoundary>
                <BrowserRouter>
                    <div className={styles.app}>
                        <Header/>
                        <Navigation/>
                        <Routes>
                            <Route path="/" element={<Home/>}/>
                            <Route path="tasks"
                                   element={
                                       <ErrorBoundary>
                                           <Task/>
                                       </ErrorBoundary>}
                            />
                            <Route path="tasks/:taskId" element={<TaskDetails/>}/>
                            <Route path="auth" element={<AuthPage/>}/>
                            <Route path="register" element={<RegisterPage/>}/>
                            <Route path="error" element={<RedirectToErrorPage/>}/>
                        </Routes>
                        <LogOutPage/>
                        <Footer/>
                    </div>
                </BrowserRouter>
            </ErrorBoundary>
    );
}

export default App;