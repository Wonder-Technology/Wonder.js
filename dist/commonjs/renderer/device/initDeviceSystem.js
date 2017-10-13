"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var curry_1 = require("wonder-lodash/curry");
var contract_1 = require("../../definition/typescript/decorator/contract");
var WorkerDetectSystem_1 = require("../../device/WorkerDetectSystem");
var wonder_expect_js_1 = require("wonder-expect.js");
var functionalUtils_1 = require("../../utils/functionalUtils");
var DeviceManagerSystem_1 = require("./DeviceManagerSystem");
var DeviceManagerWorkerSystem_1 = require("../worker/both_file/device/DeviceManagerWorkerSystem");
var DeviceManagerData_1 = require("./DeviceManagerData");
var IO_1 = require("wonder-fantasy-land/dist/commonjs/types/IO");
var ViewSystem_1 = require("../../structure/ViewSystem");
var WorkerInstanceData_1 = require("../../worker/WorkerInstanceData");
var WorkerInstanceSystem_1 = require("../../worker/WorkerInstanceSystem");
var WebGLDetectData_1 = require("./WebGLDetectData");
var GPUDetectData_1 = require("./GPUDetectData");
exports.initDevice = null;
if (WorkerDetectSystem_1.isSupportRenderWorkerAndSharedArrayBuffer()) {
    exports.initDevice = curry_1.default(function (contextConfig, state, configState, detect, DomQuery, canvas) {
        return IO_1.IO.of(function () {
            var screenData = DeviceManagerWorkerSystem_1.setScreen(canvas, null, DomQuery, state).run(), viewportData = DeviceManagerWorkerSystem_1.getViewportData(screenData);
            DeviceManagerWorkerSystem_1.createGL(canvas, WorkerInstanceSystem_1.getRenderWorker(WorkerInstanceData_1.WorkerInstanceData), contextConfig, viewportData).run();
            return functionalUtils_1.compose(ViewSystem_1.setCanvas(canvas), DeviceManagerWorkerSystem_1.setContextConfig(contextConfig), DeviceManagerWorkerSystem_1.setViewportToState(viewportData), DeviceManagerWorkerSystem_1.setPixelRatio(DeviceManagerWorkerSystem_1.setCanvasPixelRatio(configState.get("useDevicePixelRatio"), canvas).run()))(state);
        });
    });
}
else {
    exports.initDevice = curry_1.default(function (contextConfig, state, configState, detect, DomQuery, canvas) {
        return functionalUtils_1.compose(functionalUtils_1.map(detect(DeviceManagerSystem_1.getGL, DeviceManagerData_1.DeviceManagerData, GPUDetectData_1.GPUDetectData)), functionalUtils_1.chain(DeviceManagerSystem_1.setCanvasPixelRatio(configState.get("useDevicePixelRatio"), canvas)), functionalUtils_1.chain(DeviceManagerSystem_1.setScreen(canvas, DeviceManagerData_1.DeviceManagerData, DomQuery)), DeviceManagerSystem_1.createGL)(canvas, contextConfig, WebGLDetectData_1.WebGLDetectData, DeviceManagerData_1.DeviceManagerData, state);
    });
}
exports.createCanvas = curry_1.default(function (DomQuery, domId) {
    return IO_1.IO.of(function () {
        if (domId !== "") {
            return DomQuery.create(_getCanvasId(domId)).get(0);
        }
        return DomQuery.create("<canvas></canvas>").prependTo("body").get(0);
    });
});
var _getCanvasId = contract_1.ensureFunc(function (id) {
    contract_1.it("dom id should be #string", function () {
        wonder_expect_js_1.expect(/#[^#]+/.test(id)).true;
    });
}, function (domId) {
    if (domId.indexOf('#') > -1) {
        return domId;
    }
    return "#" + domId;
});
//# sourceMappingURL=initDeviceSystem.js.map