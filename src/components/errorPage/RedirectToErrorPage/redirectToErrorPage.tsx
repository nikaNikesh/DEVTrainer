import React, { ReactElement, useEffect } from 'react';
import { useLocation } from "react-router-dom";

import { useAppDispatch } from "../../../hooks/useAppDispatch";
import { clearAuthError } from "../../../store/slices/authSlice";

import ErrorPage from "../errorPage";

const RedirectToErrorPage = (): ReactElement => {
    const location = useLocation();
    const errorMessage = location.state?.errorMessage;
    const dispatch = useAppDispatch();

    useEffect(() => {
        dispatch(clearAuthError());
    }, [dispatch]);

  return <ErrorPage message={errorMessage}></ErrorPage>
};

export default RedirectToErrorPage;