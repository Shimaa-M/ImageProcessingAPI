"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const validateParams = (params) => {
    const isEmpty = Object.values(params).includes('');
    return isEmpty;
};
exports.default = validateParams;
