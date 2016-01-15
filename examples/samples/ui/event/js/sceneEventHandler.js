var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
/// <reference path="../../../../../dist/wd.d.ts"/>
var sample;
(function (sample) {
    var SceneEventHandler = (function () {
        function SceneEventHandler(entityObject) {
            this._entityObject = null;
            this._entityObject = entityObject;
        }
        SceneEventHandler.prototype.onMouseClick = function (e) {
            console.log("scene click");
        };
        SceneEventHandler.prototype.onMouseDown = function (e) {
            console.log("scene mousedown");
        };
        SceneEventHandler.prototype.onMouseUp = function (e) {
            console.log("scene mouseup");
        };
        SceneEventHandler.prototype.onMouseWheel = function (e) {
            console.log("scene mousewheel");
        };
        SceneEventHandler.prototype.onMouseMove = function (e) {
            console.log("scene mousemove");
        };
        SceneEventHandler.prototype.onMouseOver = function (e) {
            console.log("scene mouseover");
        };
        SceneEventHandler.prototype.onMouseOut = function (e) {
            console.log("scene mouseout");
        };
        SceneEventHandler.prototype.onMouseDrag = function (e) {
            console.log("scene drag");
        };
        SceneEventHandler = __decorate([
            wd.script("eventHandler")
        ], SceneEventHandler);
        return SceneEventHandler;
    })();
    sample.SceneEventHandler = SceneEventHandler;
})(sample || (sample = {}));
