"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const cors_1 = __importDefault(require("cors"));
const express_1 = __importDefault(require("express"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const routers_1 = __importDefault(require("./routers"));
const path_1 = __importDefault(require("path"));
const swagger_ui_express_1 = __importDefault(require("swagger-ui-express"));
const swagger_json_1 = __importDefault(require("../swagger.json"));
const app = (0, express_1.default)();
app.use((0, cors_1.default)({
    credentials: true,
    origin: ["http://127.0.0.1:5173"],
    optionsSuccessStatus: 200,
}));
app.use((0, cookie_parser_1.default)());
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: false }));
app.use((0, routers_1.default)());
app.use('/api-docs', swagger_ui_express_1.default.serve);
app.get('/api-docs', swagger_ui_express_1.default.setup(swagger_json_1.default));
app.get("*", (req, res) => {
    res.sendFile(path_1.default.join(__dirname + "/views/404.html"));
});
app.listen(3030, () => __awaiter(void 0, void 0, void 0, function* () {
    console.log("server listening on port 3030 http://localhost:3030");
    // await prisma.$disconnect()
}));
