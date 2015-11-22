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
    var Camera = (function () {
        function Camera(gameObject) {
            this._gameObject = null;
            this._gameObject = gameObject;
        }
        Camera.prototype.init = function () {
            var scene = dy.Director.getInstance().scene.script.getChild("scene"), cameraComponent = this._gameObject.getComponent(dy.CameraController).camera;
            console.log("sceneScript.state is " + scene.state);
            console.log("camera->fovy is " + cameraComponent.fovy);
        };
        Camera = __decorate([
            dy.script("camera")
        ], Camera);
        return Camera;
    })();
    sample.Camera = Camera;
})(sample || (sample = {}));
