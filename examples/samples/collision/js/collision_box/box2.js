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
    var Box2 = (function () {
        function Box2(gameObject) {
            this._gameObject = null;
            this._gameObject = gameObject;
        }
        Box2.prototype.onContact = function (collisionObjects) {
            console.log("contact", collisionObjects.getCount());
        };
        Box2.prototype.onCollisionStart = function () {
            console.log("collision start");
        };
        Box2.prototype.onCollisionEnd = function () {
            console.log("collision end");
        };
        Box2 = __decorate([
            wd.script("box2")
        ], Box2);
        return Box2;
    })();
    sample.Box2 = Box2;
})(sample || (sample = {}));
