import express from "express"
import cors from 'cors';
import { CriminosoController } from "./controllers/criminoso.controller";
import { CrimeController } from "./controllers/crime.controller";
import { ArmaController } from "./controllers/arma.controller";

const criminosoController = new CriminosoController()
const crimeController = new CrimeController()
const armaController = new ArmaController()

const app = express();

app.use(express.json());
app.use(cors());

app.get('/criminosos', criminosoController.index)

app.get('/criminosos/:id', criminosoController.show) 

app.post('/criminosos', criminosoController.store)

app.put('/criminosos/:id', criminosoController.update) 

app.delete('/criminosos/:id', criminosoController.delete) 


app.get('/crimes', crimeController.index)

app.get('/crimes/:id', crimeController.show) 

app.post('/crimes', crimeController.store)

app.put('/crimes/:id', crimeController.update) 

app.delete('/crimes/:id', crimeController.delete) 


app.get('/armas', armaController.index)

app.get('/armas/:id', armaController.show) 

app.post('/armas', armaController.store)

app.put('/armas/:id', armaController.update) 

app.delete('/armas/:id', armaController.delete) 








app.listen(3000, () => {
    console.log("🚀 Server ready at: http://localhost:3000");
});