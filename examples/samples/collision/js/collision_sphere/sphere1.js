var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") return Reflect.decorate(decorators, target, key, desc);
    switch (arguments.length) {
        case 2: return decorators.reduceRight(function(o, d) { return (d && d(o)) || o; }, target);
        case 3: return decorators.reduceRight(function(o, d) { return (d && d(target, key)), void 0; }, void 0);
        case 4: return decorators.reduceRight(function(o, d) { return (d && d(target, key, o)) || o; }, desc);
    }
};
/// <reference path="../../../../../dist/wd.d.ts"/>
var sample;
(function (sample) {
    var Sphere1 = (function () {
        function Sphere1(gameObject) {
            this._gameObject = null;
            this._gameObject = gameObject;
        }
        Sphere1.prototype.onContact = function (collisionObjects) {
            console.log("contact", collisionObjects.getCount());
        };
        Sphere1.prototype.onCollisionStart = function () {
            console.log("collision start");
        };
        Sphere1.prototype.onCollisionEnd = function () {
            console.log("collision end");
        };
        Sphere1 = __decorate([
            wd.script("sphere1")
        ], Sphere1);
        return Sphere1;
    })();
    sample.Sphere1 = Sphere1;
})(sample || (sample = {}));
