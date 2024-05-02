import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';


const app = express();
app.use(express.json());
app.use(cors(" * " as any));

dotenv.config();

//app.use("/api", allRoutes);

const PORT = 6000;

app.listen(PORT, ()=>{
    console.log(`Server is running on ${PORT}`);

});

export default app;
