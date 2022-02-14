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
const resize_image_1 = __importDefault(require("./utilities/resize-image"));
const fs_1 = require("fs");
const url_1 = __importDefault(require("url"));
const app = (0, express_1.default)();
const port = 5000;
app.use(express_1.default.static('assets'));
app.use('/images', express_1.default.static('images'));
app.get('/images', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const params = yield JSON.parse('{"' + decodeURI(url_1.default.parse(req.url).query).replace(/&/g, '","').replace(/=/g, '":"') + '"}');
    let filename = params.filename;
    let width = parseInt(params.width);
    let height = parseInt(params.height);
    yield (0, resize_image_1.default)(filename, width, height);
    res.writeHead(301, { 'Content-Type': 'image/jpg' });
    res.end(yield fs_1.promises.readFile(`./assets/thumb/${filename}.jpg`));
}));
app.listen(port, () => {
    console.log('server is running on port 5000');
});
exports.default = app;
