import express, { Application, Request, Response } from 'express'
import router from './routes';
import bodyParser from 'body-parser';
import fileupload from 'express-fileupload' 

const cors = require('cors');

const app: Application = express()
const port = 3000

app.use(fileupload({createParentPath: true}));

app.use(cors({
    origin: '*'
}));

// Body parsing Middleware

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.get('/', async(req: Request, res: Response): Promise<Response> => {
    return res.status(200).send({ message: `Welcome to the file-upload API! \n Endpoints available at http://localhost:${port}/api` })
})

app.use('/api', router)

try {
    app.listen(port, () => {
        console.log(`Server running on http://localhost:${port}`)
    })
} catch (error) {
    console.log(`Error occurred: ${error}`)
}