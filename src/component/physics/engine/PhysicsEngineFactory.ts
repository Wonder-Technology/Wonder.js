module wd{
    export class PhysicsEngineFactory{
        public static createNullAdapter():IPhysicsEngineAdapter{
            return NullPhysicsEngineAdapter.create();
        }

        public static create(enable:boolean, type:EPhysicsEngineType):IPhysicsEngineAdapter{
            var result:IPhysicsEngineAdapter = null;

            if(!enable){
                return NullPhysicsEngineAdapter.create();
            }

            switch (type){
                case EPhysicsEngineType.CANNON:
                    result = CannonAdapter.create();
                    break;
                default:
                    wdCb.Log.error(true, wdCb.Log.info.FUNC_UNEXPECT("physics engine type"));
                    break;
            }

            return result;
        }
    }
}
