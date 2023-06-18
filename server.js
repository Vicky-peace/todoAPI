import express from 'express';
import config from './db/config.js'
import todoRoutes from './routes/todoRoutes.js';
import bodyParser from 'body-parser';

const app = express();

// middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
//  app.use(bodyParser.json());

todoRoutes(app);




app.get('/', (req, res) => {
 res.send('Hello Wlcome to my Todo Api!');
})  


app.listen(config.port, () => {
    console.log(`Server listening on ${config.url}`)
})