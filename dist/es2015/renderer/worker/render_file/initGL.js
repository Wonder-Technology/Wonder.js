import { chain, compose, map } from "../../../utils/functionalUtils";
import { detect } from "../../device/GPUDetectorSystem";
import { getGL, setContextConfig, setGL, setViewportOfGL } from "../both_file/device/DeviceManagerWorkerSystem";
import { DeviceManagerWorkerData } from "../both_file/device/DeviceManagerWorkerData";
import { createState } from "../../../utils/stateUtils";
import { IO } from "wonder-fantasy-land/dist/es2015/types/IO";
import { DomQuery } from "wonder-commonlib/dist/es2015/utils/DomQuery";
import curry from "wonder-lodash/curry";
import { setCanvas } from "../../../structure/ViewSystem";
export var initGL = function (data) {
    return compose(map(detect(getGL, DeviceManagerWorkerData)), chain(setViewportOfGL(DeviceManagerWorkerData, data.viewportData)), _createGL(data.canvas, data.options, DeviceManagerWorkerData))(createState());
};
var _createGL = curry(function (canvas, options, DeviceManagerWorkerData, state) {
    return IO.of(function () {
        var gl = _getContext(canvas, options);
        if (!gl) {
            DomQuery.create("<p class='not-support-webgl'></p>").prependTo("body").text("Your device doesn't support WebGL");
        }
        return compose(setCanvas(canvas), setContextConfig(options), setGL(gl, DeviceManagerWorkerData))(state);
    });
});
var _getContext = function (canvas, options) {
    return (canvas.getContext("webgl", options) || canvas.getContext("experimental-webgl", options));
};
//# sourceMappingURL=initGL.js.map