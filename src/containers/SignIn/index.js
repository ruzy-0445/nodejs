import React from "react";
import { connect } from "react-redux";
import { isMobile } from "react-device-detect";
import { Form, Icon, Input, Button, Checkbox, Typography, Avatar } from "antd";

import "./index.css";
import actions from "../../actions";
import { Redirect } from "react-router-dom";

const { signIn } = actions.authActions;
const { Text } = Typography;

class SignIn extends React.Component {

    onSubmit = (event) => {
        event.preventDefault();

        this.props.form.validateFields(async (error, values) => {
            if (!error) {
                const auth = {
                    username: values.username,
                    password: values.password
                };

                await this.props.signIn(auth);

                if (values.autoSignIn && values.username === "aceradmin" && values.password === "aceradmin") {
                    localStorage.setItem("auth", JSON.stringify(auth));
                } else {
                    localStorage.removeItem("auth");
                };

                if (this.props.isSignedIn) {
                    this.props.history.push("/");
                };
            };
        });
    };

    render() {
        const { getFieldDecorator } = this.props.form;

        if (this.props.isSignedIn) {
            return <Redirect to="/dashboard" />
        };

        return (
            <div className="signin-container">
                <Form
                    className={`signin-form ${isMobile ? "border-none" : ""}`}
                    onSubmit={this.onSubmit}
                >
                    <Form.Item className="signin-avatar">
                        <Avatar size={96} icon="user" />
                    </Form.Item>
                    <Form.Item>
                        {getFieldDecorator("username", {
                            rules: [{ required: true, message: "請輸入使用者名稱" }]
                        })(
                            <Input
                                prefix={<Icon type="user" style={{ color: "rgba(0,0,0,.25)" }} />}
                                placeholder="使用者名稱"
                            />,
                        )}
                    </Form.Item>
                    <Form.Item>
                        {getFieldDecorator("password", {
                            rules: [{ required: true, message: "請輸入密碼" }]
                        })(
                            <Input
                                prefix={<Icon type="lock" style={{ color: "rgba(0,0,0,.25)" }} />}
                                type="password"
                                placeholder="密碼"
                            />,
                        )}
                    </Form.Item>
                    <Form.Item>
                        {getFieldDecorator("autoSignIn", {
                            valuePropName: "checked",
                            initialValue: true,
                        })(<Checkbox>自動登入</Checkbox>)}
                    </Form.Item>
                    <Form.Item>
                        <Text type="danger">
                            {this.props.signInFailure ? "使用者名稱 / 密碼錯誤" : ""}
                        </Text>
                        <Button type="primary" htmlType="submit" className="signin-form-button">
                            登入
                        </Button>
                    </Form.Item>
                </Form>
            </div >
        );
    };
};

const WrappedSignIn = Form.create({ name: "normal_signin" })(SignIn);

const mapStateToProps = (state) => {
    return state.authReducer;
};

export default connect(mapStateToProps, { signIn })(WrappedSignIn);