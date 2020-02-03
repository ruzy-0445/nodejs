import { ticketTypes } from "../actions/type";

const {
    SEARCH_TICKETS_SUCCESS,
    SEARCH_TICKETS_PER_PAGE_SUCCESS,
    GET_TICKET_DETAIL_SUCCESS,
    GET_USERS_FROM_FRESHDESK_SUCCESS,
    GET_USERS_FROM_LOCALSTORAGE_SUCCESS,
    SET_CURRENT_CATEGORY_SUCCESS,
    SET_QUERY_UPDATED_AT
} = ticketTypes;

const initialState = {
    ticketList: {
        all: { results: [], total: "-", query: "tag:Acer AND status:>2" },
        notResolved: { results: [], total: "-", query: "tag:Acer AND status:<3" },
        resolved: { results: [], total: "-", query: "tag:Acer AND status:>4" },
        ccdb: { results: [], total: "-", query: "tag:Acer AND tag:CCDB AND status:<3" },
        pa: { results: [], total: "-", query: "tag:Acer AND tag:PA AND status:<3" },
        emea: { results: [], total: "-", query: "tag:Acer AND tag:EMEA AND status:<3" }
    },
    ticketDetail: {
        data: {},
        conversations: []
    },
    ticketsPerPage: {
        results: [],
        total: 0
    },
    users: {},
    currentCategory: "all",
    query: {
        tag: "",
        updatedAt: ""
    }
};

export default (state = initialState, action) => {
    switch (action.type) {
        case SEARCH_TICKETS_SUCCESS:
            return { ...state, ticketList: { ...state.ticketList, [action.payload.id]: { ...action.payload.results, query: action.payload.query } } };

        case SEARCH_TICKETS_PER_PAGE_SUCCESS:
            return { ...state, ticketsPerPage: { results: action.payload.results, total: action.payload.total } };

        case GET_TICKET_DETAIL_SUCCESS:
            return { ...state, ticketDetail: action.payload };

        case GET_USERS_FROM_FRESHDESK_SUCCESS:
            return { ...state, users: action.payload };

        case GET_USERS_FROM_LOCALSTORAGE_SUCCESS:
            return { ...state, users: action.payload };

        case SET_CURRENT_CATEGORY_SUCCESS:
            return { ...state, currentCategory: action.payload };
            
        case SET_QUERY_UPDATED_AT:
            return { ...state, query: { ...state.query, updatedAt: action.payload } };

        default:
            return state;
    };
};