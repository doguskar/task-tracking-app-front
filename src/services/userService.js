import axios from "axios"

export default class ProductService{
     getAdminUser(){
         return axios.get("http://localhost:8080/api/v1/users/admin");
     }
}