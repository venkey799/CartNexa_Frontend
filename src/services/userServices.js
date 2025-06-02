import { jwtDecode } from "jwt-decode";
import apiClient from "../utils/api_clients";
export async function signup(user,profile) {
    const body = new FormData();
    body.append("name", user.name);
    body.append("email", user.email);
    body.append("password",user.password);
    body.append("deliveryAddress", user.deliveryAddress);
    if(profile){
        body.append("profilePic",profile);
    }
    const { data } = await apiClient.post("/user/signup",body);
}

function parseJwt(token){
  try{
    const base64Url = token.split('.')[1];
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    const jsonPayload = decodeURIComponent(
      atob(base64)
      .split('')
      .map((c)=> '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2))
      .join('')
    );
    return JSON.parse(jsonPayload);
  }
  catch (e){
    return {};
  }
}

export async function login(user){
    const response = await apiClient.post("/user/login", user)
    const data = response.data;
    const decoded = parseJwt(data.token);
            const userData = {
              ...decoded,
              token: data.token,
            };
localStorage.setItem("user", JSON.stringify(userData));
console.log(userData)
return userData;
}

export function logout(){
    localStorage.removeItem("token");
     localStorage.removeItem("user");
}

export function getUser(){
  try{
    const jwt =  localStorage.getItem("token");
  const jwtuser = jwtDecode(jwt);
  }
  catch(error){
    return null
  }
}

export function getjwt(){
  const token = localStorage.getItem("token");
  
}


