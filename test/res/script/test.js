var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
/// <reference path="../../../dist/Hilo3D.d.ts"/>
var sample;
(function (sample) {
    var Test = (function () {
        function Test(gameObject) {
            this.a = null;
            this.b = null;
            this.time = null;
            this.isInit = null;
            this.gameObject = null;
            this.a = 0;
            this.b = 0;
            this.time = null;
            this.isInit = false;
            gameObject.a = 100;
            this.gameObject = gameObject;
        }
        Test.prototype.init = function () {
            this.isInit = true;
        };
        Test.prototype.update = function (time) {
            this.time = time;
            this.gameObject.a++;
        };
        Test.prototype.onEnter = function () {
            this.a++;
        };
        Test.prototype.onStartLoop = function () {
            this.b++;
        };
        Test.prototype.onEndLoop = function () {
            this.b -= 2;
        };
        Test.prototype.onExit = function () {
            this.a--;
        };
        Test.prototype.onDispose = function () {
        };
        Test = __decorate([
            Hilo3D.script("test")
        ], Test);
        return Test;
    }());
    sample.Test = Test;
})(sample || (sample = {}));
//# sourceMappingURL=test.js.map