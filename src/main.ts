import './config/env';
import express, { json } from "express";
import cors from "cors";
import { router } from "./routs/index-route";


const app = express();
const PORT = process.env.PORT || 5050;

app.use(json());
app.use(cors());
app.use('/', router);


const start = () => {
  try {
    app.listen(PORT, () => console.log(`Running on port ${PORT}`));
  } catch (error) {
    console.log('Ошибка 500' + error);
    
  }
}

start();
  
