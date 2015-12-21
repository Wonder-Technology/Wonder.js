/// <reference path="../../../../dist/wd.d.ts"/>
module sample {
    import GameObject = wd.GameObject;
    import Collider = wd.Collider;
    import Scene = wd.Scene;
    import CameraController = wd.CameraController;
    import MouseEvent = wd.MouseEvent;

    @wd.script("RayPicking")
    export class RayPicking implements wd.IScriptBehavior {
        constructor(gameObject:GameObject) {
            this._gameObject = <Scene>gameObject;
        }

        private _gameObject:Scene = null;

        public init() {
            var self = this;

            wd.EventManager.fromEvent(wd.EventName.MOUSEDOWN)
                .subscribe(function (e:MouseEvent) {
                    self.onSelect(e);
                });
        }

        public onSelect(e:MouseEvent) {
            var pickingObjNearestToCameraPos:GameObject = null;

            pickingObjNearestToCameraPos =  this._getPickingObjNearestToCamera(e);

            if(!pickingObjNearestToCameraPos){
                return;
            }

            this._handleSelect(pickingObjNearestToCameraPos);
        }

        private _getPickingObjNearestToCamera(e:MouseEvent){
            var cameraController:CameraController = this._gameObject.camera.getComponent<CameraController>(CameraController),
                self = this;

            return this._gameObject.filter((gameObject:GameObject) => {
                    let location = e.locationInView;

                    return gameObject.hasComponent(Collider) && cameraController.isIntersectWithRay(gameObject, location.x, location.y);
                })
                .sort((a:GameObject, b:GameObject) => {
                    return self._getDistanceToCamera(a) - self._getDistanceToCamera(b);
                })
                .getChild(0);
        }

        private _getDistanceToCamera(obj:GameObject){
            return obj.transform.position.copy().sub(this._gameObject.camera.transform.position).length();
        }

        private _handleSelect(selectedObj:GameObject) {
            var tween1 = wd.Tween.create(),
                tween2 = wd.Tween.create(),
                action = null;

            console.log(`select ${selectedObj.uid}`);

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

            action = wd.Repeat.create(wd.Sequence.create(tween1, tween2), 2);

            selectedObj.addComponent(action);

            action.init();
        }
    }
}
