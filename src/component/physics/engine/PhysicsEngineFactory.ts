module wd{
    export class PhysicsEngineFactory{
        public static create(type:PhysicsEngineType){
            var result:IPhysicsEngineAdapter = null;

            switch (type){
                case PhysicsEngineType.CANNON:
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
