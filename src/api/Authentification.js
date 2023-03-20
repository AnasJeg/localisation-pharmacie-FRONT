import React from "react";
import axios from 'axios';

export const login=(authRequest)=>{
    return axios({
        'method':'POST',
        'url':`${process.env.hostUrl||'http://localhost:8080'}/auth/login`,
        'data':authRequest
        })
}