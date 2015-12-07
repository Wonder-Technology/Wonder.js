var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
/// <reference path="../../../../../dist/wd.d.ts"/>
var sample;
(function (sample) {
    var Box1 = (function () {
        function Box1(gameObject) {
            this._gameObject = null;
            this._collidingMaterial = null;
            this._originMaterial = null;
            this._gameObject = gameObject;
        }
        Box1.prototype.init = function () {
            this._collidingMaterial = wd.BasicMaterial.create();
            this._collidingMaterial.color = wd.Color.create("rgb(255,0,0)");
            this._collidingMaterial.init();
            this._originMaterial = this._gameObject.getComponent(wd.Geometry).material;
        };
        Box1.prototype.onContact = function (collisionObjects) {
            console.log("contact", collisionObjects.getCount());
        };
        Box1.prototype.onCollisionStart = function () {
            console.log("collision start");
            var geometry = this._gameObject.getComponent(wd.Geometry);
            geometry.material = this._collidingMaterial;
        };
        Box1.prototype.onCollisionEnd = function () {
            console.log("collision end");
            var geometry = this._gameObject.getComponent(wd.Geometry);
            geometry.material = this._originMaterial;
        };
        Box1 = __decorate([
            wd.script("box1")
        ], Box1);
        return Box1;
    })();
    sample.Box1 = Box1;
})(sample || (sample = {}));
