var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
/// <reference path="../../../../dist/wd.d.ts"/>
var sample;
(function (sample) {
    var Image11EventHandler = (function () {
        function Image11EventHandler(entityObject) {
            this._entityObject = null;
            this._entityObject = entityObject;
        }
        Image11EventHandler.prototype.onPointTap = function (e) {
            console.log("image11 " + e.name);
        };
        Image11EventHandler.prototype.onPointDown = function (e) {
            console.log("image11 " + e.name);
        };
        Image11EventHandler.prototype.onPointUp = function (e) {
            console.log("image11 " + e.name);
        };
        Image11EventHandler.prototype.onPointWheel = function (e) {
            console.log("image11 " + e.name);
        };
        Image11EventHandler.prototype.onPointMove = function (e) {
            console.log("image11 " + e.name);
        };
        Image11EventHandler.prototype.onPointOver = function (e) {
            console.log("image11 " + e.name);
        };
        Image11EventHandler.prototype.onPointOut = function (e) {
            console.log("image11 " + e.name);
        };
        Image11EventHandler.prototype.onPointDrag = function (e) {
            console.log("image11 " + e.name);
        };
        Image11EventHandler = __decorate([
            wd.script("eventHandler")
        ], Image11EventHandler);
        return Image11EventHandler;
    })();
    sample.Image11EventHandler = Image11EventHandler;
})(sample || (sample = {}));
