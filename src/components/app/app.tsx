import React, {ReactElement} from "react";
import {BrowserRouter, Route, Routes} from 'react-router-dom';

import Header from "../header";
import Navigation from "../navigation";
import Home from "../home";
import Tasks from "../tasks";
import styles from "./App.module.scss";
import Footer from "../footer";
import {BurgerMenuProvider} from "../contexts/burgerMenuContext";

const App = (): ReactElement => {

    return (
        <BrowserRouter>
            <div className={styles.app}>
                <BurgerMenuProvider>
                    <Header/>
                    <Navigation/>
                    <Routes>
                        <Route path="/" element={<Home/>}/>
                        <Route path="tasks" element={<Tasks/>}/>
                    </Routes>
                    <Footer/>
                </BurgerMenuProvider>
            </div>
        </BrowserRouter>
    );
}

export default App;