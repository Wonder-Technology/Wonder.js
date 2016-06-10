module wd{
    export class PhysicsEngine extends ComponentContainer{
        private static _instance = null;

        public static getInstance() {
            if (this._instance === null) {
                this._instance = new this();
            }

            return this._instance;
        }

        public physicsEngineAdapter:IPhysicsEngineAdapter = null;

        protected list:wdCb.Collection<RigidBody>;

        public removeChild(body:RigidBody){
            var physicsEngineAdapter:IPhysicsEngineAdapter = this.physicsEngineAdapter;

            super.removeChild(body);

            if(physicsEngineAdapter){
                let entityObject = body.entityObject;

                physicsEngineAdapter.removeGameObject(entityObject);

                physicsEngineAdapter.removeConstraints(entityObject);
            }
        }

        public initPhysicsEngineAdapter(){
            var physics = Director.getInstance().scene.physics;

            if(physics.enable){
                this.physicsEngineAdapter = PhysicsEngineFactory.create(physics.engine);
                this.physicsEngineAdapter.init();
            }
        }

        public initBody(){
            this.list.forEach(function(child:RigidBody){
                child.initBody();
            });
        }

        public initConstraint(){
            this.list.forEach(function(child:RigidBody){
                child.initConstraint();
            });
        }

        public update(elapsed:number){
            var physics = Director.getInstance().scene.physics;

            if(physics.enable){
                this.physicsEngineAdapter.update(elapsed);
            }
        }
    }
}

