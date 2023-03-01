import { Configuration, OpenAIApi } from "openai";
import express from "express";
import bodyParser from 'body-parser'
import cors from 'cors'
import {writeFileSync} from 'fs'
import {Buffer} from 'node:buffer'
import dotenv from 'dotenv'


dotenv.config()
const configuration = new Configuration({
    organization: "org-2MeW6euLm1W1VtTYUxGCatyB",
    apiKey: process.env.OPENAI_API_KEY,
});

const openai = new OpenAIApi(configuration);

// const response = await openai.listEngines();

 
const app = express()
app.use(bodyParser.json())
app.use(cors())

const port = 3080

app.post("/", async (req, res) => {
    const { message, isStart, adventureSetting } = req.body

    if (isStart){
        // get img and save to disk
        const result = await openai.createImage({
            "prompt": adventureSetting,
            "n": 1,
            "size": "512x512"
        })
        const url = result.data.data[0].url
        const imgResult = await fetch(url)
        const blob = await imgResult.blob()
        const buffer = Buffer.from(await blob.arrayBuffer())
        writeFileSync(`./client/src/components/imgs/currentBackground.png`, buffer)

        
    }

    const response = await openai.createCompletion(
        {
            "model": "text-davinci-003",
            "prompt": message,
            "max_tokens": 1000, 
            "temperature": 0.6,
        }  
    );
    res.json({
        message: response.data.choices[0].text
    })
})

app.listen(port, () => {
    console.log(`Server is running on port ${port}`)
})

