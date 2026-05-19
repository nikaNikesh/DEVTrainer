import React, { ReactElement, useEffect } from 'react';
import { useNavigate } from "react-router-dom";

import { useAppDispatch } from "../../hooks/useAppDispatch";
import { useAppSelector } from "../../hooks/useAppSelector";
import { closeModal } from "../../store/slices/modalWindowSlice";
import logOutService from "../../service/logOutService";
import { toggleIsAuth } from "../../store/slices/authSlice";
import { toggleIsLogOut } from "../../store/slices/logOutSlice";

import Button from "../button";

import styles from './LogOutPage.module.scss';

const LogOutPage = (): ReactElement | null => {
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const isOpen = useAppSelector((state) => state.modalWindow.isOpen);
    const error = useAppSelector((state) => state.logOut.error);
    const isLogOut = useAppSelector((state) => state.logOut.isLogOut);
    const url: string = 'https://localhost:8443/api/v1/auth/logout';

    useEffect(() => {
        if (error === "Unauthorized access" || isLogOut) {
            dispatch(closeModal());
            dispatch(toggleIsAuth());
            dispatch(toggleIsLogOut());
            navigate("auth/", {replace: true});
        }
    }, [error, isLogOut]);

    if (!isOpen) return null
    return (
        <div className={styles.modal}>
            <div className={styles.modalContent}>
                <h2 className={styles.title}>Are you sure you want to leave this page?</h2>
                <div className={styles.buttonsContainer}>
                    <Button
                        size='small'
                        onClick={() => {
                            dispatch(logOutService(url))
                        }}
                        disabled={false}
                        type="submit"
                    >
                        Yes
                    </Button>
                    <Button
                        size='small'
                        onClick={() => {
                            dispatch(closeModal())
                        }}
                        disabled={false}
                        type="submit"
                    >
                        Cancel
                    </Button>
                </div>
            </div>
        </div>
    );
};

export default LogOutPage;
