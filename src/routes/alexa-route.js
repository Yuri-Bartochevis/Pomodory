const express = require('express');
const verifier = require('alexa-verifier-middleware');

const bodyParser = require('body-parser');

const alexa = require('../alexa');

var alexaRouter = express.Router();

alexaRouter.get("/health",(req,res) =>{return res.status(200).send(true)});
alexaRouter.use(verifier);
alexaRouter.use(bodyParser.json());
alexaRouter.post("/pomodory",alexa);



module.exports = alexaRouter;