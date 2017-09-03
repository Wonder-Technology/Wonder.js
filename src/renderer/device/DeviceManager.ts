import { registerClass } from "../../definition/typescript/decorator/registerClass";
import { singleton } from "../../definition/typescript/decorator/singleton";
// import { createGL, getGL, getViewport, setGL, setScreen } from "./DeviceManagerSystem";
import { getGL, getViewport, setClearColor, setGL, setViewportOfGL } from "./DeviceManagerSystem";
// import { View } from "../../structure/View";
import { getState, setState } from "../../core/DirectorSystem";
import { DirectorData } from "../../core/DirectorData";
import { DeviceManagerData } from "./DeviceManagerData";
import { Color } from "../../structure/Color";

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

    get viewport() {
        return getViewport(getState(DirectorData));
    }

    private constructor() { }

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

export var getDeviceManagerViewport = () => {
    return getViewport(getState(DirectorData));
}

export var setDeviceManagerViewport = (x: number, y: number, width: number, height: number) => {
    setState(
        setViewportOfGL(DeviceManagerData, getState(DirectorData), {
                x: x,
                y: y,
                width: width,
                height: height
            }
        ).run(), DirectorData
    ).run();
}

export var setDeviceManagerClearColor = (color: Color) => {
    setClearColor(getGL(DeviceManagerData, getState(DirectorData)), color, DeviceManagerData);
}

export var getDeviceManagerGL = () => {
    return getGL(DeviceManagerData, getState(DirectorData));
}

export var setDeviceManagerGL = (gl: WebGLRenderingContext) => {
    return setGL(gl, DeviceManagerData, getState(DirectorData));
}
