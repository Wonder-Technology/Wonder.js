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
    var Box1 = (function () {
        function Box1(gameObject) {
            this._gameObject = null;
            this._gameObject = gameObject;
        }
        Box1.prototype.onContact = function (collisionObjects) {
            console.log("contact", collisionObjects.getCount());
        };
        Box1.prototype.onCollisionStart = function () {
            console.log("collision start");
        };
        Box1.prototype.onCollisionEnd = function () {
            console.log("collision end");
        };
        Box1 = __decorate([
            wd.script("box1")
        ], Box1);
        return Box1;
    })();
    sample.Box1 = Box1;
})(sample || (sample = {}));
