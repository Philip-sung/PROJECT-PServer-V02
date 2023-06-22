import express from "express";
import path from 'path';
import { fileURLToPath } from 'url';


const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const app = express();

app.set('port', 80)
app.use(express.static(path.join(__dirname, '../front/build')));

app.listen(app.get('port'), () => {
    console.log(`Server running on http://localhost:${app.get('port')}`);
})

app.get('/', (req,res) => {
    res.send(express.static(path.join(__dirname, '../../front/build/index.html')));
})