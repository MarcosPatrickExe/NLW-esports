// MODO 'commonjs'
//const express = require('express');

//liberou suporta ao ECMA script modules
import express from 'express';

const app = express();

app.get('/ads', (request : any, response:any )=>{
    
    console.log("Acessou /Ads"); //imprime no servidor
    //  return response.send("Acessou /Ads!!"); // imprime no browser
    
    return response.json([
            {id: 1, name: 'Anuncio 1'},
            {id: 2, name: 'Anuncio 2'},
            {id: 3, name: 'Anuncio 3'},
            {id: 1, name: 'Anuncio 4'},
            {id: 2, name: 'Anuncio 5'},
            {id: 3, name: 'Anuncio 6'}
    ]);

});

app.listen(3333); // NAO DEIXA A APLICACAO PARAR

console.log("Server is running on port 'localhost:3333/ads'....");


// HOPPSCOTCH 
// FERRAMENTA ONLINE QUE FAZ REQUISICOES PARA OUTROS APPS BACKENDS


// LINK DO NOTION:
// https://efficient-sloth-d85.notion.site/NLW-eSports-30d87fcefce04116896ca1a31921401c


// LINK DA AULA:
// https://app.rocketseat.com.br/event/nlw-09/ignite/aula-1


