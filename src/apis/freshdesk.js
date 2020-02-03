import axios from "axios";

export default axios.create({
    baseURL: "https://servicenextlink.freshdesk.com/api/v2",
    auth: {
        username: "VAM8EMGNQPqBCq2iI11B",
        password: "X"
    }
});