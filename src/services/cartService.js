import api_clients from "../utils/api_clients";

export function addToCartAPI(id, quantity){
    return api_clients.post(`/cart/${id}`,{quantity});
}
export function getCartAPI(){
    return api_clients.get('/cart')
}


export function removeFromCartAPI(id){
    return api_clients.patch(`/cart/remove/${id}`)
}

export function increaseProductAPI(id){
    return api_clients.patch(`/cart/increase/${id}`);
}

export function decreaseProductAPI(id){
    return api_clients.patch(`/cart/decrease/${id}`);
}