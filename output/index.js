"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const cors_1 = __importDefault(require("cors"));
const express_1 = __importDefault(require("express"));
const db_1 = require("./db/db");
const routers_1 = __importDefault(require("./routers"));
const path_1 = __importDefault(require("path"));
const app = (0, express_1.default)();
app.use((0, cors_1.default)());
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: false }));
app.use((0, routers_1.default)());
app.get('*', (req, res) => {
    res.sendFile(path_1.default.join(__dirname + '/views/404.html'));
});
app.listen(3030, () => {
    console.log("server listening on port 3030 http://localhost:3030");
    db_1.connection.connect((err) => {
        if (err) {
            console.error('error connecting: ' + err.stack);
            return;
        }
        console.log('DB connected as id ' + db_1.connection.threadId);
    });
});
