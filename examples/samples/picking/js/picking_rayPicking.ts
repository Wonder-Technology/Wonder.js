/// <reference path="../../../../dist/wd.d.ts"/>
module sample {
    import GameObject = wd.GameObject;
    import Collider = wd.Collider;
    import Scene = wd.Scene;
    import CameraController = wd.CameraController;

    @wd.script("RayPicking")
    export class RayPicking implements wd.IScriptBehavior {
        constructor(gameObject:GameObject) {
            this._gameObject = <Scene>gameObject;
        }

        private _gameObject:Scene = null;

        public init() {
            var self = this;

            wd.EventManager.fromEvent(this._gameObject, wd.EventName.MOUSEDOWN)
                .subscribe(function (e) {
                    self.onSelect(e);
                });
        }

        public onSelect(e) {
            var cameraController:CameraController = this._gameObject.camera.getComponent<CameraController>(CameraController);

            var self = this;

            this._gameObject.forEach((gameObject:GameObject) => {
                if(!gameObject.hasComponent(Collider)){
                    return;
                }

                var location = e.locationInView;

                    if (cameraController.isIntersectWithRay(gameObject, location.x, location.y)) {
                    self._handleSelect(gameObject);
                }
            });
        }

        private _handleSelect(selectedObj:GameObject) {
            console.log(`select ${selectedObj.uid}`);


            var tween1 = wd.Tween.create();
            var tween2 = wd.Tween.create();

            tween1.from({x: 1})
                .to({x: 2}, 300)
                .easing(wd.Tween.Easing.Cubic.InOut)
                .onUpdate(function () {
                    selectedObj.transform.scale = wd.Vector3.create(this.x, this.x, this.x);
                });

            tween2.from({x: 2})
                .to({x: 1}, 300)
                .easing(wd.Tween.Easing.Cubic.InOut)
                .onUpdate(function () {
                    selectedObj.transform.scale = wd.Vector3.create(this.x, this.x, this.x);
                });

            var action = wd.Repeat.create(wd.Sequence.create(tween1, tween2), 2);

            selectedObj.addComponent(action);

            action.init();
        }
    }
}
