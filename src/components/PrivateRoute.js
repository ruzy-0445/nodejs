import React from "react";
import { notification } from "antd";
import { connect } from "react-redux";
import { Route, Redirect } from "react-router-dom";

class PrivateRoute extends React.Component {

    authNotification = () => {
        notification.open({
            message: "權限不符",
            description: "請登入 NextLink 工單系統"
        });
    };

    componentDidMount() {
        if (!this.props.authReducer.isSignedIn) {
            this.authNotification();
        };
    };

    render() {
        const { path, exact, component } = this.props;

        return this.props.authReducer.isSignedIn
            ? <Route path={path} exact={exact} component={component} />
            : <Redirect to="/signin" />;
    };
};

const mapStateToProps = (state) => {
    return state;
};

export default connect(mapStateToProps)(PrivateRoute);