var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
/// <reference path="../../../../dist/wd.d.ts"/>
var sample;
(function (sample) {
    var Image1EventHandler = (function () {
        function Image1EventHandler(entityObject) {
            this._entityObject = null;
            this._entityObject = entityObject;
        }
        Image1EventHandler.prototype.onPointTap = function (e) {
            console.log("image1 " + e.name);
        };
        Image1EventHandler.prototype.onPointDown = function (e) {
            console.log("image1 " + e.name);
        };
        Image1EventHandler.prototype.onPointUp = function (e) {
            console.log("image1 " + e.name);
        };
        Image1EventHandler.prototype.onPointWheel = function (e) {
            console.log("image1 " + e.name);
        };
        Image1EventHandler.prototype.onPointMove = function (e) {
            console.log("image1 " + e.name);
        };
        Image1EventHandler.prototype.onPointOver = function (e) {
            console.log("image1 " + e.name);
        };
        Image1EventHandler.prototype.onPointOut = function (e) {
            console.log("image1 " + e.name);
        };
        Image1EventHandler.prototype.onPointDrag = function (e) {
            console.log("image1 " + e.name);
        };
        Image1EventHandler = __decorate([
            wd.script("eventHandler")
        ], Image1EventHandler);
        return Image1EventHandler;
    })();
    sample.Image1EventHandler = Image1EventHandler;
})(sample || (sample = {}));
