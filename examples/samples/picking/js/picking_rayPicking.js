var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
/// <reference path="../../../../dist/wd.d.ts"/>
var sample;
(function (sample) {
    var Collider = wd.Collider;
    var CameraController = wd.CameraController;
    var RayPicking = (function () {
        function RayPicking(gameObject) {
            this._gameObject = null;
            this._gameObject = gameObject;
        }
        RayPicking.prototype.init = function () {
            var self = this;
            wd.EventManager.fromEvent(this._gameObject, wd.EventName.MOUSEDOWN)
                .subscribe(function (e) {
                self.onSelect(e);
            });
        };
        RayPicking.prototype.onSelect = function (e) {
            var cameraController = this._gameObject.camera.getComponent(CameraController);
            var self = this;
            this._gameObject.forEach(function (gameObject) {
                if (!gameObject.hasComponent(Collider)) {
                    return;
                }
                var location = e.locationInView;
                if (cameraController.isIntersectWithRay(gameObject, location.x, location.y)) {
                    self._handleSelect(gameObject);
                }
            });
        };
        RayPicking.prototype._handleSelect = function (selectedObj) {
            console.log("select " + selectedObj.uid);
            var tween1 = wd.Tween.create();
            var tween2 = wd.Tween.create();
            tween1.from({ x: 1 })
                .to({ x: 2 }, 300)
                .easing(wd.Tween.Easing.Cubic.InOut)
                .onUpdate(function () {
                selectedObj.transform.scale = wd.Vector3.create(this.x, this.x, this.x);
            });
            tween2.from({ x: 2 })
                .to({ x: 1 }, 300)
                .easing(wd.Tween.Easing.Cubic.InOut)
                .onUpdate(function () {
                selectedObj.transform.scale = wd.Vector3.create(this.x, this.x, this.x);
            });
            var action = wd.Repeat.create(wd.Sequence.create(tween1, tween2), 2);
            selectedObj.addComponent(action);
            action.init();
        };
        RayPicking = __decorate([
            wd.script("RayPicking")
        ], RayPicking);
        return RayPicking;
    })();
    sample.RayPicking = RayPicking;
})(sample || (sample = {}));
