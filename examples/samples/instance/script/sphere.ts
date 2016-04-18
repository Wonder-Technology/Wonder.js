/// <reference path="../../../../dist/wd.d.ts"/>
module sample{
    @wd.script("sphere")
    export class Sphere implements wd.IScriptBehavior{
        constructor(gameObject:wd.GameObject){
            this._gameObject = gameObject;
        }

        private _gameObject:wd.GameObject = null;
        private _arr = [];

        public init() {
            //this._gameObject.transform.scale = wd.Vector3.create(10,10,10);
            this._arr.push(1);

            console.log(this._gameObject.name, ":", this._arr);
        }
    }
}
