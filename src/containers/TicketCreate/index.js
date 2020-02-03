import React from "react";
import { Form, Input, Select, Card, Button, Row } from "antd";

import TextEditor from "../../components/TextEditor";
import WrappedLayout from "../../components/WrappedLayout";

const { Option } = Select;

class TicketCreate extends React.Component {

    state = {
        confirmDirty: false,
        autoCompleteResult: []
    };

    handleSubmit = event => {
        event.preventDefault();
        this.props.form.validateFieldsAndScroll((err, values) => {
            if (!err) {
                console.log("Received values of form: ", values);
            };
        });
    };

    checkTypeNotEmpty = (rule, value, callback) => {
        if (!value || value === "0") {
            callback("請選擇類型")
        } else {
            callback();
        };
    };

    render() {
        const { getFieldDecorator } = this.props.form;

        const formItemLayout = {
            labelCol: {
                xs: { span: 24 },
                sm: { span: 8 },
            },
            wrapperCol: {
                xs: { span: 24 },
                sm: { span: 16 },
            },
        };

        return (
            <WrappedLayout {...this.props}>
                <Card style={{ width: "100%", height: "100%" }}>
                    <Form {...formItemLayout} onSubmit={this.handleSubmit}>
                        <Form.Item label="聯絡人" labelCol={{ span: 4 }}>
                            {getFieldDecorator("contact", {
                                rules: [
                                    {
                                        required: true,
                                        message: "請選擇聯絡人",
                                    },
                                ],
                            })(<Input />)}
                        </Form.Item>
                        <Form.Item label="主旨" labelCol={{ span: 4 }} hasFeedback>
                            {getFieldDecorator("subject", {
                                rules: [
                                    {
                                        required: true,
                                        message: "請輸入主旨",
                                    },
                                ],
                            })(<Input />)}
                        </Form.Item>
                        <Form.Item label="類型" labelCol={{ span: 4 }}>
                            {getFieldDecorator("type", {
                                rules: [
                                    {
                                        required: true,
                                        message: "請選擇類型"
                                    },
                                    {
                                        validator: this.checkTypeNotEmpty
                                    }
                                ]
                            })(
                                <Select>
                                    <Option value="0">--請選擇類型--</Option>
                                    <Option value="1">Question/提問問題</Option>
                                    <Option value="2">Incident/異常回報</Option>
                                    <Option value="3">Billing Request/帳單問題</Option>
                                    <Option value="4">Change Request/變更需求</Option>
                                </Select>
                            )}

                        </Form.Item>
                        <Form.Item label="描述" labelCol={{ span: 4 }} >
                            {getFieldDecorator("description", {})(<Input style={{ display: "none" }} />)}
                            <TextEditor getDescription={(description) => this.props.form.setFieldsValue({ description })} />
                        </Form.Item>
                        <Row className="flex align-items-center justify-content-center">
                            <Button type="primary" htmlType="submit">
                                提交問題
                            </Button>
                        </Row>
                    </Form>
                </Card>
            </WrappedLayout>
        );
    };
};

const WrappedTicketCreate = Form.create({ name: "createTicket" })(TicketCreate);

export default WrappedTicketCreate;