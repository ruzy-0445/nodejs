import { ticketTypes } from "./type";
import freshdesk from "../apis/freshdesk";

const {
    SEARCH_TICKETS_SUCCESS,
    SEARCH_TICKETS_PER_PAGE_SUCCESS,
    GET_TICKET_DETAIL_SUCCESS,
    GET_USERS_FROM_FRESHDESK_SUCCESS,
    GET_USERS_FROM_LOCALSTORAGE_SUCCESS,
    SET_CURRENT_CATEGORY_SUCCESS,

    SET_QUERY_UPDATED_AT
} = ticketTypes;

const getUsersFromLocalStorage = () => {
    return {
        type: GET_USERS_FROM_LOCALSTORAGE_SUCCESS,
        payload: JSON.parse(localStorage.getItem("users"))
    };
};

const getUsersFromFreshdesk = () => {
    return async (dispatch) => {
        const contactsResponse = await freshdesk.get(`/search/contacts?query="active:true OR active:false"`);

        const contactsPages = Math.ceil(contactsResponse.data.total / 30);

        let users = {};

        for (let i = 1; i <= contactsPages; i++) {
            const response = await freshdesk.get(`/contacts?page=${i}`);
            response.data.forEach(({ id, name }) => {
                users[id] = name;
            });
        };

        const agentsResponse = await freshdesk.get(`/agents`);

        agentsResponse.data.forEach(({ id, contact }) => {
            users[id] = contact.name;
        });

        localStorage.setItem("users", JSON.stringify(users));

        dispatch({
            type: GET_USERS_FROM_FRESHDESK_SUCCESS,
            payload: users
        });
    };
};

const searchTickets = (key, query) => {
    return async (dispatch) => {
        const response = await freshdesk.get(`/search/tickets?query="${query}"`);

        dispatch({
            type: SEARCH_TICKETS_SUCCESS,
            payload: {
                id: key,
                results: response.data,
                query: query
            }
        });
    };
};

const searchTicketsPerPage = (query, page) => {
    return async (dispatch) => {
        const response = await freshdesk.get(`/search/tickets?query="${query}"&&page=${page}`);

        dispatch({
            type: SEARCH_TICKETS_PER_PAGE_SUCCESS,
            payload: {
                results: response.data.results,
                total: response.data.total
            }
        });
    };
};

const setQueryUpdatedAt = (minusMonth) => {
    let date = new Date();
    let year = date.getFullYear();

    let month = date.getMonth() + 1;
    if ((month - minusMonth) > 0) {
        if (month < 10) {
            month = "0" + (month - minusMonth);
        };
    } else {
        switch (month - minusMonth) {
            case 0:
                month = "12";
                year = year - 1
                break;
            case -1:
                month = "11";
                year = year - 1
                break;
            case -2:
                month = "10";
                year = year - 1
                break;
            default:
                break;
        };
    };

    let day = date.getDate() > 9 ? date.getDate() : ('0' + date.getDate());

    return {
        type: SET_QUERY_UPDATED_AT,
        payload: year + "-" + month + "-" + day
    };
};

const getTicketDetail = (id) => {
    return async (dispatch) => {
        const response = await freshdesk.get(`/tickets/${id}?include=conversations`);

        dispatch({
            type: GET_TICKET_DETAIL_SUCCESS,
            payload: {
                data: response.data,
                conversations: response.data.conversations.reverse()
            }
        });
    };
};

const setCurrentCategory = (category) => {
    return {
        type: SET_CURRENT_CATEGORY_SUCCESS,
        payload: category
    };
};

export const ticketActions = {
    searchTickets,
    searchTicketsPerPage,

    getTicketDetail,

    getUsersFromFreshdesk,
    getUsersFromLocalStorage,

    setCurrentCategory,
    setQueryUpdatedAt
};