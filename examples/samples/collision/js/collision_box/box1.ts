/// <reference path="../../../../../dist/wd.d.ts"/>
module sample{
    @wd.script("box1")
    export class Box1 implements wd.IScriptBehavior{
        constructor(gameObject:wd.GameObject){
            this._gameObject = gameObject;
        }

        private _gameObject:wd.GameObject = null;
        private _collidingMaterial:wd.Material = null;
        private _originMaterial:wd.Material = null;

        public init(){
            this._collidingMaterial = wd.BasicMaterial.create();
            this._collidingMaterial.color = wd.Color.create("rgb(255,0,0)");

            this._collidingMaterial.init();

            this._originMaterial = this._gameObject.getComponent<wd.Geometry>(wd.Geometry).material;
        }

        public onContact(collisionObjects:wdCb.Collection<wd.GameObject>){
            console.log("contact", collisionObjects);
        }

        public onCollisionStart(collisionObjects:wdCb.Collection<wd.GameObject>){
            console.log("collision start", collisionObjects);

            var geometry = this._gameObject.getComponent<wd.Geometry>(wd.Geometry);

            geometry.material = this._collidingMaterial;
        }

        public onCollisionEnd(){
            console.log("collision end");
            var geometry = this._gameObject.getComponent<wd.Geometry>(wd.Geometry);

            geometry.material = this._originMaterial;
        }
    }
}

