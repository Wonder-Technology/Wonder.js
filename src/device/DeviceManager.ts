import { registerClass } from "../definition/typescript/decorator/registerClass";
import { singleton } from "../definition/typescript/decorator/singleton";
import { ContextConfigData } from "../core/MainSystem";
import { createGL, getGL, getViewport, setGL, setScreen } from "./DeviceManagerSystem";
import { DeviceManagerData } from "./DeviceManagerData";
import { View } from "../structure/View";
import { IO } from "wonder-fantasy-land/dist/es2015/types/IO";

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
    set gl(gl: WebGLRenderingContext) {
        setGL(DeviceManagerData, gl).run();
    }

    get viewport(){
        return getViewport(DeviceManagerData);
    }

    public view: View = View.create();

    private constructor() { }

    public createGL(canvasId: string, contextConfig: ContextConfigData) {
        return createGL(canvasId, contextConfig);
    }

    public setScreen(canvas: HTMLCanvasElement) {
        return setScreen(canvas);
    }
}
