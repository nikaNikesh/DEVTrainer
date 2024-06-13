import React, {ReactElement} from "react";
import {BrowserRouter, Route, Routes} from 'react-router-dom';

import Header from "../header";
import Navigation from "../navigation";
import Home from "../home";
import Tasks from "../tasks";
import getTasks from "../../service/service";
import "./app.scss";
const App = (): ReactElement => {
    getTasks(0);
    return (
        <BrowserRouter>
            <div className="app">
                <Header/>
                <Navigation/>
                <Routes>
                    <Route path="/" element={<Home/>}/>
                    <Route path="tasks" element={<Tasks/>}/>
                </Routes>
            </div>
        </BrowserRouter>
    );
}

export default App;