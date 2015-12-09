/// <reference path="../../filePath.d.ts"/>
module wd {
    export class DynamicRigidBody extends RigidBody{
        public static create() {
        	var obj = new this();

        	return obj;
        }

        public mass:number = 1;
        public linearDamping:number = 0;
        public angularDamping:number = 0;
        public friction:number = 0;
        public restitution:number = 0;
        //public velocity:Vector3 = Vector3.create(0, 0, 0);

        //todo more set


        private _velocity:Vector3 = Vector3.create(0, 0, 0);
        get velocity(){
            return this._velocity;
        }
        set velocity(velocity:Vector3){
            var engineAdapter:IPhysicsEngineAdapter = Director.getInstance().scene.physicsEngineAdapter;

            this._velocity = velocity;

            if(this._isPhysicsEngineAdapterExist()){
                this._getPhysicsEngineAdapter().velocity = this._velocity;
            }
        }

        //@require(function(time:number){
        //    assert(this._isPhysicsEngineAdapterExist(), Log.info.FUNC_MUST_DEFINE("physics engine adapter"));
        //})
        //public update(time:number){
        //    //this._getPhysicsEngineAdapter().position = this.gameObject.transform.position;
        //    this._getPhysicsEngineAdapter().update(time);
        //}

        private _isPhysicsEngineAdapterExist(){
            return !!Director.getInstance().scene && !!Director.getInstance().scene.physicsEngineAdapter;
        }

        private _getPhysicsEngineAdapter(){
            return Director.getInstance().scene.physicsEngineAdapter;
        }

        //public type:RigidBodyType = RigidBodyType.DYNAMIC;

        public init(){
            this._addBody();
        }

        @require(function(){
            assert(this.gameObject.getComponent(Collider), Log.info.FUNC_MUST_DEFINE("collider component when add rigid body component"));
            assert(this.gameObject.getComponent(Collider).shape, Log.info.FUNC_SHOULD("create collider.shape before adding rigid body component"));
        })
        private _addBody(){
            var engineAdapter:IPhysicsEngineAdapter = this._getPhysicsEngineAdapter();

            var position = this.gameObject.transform.position,
                shape = this.gameObject.getComponent<Collider>(Collider).shape;


            engineAdapter.addDynamicBody(this.gameObject, shape, {
                mass:this.mass,
                position: position,
                linearDamping:this.linearDamping,
                angularDamping:this.angularDamping,
                friction:this.friction,
                restitution:this.restitution,
                velocity:this.velocity
            });
        }
    }
}

