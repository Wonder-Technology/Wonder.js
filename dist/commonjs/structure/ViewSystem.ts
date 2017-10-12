import { IO } from "wonder-fantasy-land/dist/commonjs/types/IO";
import curry from "wonder-lodash/curry";
import { Map } from "immutable";
import { ContextConfigOptionsData } from "../renderer/type/dataType";

export const getCanvas = (state: Map<any, any>): HTMLCanvasElement => {
    return state.getIn(["View", "dom"]);
}

export const setCanvas = curry((dom: HTMLCanvasElement, state: Map<any, any>) => {
    return state.setIn(["View", "dom"], dom);
});

export const getX = curry((dom: HTMLCanvasElement) => {
    return Number(dom.style.left.slice(0, -2));
})

export const setX = curry((x: number, dom: HTMLCanvasElement) => {
    return IO.of(() => {
        dom.style.left = `${x}px`;

        return dom;
    });
})

export const getY = curry((dom: HTMLCanvasElement) => {
    return Number(dom.style.top.slice(0, -2));
})

export const setY = curry((y: number, dom: HTMLCanvasElement) => {
    return IO.of(() => {
        dom.style.top = `${y}px`;

        return dom;
    });
})

export const getWidth = curry((dom: HTMLCanvasElement) => {
    return dom.clientWidth;
})

export const setWidth = curry((width: number, dom: HTMLCanvasElement) => {
    return IO.of(() => {
        dom.width = width;

        return dom;
    });
})

export const getHeight = curry((dom: HTMLCanvasElement) => {
    return dom.clientHeight;
})

export const setHeight = curry((height: number, dom: HTMLCanvasElement) => {
    return IO.of(() => {
        dom.height = height;

        return dom;
    });
})

export const getStyleWidth = curry((dom: HTMLCanvasElement) => {
    return dom.style.width;
})

export const setStyleWidth = curry((width: string, dom: HTMLCanvasElement) => {
    return IO.of(() => {
        dom.style.width = width;

        return dom;
    });
})

export const getStyleHeight = curry((dom: HTMLCanvasElement) => {
    return dom.style.height;
})

export const setStyleHeight = curry((height: string, dom: HTMLCanvasElement) => {
    return IO.of(() => {
        dom.style.height = height;

        return dom;
    });
})

export const initCanvas = (dom: HTMLCanvasElement) => {
    return IO.of(() => {
        dom.style.cssText = "position:absolute;left:0;top:0;";

        return dom;
    });
}

export const getWebgl1Context = (options: ContextConfigOptionsData, dom: HTMLCanvasElement) => {
    return getOnlyWebgl1Context(options, dom);
}

export const getWebgl2Context = (options: ContextConfigOptionsData, dom: HTMLCanvasElement) => {
    return getOnlyWebgl2Context(options, dom);
}

export const getOnlyWebgl1Context = (options: ContextConfigOptionsData, dom: HTMLCanvasElement) => {
    return dom.getContext("webgl", options) || dom.getContext("experimental-webgl", options);
}

export const getOnlyWebgl2Context = (options: ContextConfigOptionsData, dom: HTMLCanvasElement) => {
    return dom.getContext("webgl2", options);
}

