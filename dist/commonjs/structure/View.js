"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var ViewSystem_1 = require("./ViewSystem");
var DirectorSystem_1 = require("../core/DirectorSystem");
var DirectorData_1 = require("../core/DirectorData");
exports.getCanvas = function () {
    return ViewSystem_1.getCanvas(DirectorSystem_1.getState(DirectorData_1.DirectorData));
};
exports.setCanvas = function (canvas) {
    ViewSystem_1.setCanvas(canvas, DirectorSystem_1.getState(DirectorData_1.DirectorData));
};
exports.getCanvasLeft = function (canvas) {
    return ViewSystem_1.getX(canvas);
};
exports.setCanvasLeft = function (canvas, x) {
    ViewSystem_1.setX(x, canvas).run();
};
exports.getCanvasTop = function (canvas) {
    return ViewSystem_1.getY(canvas);
};
exports.setCanvasTop = function (canvas, y) {
    ViewSystem_1.setY(y, canvas).run();
};
exports.getCanvasWidth = function (canvas) {
    return ViewSystem_1.getWidth(canvas);
};
exports.setCanvasWidth = function (canvas, width) {
    ViewSystem_1.setWidth(width, canvas).run();
};
exports.getCanvasHeight = function (canvas) {
    return ViewSystem_1.getHeight(canvas);
};
exports.setCanvasHeight = function (canvas, height) {
    ViewSystem_1.setHeight(height, canvas).run();
};
exports.getCanvasStyleWidth = function (canvas) {
    return ViewSystem_1.getStyleWidth(canvas);
};
exports.setCanvasStyleWidth = function (canvas, width) {
    ViewSystem_1.setStyleWidth(width, canvas).run();
};
exports.getCanvasStyleHeight = function (canvas) {
    return ViewSystem_1.getStyleHeight(canvas);
};
exports.setCanvasStyleHeight = function (canvas, height) {
    ViewSystem_1.setStyleHeight(height, canvas).run();
};
//# sourceMappingURL=View.js.map