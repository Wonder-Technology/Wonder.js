module wd{
    export class PhysicsEngineFactory{
        public static create(type:EPhysicsEngineType){
            var result:IPhysicsEngineAdapter = null;

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
