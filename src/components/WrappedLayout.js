import React from "react";
import { isMobile } from "react-device-detect";
import { connect } from "react-redux";
import { Layout } from "antd";

import Header from "./Header";
import Sider from "./Sider";
import Footer from "./Footer";

const { Content } = Layout;

class WrappedLayout extends React.Component {
    render() {
        return (
            <Layout style={{ minHeight: '100vh' }}>
                <Sider />
                <Layout>
                    <Header {...this.props} />
                    <Content className="content-wrapper" style={{ padding: "0", marginLeft: this.props.siderReducer.collapsed ? (isMobile ? "0" : "80px") : (isMobile ? "0" : "200px") }}>
                        {this.props.children}
                    </Content>
                    <Footer />
                </Layout>
            </Layout>
        );
    };
};

const mapStateToProps = (state) => {
    return state;
};

export default connect(mapStateToProps)(WrappedLayout);