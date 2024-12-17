import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import path from 'path';
import fs from 'fs'
import morgan from 'morgan';
import connectDB from './config/db'
import router from './router/router';
dotenv.config();

const app = express();

const corsOptions = {
    origin: '*',
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE'],
    credentials: true,// Allows cookies and credentials to be included   
};
app.use(cors(corsOptions));
app.use(express.json());
connectDB();

const logDir = path.join(__dirname, 'logs');
if (!fs.existsSync(logDir)) {
    fs.mkdirSync(logDir);
}

const logStream = fs.createWriteStream(path.join(logDir, 'access.log'), { flags: 'a' });

app.use(morgan('combined'));
app.use(morgan('combined', { stream: logStream }));


app.get('/',(req,res)=>{
    res.status(200).json('hello from server')
})

app.use('/parse-aadhar', router);

const port = process.env.PORT
app.listen(port, () => {
    console.log(`server is running in port : http://localhost:${port}`)
})