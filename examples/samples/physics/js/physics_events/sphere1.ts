/// <reference path="../../../../../dist/wd.d.ts"/>
module sample{
    @wd.script("sphere1")
    export class Sphere1 implements wd.IScriptBehavior{
        constructor(gameObject:wd.GameObject){
            this._gameObject = gameObject;
        }

        private _gameObject:wd.GameObject = null;

        public init(){
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

