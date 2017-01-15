/// <reference path="../../../../../dist/wd.d.ts"/>
module sample {
    import GameObject = wd.GameObject;
    import PointEvent = wd.PointEvent;

    @wd.script("RayPicking")
    export class RayPicking implements wd.IScriptBehavior {
        constructor(gameObject:GameObject) {
            this._gameObject = gameObject;
        }

        private _gameObject:GameObject = null;

        public onPointDown(e:PointEvent){
            this._handleSelect(this._gameObject);
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
