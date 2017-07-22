import { DomQuery } from "wonder-commonlib/dist/commonjs/utils/DomQuery";
import { ensureFunc, it, requireCheckFunc } from "../../../definition/typescript/decorator/contract";
import {
    getContext, initCanvas, setX, setY, setStyleWidth, setStyleHeight,
    setWidth, setHeight, setCanvas, getCanvas
} from "../../../structure/ViewSystem";
import { IO } from "wonder-fantasy-land/dist/commonjs/types/IO";
import curry from "wonder-lodash/curry";
import { expect } from "wonder-expect.js";
import { EScreenSize } from "../../device/EScreenSize";
import { RectRegion } from "../../../structure/RectRegion";
import { chain, compose } from "../../../utils/functionalUtils";
import { getRootProperty } from "../../../utils/rootUtils";
import { Map } from "immutable";
import { trace } from "../../../utils/debugUtils";
import { isValueExist } from "../../../utils/stateUtils";
import { Color } from "../../../structure/Color";
import { ESide } from "../../enum/ESide";
import { Log } from "../../../utils/Log";

export var getGL = (DeviceManagerDataFromSystem: any, state: Map<any, any>): WebGLRenderingContext => {
    // return state.getIn(["DeviceManager", "gl"]);
    return DeviceManagerDataFromSystem.gl;
}

export var setGL = curry((gl: WebGLRenderingContext, DeviceManagerDataFromSystem: any, state: Map<any, any>) => {
    // return state.setIn(["DeviceManager", "gl"], gl);
    DeviceManagerDataFromSystem.gl = gl;

    return state;
})

export var setContextConfig = curry((contextConfig: Map<string, any>, state: Map<any, any>) => {
    return state.setIn(["DeviceManager", "contextConfig"], contextConfig);
})

export var setPixelRatio = curry((pixelRatio: number | null, state: Map<any, any>) => {
    if (pixelRatio === null) {
        return state;
    }

    return state.setIn(["DeviceManager", "pixelRatio"], pixelRatio);
})

export var getViewport = (state: Map<any, any>) => {
    return state.getIn(["DeviceManager", "viewport"]);
}

export var setViewport = (x: number, y: number, width: number, height: number, state: Map<any, any>) => {
    return state.setIn(["DeviceManager", "viewport"], RectRegion.create(x, y, width, height));
}

export var setCanvasPixelRatio = curry((useDevicePixelRatio: boolean, canvas: HTMLCanvasElement) => {
    return IO.of(() => {
        var pixelRatio: number = getRootProperty("devicePixelRatio").run();

        canvas.width = Math.round(canvas.width * pixelRatio);
        canvas.height = Math.round(canvas.height * pixelRatio);

        return pixelRatio;
    });
})

export var setViewportOfGL = curry((DeviceManagerDataFromSystem: any, state: Map<any, any>, {
    x,
    y,
    width,
    height
}) => {
    return IO.of(() => {
        var gl = getGL(DeviceManagerDataFromSystem, state),
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

export var getScreenSize = (state: Map<any, any>) => {
    return state.getIn(["Main", "screenSize"]);
}

export var setScreen = (canvas: HTMLCanvasElement, setScreenData: Function, DeviceManagerDataFromSystem: any, state: Map<any, any>) => {
    return IO.of(requireCheckFunc(() => {
        it("should exist MainData.screenSize", () => {
            expect(getScreenSize(state)).exist;
        });
    }, () => {
        initCanvas(canvas).run();

        return compose(
            chain(setScreenData(DeviceManagerDataFromSystem, canvas, state)),
            chain(_getScreenData),
            _setBodyByScreenSize
        )(getScreenSize(state)).run();
    }));
};

export var clear = (gl: WebGLRenderingContext, color: Color, DeviceManagerDataFromSystem: any) => {
    _setClearColor(gl, color, DeviceManagerDataFromSystem);

    setColorWrite(gl, true, true, true, true, DeviceManagerDataFromSystem);

    /*! optimize in ANGLE:
     (need more verify:set color mask all false before clear?
     so here not do the recommendation)


     Recommendation: Do Not Perform Clears with Scissors or Masks Enabled
     (<<WebGL Insights>> -> chapter 1)

     One of the subtle differences between the Direct3D APIs and the GL APIs is that in the former, clear calls ignore scissors and masks, while the latter applies both to clears [Koch 12]. This means that if a clear is performed with the scissors test enabled, or with a color or stencil mask in use, ANGLE must draw a quad with the requested clear values, rather than using clear. This introduces some state management overhead, as ANGLE must switch out all the cached state such as shaders, sampler and texture bindings, and vertex data related to the draw call stream. It then must set up all the appropriate state for the clear, perform the clear itself, and then reset all of the affected state back to its prior settings once the clear is complete. If multiple draw buffers are currently in use, using WEBGL_draw_ buffers, then the performance implications of this emulated clear are com- pounded, as the draw must be performed once for each target. Clearing buffers without scissors or masks enabled avoids this overhead.
     */

    gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT | gl.STENCIL_BUFFER_BIT);
}


var _setClearColor = (gl: WebGLRenderingContext, color: Color, DeviceManagerDataFromSystem: any) => {
    var clearColor = DeviceManagerDataFromSystem.clearColor;

    if (clearColor && clearColor.isEqual(color)) {
        return;
    }

    gl.clearColor(color.r, color.g, color.b, color.a);

    DeviceManagerDataFromSystem.clearColor = color;
}

export var setColorWrite = (gl: WebGLRenderingContext, writeRed: boolean, writeGreen: boolean, writeBlue: boolean, writeAlpha: boolean, DeviceManagerDataFromSystem: any) => {
    if (DeviceManagerDataFromSystem.writeRed !== writeRed
        || DeviceManagerDataFromSystem.writeGreen !== writeGreen
        || DeviceManagerDataFromSystem.writeBlue !== writeBlue
        || DeviceManagerDataFromSystem.writeAlpha !== writeAlpha) {
        gl.colorMask(writeRed, writeGreen, writeBlue, writeAlpha);

        DeviceManagerDataFromSystem.writeRed = writeRed;
        DeviceManagerDataFromSystem.writeGreen = writeGreen;
        DeviceManagerDataFromSystem.writeBlue = writeBlue;
        DeviceManagerDataFromSystem.writeAlpha = writeAlpha;
    }
}

export var setSide = (gl: WebGLRenderingContext, side: ESide, DeviceManagerDataFromSystem: any) => {
    if (DeviceManagerDataFromSystem.side !== side) {
        switch (side) {
            case ESide.NONE:
                gl.enable(gl.CULL_FACE);
                gl.cullFace(gl.FRONT_AND_BACK);
                break;
            case ESide.BOTH:
                gl.disable(gl.CULL_FACE);
                break;
            case ESide.FRONT:
                gl.enable(gl.CULL_FACE);
                gl.cullFace(gl.BACK);
                break;
            case ESide.BACK:
                gl.enable(gl.CULL_FACE);
                gl.cullFace(gl.FRONT);
                break;
            default:
                Log.error(true, Log.info.FUNC_UNEXPECT("side", side));
                break;
        }

        DeviceManagerDataFromSystem.side = side;
    }
}

export var initData = (DeviceManagerDataFromSystem: any) => {
    DeviceManagerDataFromSystem.gl = null;
    DeviceManagerDataFromSystem.clearColor = null;

    DeviceManagerDataFromSystem.writeRed = null;
    DeviceManagerDataFromSystem.writeGreen = null;
    DeviceManagerDataFromSystem.writeBlue = null;
    DeviceManagerDataFromSystem.writeAlpha = null;

    DeviceManagerDataFromSystem.side = null;
}
