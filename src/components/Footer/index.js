import React from "react";
import { Layout } from "antd";
import { connect } from "react-redux";

const { Footer } = Layout;

class WrappedFooter extends React.Component {
    render() {
        if (this.props.isLogin) {
            return (
                <Footer style={{ textAlign: 'center' }}>Ant Design ©2018 Created by Ant UED</Footer>
            );
        };

        return null;
    };
};

const mapStateToProps = (state) => {
    return state.authReducer;
};

export default connect(mapStateToProps)(WrappedFooter);