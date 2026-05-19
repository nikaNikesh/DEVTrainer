import React, { ReactElement } from "react";
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Provider } from 'react-redux';

import store from "../../store";

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

import styles from "./App.module.scss";

const App = (): ReactElement => {

    return (
        <Provider store={store}>
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
        </Provider>
    );
}

export default App;