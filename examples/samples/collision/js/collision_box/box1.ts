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
            var gameObject = this._gameObject,
                geometry =  this._gameObject.getComponent<wd.Geometry>(wd.Geometry)

            this._collidingMaterial = wd.LightMaterial.create();
            this._collidingMaterial.color = wd.Color.create("rgb(255,0,0)");

            this._collidingMaterial.geometry = geometry;
            this._collidingMaterial.init();

            this._originMaterial = geometry.material;


            wd.EventManager.fromEvent(wd.EEventName.KEYDOWN)
                .subscribe(function(e){
                    var keyState = e.keyState,
                        x = 0,
                        z = 0,
                        moveSpeedX = 0.5,
                        moveSpeedZ = 0.5;

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

