// MODO 'commonjs'
//const express = require('express');

//liberou suporta ao ECMA script modules
import express, { Request, Response} from 'express';
import { PrismaClient } from '@prisma/client'; 
import { Game, Ad, Prisma } from '@prisma/client/index';
import { convertHourStringToMinutes } from './utils/convert-hour-string-to-minutes';
import { convertMinutesToHours } from '../src/utils/convert-minutes-to-hours-string';

const app = express();
app.use( express.json());// CONFIGURANDO EXPRESS PARA RECEBER REQUISICOES COM O BODY DO TIPO 'JSON'


const prisma = new PrismaClient({ // objeto intermidiario que faz a ponte entre o database e o codigo
    log: ['query']
});
// O OJETO PASSADO COMO PARAMETRO PARA O CONSTRUTOR DE 'PrismaClient' É OPCIONAL!

type RequestBody = {
        id: string;
        nickName: string;
        yearsPlaying: number;
        discord: string;
        weekDays: number[];
        hourStart: string;
        hourEnd: string;
        useVoiceChannel: boolean;
        createdAt: Date;
        gameId: string;
} 


//=======================================================


// TODOS OS GAMES, CADA UM COM SEU NUMERO DE ANUNCIOS
app.get('/games', 
        async (req : Request, res : Response)=>{

                const games :Game[] = await prisma.game.findMany({
                        include: { // INCLUI NO OJETO DE 'GAME' O ATRIBUTO '_count' QUE SE REFERE A QUANTIDADE DE ANUNCIOS DO GAME
                             _count :{
                                 select: {
                                     ads: true
                                 }     
                             }
                        }
                });
                

                /*
                const gamesAds = games.map( (game)=>{
                        let anuncios = await prisma.ad.find
                });
                */

                return res.json( games );
        }
);



//========================================================

// CRIAR ANUNCIO A PARTIR DE UM GAME 'ID'
app.post('/games/:gameId/ads', 
        async (req : Request, res : Response)=>{
                
             const gameId :string = req.params.gameId;
             const body :RequestBody = req.body;

             // SUGESTAO DE BIBLIOTECA DE VALIDACAO: '.ZOD'

             const recordCreated = await prisma.ad.create({
                data: {
                     gameId: gameId,
                     nickName: body.nickName,
                     yearsPlaying: body.yearsPlaying,
                     discord: body.discord,
                     weekDays: body.weekDays.toString(),
                     hourStart: convertHourStringToMinutes( body.hourStart ),
                     hourEnd: convertHourStringToMinutes( body.hourEnd ),
                     useVoiceChannel: body.useVoiceChannel
                }
             });

             console.log("Anúncio criado com sucesso!!");

             return res.status(201).json(recordCreated);
        }
);



//==========================================================
// BUSCAR ANUNCIOS DE UM UNICO GAME


app.get('/games/:id/ads', 
        async (req : Request, res : Response )=>{
           
            let gameId :string = req.params.id;

            let getAdsByGameId :any[] = await prisma.ad.findMany({
                select:{
                    nickName: true,
                    yearsPlaying: true,
                    weekDays: true,
                    hourStart: true,
                    hourEnd: true,
                    useVoiceChannel: true,
                    createdAt: true
                },
                where: {
                     gameId: gameId
                },
                orderBy: {
                     createdAt: 'desc'
                }
            });


            console.log("/Ads list have been done!"); //imprime no servidor
            //  return response.send("Acessou /Ads!!"); // imprime no browser
             
            return res.json(
                getAdsByGameId.map( (advertisement: Ad )=>{
                        
                      return {
                          ...advertisement,
                          weekDays: advertisement.weekDays.split(','),// CONVERTE 'weekDays' PARA VETOR DO TIPO String[]
                          hourStart: convertMinutesToHours( advertisement.hourStart ),
                          hourEnd: convertMinutesToHours( advertisement.hourEnd )
                      }
                }) 
            );

            
            /*
             return res.json([
                    {id: 1, name: 'Anuncio 1'},
                    {id: 2, name: 'Anuncio 2'},
                    {id: 3, name: 'Anuncio 3'},
                    {id: 1, name: 'Anuncio 4'},
                    {id: 2, name: 'Anuncio 5'},
                    {id: 3, name: 'Anuncio 6'},
                    {id: 3, name: 'Anuncio 7'}
             ]);
            */
    }
);



//============================================

app.get('/ads/:id/discord', 
        async (req : Request, res : Response )=>{

                const adId = req.params.id;

                const ad :{discord: string} = await prisma.ad.findUniqueOrThrow({
                       
                     select: { discord: true},
                     where: { id: adId }
                })

                return res.json({
                     discord: ad.discord
                });


                /*
                        const getAdById: {discord: string}[] = await prisma.ad.findMany({
                                select: {
                                discord :true
                                },
                                where: {
                                id: adId
                                }
                        });

                        return getAdById[0].discord;
                */
        }
);


//============================================

app.listen(3333); // NAO DEIXA A APLICACAO PARAR

console.log("Server is running on port 'localhost:3333/ads'....");



























// HOPPSCOTCH 
// FERRAMENTA ONLINE QUE FAZ REQUISICOES PARA OUTROS APPS BACKENDS


// LINK DO NOTION:
// https://efficient-sloth-d85.notion.site/NLW-eSports-30d87fcefce04116896ca1a31921401c


// LINK DA AULA:
// https://app.rocketseat.com.br/event/nlw-09/ignite/aula-1