var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") return Reflect.decorate(decorators, target, key, desc);
    switch (arguments.length) {
        case 2: return decorators.reduceRight(function(o, d) { return (d && d(o)) || o; }, target);
        case 3: return decorators.reduceRight(function(o, d) { return (d && d(target, key)), void 0; }, void 0);
        case 4: return decorators.reduceRight(function(o, d) { return (d && d(target, key, o)) || o; }, desc);
    }
};
/// <reference path="../../../dist/wd.d.ts"/>
var sample;
(function (sample) {
    var Camera = (function () {
        function Camera(gameObject) {
            this._gameObject = null;
            this._gameObject = gameObject;
        }
        Camera.prototype.init = function () {
            var scene = wd.Director.getInstance().scene.script.getChild("scene"), cameraComponent = this._gameObject.getComponent(wd.CameraController).camera;
            alert("sceneScript.state is " + scene.state);
            alert("camera->fovy is " + cameraComponent.fovy);
        };
        Camera = __decorate([
            wd.script("camera")
        ], Camera);
        return Camera;
    })();
    sample.Camera = Camera;
})(sample || (sample = {}));
