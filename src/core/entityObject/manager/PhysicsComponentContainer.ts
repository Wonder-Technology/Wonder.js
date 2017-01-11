module wd{
    @singleton()
    export class PhysicsComponentContainer extends ComponentContainer{
        public static getInstance():any {}

		private constructor(){super();}

        public physicsEngineAdapter:IPhysicsEngineAdapter = PhysicsEngineFactory.createNullAdapter();

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

        public initPhysicsComponentContainerAdapter(){
            var physics = Director.getInstance().scene.physics;

            this.physicsEngineAdapter = PhysicsEngineFactory.create(physics.enable, physics.engine);
            this.physicsEngineAdapter.init();
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

