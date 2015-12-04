/// <reference path="../../../../../dist/wd.d.ts"/>
module sample{
    @wd.script("box2")
    export class Box2 implements wd.IScriptBehavior{
        constructor(gameObject:wd.GameObject){
            this._gameObject = gameObject;
        }

        private _gameObject:wd.GameObject = null;

        public onContact(collisionObjects:wdCb.Collection<wd.GameObject>){
            console.log("contact", collisionObjects.getCount());
        }

        //public onCollisionStart(){
        //
        //    console.log("collision start");
        //}
        //
        //public onCollisionEnd(){
        //    console.log("collision end");
        //}
    }
}

