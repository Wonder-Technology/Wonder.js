var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
/// <reference path="../../../../dist/wd.d.ts"/>
var sample;
(function (sample) {
    var Sphere = (function () {
        function Sphere(gameObject) {
            this._gameObject = null;
            this._arr = [];
            this._gameObject = gameObject;
        }
        Sphere.prototype.init = function () {
            //this._gameObject.transform.scale = wd.Vector3.create(10,10,10);
            this._arr.push(1);
            console.log(this._gameObject.name, ":", this._arr);
        };
        Sphere = __decorate([
            wd.script("sphere")
        ], Sphere);
        return Sphere;
    }());
    sample.Sphere = Sphere;
})(sample || (sample = {}));
