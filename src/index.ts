import express from 'express';
import cors from 'cors';
import router from './routes/allroutes';
import './database/config/database'
import swaggerSetup from '../swaggerConfig';

const app = express();
app.use(express.json());
app.use(cors(" * " as any));


app.get("/", (rep: express.Request, res: express.Response) => {
  res.status(200).json({
    message: "Welcome to my Brand",
  });
});

app.use("/api", router);

swaggerSetup(app);


const PORT = 6000;

app.listen(PORT, ()=>{
    console.log(`Server is running on ${PORT}`);

});

export default app;
