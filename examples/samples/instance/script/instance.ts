/// <reference path="../../../../dist/wd.d.ts"/>
module sample{
    @wd.script("instance")
    export class Instance implements wd.IScriptBehavior{
        constructor(gameObject:wd.GameObject){
            this._gameObject = gameObject;
        }

        private _gameObject:wd.GameObject = null;

        public init() {
            console.log(this._gameObject.name);
            this._gameObject.transform.scale = wd.Vector3.create(2,2,2);
        }
    }
}
