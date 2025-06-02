import api_clients from "../utils/api_clients";


export function checkoutAPI(){
    return api_clients.post("/order/checkout")
}


 