import { IO } from "wonder-fantasy-land/dist/es2015/types/IO";
import curry from "wonder-lodash/curry";
import { Map } from "immutable";
import { ContextConfigOptionsData } from "../renderer/type/dataType";

export var getCanvas = (state: Map<any, any>): HTMLCanvasElement => {
    return state.getIn(["View", "dom"]);
}

export var setCanvas = curry((dom: HTMLCanvasElement, state: Map<any, any>) => {
    return state.setIn(["View", "dom"], dom);
});

export var getX = curry((dom: HTMLCanvasElement) => {
    return Number(dom.style.left.slice(0, -2));
})

export var setX = curry((x: number, dom: HTMLCanvasElement) => {
    return IO.of(() => {
        dom.style.left = `${x}px`;

        return dom;
    });
})

export var getY = curry((dom: HTMLCanvasElement) => {
    return Number(dom.style.top.slice(0, -2));
})

export var setY = curry((y: number, dom: HTMLCanvasElement) => {
    return IO.of(() => {
        dom.style.top = `${y}px`;

        return dom;
    });
})

export var getWidth = curry((dom: HTMLCanvasElement) => {
    return dom.clientWidth;
})

export var setWidth = curry((width: number, dom: HTMLCanvasElement) => {
    return IO.of(() => {
        dom.width = width;

        return dom;
    });
})

export var getHeight = curry((dom: HTMLCanvasElement) => {
    return dom.clientHeight;
})

export var setHeight = curry((height: number, dom: HTMLCanvasElement) => {
    return IO.of(() => {
        dom.height = height;

        return dom;
    });
})

export var getStyleWidth = curry((dom: HTMLCanvasElement) => {
    return dom.style.width;
})

export var setStyleWidth = curry((width: string, dom: HTMLCanvasElement) => {
    return IO.of(() => {
        dom.style.width = width;

        return dom;
    });
})

export var getStyleHeight = curry((dom: HTMLCanvasElement) => {
    return dom.style.height;
})

export var setStyleHeight = curry((height: string, dom: HTMLCanvasElement) => {
    return IO.of(() => {
        dom.style.height = height;

        return dom;
    });
})

export var initCanvas = (dom: HTMLCanvasElement) => {
    return IO.of(() => {
        dom.style.cssText = "position:absolute;left:0;top:0;";

        return dom;
    });
}

export var getWebgl1Context = (options: ContextConfigOptionsData, dom: HTMLCanvasElement) => {
    return getOnlyWebgl1Context(options, dom);
}

export var getWebgl2Context = (options: ContextConfigOptionsData, dom: HTMLCanvasElement) => {
    return getOnlyWebgl2Context(options, dom);
}

export var getOnlyWebgl1Context = (options: ContextConfigOptionsData, dom: HTMLCanvasElement) => {
    return dom.getContext("webgl", options) || dom.getContext("experimental-webgl", options);
}

export var getOnlyWebgl2Context = (options: ContextConfigOptionsData, dom: HTMLCanvasElement) => {
    return dom.getContext("webgl2", options);
}

