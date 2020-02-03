import React from "react";
import { List, Tabs, Pagination, Typography, Icon, Row, Col, Button, Tooltip, Select } from "antd";
import { isMobile } from "react-device-detect";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import actions from "../../actions";
import LoadingIndicator from "../../components/LoadingIndicator";
import WrappedLayout from "../../components/WrappedLayout";
import { transformCodeToStatus, transformToLocaleDateString, transformUserIdToUsername } from "../../util";

const { TabPane } = Tabs;
const { Option } = Select;
const { Text, Title } = Typography;
const {
    searchTickets,
    searchTicketsPerPage,
    setCurrentCategory,
    setQueryUpdatedAt
} = actions.ticketActions;

class TicketList extends React.Component {

    state = {
        isLoaded: false,
        page: 1,
        minusMonth: 1
    };

    renderAlert = () => {
        return (this.props.ticketReducer.ticketsPerPage.total / 30) > 10
            ? <Tooltip placement="bottomLeft" title={(this.props.ticketReducer.ticketsPerPage.total / 30) > 10 ? "已達上限300筆，欲查看完整資料，請調整日期區間" : ""}><Icon style={{ fontSize: "20px", marginRight: "8px" }} theme="twoTone" type="info-circle" /></Tooltip>
            : null;
    };

    firstSearch = async () => {
        await this.props.searchTicketsPerPage(this.props.ticketReducer.ticketList[this.props.ticketReducer.currentCategory].query + ` AND updated_at:>'${this.props.ticketReducer.query.updatedAt}'`, 1);
        this.setState({ isLoaded: true });
    };

    onSelectChange = async (value) => {
        await this.setState({ minusMonth: value });
        await this.updateTicketTotal();
        this.firstSearch();
    };

    updateTicketTotal = async () => {
        await this.props.setQueryUpdatedAt(this.state.minusMonth);
        this.props.searchTickets("all", `tag:Acer AND status:>2 AND updated_at:>'${this.props.ticketReducer.query.updatedAt}'`);
        this.props.searchTickets("notResolved", `tag:Acer AND status:<3 AND updated_at:>'${this.props.ticketReducer.query.updatedAt}'`);
        this.props.searchTickets("resolved", `tag:Acer AND status:>4 AND updated_at:>'${this.props.ticketReducer.query.updatedAt}'`);
        this.props.searchTickets("ccdb", `tag:Acer AND tag:CCDB AND status:<3 AND updated_at:>'${this.props.ticketReducer.query.updatedAt}'`);
        this.props.searchTickets("emea", `tag:Acer AND tag:EMEA AND status:<3 AND updated_at:>'${this.props.ticketReducer.query.updatedAt}'`);
        this.props.searchTickets("pa", `tag:Acer AND tag:PA AND status:<3 AND updated_at:>'${this.props.ticketReducer.query.updatedAt}'`);
        console.log(this.props)
    };

    async componentDidMount() {
        await this.updateTicketTotal();
        this.firstSearch();
    };

    render() {
        return (
            <WrappedLayout {...this.props}>
                <div style={{
                    position: "fixed",
                    top: "64px",
                    left: "0",
                    marginLeft: this.props.siderReducer.collapsed ? (isMobile ? "0" : "80px") : (isMobile ? "0" : "200px"),
                    width: "100%",
                    background: "#fff",
                    zIndex: "1",
                    padding: isMobile ? "8px" : "16px",
                    borderBottom: "1px solid #eee",
                    minHeight: "41px"
                }}>
                    <Row type="flex" style={{ alignItems: "center" }}>
                        <Col style={{ display: "flex", alignItems: "center" }}>
                            {this.renderAlert()}
                            <Title style={{ fontSize: isMobile ? "16px" : "24px", margin: "0" }}>工單列表</Title>
                        </Col>
                        <Col style={{ marginLeft: "auto", right: isMobile ? "0" : (this.props.siderReducer.collapsed ? "80px" : "200px"), display: "flex", flexDirection: isMobile ? "column" : "row" }}>
                            <Pagination
                                simple={isMobile}
                                showQuickJumper
                                hideOnSinglePage={true}
                                defaultPageSize={30}
                                defaultCurrent={1}
                                showTotal={(total, range) => `${range[0]}-${range[1]} 筆 / 共 ${total} 筆`}
                                total={(this.props.ticketReducer.ticketsPerPage.total / 30) > 10 ? 300 : this.props.ticketReducer.ticketsPerPage.total}
                                onChange={async (page) => { this.setState({ isLoaded: false }); await this.props.searchTicketsPerPage(this.props.ticketReducer.ticketList[this.props.ticketReducer.currentCategory].query + ` AND updated_at:>${this.props.ticketReducer.query.updatedAt}`, page); this.setState({ page: page, isLoaded: true }); window.scrollTo(0, 0) }}
                            />
                            <Select defaultValue={1} style={{ width: 120 }} onChange={(value) => this.onSelectChange(value)}>
                                <Option value={1}>過去1個月</Option>
                                <Option value={2}>過去2個月</Option>
                                <Option value={3}>過去3個月</Option>
                            </Select>
                            <Link to="/tickets/create">
                                <Button style={{ display: isMobile ? "none" : "", marginLeft: "8px" }} type="primary" icon="file-add">
                                    創建工單
                                </Button>
                            </Link>
                        </Col>
                    </Row>
                </div>
                <div style={{ marginTop: isMobile ? "41px" : "65px", padding: "6px", background: "#fff" }}>
                    <Tabs defaultActiveKey={this.props.location.params ? this.props.location.params.category : this.props.ticketReducer.currentCategory} onChange={async (category) => { this.setState({ isLoaded: false }); await this.props.setCurrentCategory(category); await this.props.searchTicketsPerPage(this.props.ticketReducer.ticketList[this.props.ticketReducer.currentCategory].query, 1); this.setState({ isLoaded: true }) }}>
                        {
                            Object.keys(this.props.ticketReducer.ticketList).map(key => {
                                let tab = "";
                                let total = this.props.ticketReducer.ticketList[key].total;

                                switch (key) {
                                    case "all":
                                        tab = `所有工單 (${total})`;
                                        break;
                                    case "notResolved":
                                        tab = `未解決 (${total})`;
                                        break;
                                    case "resolved":
                                        tab = `已解決 (${total})`;
                                        break;
                                    case "ccdb":
                                        tab = `CCDB (${total})`;
                                        break;
                                    case "emea":
                                        tab = `EMEA (${total})`;
                                        break;
                                    case "pa":
                                        tab = `PA (${total})`;
                                        break;
                                    default:
                                        break;
                                };

                                return (
                                    <TabPane tab={tab} key={key}>
                                        {this.state.isLoaded ? <List
                                            itemLayout="horizontal"
                                            dataSource={this.props.ticketReducer.ticketsPerPage.results}
                                            renderItem={item => (
                                                <List.Item>
                                                    <Row style={{ width: "100%" }}>
                                                        <Col xs={24} lg={16}>
                                                            <Row className={isMobile ? "" : "flex"}>
                                                                <Col className="margin-right-1">
                                                                    <Text>#{item.id}</Text>
                                                                </Col>
                                                                <Col>
                                                                    <Link to={`/tickets/detail/${item.id}`}>{item.subject}</Link>
                                                                </Col>
                                                            </Row>
                                                            <Row className={isMobile ? "" : "flex"}>
                                                                <Col className="margin-right-1">
                                                                    <Text className="margin-right-1">
                                                                        <Icon className="margin-right-1" type="mail" />
                                                                        寄件人: {transformUserIdToUsername(item.requester_id, this.props.ticketReducer.users)}
                                                                    </Text>
                                                                </Col>
                                                                <Col>
                                                                    <Icon className="margin-right-1" type="clock-circle" />
                                                                    創建日期: {transformToLocaleDateString(item.created_at)}
                                                                </Col>
                                                            </Row>
                                                        </Col>
                                                        <Col xs={24} lg={8}>
                                                            <Row className={isMobile ? "" : "flex flex-direction-column align-items-flex-end"}>
                                                                <Row style={{ textAlign: "left" }}>
                                                                    <Col>
                                                                        <Text className="margin-bottom-1">
                                                                            <Icon className="margin-right-1" type="branches" />
                                                                            狀態: {transformCodeToStatus(item.status)}
                                                                        </Text>
                                                                    </Col>
                                                                    <Col>
                                                                        <Text>
                                                                            <Icon className="margin-right-1" type="sync" />
                                                                            更新日期: {transformToLocaleDateString(item.updated_at)}
                                                                        </Text>
                                                                    </Col>
                                                                </Row>
                                                            </Row>
                                                        </Col>
                                                    </Row>
                                                </List.Item>
                                            )}
                                        /> : <LoadingIndicator />}
                                    </TabPane>
                                );
                            })
                        }
                    </Tabs>
                </div>
            </WrappedLayout >
        );
    };
};

const mapStateToProps = (state) => {
    return state;
};

export default connect(mapStateToProps, {
    searchTickets,
    searchTicketsPerPage,
    setCurrentCategory,
    setQueryUpdatedAt
})(TicketList);