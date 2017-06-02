import { registerClass } from "../definition/typescript/decorator/registerClass";
import { singleton } from "../definition/typescript/decorator/singleton";
import { ContextConfigData } from "../core/MainSystem";
// import { createGL, getGL, getViewport, setGL, setScreen } from "./DeviceManagerSystem";
import { createGL, getGL, getViewport, setGL } from "./DeviceManagerSystem";
import { View } from "../structure/View";
import { getState } from "../core/DirectorSystem";
import { DirectorData } from "../core/DirectorData";
import { it, requireCheck } from "../definition/typescript/decorator/contract";
import { expect } from "wonder-expect.js";
import { getCanvas } from "../structure/ViewSystem";
import { fromJS } from "immutable";
import { IO } from "wonder-fantasy-land/dist/es2015/types/IO";
import { DeviceManagerData } from "./DeviceManagerData";

//todo change to function

/*!
 DeviceManager is responsible for global setting of gl
 */
@singleton()
@registerClass("DeviceManager")
export class DeviceManager {
    public static getInstance(): any { }

    get gl() {
        return getGL(DeviceManagerData, getState(DirectorData));
    }
    // set gl(gl: WebGLRenderingContext) {
    //     setGL(gl, getState(DirectorData));
    // }

    get viewport() {
        return getViewport(getState(DirectorData));
    }

    public view: View = View.create();

    private constructor() { }

    public createGL(canvasId: string, contextConfig: ContextConfigData) {
        return createGL(canvasId, fromJS(contextConfig), getState(DirectorData));
    }

    //todo open setScreen
    // @requireCheck(() => {
    //     it("canvas should be setter", () => {
    //         expect(getCanvas(getState(DirectorData))).exist;
    //     });
    // })
    // public setScreen() {
    //     return setScreen(DeviceManagerData, getState(DirectorData));
    // }
}

export var setDeviceManagerGL = (gl: WebGLRenderingContext) => {
    return setGL(gl, DeviceManagerData, getState(DirectorData));
}
