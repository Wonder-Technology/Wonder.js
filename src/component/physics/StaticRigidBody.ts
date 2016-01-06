module wd {
    export class StaticRigidBody extends RigidBody {
        public static create() {
            var obj = new this();

            return obj;
        }

        protected addBody() {
            this.addBodyToPhysicsEngine("addStaticBody");
        }
    }
}

