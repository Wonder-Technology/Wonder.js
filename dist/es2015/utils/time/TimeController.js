var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { ensure, it } from "../../definition/typescript/decorator/contract";
import { expect } from "wonder-expect.js";
var TimeController = (function () {
    function TimeController() {
        this.elapsed = null;
        this.pauseElapsed = 0;
        this.pauseTime = null;
        this.startTime = null;
    }
    TimeController.prototype.start = function () {
        this.startTime = this.getNow();
        this.pauseElapsed = null;
    };
    TimeController.prototype.stop = function () {
        this.startTime = null;
    };
    TimeController.prototype.pause = function () {
        this.pauseTime = this.getNow();
    };
    TimeController.prototype.resume = function () {
        this.pauseElapsed += this.getNow() - this.pauseTime;
        this.pauseTime = null;
    };
    TimeController.prototype.computeElapseTime = function (time) {
        if (this.pauseElapsed) {
            this.elapsed = time - this.pauseElapsed - this.startTime;
        }
        else {
            this.elapsed = time - this.startTime;
        }
        if (this.elapsed < 0) {
            this.elapsed = 0;
        }
        return this.elapsed;
    };
    __decorate([
        ensure(function () {
            var _this = this;
            it("elapsed should >= 0, but actual is " + this.elapsed, function () {
                expect(_this.elapsed).gte(0);
            });
        })
    ], TimeController.prototype, "computeElapseTime", null);
    return TimeController;
}());
export { TimeController };
//# sourceMappingURL=TimeController.js.map