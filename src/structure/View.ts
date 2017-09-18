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

export const getCanvas = () => {
    return getCanvasSystem(getState(DirectorData));
}

export const setCanvas = (canvas: HTMLCanvasElement) => {
    setCanvasSystem(canvas, getState(DirectorData));
}

export const getCanvasLeft = (canvas: HTMLCanvasElement) => {
    return getX(canvas);
}

export const setCanvasLeft = (canvas: HTMLCanvasElement, x: number) => {
    setX(x, canvas).run();
}

export const getCanvasTop = (canvas: HTMLCanvasElement) => {
    return getY(canvas);
}

export const setCanvasTop = (canvas: HTMLCanvasElement, y: number) => {
    setY(y, canvas).run();
}

export const getCanvasWidth = (canvas: HTMLCanvasElement) => {
    return getWidth(canvas);
}

export const setCanvasWidth = (canvas: HTMLCanvasElement, width: number) => {
    setWidth(width, canvas).run();
}

export const getCanvasHeight = (canvas: HTMLCanvasElement) => {
    return getHeight(canvas);
}

export const setCanvasHeight = (canvas: HTMLCanvasElement, height: number) => {
    setHeight(height, canvas).run();
}

export const getCanvasStyleWidth = (canvas: HTMLCanvasElement) => {
    return getStyleWidth(canvas);
}

export const setCanvasStyleWidth = (canvas: HTMLCanvasElement, width: number) => {
    setStyleWidth(width, canvas).run();
}

export const getCanvasStyleHeight = (canvas: HTMLCanvasElement) => {
    return getStyleHeight(canvas);
}

export const setCanvasStyleHeight = (canvas: HTMLCanvasElement, height: number) => {
    setStyleHeight(height, canvas).run();
}
