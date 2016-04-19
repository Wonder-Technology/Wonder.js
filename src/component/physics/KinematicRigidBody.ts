module wd {
    export class KinematicRigidBody extends RigidBody {
        public static create() {
            var obj = new this();

            return obj;
        }

        private _velocity:Vector3 = Vector3.create(0, 0, 0);
        @operateBodyDataGetterAndSetter("Velocity")
        @cloneAttributeAsCloneable()
        get velocity() {
            return this._velocity;
        }

        set velocity(velocity:Vector3) {
            this._velocity = velocity;
        }

        private _angularVelocity:Vector3 = Vector3.create(0, 0, 0);
        @operateBodyDataGetterAndSetter("AngularVelocity")
        @cloneAttributeAsCloneable()
        get angularVelocity(){
            return this._angularVelocity;
        }
        set angularVelocity(angularVelocity:Vector3){
            this._angularVelocity = angularVelocity;
        }

        private _mass:number = 1;
        @operateBodyDataGetterAndSetter("Mass")
        @cloneAttributeAsBasicType()
        get mass(){
            return this._mass;
        }
        set mass(mass:number){
            this._mass = mass;
        }


        protected addBody() {
            this.addBodyToPhysicsEngine("addKinematicBody", {
                mass: this.mass,
                velocity: this.velocity,
                angularVelocity: this.angularVelocity
            });
        }
    }
}

