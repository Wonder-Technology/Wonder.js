var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { registerClass } from "../../definition/typescript/decorator/registerClass";
import { TimeController } from "./TimeController";
import { root } from "../../definition/Variable";
var STARTING_FPS = 60, GAMETIME_SCALE = 1000;
var DirectorTimeController = (function (_super) {
    __extends(DirectorTimeController, _super);
    function DirectorTimeController() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.gameTime = null;
        _this.fps = null;
        _this.isTimeChange = false;
        _this.deltaTime = null;
        _this._lastTime = null;
        return _this;
    }
    DirectorTimeController.create = function () {
        var obj = new this();
        return obj;
    };
    DirectorTimeController.prototype.tick = function (time) {
        this.deltaTime = this._lastTime !== null ? time - this._lastTime : time;
        this._updateFps(this.deltaTime);
        this.gameTime = time / GAMETIME_SCALE;
        this._lastTime = time;
    };
    DirectorTimeController.prototype.start = function () {
        _super.prototype.start.call(this);
        this.isTimeChange = true;
        this.elapsed = 0;
    };
    DirectorTimeController.prototype.resume = function () {
        _super.prototype.resume.call(this);
        this.isTimeChange = true;
    };
    DirectorTimeController.prototype.getNow = function () {
        return root.performance.now();
    };
    DirectorTimeController.prototype._updateFps = function (deltaTime) {
        if (this._lastTime === null) {
            this.fps = STARTING_FPS;
        }
        else {
            this.fps = 1000 / deltaTime;
        }
    };
    return DirectorTimeController;
}(TimeController));
DirectorTimeController = __decorate([
    registerClass("DirectorTimeController")
], DirectorTimeController);
export { DirectorTimeController };
//# sourceMappingURL=DirectorTimeController.js.map