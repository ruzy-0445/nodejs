import React from "react";
import { connect } from "react-redux";
import { BrowserRouter, Route, Switch } from "react-router-dom";

import PrivateRoute from "../../components/PrivateRoute";
import SignIn from "../SignIn";
import Dashboard from "../Dashboard";
import TicketList from "../TicketList";
import TicketDetail from "../TicketDetail";
import TicketCreate from "../TicketCreate";
import Settings from "../Settings";

import actions from "../../actions";

const {
    getUsersFromFreshdesk,
    getUsersFromLocalStorage,
    getTicketTotalByTag
} = actions.ticketActions;

class App extends React.Component {

    componentDidMount() {
        // 載入 Freshdesk 的所有 user
        this.props.getUsersFromLocalStorage();
        this.props.getUsersFromFreshdesk();
    };

    render() {
        console.log(this.props);
        return (
            <BrowserRouter>
                <Switch>
                    <Route path="/" exact component={SignIn} />
                    <Route path="/signin" component={SignIn} />
                    <PrivateRoute path="/dashboard" component={Dashboard} />
                    <PrivateRoute path="/settings" component={Settings} />
                    <PrivateRoute path="/tickets" exact component={TicketList} />
                    <PrivateRoute path="/tickets/detail/:id" component={TicketDetail} />
                    <PrivateRoute path="/tickets/create" component={TicketCreate} />
                </Switch>
            </BrowserRouter>
        );
    };
};

const mapStateToProps = (state) => {
    return state;
};

export default connect(mapStateToProps, {
    getUsersFromFreshdesk,
    getUsersFromLocalStorage,
    getTicketTotalByTag
})(App);