import { registerClass } from "../definition/typescript/decorator/registerClass";
import { singleton } from "../definition/typescript/decorator/singleton";
// import { Log } from "../utils/Log";
// import { Vector2 } from "../math/Vector2";
// import { IView } from "../structure/ViewSystem";
// import { RectRegion } from "../structure/RectRegion";
// import { Color } from "../structure/Color";
// import { DomQuery } from "wonder-commonlib/dist/es2015/utils/DomQuery";
// import { root } from "../definition/Variable";
// import { requireCheck, it, ensure } from "../definition/typescript/decorator/contract";
// import {expect} from "wonder-expect.js";
// import { EScreenSize } from "./EScreenSize";
import { ContextConfigData, getScreenSize } from "../core/MainSystem";
import { createGL, getGL, setScreen } from "./DeviceManagerSystem";
import { MainData } from "../core/MainData";
import { it, requireCheck } from "../definition/typescript/decorator/contract";
import { expect } from "wonder-expect.js";
import { DeviceManagerData } from "./DeviceManagerData";
// import { MainData } from "../core/MainData";

/*!
 DeviceManager is responsible for global setting of gl
 */
@singleton()
@registerClass("DeviceManager")
export class DeviceManager {
    public static getInstance(): any { }

    get gl() {
        return getGL(DeviceManagerData);
    }

    private constructor() { }

    public createGL(canvasId: string, contextConfig: ContextConfigData) {
        return createGL(canvasId, contextConfig);
    }

    public setScreen(canvas: HTMLCanvasElement) {
        return setScreen(canvas);
    }
}
