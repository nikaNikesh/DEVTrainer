import React, {ReactElement} from "react";
import {BrowserRouter, Route, Routes} from 'react-router-dom';
import {Provider} from 'react-redux';
import store from "../../store";

import Header from "../header";
import Navigation from "../navigation";
import Home from "../home";
import Task from "../task";
import styles from "./App.module.scss";
import Footer from "../footer";
import TaskDetails from "../taskDetails";
import AuthPage from "../authPage";
import RegisterPage from "../registerPage";
import LogOutPage from "../logOutPage";
import ErrorPage from "../errorPage";

const App = (): ReactElement => {

    return (
        <Provider store={store}>
            <BrowserRouter>
                <div className={styles.app}>
                    <Header/>
                    <Navigation/>
                    <Routes>
                        <Route path="/" element={<Home/>}/>
                        <Route path="tasks" element={<Task/>}/>
                        <Route path="tasks/:taskId" element={<TaskDetails/>}/>
                        <Route path="auth" element={<AuthPage/>}/>
                        <Route path="register" element={<RegisterPage/>}/>
                        <Route path="error" element={<ErrorPage/>}/>
                    </Routes>
                    <LogOutPage/>
                    <Footer/>
                </div>
            </BrowserRouter>
        </Provider>
    );
}

export default App;