/// <reference path="../../filePath.d.ts"/>
module wd {
    export class DynamicRigidBody extends RigidBody{
        public static create() {
        	var obj = new this();

        	return obj;
        }

        //todo more set

        private _velocity:Vector3 = Vector3.create(0, 0, 0);
        get velocity(){
            return this._velocity;
        }
        set velocity(velocity:Vector3){
            var engineAdapter:IPhysicsEngineAdapter = Director.getInstance().scene.physicsEngineAdapter;

            this._velocity = velocity;

            if(this.isPhysicsEngineAdapterExist()){
                this.getPhysicsEngineAdapter().velocity = this._velocity;
            }
        }

        public mass:number = 1;
        public linearDamping:number = 0;
        public angularDamping:number = 0;

        protected addBody() {
            this.addBodyToPhysicsEngine("addDynamicBody", {
                mass:this.mass,
                linearDamping:this.linearDamping,
                angularDamping:this.angularDamping,
                velocity:this.velocity
            });
        }
    }
}

