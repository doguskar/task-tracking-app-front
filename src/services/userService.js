import axios from "axios"

const baseUrl = "https://task-tracking-application.herokuapp.com"

export default class ProductService{
     getAdminUser(){
         return axios.get(`${baseUrl}/api/v1/users/admin`);
     }
}