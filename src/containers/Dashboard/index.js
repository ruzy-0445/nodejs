import React from "react";
import { connect } from "react-redux";
import { Card, Tabs } from "antd";

import actions from "../../actions";
import WrappedLayout from "../../components/WrappedLayout";
import HorizentalCardList from "./components/HorizentalCardList";
import InfiniteList from "./components/InfiniteList";
import { transformKeyToCategory } from "../../util";

const { TabPane } = Tabs;
const { searchTickets } = actions.ticketActions;

class Dashboard extends React.Component {

    state = {
        key: ""
    };

    callback = (key) => {
        this.setState({ key });
    };

    ticketsLoaded = () => {
        this.props.searchTickets("all", "tag:Acer AND status:>2");
        this.props.searchTickets("notResolved", "tag:Acer AND status:<3");
        this.props.searchTickets("resolved", "tag:Acer AND status:>4");
        this.props.searchTickets("ccdb", "tag:Acer AND tag:CCDB AND status:<3");
        this.props.searchTickets("emea", "tag:Acer AND tag:EMEA AND status:<3");
        this.props.searchTickets("pa", "tag:Acer AND tag:PA AND status:<3");
    };

    componentDidMount() {
        this.ticketsLoaded();
    };

    render() {
        return (
            <WrappedLayout {...this.props}>
                <HorizentalCardList />
                <Card className="card-wrapper">
                    <Tabs onChange={this.callback}>
                        {
                            Object.keys(this.props.ticketReducer.ticketList).map(key => {
                                return (
                                    <TabPane tab={`${transformKeyToCategory(key)} (${this.props.ticketReducer.ticketList[key].total})`} key={key}>
                                        <InfiniteList ticketKey={key} />
                                    </TabPane>
                                );
                            })
                        }
                    </Tabs>
                </Card>
            </WrappedLayout>
        );
    };
};

const mapStateToProps = (state) => {
    return state;
};

export default connect(mapStateToProps, { searchTickets })(Dashboard);