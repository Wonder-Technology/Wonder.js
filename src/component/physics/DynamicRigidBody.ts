/// <reference path="../../filePath.d.ts"/>
module wd {
    export class DynamicRigidBody extends RigidBody{
        public static create() {
        	var obj = new this();

        	return obj;
        }

        //todo more set

        private _velocity:Vector3 = Vector3.create(0, 0, 0);
        @operateBodyDataGetterAndSetter("Velocity")
        get velocity(){
            return this._velocity;
        }
        set velocity(velocity:Vector3){
            this._velocity = velocity;
        }

        private _angularVelocity:Vector3 = Vector3.create(0, 0, 0);
        @operateBodyDataGetterAndSetter("AngularVelocity")
        get angularVelocity(){
            return this._angularVelocity;
        }
        set angularVelocity(angularVelocity:Vector3){
            this._angularVelocity = angularVelocity;
        }

        public mass:number = 1;
        public linearDamping:number = 0;
        public angularDamping:number = 0;

        protected addBody() {
            this.addBodyToPhysicsEngine("addDynamicBody", {
                mass: this.mass,
                linearDamping: this.linearDamping,
                angularDamping: this.angularDamping,
                velocity: this.velocity,
                angularVelocity: this.angularVelocity
            });
        }
    }
}

