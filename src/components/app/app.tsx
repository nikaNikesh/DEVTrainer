import React, {ReactElement} from "react";
import {BrowserRouter, Route, Routes} from 'react-router-dom';
import {Provider} from 'react-redux';
import store from "../../store";

import Header from "../header";
import Navigation from "../navigation";
import Home from "../home";
import Tasks from "../tasks";
import styles from "./App.module.scss";
import Footer from "../footer";
import TaskDetails from "../taskDetails";
import AuthPage from "../authPage";

const App = (): ReactElement => {

    return (
        <Provider store={store}>
            <BrowserRouter>
                <div className={styles.app}>
                    <Header/>
                    <Navigation/>
                    <Routes>
                        <Route path="/" element={<Home/>}/>
                        <Route path="tasks" element={<Tasks/>}/>
                        <Route path="tasks/:taskId" element={<TaskDetails/>}/>
                        <Route path="auth" element={<AuthPage/>}/>
                    </Routes>
                    <Footer/>
                </div>
            </BrowserRouter>
        </Provider>
    );
}

export default App;