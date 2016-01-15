var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
/// <reference path="../../../../../dist/wd.d.ts"/>
var sample;
(function (sample) {
    var ImageEventHandler = (function () {
        function ImageEventHandler(entityObject) {
            this._entityObject = null;
            this._entityObject = entityObject;
        }
        ImageEventHandler.prototype.onMouseClick = function (e) {
            console.log("image click");
        };
        ImageEventHandler.prototype.onMouseDown = function (e) {
            console.log("image mousedown");
        };
        ImageEventHandler.prototype.onMouseUp = function (e) {
            console.log("image mouseup");
        };
        ImageEventHandler.prototype.onMouseWheel = function (e) {
            console.log("image mousewheel");
        };
        ImageEventHandler.prototype.onMouseMove = function (e) {
            console.log("image mousemove");
        };
        ImageEventHandler.prototype.onMouseOver = function (e) {
            console.log("image mouseover");
        };
        ImageEventHandler.prototype.onMouseOut = function (e) {
            console.log("image mouseout");
        };
        ImageEventHandler.prototype.onMouseDrag = function (e) {
            console.log("image drag");
        };
        ImageEventHandler = __decorate([
            wd.script("eventHandler")
        ], ImageEventHandler);
        return ImageEventHandler;
    })();
    sample.ImageEventHandler = ImageEventHandler;
})(sample || (sample = {}));
