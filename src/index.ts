import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import router from './routes/messageRoutes';
import './database/config/database'

const app = express();
app.use(express.json());
app.use(cors(" * " as any));

dotenv.config();

app.use("/", router);

const PORT = 6000;

app.listen(PORT, ()=>{
    console.log(`Server is running on ${PORT}`);

});

export default app;