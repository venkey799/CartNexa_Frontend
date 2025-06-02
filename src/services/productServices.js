import api_clients from "../utils/api_clients";

export function getSuggestionsAPI(search){
    return api_clients.get(`/products/suggestions?search=${search}`)
}