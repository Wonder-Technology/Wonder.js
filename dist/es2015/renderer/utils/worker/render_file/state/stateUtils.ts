import { Map } from "immutable";
import { ESide } from "../../../../enum/ESide";

export const initState = (state: Map<any, any>, getGL: Function, setSide: Function, DeviceManagerDataFromSystem: any) => {
    var gl = getGL(DeviceManagerDataFromSystem, state);

    setSide(gl, ESide.FRONT, DeviceManagerDataFromSystem);
}

