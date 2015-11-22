var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") return Reflect.decorate(decorators, target, key, desc);
    switch (arguments.length) {
        case 2: return decorators.reduceRight(function(o, d) { return (d && d(o)) || o; }, target);
        case 3: return decorators.reduceRight(function(o, d) { return (d && d(target, key)), void 0; }, void 0);
        case 4: return decorators.reduceRight(function(o, d) { return (d && d(target, key, o)) || o; }, desc);
    }
};
/// <reference path="../../../dist/dy.d.ts"/>
var sample;
(function (sample) {
    var Scene = (function () {
        function Scene(gameObject) {
            this.state = null;
            this._gameObject = null;
            this._gameObject = gameObject;
        }
        Scene.prototype.init = function () {
            this.state = "init";
        };
        Scene.prototype.update = function (time) {
            this.state = "update";
        };
        Scene.prototype.onEnter = function () {
            this.state = "onEnter";
        };
        Scene.prototype.onStartLoop = function () {
            this.state = "onStartLoop";
        };
        Scene.prototype.onEndLoop = function () {
            this.state = "onEndLoop";
        };
        Scene.prototype.onExit = function () {
            this.state = "onExit";
        };
        Scene = __decorate([
            dy.script("scene")
        ], Scene);
        return Scene;
    })();
    sample.Scene = Scene;
})(sample || (sample = {}));
