import React from "react";
import { isMobile } from "react-device-detect";
import { NavLink, withRouter } from "react-router-dom";
import { Layout, Menu, Icon, Typography, Avatar } from "antd";
import { connect } from "react-redux";
import actions from "../../actions";
import "./index.css";

const { Sider } = Layout;
const { SubMenu } = Menu;
const { Text } = Typography;
const { toggleSiderCollapse } = actions.siderActions;

class WrappedSider extends React.Component {
    render() {
        return (
            <Sider
                collapsible
                collapsed={this.props.siderReducer.collapsed}
                collapsedWidth={isMobile ? 0 : 80}
                onCollapse={this.props.toggleSiderCollapse}
                width={isMobile ? 300 : 200}
                style={{
                    height: '100vh',
                    position: 'fixed',
                    left: 0,
                    zIndex: 2
                }}
            >
                <div className="sider-user">
                    <Avatar size={48} style={{ background: "#EC407A" }}>N</Avatar>
                    {
                        this.props.siderReducer.collapsed
                            ? null
                            : <Text style={{ color: "#fff", fontSize: "20px", marginLeft: "8px" }}>NextLink</Text>
                    }
                    <Icon onClick={this.props.toggleSiderCollapse} type="bars" style={{ display: isMobile ? "inline" : "none", color: "#fff", fontSize: "18px", position: "absolute", top: "30px", right: "10px" }} />
                </div>
                <Menu mode="inline" theme="dark" defaultSelectedKeys={["/dashboard"]} selectedKeys={[this.props.location.pathname]} defaultOpenKeys={this.props.siderReducer.collapsed ? "" : ["sub1"]}>
                    <Menu.Item key="/dashboard">
                        <NavLink to="/dashboard" onClick={() => isMobile ? this.props.toggleSiderCollapse() : null}>
                            <Icon type="pie-chart" />
                            <Text className="sider-link">儀表板</Text>
                        </NavLink>
                    </Menu.Item>
                    <SubMenu
                        key="sub1"
                        title={
                            <div>
                                <Icon type="file-search" />
                                <Text className="sider-link">工單</Text>
                            </div>
                        }
                    >
                        <Menu.Item key="/tickets">
                            <NavLink to="/tickets" onClick={() => isMobile ? this.props.toggleSiderCollapse() : null}>
                                <Icon type="file-search" />
                                <Text className="sider-link">工單列表</Text>
                            </NavLink>
                        </Menu.Item>
                        <Menu.Item key="/tickets/create">
                            <NavLink to="/tickets/create" onClick={() => isMobile ? this.props.toggleSiderCollapse() : null}>
                                <Icon type="file-add" />
                                <Text className="sider-link">創建工單</Text>
                            </NavLink>
                        </Menu.Item>
                    </SubMenu>
                </Menu>
            </Sider>
        );
    };
};

const mapStateToProps = (state) => {
    return state;
};

export default connect(
    mapStateToProps,
    { toggleSiderCollapse }
)(withRouter(WrappedSider));