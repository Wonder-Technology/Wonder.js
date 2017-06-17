import { chain, compose, map } from "../../../utils/functionalUtils";
import { detect } from "../../device/GPUDetectorSystem";
import {
    getGL, setContextConfig, setGL, setPixelRatio,
    setViewportOfGL
} from "../both_file/device/DeviceManagerWorkerSystem";
import { DeviceManagerWorkerData } from "../both_file/device/DeviceManagerWorkerData";
import { createState } from "../../../utils/stateUtils";
import { ContextConfigOptionsData } from "../../type/dataType";
import { IO } from "wonder-fantasy-land/dist/es2015/types/IO";
import { DomQuery } from "wonder-commonlib/dist/es2015/utils/DomQuery";
import curry from "wonder-lodash/curry";
import { MessageInitGLData } from "../../type/messageDataType";
import { Map } from "immutable";
import { setCanvas } from "../../../structure/ViewSystem";

export var initGL = (data:MessageInitGLData) => {
    return compose(
        map(detect(getGL, DeviceManagerWorkerData)),
        chain(setViewportOfGL(DeviceManagerWorkerData, data.viewportData)),
        _createGL(data.canvas, data.options, DeviceManagerWorkerData)
    )(createState());
}

var _createGL = curry((canvas: HTMLCanvasElement, options: ContextConfigOptionsData, DeviceManagerWorkerData: any, state:Map<any, any>) => {
    return IO.of(() => {
        var gl = _getContext(canvas, options);

        if (!gl) {
            DomQuery.create("<p class='not-support-webgl'></p>").prependTo("body").text("Your device doesn't support WebGL");
        }

        return compose(setCanvas(canvas), setContextConfig(options), setGL(gl, DeviceManagerWorkerData))(state);
    });
})

var _getContext = (canvas: HTMLCanvasElement, options: ContextConfigOptionsData): WebGLRenderingContext => {
    return (canvas.getContext("webgl", options) || canvas.getContext("experimental-webgl", options)) as WebGLRenderingContext;
}
