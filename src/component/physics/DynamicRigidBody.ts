module wd {
    export class DynamicRigidBody extends RigidBody{
        public static create() {
        	var obj = new this();

        	return obj;
        }

        private _linearDamping:number = 0;
        @operateBodyDataGetterAndSetter("LinearDamping")
        @cloneAttributeAsBasicType()
        get linearDamping(){
            return this._linearDamping;
        }
        set linearDamping(linearDamping:number){
            this._linearDamping = linearDamping;
        }

        private _angularDamping:number = 0;
        @operateBodyDataGetterAndSetter("AngularDamping")
        @cloneAttributeAsBasicType()
        get angularDamping(){
            return this._angularDamping;
        }
        set angularDamping(angularDamping:number){
            this._angularDamping = angularDamping;
        }

        private _velocity:Vector3 = Vector3.create(0, 0, 0);
        @operateBodyDataGetterAndSetter("Velocity")
        @cloneAttributeAsCloneable()
        get velocity(){
            return this._velocity;
        }
        set velocity(velocity:Vector3){
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

        @cloneAttributeAsCloneable()
        public impulse:Vector3 = null;
        @cloneAttributeAsCloneable()
        public force:Vector3 = null;
        @cloneAttributeAsCloneable()
        public hitPoint:Vector3 = null;

        protected addBody() {
            this.addBodyToPhysicsComponentContainer("addDynamicBody", {
                mass: this.mass,

                linearDamping: this.linearDamping,
                angularDamping: this.angularDamping,
                velocity: this.velocity,
                angularVelocity: this.angularVelocity,

                impulse: this.impulse,
                force: this.force,
                hitPoint: this.hitPoint
            });
        }
    }
}

