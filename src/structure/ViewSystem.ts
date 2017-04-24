import { ContextConfigData } from "../core/MainSystem";
import { IO } from "wonder-fantasy-land/dist/es2015/types/IO";
import curry from "wonder-lodash/curry";
import { ViewData } from "./ViewData";

export var getCanvas = (ViewData: any) => {
    return ViewData.dom;
}

export var setCanvas = (dom: HTMLCanvasElement) => {
    return IO.of(() => {
        ViewData.dom = dom;
    });
};

export var getX = curry((dom: HTMLCanvasElement) => {
    return Number(dom.style.left.slice(0, -2));
})

export var setX = curry((x: number, dom: HTMLCanvasElement) => {
    return IO.of(() => {
        dom.style.left = `${x}px`;
    });
})

export var getY = curry((dom: HTMLCanvasElement) => {
    return Number(dom.style.top.slice(0, -2));
})

export var setY = curry((y: number, dom: HTMLCanvasElement) => {
    return IO.of(() => {
        dom.style.top = `${y}px`;
    });
})

export var getWidth = curry((dom: HTMLCanvasElement) => {
    return dom.clientWidth;
})

export var setWidth = curry((width: number, dom: HTMLCanvasElement) => {
    return IO.of(() => {
        dom.width = width;
    });
})

export var getHeight = curry((dom: HTMLCanvasElement) => {
    return dom.clientHeight;
})

export var setHeight = curry((height: number, dom: HTMLCanvasElement) => {
    return IO.of(() => {
        dom.height = height;
    });
})

export var getStyleWidth = curry((dom: HTMLCanvasElement) => {
    return dom.style.width;
})

export var setStyleWidth = curry((width: string, dom: HTMLCanvasElement) => {
    return IO.of(() => {
        dom.style.width = width;
    });
})

export var getStyleHeight = curry((dom: HTMLCanvasElement) => {
    return dom.style.height;
})

export var setStyleHeight = curry((height: string, dom: HTMLCanvasElement) => {
    return IO.of(() => {
        dom.style.height = height;
    });
})

export var initCanvas = (dom: HTMLCanvasElement) => {
    return IO.of(() => {
        dom.style.cssText = "position:absolute;left:0;top:0;";

        return dom;
    });
}

export var getContext = (contextConfig: ContextConfigData, dom: HTMLCanvasElement): WebGLRenderingContext => {
    return (dom.getContext("webgl", contextConfig.options) || dom.getContext("experimental-webgl", contextConfig.options)) as WebGLRenderingContext;
}
