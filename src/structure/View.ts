import {
    getCanvas as getCanvasSystem,
    getHeight,
    getStyleHeight,
    getStyleWidth,
    getWidth,
    setHeight,
    setStyleWidth,
    getX,
    setX,
    getY,
    setY,
    setWidth,
    setCanvas as setCanvasSystem,
    setStyleHeight
} from "./ViewSystem";
import { getState } from "../core/DirectorSystem";
import { DirectorData } from "../core/DirectorData";

export var getCanvas = () => {
    return getCanvasSystem(getState(DirectorData));
}

export var setCanvas = (canvas: HTMLCanvasElement) => {
    setCanvasSystem(canvas, getState(DirectorData));
}

export var getCanvasLeft = (canvas: HTMLCanvasElement) => {
    return getX(canvas);
}

export var setCanvasLeft = (canvas: HTMLCanvasElement, x: number) => {
    setX(x, canvas).run();
}

export var getCanvasTop = (canvas: HTMLCanvasElement) => {
    return getY(canvas);
}

export var setCanvasTop = (canvas: HTMLCanvasElement, y: number) => {
    setY(y, canvas).run();
}

export var getCanvasWidth = (canvas: HTMLCanvasElement) => {
    return getWidth(canvas);
}

export var setCanvasWidth = (canvas: HTMLCanvasElement, width: number) => {
    setWidth(width, canvas).run();
}

export var getCanvasHeight = (canvas: HTMLCanvasElement) => {
    return getHeight(canvas);
}

export var setCanvasHeight = (canvas: HTMLCanvasElement, height: number) => {
    setHeight(height, canvas).run();
}

export var getCanvasStyleWidth = (canvas: HTMLCanvasElement) => {
    return getStyleWidth(canvas);
}

export var setCanvasStyleWidth = (canvas: HTMLCanvasElement, width: number) => {
    setStyleWidth(width, canvas).run();
}

export var getCanvasStyleHeight = (canvas: HTMLCanvasElement) => {
    return getStyleHeight(canvas);
}

export var setCanvasStyleHeight = (canvas: HTMLCanvasElement, height: number) => {
    setStyleHeight(height, canvas).run();
}
