import React from "react";
import { isMobile } from "react-device-detect";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import InfiniteScroll from 'react-infinite-scroller';
import { List, message, Spin, Icon, Typography } from 'antd';

import actions from "../../../actions";
import freshdesk from "../../../apis/freshdesk";
import { transformCodeToStatus, transformToLocaleDateString, transformUserIdToUsername } from "../../../util";

const { searchTicketsPerPage } = actions.ticketActions;

const { Text } = Typography;

class InfiniteList extends React.Component {
    state = {
        data: [],
        loading: false,
        hasMore: true,
        currentPage: 1,
        total: 0,
        isUnMounted: false
    };

    searchTicketsPerPage = async (query, page) => {
        const response = await freshdesk.get(`/search/tickets?query="${query}"&&page=${page}`);

        return response.data;
    };

    fetchData = async () => {
        if (this.state.isUnMounted) {
            return;
        };
        const response = await this.searchTicketsPerPage(this.props.ticketReducer.ticketList[this.props.ticketKey].query, this.state.currentPage);

        this.setState({
            data: this.state.data.concat(response.results),
            currentPage: this.state.currentPage + 1,
            loading: false
        });
    };

    componentDidMount() {
        this.fetchData(this.props.ticketKey);
        this.setState({
            total: this.props.ticketReducer.ticketList[this.props.ticketKey].total
        });
    };

    componentWillUnmount() {
        this.setState({
            isUnMounted: true
        });
    };

    handleInfiniteOnLoad = () => {
        this.setState({
            loading: true
        });
        if (this.state.currentPage > 10) {
            message.warning("資料上限300筆，欲查看其他資料，請至工單列表使用篩選器");
            this.setState({
                hasMore: false,
                loading: false
            });
            return;
        }

        this.fetchData(this.props.ticketKey);
    };

    render() {
        return (
            <div className="infinite-container" style={{ height: "60vh" }}>
                <InfiniteScroll
                    initialLoad={false}
                    pageStart={0}
                    loadMore={() => this.handleInfiniteOnLoad(this.props.ticketKey)}
                    hasMore={!this.state.loading && this.state.hasMore}
                    useWindow={false}
                >
                    <List
                        dataSource={this.state.data}
                        renderItem={item => (
                            <List.Item key={item.id}>
                                <List.Item.Meta
                                    title={
                                        <div>
                                            <Text type="secondary" className="margin-right-1">#{item.id}</Text>
                                            <Link to={`/tickets/detail/${item.id}`} style={{ width: "200px" }} title={item.subject}>{item.subject}</Link>
                                        </div>
                                    }
                                    description={
                                        <div style={{ display: "flex", flexDirection: isMobile ? "column" : "row" }}>
                                            <Text className="margin-right-1">
                                                <Icon className="margin-right-1" type="mail" />
                                                寄件人 {transformUserIdToUsername(item.requester_id, this.props.ticketReducer.users)}
                                            </Text>
                                            <Text className="margin-right-1">
                                                <Icon className="margin-right-1" type="clock-circle" />
                                                創建日期 {transformToLocaleDateString(item.created_at)}
                                            </Text>
                                        </div>
                                    }
                                />
                                <div>
                                    <div>
                                        <Icon className="margin-right-1" type="branches" />
                                        狀態 {transformCodeToStatus(item.status)}
                                    </div>
                                    <div>
                                        <Icon className="margin-right-1" type="sync" />
                                        更新日期 {transformToLocaleDateString(item.updated_at)}
                                    </div>
                                </div>
                            </List.Item>
                        )}
                    >
                        {this.state.loading && this.state.hasMore && (
                            <div className="loading-container">
                                <Spin />
                            </div>
                        )}
                    </List>
                </InfiniteScroll>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return state;
};

export default connect(mapStateToProps, { searchTicketsPerPage })(InfiniteList);