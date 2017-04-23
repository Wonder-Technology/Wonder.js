import { ContextConfigData } from "../core/MainSystem";
import { IO } from "wonder-fantasy-land/dist/es2015/types/IO";
import curry from "wonder-lodash/curry";


export var setX = curry((x:number, dom:HTMLCanvasElement) => {
    return IO.of(() => {
        dom.style.left = `${x}px`;
    });
})

export var setY = curry((y:number, dom:HTMLCanvasElement) => {
    return IO.of(() => {
        dom.style.top = `${y}px`;
    });
})

export var setWidth = curry((width: number, dom:HTMLCanvasElement) => {
    return IO.of(() => {
        dom.width = width;
    });
})

export var setHeight = curry((height: number, dom:HTMLCanvasElement) => {
    return IO.of(() => {
        dom.height = height;
    });
})

export var setStyleWidth = curry((width: string, dom:HTMLCanvasElement) => {
    return IO.of(() => {
        dom.style.width = width;
    });
})

export var setStyleHeight = curry((height: string, dom:HTMLCanvasElement) => {
    return IO.of(() => {
        dom.style.height = height;
    });
})

export var initCanvas = (dom:HTMLCanvasElement) => {
    return IO.of(() => {
        dom.style.cssText = "position:absolute;left:0;top:0;";
    });
}

export var getContext = (contextConfig: ContextConfigData, dom:HTMLCanvasElement): WebGLRenderingContext => {
    return (dom.getContext("webgl", contextConfig.options)  || dom.getContext("experimental-webgl", contextConfig.options)) as WebGLRenderingContext;
}

export interface IView {
    offset: { x: number, y: number };
    x: number;
    y: number;
    width: number;
    height: number;
    styleWidth: string;
    styleHeight: string;
    dom: any;
    getContext(contextConfig: ContextConfigData): WebGLRenderingContext;
    initCanvas(): void;
}
