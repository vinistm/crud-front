import axios from "axios";

const  Api = axios.create({
    baseUrl: "https://projeto-full.herokuapp.com/",
})

export{Api};