import React from "react";
import { connect } from "react-redux";
import { Card, Icon, List, Avatar, Typography, Row, Col, Collapse } from "antd";

import LoadingIndicator from "../../components/LoadingIndicator";
import WrappedLayout from "../../components/WrappedLayout";
import actions from "../../actions";
import { transformToLocaleDateString, transformUserIdToUsername, transformSourceToString } from "../../util";

const { getTicketDetail } = actions.ticketActions;

const { Panel } = Collapse;
const { Title, Text } = Typography;

class TicketDetail extends React.Component {

    state = {
        loading: true
    };

    async componentDidMount() {
        await this.props.getTicketDetail(this.props.match.params.id);
        this.setState({ loading: false });
    };

    render() {
        console.log(this.props.ticketDetail);
        return (
            <WrappedLayout {...this.props}>
                {this.state.loading ? <LoadingIndicator /> :
                    <Card
                        id="ticket-detail"
                        className="card-wrapper"
                        title={
                            <div className="flex align-items-center">
                                <Icon className="margin-right-1" type="mail" />
                                <Title style={{ fontSize: "18px" }} title={this.props.ticketDetail.data.subject} className="margin-0">{this.props.ticketDetail.data.subject}</Title>
                                <Text className="margin-left-1">#{this.props.ticketDetail.data.id}</Text>
                            </div>
                        }
                    >
                        <div className="margin-bottom-1">
                            <Text>{transformUserIdToUsername(this.props.ticketDetail.data.requester_id, this.props.users)}, from {transformSourceToString(this.props.ticketDetail.data.source)}</Text>
                            {
                                Object.keys(this.props.ticketDetail.data.attachments).length > 0
                                    ?
                                    <div style={{ display: "flex" }}>
                                        附件:
                                        {
                                            this.props.ticketDetail.data.attachments.map(({ name, attachment_url }) => {
                                                return (
                                                    <a key={name} href={attachment_url} target="_blank" rel="noopener noreferrer">
                                                        <Icon type="file-image" />
                                                        {name}
                                                    </a>
                                                );
                                            })
                                        }
                                    </div>
                                    : null
                            }
                        </div>
                        <Collapse defaultActiveKey={["1", "2"]}>
                            <Panel header="最初提問" key="1">
                                <Card
                                    style={{ width: "90%", background: "#ffebee" }}
                                    className="ticket-detail-card"
                                    title={
                                        <div style={{ display: "flex" }}>
                                            <Avatar className="align-self-center" src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />
                                            <Row className="margin-left-1">
                                                <Col>
                                                    <Text className="margin-right-1">{transformUserIdToUsername(this.props.ticketDetail.data.requester_id, this.props.users)}</Text>
                                                    <Text type="secondary">創建日期: {transformToLocaleDateString(this.props.ticketDetail.data.created_at)}</Text>
                                                </Col>
                                                <Col>
                                                    <Text>收件者: {this.props.ticketDetail.data.to_emails}</Text>
                                                </Col>
                                            </Row>
                                        </div>
                                    }
                                >
                                    <div dangerouslySetInnerHTML={{ __html: this.props.ticketDetail.data.description }}></div>
                                </Card>
                            </Panel>
                            <Panel header="後續回覆" key="2">
                                <List
                                    itemLayout="horizontal"
                                    dataSource={this.props.ticketDetail.conversations}
                                    renderItem={conversation => (
                                        <Card
                                            style={{ width: "90%", alignSelf: conversation.incoming ? "flex-start" : "flex-end", background: conversation.incoming ? "#FFF8E1" : "#F1F8E9" }}
                                            className="ticket-detail-card"
                                            title={
                                                <div style={{ display: "flex" }}>
                                                    <Avatar className="align-self-center" src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />
                                                    <Row className="margin-left-1">
                                                        <Col>
                                                            <Text className="margin-right-1">{transformUserIdToUsername(conversation.user_id, this.props.users)}</Text>
                                                            <Text type="secondary">創建日期: {transformToLocaleDateString(conversation.created_at)}</Text>
                                                        </Col>
                                                        <Col>
                                                            <Text>收件者: {conversation.to_emails}</Text>
                                                        </Col>
                                                    </Row>
                                                </div>
                                            }
                                        >
                                            <div dangerouslySetInnerHTML={{ __html: conversation.body }}></div>
                                        </Card>
                                    )}
                                />
                            </Panel>
                        </Collapse>
                    </Card>
                }
            </WrappedLayout>
        );
    };
};

const mapStateToProps = (state) => {
    return state.ticketReducer;
};

export default connect(mapStateToProps, { getTicketDetail })(TicketDetail);