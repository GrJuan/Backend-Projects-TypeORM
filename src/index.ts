import { createConnection } from 'typeorm';
import * as express from "express";
//imports
import * as cors from 'cors';
import helmet from "helmet";
import routes from "./routes/index";

import { User } from './entity/user/User';

const PORT = process.env.PORT || 8030

createConnection().then(async () => {

    // create express app
    const app = express();

    app.use(cors({
    origin: '*'
    }));
    app.use(helmet());
    app.use(express.json());

    //RUTAS
    app.use('/', routes);


    app.listen(PORT, () => console.log(`SERVER APP RUNNING ON PORT ${PORT}`));
        
    
}).catch(error => console.log(error));
