import api_clients from "./api_clients";

const setAuthToken = (token) => {
    if (token) {
        api_clients.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    } else {
        delete api_clients.defaults.headers.common["Authorization"];
    }
};

export default setAuthToken;
