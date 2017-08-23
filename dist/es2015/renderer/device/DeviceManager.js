var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { registerClass } from "../../definition/typescript/decorator/registerClass";
import { singleton } from "../../definition/typescript/decorator/singleton";
import { getGL, getViewport, setGL } from "./DeviceManagerSystem";
import { View } from "../../structure/View";
import { getState } from "../../core/DirectorSystem";
import { DirectorData } from "../../core/DirectorData";
import { DeviceManagerData } from "./DeviceManagerData";
var DeviceManager = (function () {
    function DeviceManager() {
        this.view = View.create();
    }
    DeviceManager.getInstance = function () { };
    Object.defineProperty(DeviceManager.prototype, "gl", {
        get: function () {
            return getGL(DeviceManagerData, getState(DirectorData));
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DeviceManager.prototype, "viewport", {
        get: function () {
            return getViewport(getState(DirectorData));
        },
        enumerable: true,
        configurable: true
    });
    DeviceManager = __decorate([
        singleton(),
        registerClass("DeviceManager")
    ], DeviceManager);
    return DeviceManager;
}());
export { DeviceManager };
export var setDeviceManagerGL = function (gl) {
    return setGL(gl, DeviceManagerData, getState(DirectorData));
};
//# sourceMappingURL=DeviceManager.js.map