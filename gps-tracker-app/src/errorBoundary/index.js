import React from 'react';

export default class ErrorBoundary extends React.Component {
    constructor(props) {
        super(props);
        this.state = { error: null, errorInfo: null };
    }

    componentDidCatch(error, errorInfo) {
        this.setState({
            error: error,
            errorInfo: errorInfo,
        });

        // Log error info somewhere
        console.log(error);
    }

    render() {
        if (this.state.errorInfo) {
            // return <Text>Algo salió mal!</Text>;
            console.error("Algo salió mal!");
        }
        return this.props.children;
    }
}