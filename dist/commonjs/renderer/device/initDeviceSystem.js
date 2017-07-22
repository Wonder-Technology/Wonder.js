"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var curry_1 = require("wonder-lodash/curry");
var contract_1 = require("../../definition/typescript/decorator/contract");
var WorkerDetectSystem_1 = require("../../device/WorkerDetectSystem");
var wonder_expect_js_1 = require("wonder-expect.js");
var functionalUtils_1 = require("../../utils/functionalUtils");
var DeviceManagerSystem_1 = require("./DeviceManagerSystem");
var GPUDetectorSystem_1 = require("./GPUDetectorSystem");
var DeviceManagerWorkerSystem_1 = require("../worker/both_file/device/DeviceManagerWorkerSystem");
var DeviceManagerData_1 = require("./DeviceManagerData");
var IO_1 = require("wonder-fantasy-land/dist/commonjs/types/IO");
var ViewSystem_1 = require("../../structure/ViewSystem");
var WorkerInstanceData_1 = require("../../worker/WorkerInstanceData");
var WorkerInstanceSystem_1 = require("../../worker/WorkerInstanceSystem");
exports.initDevice = null;
if (WorkerDetectSystem_1.isSupportRenderWorkerAndSharedArrayBuffer()) {
    exports.initDevice = curry_1.default(function (contextConfig, state, configState, canvas) {
        return IO_1.IO.of(function () {
            var screenData = DeviceManagerWorkerSystem_1.setScreen(canvas, null, state).run(), viewportData = DeviceManagerWorkerSystem_1.getViewportData(screenData, state);
            DeviceManagerWorkerSystem_1.createGL(canvas, WorkerInstanceSystem_1.getRenderWorker(WorkerInstanceData_1.WorkerInstanceData), contextConfig, viewportData).run();
            return functionalUtils_1.compose(ViewSystem_1.setCanvas(canvas), DeviceManagerWorkerSystem_1.setContextConfig(contextConfig), DeviceManagerWorkerSystem_1.setViewport(viewportData), DeviceManagerWorkerSystem_1.setPixelRatio(DeviceManagerWorkerSystem_1.setCanvasPixelRatio(configState.get("useDevicePixelRatio"), canvas).run()))(state);
        });
    });
}
else {
    exports.initDevice = curry_1.default(function (contextConfig, state, configState, canvas) {
        return functionalUtils_1.compose(functionalUtils_1.map(GPUDetectorSystem_1.detect(DeviceManagerSystem_1.getGL, DeviceManagerData_1.DeviceManagerData)), functionalUtils_1.chain(DeviceManagerSystem_1.setCanvasPixelRatio(configState.get("useDevicePixelRatio"), canvas)), functionalUtils_1.chain(DeviceManagerSystem_1.setScreen(canvas, DeviceManagerData_1.DeviceManagerData)), DeviceManagerSystem_1.createGL)(canvas, contextConfig, DeviceManagerData_1.DeviceManagerData, state);
    });
}
exports.createCanvas = curry_1.default(function (DomQuery, domID) {
    return IO_1.IO.of(function () {
        if (domID !== "") {
            return DomQuery.create(_getCanvasID(domID)).get(0);
        }
        return DomQuery.create("<canvas></canvas>").prependTo("body").get(0);
    });
});
var _getCanvasID = contract_1.ensureFunc(function (id) {
    contract_1.it("dom id should be #string", function () {
        wonder_expect_js_1.expect(/#[^#]+/.test(id)).true;
    });
}, function (domID) {
    if (domID.indexOf('#') > -1) {
        return domID;
    }
    return "#" + domID;
});
//# sourceMappingURL=initDeviceSystem.js.map