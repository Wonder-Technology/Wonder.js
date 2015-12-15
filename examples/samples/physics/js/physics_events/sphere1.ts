/// <reference path="../../../../../dist/wd.d.ts"/>
module sample{
    @wd.script("sphere1")
    export class Sphere1 implements wd.IScriptBehavior{
        constructor(gameObject:wd.GameObject){
            this._gameObject = gameObject;
        }

        private _gameObject:wd.GameObject = null;
        private _collidingMaterial:wd.Material = null;
        private _originMaterial:wd.Material = null;

        public init(){
            this._collidingMaterial = wd.LightMaterial.create();
            this._collidingMaterial.color = wd.Color.create("rgb(255,0,0)");

            this._collidingMaterial.init();

            this._originMaterial = this._gameObject.getComponent<wd.Geometry>(wd.Geometry).material;
        }

        public onContact(collisionObjects:wdCb.Collection<wd.GameObject>){
            console.log("contact", collisionObjects);
        }

        public onCollisionStart(collisionObjects:wdCb.Collection<wd.GameObject>){
            console.log("collision start", collisionObjects);
        }

        public onCollisionEnd(){
            console.log("collision end");
        }
    }
}

