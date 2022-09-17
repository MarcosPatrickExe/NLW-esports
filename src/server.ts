// MODO 'commonjs'
//const express = require('express');

//liberou suporta ao ECMA script modules
import express, {Request, Response} from 'express';
import { PrismaClient } from '@prisma/client'; 
import { Game } from '@prisma/client/index';

const app = express();

const prisma = new PrismaClient({ // objeto intermidiario que faz a ponte entre o database e o codigo
    log: ['query']
});
// O OJETO PASSADO COMO PARAMETRO PARA O CONSTRUTOR DE 'PrismaClient' É OPCIONAL!



//============================================



// BUSCAR ANUNCIOS DE UM UNICO GAME
app.get('/games', 
        async (req : Request, res : Response)=>{

                const games :Game[] = await prisma.game.findMany();
                
                return res.json( games );
        }
);




//============================================

// BUSCAR VARIOS ANUNCIOS
app.post('/ads', 
        (req : Request, res : Response)=>{
   
             return res.status(201).json([]);
        }
);



//============================================
// BUSCAR ANUNCIOS DE UM UNICO GAME


app.get('/games/:id/ads',   
    (req : Request, res : Response )=>{
            const gameId = req.params.id;

            console.log("Acessou /Ads"); //imprime no servidor
            //  return response.send("Acessou /Ads!!"); // imprime no browser
            
            return res.json([
                    {id: 1, name: 'Anuncio 1'},
                    {id: 2, name: 'Anuncio 2'},
                    {id: 3, name: 'Anuncio 3'},
                    {id: 1, name: 'Anuncio 4'},
                    {id: 2, name: 'Anuncio 5'},
                    {id: 3, name: 'Anuncio 6'},
                    {id: 3, name: 'Anuncio 7'}
            ]);
    }
);



//============================================

app.get('/ads/:id/discord', (req : Request, res : Response )=>{
    const adId = req.params.id;
});


//============================================

app.listen(3333); // NAO DEIXA A APLICACAO PARAR

console.log("Server is running on port 'localhost:3333/ads'....");



























// HOPPSCOTCH 
// FERRAMENTA ONLINE QUE FAZ REQUISICOES PARA OUTROS APPS BACKENDS


// LINK DO NOTION:
// https://efficient-sloth-d85.notion.site/NLW-eSports-30d87fcefce04116896ca1a31921401c


// LINK DA AULA:
// https://app.rocketseat.com.br/event/nlw-09/ignite/aula-1