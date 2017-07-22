import { ESide } from "../../enum/ESide";
export var initState = function (state, getGL, setSide, DeviceManagerDataFromSystem) {
    var gl = getGL(DeviceManagerDataFromSystem, state);
    setSide(gl, ESide.FRONT, DeviceManagerDataFromSystem);
};
//# sourceMappingURL=stateUtils.js.map