/// <reference path="../../filePath.d.ts"/>
module wd {
    export class KinematicRigidBody extends RigidBody {
        public static create() {
            var obj = new this();

            return obj;
        }

        //todo more set
        private _velocity:Vector3 = Vector3.create(0, 0, 0);
        @operateBodyDataGetterAndSetter("Velocity")
        get velocity() {
            return this._velocity;
        }

        set velocity(velocity:Vector3) {
            this._velocity = velocity;
        }

        public mass:number = 1;


        protected addBody() {
            this.addBodyToPhysicsEngine("addKinematicBody", {
                mass: this.mass,
                velocity: this.velocity
            });
        }
    }
}

