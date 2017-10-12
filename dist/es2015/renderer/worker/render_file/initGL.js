import { chain, compose, map } from "../../../utils/functionalUtils";
import { getGL, setContextConfig, setGL, setViewportOfGL } from "../both_file/device/DeviceManagerWorkerSystem";
import { DeviceManagerWorkerData } from "../both_file/device/DeviceManagerWorkerData";
import { createState } from "../../../utils/stateUtils";
import { IO } from "wonder-fantasy-land/dist/es2015/types/IO";
import { DomQuery } from "wonder-commonlib/dist/es2015/utils/DomQuery";
import curry from "wonder-lodash/curry";
import { setCanvas } from "../../../structure/ViewSystem";
import { getOnlyGL } from "../../utils/worker/both_file/device/deviceManagerUtils";
export var initGL = function (data, detect, WebGLDetectWorkerData, GPUDetectWorkerData) {
    return compose(map(detect(getGL, DeviceManagerWorkerData, GPUDetectWorkerData)), chain(setViewportOfGL(DeviceManagerWorkerData, data.viewportData)), _createGL(data.canvas, data.options, WebGLDetectWorkerData, DeviceManagerWorkerData))(createState());
};
var _createGL = curry(function (canvas, options, WebGLDetectWorkerData, DeviceManagerWorkerData, state) {
    return IO.of(function () {
        var gl = getOnlyGL(canvas, options, WebGLDetectWorkerData);
        if (!gl) {
            DomQuery.create("<p class='not-support-webgl'></p>").prependTo("body").text("Your device doesn't support WebGL");
        }
        return compose(setCanvas(canvas), setContextConfig(options), setGL(gl, DeviceManagerWorkerData))(state);
    });
});
//# sourceMappingURL=initGL.js.map