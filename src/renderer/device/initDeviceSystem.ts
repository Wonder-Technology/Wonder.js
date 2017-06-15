import curry from "wonder-lodash/curry";
import { ensureFunc, it, requireCheckFunc } from "../../definition/typescript/decorator/contract";
import { isSupportRenderWorkerAndSharedArrayBuffer } from "../../device/WorkerDetectSystem";
import { expect } from "wonder-expect.js";
import { chain, compose, map } from "../../utils/functionalUtils";
import { createGL, getGL, setPixelRatioAndCanvas, setScreen } from "./DeviceManagerSystem";
import { detect } from "./GPUDetectorSystem";
import { createGL as createGLWorker } from "../worker/both_file/device/DeviceManagerWorkerSystem";
import { DeviceManagerWorkerData } from "../worker/both_file/device/DeviceManagerWorkerData";
import { DeviceManagerData } from "./DeviceManagerData";

export var initDevice = null;

if (isSupportRenderWorkerAndSharedArrayBuffer()) {
    initDevice = curry((contextConfig: Map<string, any>, state: Map<any, any>, configState: Map<any, any>, canvas: HTMLCanvasElement) => {
        //todo set screen
        return compose(
            createGLWorker,
        )(canvas, contextConfig, DeviceManagerWorkerData, state)
    });
}
else {
    initDevice = curry((contextConfig: Map<string, any>, state: Map<any, any>, configState: Map<any, any>, canvas: HTMLCanvasElement) => {
        return compose(
            map(detect(getGL, DeviceManagerData)),
            chain(setPixelRatioAndCanvas(configState.get("useDevicePixelRatio"))),
            chain(setScreen(DeviceManagerData)),
            createGL,
        )(canvas, contextConfig, DeviceManagerData, state)
    });
}

export var createCanvas = curry((DomQuery: any, domID: string) => {
    if (domID !== "") {
        return DomQuery.create(_getCanvasID(domID)).get(0);
    }

    return DomQuery.create("<canvas></canvas>").prependTo("body").get(0);
})

var _getCanvasID = ensureFunc((id: string) => {
    it("dom id should be #string", () => {
        expect(/#[^#]+/.test(id)).true;
    });
}, (domID: string) => {
    if (domID.indexOf('#') > -1) {
        return domID;
    }

    return `#${domID}`;
});
