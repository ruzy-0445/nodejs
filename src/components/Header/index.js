import React from "react";
import { isMobile } from "react-device-detect";
import { connect } from "react-redux";
import { Layout, Icon, Button, Avatar, Popover, Row, Col } from "antd";

import "./index.css";
import actions from "../../actions";
import Breadcrumb from "./components/Breadcrumb";

const { Header } = Layout;

const { signOut } = actions.authActions;
const { toggleSiderCollapse } = actions.siderActions;

class WrappedHeader extends React.Component {

    state = {
        current: 'mail',
        clicked: false
    };

    headerMargin = () => {
        if (isMobile) {
            return "24px";
        };

        if (this.props.siderReducer.collapsed) {
            return "80px";
        };

        return "200px";
    };

    renderOptions = () => {
        return (
            <Button type="danger" onClick={this.hide}>
                <Icon type="logout" />
                登出
            </Button>
        );
    };

    hide = () => {
        this.setState({
            clicked: false
        });
        this.props.signOut();
    };

    handleClickChange = visible => {
        this.setState({
            clicked: visible
        });
    };

    render() {
        return (
            <Header className="header">
                <Row type="flex" style={{ marginLeft: this.headerMargin(), alignItems: "center" }}>
                    <Col style={{ display: isMobile ? "flex" : "none", marginRight: "12px" }}>
                        <Icon onClick={this.props.toggleSiderCollapse} style={{ fontSize: "18px" }} type="bars" />
                    </Col>
                    <Col style={{ height: "100%", marginLeft: isMobile ? "0" : "16px" }}>
                        <Breadcrumb location={this.props.location} match={this.props.match} />
                    </Col>
                    <Col className="header-user">
                        <Popover
                            content={this.renderOptions()}
                            title="username"
                            trigger="click"
                            visible={this.state.clicked}
                            onVisibleChange={this.handleClickChange}
                            placement="bottomRight"
                        >
                            <Avatar className="avatar" size="large" icon="user" />
                        </Popover>
                    </Col>
                </Row>
            </Header>
        );
    };
};

const mapStateToProps = (state) => {
    return state;
};

export default connect(mapStateToProps, { signOut, toggleSiderCollapse })(WrappedHeader);