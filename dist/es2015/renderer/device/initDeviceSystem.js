import curry from "wonder-lodash/curry";
import { ensureFunc, it } from "../../definition/typescript/decorator/contract";
import { getRenderWorkerFilePath, isSupportRenderWorkerAndSharedArrayBuffer } from "../../device/WorkerDetectSystem";
import { expect } from "wonder-expect.js";
import { chain, compose, map } from "../../utils/functionalUtils";
import { createGL, getGL, setCanvasPixelRatio as setCanvasPixelRatioFromDeviceManagerSystem, setScreen as setScreenFromDeviceManagerSystem } from "./DeviceManagerSystem";
import { detect } from "./GPUDetectorSystem";
import { createGL as createGLWorker, getViewportData, setCanvasPixelRatio as setCanvasPixelRatioFromDeviceManagerWorkerSystem, setContextConfig, setPixelRatio, setScreen as setScreenFromDeviceManagerWorkerSystem, setViewport } from "../worker/both_file/device/DeviceManagerWorkerSystem";
import { DeviceManagerData } from "./DeviceManagerData";
import { IO } from "wonder-fantasy-land/dist/es2015/types/IO";
import { setCanvas } from "../../structure/ViewSystem";
import { WorkerInstanceData } from "../worker/logic_file/worker_instance/WorkerInstanceData";
export var initDevice = null;
if (isSupportRenderWorkerAndSharedArrayBuffer()) {
    initDevice = curry(function (contextConfig, state, configState, canvas) {
        return IO.of(function () {
            var screenData = setScreenFromDeviceManagerWorkerSystem(canvas, null, state).run(), viewportData = getViewportData(screenData, state);
            createGLWorker(canvas, WorkerInstanceData, contextConfig, viewportData, getRenderWorkerFilePath()).run();
            return compose(setCanvas(canvas), setContextConfig(contextConfig), setViewport(viewportData), setPixelRatio(setCanvasPixelRatioFromDeviceManagerWorkerSystem(configState.get("useDevicePixelRatio"), canvas).run()))(state);
        });
    });
}
else {
    initDevice = curry(function (contextConfig, state, configState, canvas) {
        return compose(map(detect(getGL, DeviceManagerData)), chain(setCanvasPixelRatioFromDeviceManagerSystem(configState.get("useDevicePixelRatio"), canvas)), chain(setScreenFromDeviceManagerSystem(canvas, DeviceManagerData)), createGL)(canvas, contextConfig, DeviceManagerData, state);
    });
}
export var createCanvas = curry(function (DomQuery, domID) {
    return IO.of(function () {
        if (domID !== "") {
            return DomQuery.create(_getCanvasID(domID)).get(0);
        }
        return DomQuery.create("<canvas></canvas>").prependTo("body").get(0);
    });
});
var _getCanvasID = ensureFunc(function (id) {
    it("dom id should be #string", function () {
        expect(/#[^#]+/.test(id)).true;
    });
}, function (domID) {
    if (domID.indexOf('#') > -1) {
        return domID;
    }
    return "#" + domID;
});
//# sourceMappingURL=initDeviceSystem.js.map