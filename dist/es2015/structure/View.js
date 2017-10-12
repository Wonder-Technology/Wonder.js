import { getCanvas as getCanvasSystem, getHeight, getStyleHeight, getStyleWidth, getWidth, setHeight, setStyleWidth, getX, setX, getY, setY, setWidth, setCanvas as setCanvasSystem, setStyleHeight } from "./ViewSystem";
import { getState } from "../core/DirectorSystem";
import { DirectorData } from "../core/DirectorData";
export var getCanvas = function () {
    return getCanvasSystem(getState(DirectorData));
};
export var setCanvas = function (canvas) {
    setCanvasSystem(canvas, getState(DirectorData));
};
export var getCanvasLeft = function (canvas) {
    return getX(canvas);
};
export var setCanvasLeft = function (canvas, x) {
    setX(x, canvas).run();
};
export var getCanvasTop = function (canvas) {
    return getY(canvas);
};
export var setCanvasTop = function (canvas, y) {
    setY(y, canvas).run();
};
export var getCanvasWidth = function (canvas) {
    return getWidth(canvas);
};
export var setCanvasWidth = function (canvas, width) {
    setWidth(width, canvas).run();
};
export var getCanvasHeight = function (canvas) {
    return getHeight(canvas);
};
export var setCanvasHeight = function (canvas, height) {
    setHeight(height, canvas).run();
};
export var getCanvasStyleWidth = function (canvas) {
    return getStyleWidth(canvas);
};
export var setCanvasStyleWidth = function (canvas, width) {
    setStyleWidth(width, canvas).run();
};
export var getCanvasStyleHeight = function (canvas) {
    return getStyleHeight(canvas);
};
export var setCanvasStyleHeight = function (canvas, height) {
    setStyleHeight(height, canvas).run();
};
//# sourceMappingURL=View.js.map