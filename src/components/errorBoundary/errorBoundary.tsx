import React, {Component} from "react";
import ErrorPage from "../errorPage";

type State = {
    hasError: boolean;
};

export default class ErrorBoundary extends Component<
    { children: React.ReactNode },
    { hasError: boolean }> {

    state = {
        hasError: false
    }

    static getDerivedStateFromError(error: Error): State {
        return {
            hasError: true
        };
    }

    render() {
        if (this.state.hasError) {
            return <ErrorPage/>
        }
        return this.props.children;
    }
}