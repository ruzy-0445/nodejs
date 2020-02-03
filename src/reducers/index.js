import { combineReducers } from "redux";
import siderReducer from "./sider.reducer";
import authReducer from "./auth.reducer";
import ticketReducer from "./ticket.reducer";

export default combineReducers({
    siderReducer,
    authReducer,
    ticketReducer
});