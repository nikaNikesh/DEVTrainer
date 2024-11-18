import React, {StrictMode} from "react";
import ReactDOM from 'react-dom/client';
import App from './components/app'
import "./index.scss";
import "./styles/main.scss";
import {Provider} from "react-redux";
import {store} from "./components/redux/Store";

const root: ReactDOM.Root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);

root.render(
    <StrictMode>
        <Provider store={store}>
            <App/>
        </Provider>
    </StrictMode>
);



