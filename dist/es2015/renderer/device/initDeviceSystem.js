import curry from "wonder-lodash/curry";
import { ensureFunc, it } from "../../definition/typescript/decorator/contract";
import { isSupportRenderWorkerAndSharedArrayBuffer } from "../../device/WorkerDetectSystem";
import { expect } from "wonder-expect.js";
import { chain, compose, map } from "../../utils/functionalUtils";
import { createGL, getGL, setCanvasPixelRatio as setCanvasPixelRatioFromDeviceManagerSystem, setScreen as setScreenFromDeviceManagerSystem } from "./DeviceManagerSystem";
import { createGL as createGLWorker, setCanvasPixelRatio as setCanvasPixelRatioFromDeviceManagerWorkerSystem, setContextConfig, setPixelRatio, setScreen as setScreenFromDeviceManagerWorkerSystem, setViewportToState, getViewportData } from "../worker/both_file/device/DeviceManagerWorkerSystem";
import { DeviceManagerData } from "./DeviceManagerData";
import { IO } from "wonder-fantasy-land/dist/es2015/types/IO";
import { setCanvas } from "../../structure/ViewSystem";
import { WorkerInstanceData } from "../../worker/WorkerInstanceData";
import { getRenderWorker } from "../../worker/WorkerInstanceSystem";
import { WebGLDetectData } from "./WebGLDetectData";
import { GPUDetectData } from "./GPUDetectData";
export var initDevice = null;
if (isSupportRenderWorkerAndSharedArrayBuffer()) {
    initDevice = curry(function (contextConfig, state, configState, detect, DomQuery, canvas) {
        return IO.of(function () {
            var screenData = setScreenFromDeviceManagerWorkerSystem(canvas, null, DomQuery, state).run(), viewportData = getViewportData(screenData);
            createGLWorker(canvas, getRenderWorker(WorkerInstanceData), contextConfig, viewportData).run();
            return compose(setCanvas(canvas), setContextConfig(contextConfig), setViewportToState(viewportData), setPixelRatio(setCanvasPixelRatioFromDeviceManagerWorkerSystem(configState.get("useDevicePixelRatio"), canvas).run()))(state);
        });
    });
}
else {
    initDevice = curry(function (contextConfig, state, configState, detect, DomQuery, canvas) {
        return compose(map(detect(getGL, DeviceManagerData, GPUDetectData)), chain(setCanvasPixelRatioFromDeviceManagerSystem(configState.get("useDevicePixelRatio"), canvas)), chain(setScreenFromDeviceManagerSystem(canvas, DeviceManagerData, DomQuery)), createGL)(canvas, contextConfig, WebGLDetectData, DeviceManagerData, state);
    });
}
export var createCanvas = curry(function (DomQuery, domId) {
    return IO.of(function () {
        if (domId !== "") {
            return DomQuery.create(_getCanvasId(domId)).get(0);
        }
        return DomQuery.create("<canvas></canvas>").prependTo("body").get(0);
    });
});
var _getCanvasId = ensureFunc(function (id) {
    it("dom id should be #string", function () {
        expect(/#[^#]+/.test(id)).true;
    });
}, function (domId) {
    if (domId.indexOf('#') > -1) {
        return domId;
    }
    return "#" + domId;
});
//# sourceMappingURL=initDeviceSystem.js.map