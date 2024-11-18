import React, {ReactElement} from "react";
import {BrowserRouter, Route, Routes} from 'react-router-dom';

import Header from "../header";
import Navigation from "../navigation";
import Home from "../home";
import Tasks from "../tasks";
import styles from "./App.module.scss";
import Footer from "../footer";
import {useDispatch, useSelector} from "react-redux";
import {bank} from "../redux/Store";

const App = (): ReactElement => {
    //change state
    const dispatch = useDispatch();
    //get state

    dispatch({ type: "plus", payload: 200 });
    const plusAction = useSelector((state: bank)  => state.account);
    console.log("plusAction: " + plusAction);
    // dispatch({ type: "minus", payload: 50 });
    // const minusAction = useSelector((state: bank)  => state.account);
    // console.log("minusAction: " + minusAction);

    return (
        <BrowserRouter>
            <div className={styles.app}>
                <Header/>
                <Navigation/>
                <Routes>
                    <Route path="/" element={<Home/>}/>
                    <Route path="tasks" element={<Tasks/>}/>
                </Routes>
                <Footer/>
            </div>
        </BrowserRouter>
    );
}

export default App;