/// <reference path="../../../../../dist/wd.d.ts"/>
module sample{
    @wd.script("userBox")
    export class UserBox implements wd.IScriptBehavior{
        constructor(gameObject:wd.GameObject){
            this._gameObject = gameObject;
        }

        private _gameObject:wd.GameObject = null;
        private _collidingMaterial:wd.Material = null;
        private _originMaterial:wd.Material = null;

        public init(){
            var gameObject = this._gameObject;

            this._collidingMaterial = wd.BasicMaterial.create();
            this._collidingMaterial.color = wd.Color.create("rgb(255,0,0)");

            this._collidingMaterial.init();

            this._originMaterial = this._gameObject.getComponent<wd.Geometry>(wd.Geometry).material;


            var self = this;

            wd.EventManager.fromEvent(wd.EEventName.KEYDOWN)
                .subscribe(function(e){
                    var keyState = e.keyState,
                        x = 0,
                        z = 0,
                        moveSpeedX = 10,
                        moveSpeedZ = 10;

                    if (keyState["a"]) {
                        x = -moveSpeedX;
                    }
                    else if(keyState["d"]) {
                        x = moveSpeedX;
                    }
                    else if(keyState["w"]) {
                        z = -moveSpeedZ;
                    }
                    else if(keyState["s"]) {
                        z = moveSpeedZ;
                    }

                    gameObject.transform.translate(x, 0, z);
                });
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

