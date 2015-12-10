/// <reference path="../../filePath.d.ts"/>
module wd {
    export class StaticRigidBody extends RigidBody{
        public static create() {
        	var obj = new this();

        	return obj;
        }

        //public mass:number = 1;
        public friction:number = 0;
        public restitution:number = 0;

        //todo more set


        private _getPhysicsEngineAdapter(){
            return Director.getInstance().scene.physicsEngineAdapter;
        }

        public init(){
            this._addBody();
        }

        private _onContact(collideObject:GameObject){
            this.gameObject.execScript("onContact", wdCb.Collection.create([collideObject]));
        }

        private _onCollisionStart(collideObject:GameObject){
            this.gameObject.execScript("onCollisionStart", wdCb.Collection.create([collideObject]));
        }

        private _onCollisionEnd(){
            this.gameObject.execScript("onCollisionEnd");
        }

        @require(function(){
            assert(this.gameObject.getComponent(Collider), Log.info.FUNC_MUST_DEFINE("collider component when add rigid body component"));
            assert(this.gameObject.getComponent(Collider).shape, Log.info.FUNC_SHOULD("create collider.shape before adding rigid body component"));
        })
        private _addBody(){
            var engineAdapter:IPhysicsEngineAdapter = this._getPhysicsEngineAdapter();

            var position = this.gameObject.transform.position,
                rotation = this.gameObject.transform.rotation,
                shape = this.gameObject.getComponent<Collider>(Collider).shape;


            engineAdapter.addStaticBody(this.gameObject, shape, {
                position: position,
                rotation: rotation,

                onContact: wdCb.FunctionUtils.bind(this, this._onContact),
                onCollisionStart: wdCb.FunctionUtils.bind(this, this._onCollisionStart),
                onCollisionEnd: wdCb.FunctionUtils.bind(this, this._onCollisionEnd),

                friction:this.friction,
                restitution:this.restitution
            });
        }
    }
}

