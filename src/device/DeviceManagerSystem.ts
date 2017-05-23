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
import { Color } from "../structure/Color";

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


export var clear = (gl:WebGLRenderingContext, color:Color, DeviceManagerData:any) => {
    _setClearColor(gl, color, DeviceManagerData);

    setColorWrite(gl, true, true, true, true, DeviceManagerData);

    /*! optimize in ANGLE:
     (need more verify:set color mask all false before clear?
     so here not do the recommendation)


     Recommendation: Do Not Perform Clears with Scissors or Masks Enabled
     (<<WebGL Insights>> -> chapter 1)

     One of the subtle differences between the Direct3D APIs and the GL APIs is that in the former, clear calls ignore scissors and masks, while the latter applies both to clears [Koch 12]. This means that if a clear is performed with the scissors test enabled, or with a color or stencil mask in use, ANGLE must draw a quad with the requested clear values, rather than using clear. This introduces some state management overhead, as ANGLE must switch out all the cached state such as shaders, sampler and texture bindings, and vertex data related to the draw call stream. It then must set up all the appropriate state for the clear, perform the clear itself, and then reset all of the affected state back to its prior settings once the clear is complete. If multiple draw buffers are currently in use, using WEBGL_draw_ buffers, then the performance implications of this emulated clear are com- pounded, as the draw must be performed once for each target. Clearing buffers without scissors or masks enabled avoids this overhead.
     */

    gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT | gl.STENCIL_BUFFER_BIT);
}


var _setClearColor = (gl:WebGLRenderingContext, color: Color, DeviceManagerData:any) => {
    var clearColor = DeviceManagerData.clearColor;

    if (clearColor && clearColor.isEqual(color)) {
        return;
    }

    gl.clearColor(color.r, color.g, color.b, color.a);

    DeviceManagerData.clearColor = color;
}

/**
 * @function
 * @name setColorWrite
 * @description Enables or disables writes to the color buffer. Once this state
 * is set, it persists until it is changed. By default, color writes are enabled
 * for all color channels.
 * @param {Boolean} writeRed true to enable writing  of the red channel and false otherwise.
 * @param {Boolean} writeGreen true to enable writing  of the green channel and false otherwise.
 * @param {Boolean} writeBlue true to enable writing  of the blue channel and false otherwise.
 * @param {Boolean} writeAlpha true to enable writing  of the alpha channel and false otherwise.
 */
export var setColorWrite = (gl:WebGLRenderingContext, writeRed:boolean, writeGreen:boolean, writeBlue:boolean, writeAlpha:boolean, DeviceManagerData:any) => {
    if (DeviceManagerData.writeRed !== writeRed
        || DeviceManagerData.writeGreen !== writeGreen
        || DeviceManagerData.writeBlue !== writeBlue
        || DeviceManagerData.writeAlpha !== writeAlpha) {
        gl.colorMask(writeRed, writeGreen, writeBlue, writeAlpha);

        DeviceManagerData.writeRed = writeRed;
        DeviceManagerData.writeGreen = writeGreen;
        DeviceManagerData.writeBlue = writeBlue;
        DeviceManagerData.writeAlpha = writeAlpha;
    }
}
