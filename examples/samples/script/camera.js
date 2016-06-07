var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
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
            //var scene = wd.Director.getInstance().scene.scriptList.getChild("scene"),
            var scene = wd.ScriptEngine.getInstance().findScript(wd.Director.getInstance().scene, "scene"), cameraComponent = this._gameObject.getComponent(wd.CameraController).camera;
            alert("sceneScript.state is " + scene.state);
            alert("camera->fovy is " + cameraComponent.fovy);
        };
        Camera = __decorate([
            wd.script("camera")
        ], Camera);
        return Camera;
    }());
    sample.Camera = Camera;
})(sample || (sample = {}));
