"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const typeorm_1 = require("typeorm");
const express = require("express");
//imports
const cors = require("cors");
const helmet_1 = require("helmet");
const index_1 = require("./routes/index");
const PORT = process.env.PORT || 8030;
(0, typeorm_1.createConnection)().then(async () => {
    // create express app
    const app = express();
    app.use(cors({
        origin: '*'
    }));
    app.use((0, helmet_1.default)());
    app.use(express.json());
    //RUTAS
    app.use('/', index_1.default);
    app.listen(PORT, () => console.log(`SERVER APP RUNNING ON PORT ${PORT}`));
}).catch(error => console.log(error));
//# sourceMappingURL=index.js.map