import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { Row, Col, Typography, Card } from "antd";
import actions from "../../../actions";
import { transformKeyToCategory } from "../../../util";

const { Title } = Typography;
const { setCurrentCategory } = actions.ticketActions;

class HorizentalCardList extends React.Component {
    render() {
        return (
            <Row style={{ marginTop: "3px" }} gutter={[3, 3]}>
                {
                    Object.keys(this.props.ticketReducer.ticketList).map(key => {
                        const name = transformKeyToCategory(key);
                        const total = this.props.ticketReducer.ticketList[key].total;

                        return (
                            <Col key={key} xs={{ span: 8 }} xl={{ span: 4 }}>
                                <div className="hvr-glow" style={{ width: "100%" }}>
                                    <Link to={{ pathname: "/tickets", params: { category: key } }} onClick={() => this.props.setCurrentCategory(key)} >
                                        <Card size="small">
                                            <Row>
                                                <Col>
                                                    <Title level={4}>{name}</Title>
                                                </Col>
                                                <Col>
                                                    <Title style={{ color: "#1890ff" }}>{total}</Title>
                                                </Col>
                                            </Row>
                                        </Card>
                                    </Link>
                                </div>
                            </Col>
                        );
                    })
                }
            </Row>
        );
    };
};

const mapStateToProps = (state) => {
    return state;
};

export default connect(mapStateToProps, { setCurrentCategory })(HorizentalCardList);