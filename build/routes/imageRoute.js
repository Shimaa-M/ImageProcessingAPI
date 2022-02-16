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
const express_1 = __importDefault(require("express"));
const resize_image_1 = __importDefault(require("../utilities/resize-image"));
const fs_1 = require("fs");
const url_1 = __importDefault(require("url"));
const validateInputs_1 = __importDefault(require("../utilities/validateInputs"));
const node_cache_1 = __importDefault(require("node-cache"));
const myCache = new node_cache_1.default({ stdTTL: 100, checkperiod: 120 });
const imageRoute = express_1.default.Router();
imageRoute.get('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const params = yield JSON.parse('{"' +
        decodeURI(url_1.default.parse(req.url).query)
            .replace(/&/g, '","')
            .replace(/=/g, '":"') +
        '"}');
    const notValid = (0, validateInputs_1.default)(params);
   
    if (notValid) {
        return res.status(400).end('Missing input value');
    }
    const parsedParams = {
        filename: params.filename,
        width: parseInt(params.width),
        height: parseInt(params.height)
    };
    if (isNaN(parsedParams.width) || isNaN(parsedParams.height)) {
        return res.status(400).end('Invalid width or height');
    }
    const mykey = parsedParams.filename + parsedParams.width + parsedParams.height;
    const existInCache = myCache.get(mykey);
    if (existInCache == undefined) {
        const done = yield (0, resize_image_1.default)(parsedParams.filename, parsedParams.width, parsedParams.height);
        const Done = done;
        if (Done[0] == 'false') {
            return res.status(400).send(Done[1]);
        }
        return res.writeHead(200, { 'Content-Type': 'image/jpg' })
            .end(yield fs_1.promises.readFile(`./assets/thumb/${parsedParams.filename}.jpg`));
        myCache.set(mykey, `./assets/thumb/${parsedParams.filename}.jpg`);
    }
    else {
        return res.writeHead(200, { 'Content-Type': 'image/jpg' })
            .end(yield fs_1.promises.readFile(existInCache));
    }
}));
exports.default = imageRoute;
