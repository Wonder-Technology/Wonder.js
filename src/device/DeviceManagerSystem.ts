import { ContextConfigData, getScreenSize } from "../core/MainSystem";
import { DomQuery } from "wonder-commonlib/dist/es2015/utils/DomQuery";
import { ensureFunc, it, requireCheckFunc } from "../definition/typescript/decorator/contract";
import {
    getContext, initCanvas, setX, setY, setStyleWidth, setStyleHeight,
    setWidth, setHeight, setCanvas, getCanvas
} from "../structure/ViewSystem";
import { IO } from "wonder-fantasy-land/dist/es2015/types/IO";
import curry from "wonder-lodash/curry";
import { expect } from "wonder-expect.js";
import { EScreenSize } from "./EScreenSize";
import { RectRegion } from "../structure/RectRegion";
import { chain, compose } from "../utils/functionalUtils";
import { DirectorData } from "../core/DirectorData";
import { getRootProperty } from "../utils/rootUtils";
import { Map } from "immutable";
import { trace } from "../utils/debugUtils";
import { isValueExist } from "../utils/stateUtils";

export var getGL = (state: Map<any, any>): WebGLRenderingContext => {
    return state.getIn(["DeviceManager", "gl"]);
}

export var setGL = curry((gl: WebGLRenderingContext, state: Map<any, any>) => {

    return state.setIn(["DeviceManager", "gl"], gl);
})

export var setContextConfig = curry((contextConfig: Map<string, any>, state: Map<any, any>) => {
    return state.setIn(["DeviceManager", "contextConfig"], contextConfig);
})

export var setPixelRatio = (pixelRatio: number, state: Map<any, any>) => {
    return state.setIn(["DeviceManager", "pixelRatio"], pixelRatio);
}

export var getViewport = (state: Map<any, any>) => {
    return state.getIn(["DeviceManager", "viewport"]);
}

export var setViewport = (x: number, y: number, width: number, height: number, state: Map<any, any>) => {
    return state.setIn(["DeviceManager", "viewport"], RectRegion.create(x, y, width, height));
}

var _getCanvas = (DomQuery: any, domId: string) => {
    if (domId !== "") {
        return DomQuery.create(_getCanvasId(domId)).get(0);
    }

    return DomQuery.create("<dom></dom>").prependTo("body").get(0);
}

var _getCanvasId = ensureFunc((id: string) => {
    it("dom id should be #string", () => {
        expect(/#[^#]+/.test(id)).true;
    });
}, (domId: string) => {
    if (domId.indexOf('#') > -1) {
        return domId;
    }

    return `#${domId}`;
});

export var setPixelRatioAndCanvas = curry((useDevicePixelRatio: boolean, state: Map<any, any>) => {
    return IO.of(() => {
        if (!useDevicePixelRatio) {
            return state;
        }

        let pixelRatio: number = getRootProperty("devicePixelRatio").run(),
            dom = getCanvas(state);

        dom.width = Math.round(dom.width * pixelRatio);
        dom.height = Math.round(dom.height * pixelRatio);

        return setPixelRatio(pixelRatio, state);
    });
})

export var createGL = (canvasId: string, contextConfig: Map<string, any>, state: Map<any, any>) => {
    return IO.of(() => {
        var dom = _getCanvas(DomQuery, canvasId),
            gl = getContext(contextConfig, dom);

        if (!gl) {
            DomQuery.create("<p class='not-support-webgl'></p>").prependTo("body").text("Your device doesn't support WebGL");
        }
        return compose(setCanvas(dom), setContextConfig(contextConfig), setGL(gl))(state);
    });
}

/**
 * @function
 * @name setViewport
 * @description Set the active rectangle for rendering on the specified device.
 * @param {Number} x The pixel space x-coordinate of the bottom left corner of the viewport.
 * @param {Number} y The pixel space y-coordinate of the bottom left corner of the viewport.
 * @param {Number} w The width of the viewport in pixels.
 * @param {Number} h The height of the viewport in pixels.
 */
export var setViewportOfGL = curry((x: number, y: number, width: number, height: number, state: Map<any, any>) => {
    return IO.of(() => {
        var gl = getGL(state),
            viewport = getViewport(state);

        if (isValueExist(viewport) && viewport.x === x && viewport.y === y && viewport.width === width && viewport.height === height) {
            return state;
        }

        gl.viewport(x, y, width, height);

        return setViewport(x, y, width, height, state);
    });
})

var _setBodyByScreenSize = (screenSize: EScreenSize) => {
    return IO.of(() => {
        if (screenSize === EScreenSize.FULL) {
            DomQuery.create("body").css("margin", "0");
        }

        return screenSize;
    });
}

var _getScreenData = (screenSize: EScreenSize | RectRegion) => {
    return IO.of(() => {
        var x = null,
            y = null,
            width = null,
            height = null,
            styleWidth = null,
            styleHeight = null;

        if (screenSize === EScreenSize.FULL) {
            x = 0;
            y = 0;
            width = getRootProperty("innerWidth").run();
            height = getRootProperty("innerHeight").run();
            styleWidth = "100%";
            styleHeight = "100%";
        }
        else {
            x = (screenSize as RectRegion).x || 0;
            y = (screenSize as RectRegion).y || 0;
            width = (screenSize as RectRegion).width || getRootProperty("innerWidth").run();
            height = (screenSize as RectRegion).height || getRootProperty("innerHeight").run();
            styleWidth = `${width}px`;
            styleHeight = `${height}px`;
        }

        return {
            x: x,
            y: y,
            width: width,
            height: height,
            styleWidth: styleWidth,
            styleHeight: styleHeight
        };
    });
}

var _setScreenData = curry((state: Map<any, any>, {
    x,
    y,
    width,
    height,
    styleWidth,
    styleHeight
}) => {
    return IO.of(() => {
        compose(chain(setStyleWidth(styleWidth)), chain(setStyleHeight(styleHeight)), chain(setHeight(height)), chain(setWidth(width)), chain(setY(y)), setX(x))(getCanvas(state)).run();

        return setViewportOfGL(0, 0, width, height, state).run();
    });
})

export var setScreen = (state: Map<any, any>) => {
    return IO.of(requireCheckFunc((state: Map<any, any>) => {
        it("should exist MainData.screenSize", () => {
            expect(getScreenSize(DirectorData.state)).exist;
        });
    }, () => {
        var dom: HTMLCanvasElement = getCanvas(state);

        initCanvas(dom).run();

        return compose(chain(_setScreenData(state)), chain(_getScreenData), _setBodyByScreenSize)(getScreenSize(state)).run()
    }));
};

