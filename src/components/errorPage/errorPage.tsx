import React, {ReactElement, useEffect} from 'react';
import { useLocation } from "react-router-dom";
import styles from './ErrorPage.module.scss';
import {useAppDispatch} from "../../hooks/useAppDispatch";
import {clearAuthError} from "../../store/slices/authSlice";

const ErrorPage= (): ReactElement => {
    const location = useLocation();
    const errorMessage = location.state?.errorMessage;
    const dispatch = useAppDispatch();

    useEffect(() => {
        dispatch(clearAuthError());
    }, [dispatch]);

  return (
      <div className={styles.errorContainer}>
        <h1 className={styles.title}>{errorMessage}</h1>
      </div>
  );
};

export default ErrorPage;