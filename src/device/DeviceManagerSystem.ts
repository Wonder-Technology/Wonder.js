import { ContextConfigData, getScreenSize } from "../core/MainSystem";
import { DomQuery } from "wonder-commonlib/dist/es2015/utils/DomQuery";
import { ensureFunc, it, requireCheckFunc } from "../definition/typescript/decorator/contract";
import {
    getContext, initCanvas, setX, setY, setStyleWidth, setStyleHeight,
    setWidth, setHeight
} from "../structure/ViewSystem";
import { IO } from "wonder-fantasy-land/dist/es2015/types/IO";
import curry from "wonder-lodash/curry";
import { expect } from "wonder-expect.js";
import { MainData } from "../core/MainData";
import { EScreenSize } from "./EScreenSize";
import { root } from "../definition/Variable";
import flow from "wonder-lodash/flow";
import { RectRegion } from "../structure/RectRegion";
import { chain } from "../utils/functionalUtils";
import { DeviceManagerData } from "./DeviceManagerData";

export var getGL = (DeviceManagerData: any) => {
    return DeviceManagerData.gl;
}

export var setGL = (DeviceManagerData: any, gl: WebGLRenderingContext) => {
    return IO.of(() => {
        DeviceManagerData.gl = gl;
    });
}

export var setContextConfig = (DeviceManagerData: any, contextConfig: ContextConfigData) => {
    return IO.of(() => {
        DeviceManagerData.contextConfig = contextConfig;
    });
}

export var setPixelRatio = (DeviceManagerData: any, pixelRatio: number) => {
    return IO.of(() => {
        DeviceManagerData.pixelRatio = pixelRatio;
    });
}

export var getViewport = (DeviceManagerData: any) => {
    return DeviceManagerData.viewport;
}

export var setViewport = (DeviceManagerData: any, x: number, y: number, width: number, height: number) => {
    return IO.of(() => {
        DeviceManagerData.viewport = RectRegion.create(x, y, width, height);
    });
}

var _getCanvas = (DomQuery: any, canvasId: string) => {
    if (canvasId !== "") {
        return DomQuery.create(_getCanvasId(canvasId)).get(0);
    }

    return DomQuery.create("<canvas></canvas>").prependTo("body").get(0);
}

var _getCanvasId = ensureFunc((id: string) => {
    it("canvas id should be #string", () => {
        expect(/#[^#]+/.test(id)).true;
    });
}, (canvasId: string) => {
    if (canvasId.indexOf('#') > -1) {
        return canvasId;
    }

    return `#${canvasId}`;
});

export var setPixelRatioAndCanvas = curry((useDevicePixelRatio:boolean, canvas: HTMLCanvasElement) => {
    return IO.of(() => {
        if(useDevicePixelRatio){
            let pixelRatio = root.devicePixelRatio;

            setPixelRatio(DeviceManagerData, pixelRatio).run();

            canvas.width = Math.round(canvas.width * pixelRatio);
            canvas.height = Math.round(canvas.height * pixelRatio);
        }

        return canvas;
    });
})

export var createGL = (canvasId: string, config: ContextConfigData) => {
    return IO.of(() => {
        var canvas = _getCanvas(DomQuery, canvasId),
            gl = null;

        gl = getContext(config, canvas);

        setGL(DeviceManagerData, gl).run();
        setContextConfig(DeviceManagerData, config).run();

        if (!gl) {
            DomQuery.create("<p class='not-support-webgl'></p>").prependTo("body").text("Your device doesn't support WebGL");
        }

        return canvas;
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
export var setViewportOfGL = (x: number, y: number, width: number, height: number) => {
    return IO.of(() => {
        var viewport = getViewport(DeviceManagerData);

        if (viewport.x === x && viewport.y === y && viewport.width === width && viewport.height === height) {
            return;
        }

        setViewport(DeviceManagerData, x, y, width, height).run();

        getGL(DeviceManagerData).viewport(x, y, width, height);
    });
}


var _getScreenSize = () => {
    return IO.of(() => {
        return getScreenSize(MainData);
    });
}

var _setBodyByScreenSize = () => {
    return IO.of((screenSize: EScreenSize) => {
        if (screenSize === EScreenSize.FULL) {
            DomQuery.create("body").css("margin", "0");
        }

        return screenSize;
    });
}

var _getScreenData = (screenSize: EScreenSize | RectRegion) => {
    var x = null,
        y = null,
        width = null,
        height = null,
        styleWidth = null,
        styleHeight = null;

    if (screenSize === EScreenSize.FULL) {
        x = 0;
        y = 0;
        width = root.innerWidth;
        height = root.innerHeight;
        styleWidth = "100%";
        styleHeight = "100%";
    }
    else {
        x = (screenSize as RectRegion).x || 0;
        y = (screenSize as RectRegion).y || 0;
        width = (screenSize as RectRegion).width || root.innerWidth;
        height = (screenSize as RectRegion).height || root.innerHeight;
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
}

var _setScreenData = curry((canvas: HTMLCanvasElement, {
    x,
    y,
    width,
    height,
    styleWidth,
    styleHeight
}) => {
    return flow(setX(x, canvas), chain(setY(y, canvas)), chain(setWidth(width, canvas)), chain(setHeight(height, canvas)), chain(setStyleWidth(styleWidth, canvas)), chain(setStyleHeight(styleHeight)), chain(setViewportOfGL(0, 0, width, height)));
})

flow(initCanvas, chain(_getScreenSize), chain(_setBodyByScreenSize), chain(_getScreenData), chain(_setScreenData));

export var setScreen = requireCheckFunc((canvas: HTMLCanvasElement) => {
    it("should exist MainData.screenSize", () => {
        expect(getScreenSize(MainData)).exist;
    });
}, flow(initCanvas, chain(_getScreenSize), chain(_setBodyByScreenSize), chain(_getScreenData), chain(_setScreenData)));
