module wd {
    export class CannonKinematicBody extends CannonBody {
        public static create(world:CANNON.World, gameObjectDataList:CannonGameObjectDataList, materialList:CannonMaterialList) {
            var obj = new this(world, gameObjectDataList, materialList);

            return obj;
        }

        protected createBody({
            mass,
            velocity,
            angularVelocity
            }):CANNON.Body{
            return new CANNON.Body({
                type: CANNON.Body.KINEMATIC,

                mass: mass,
                velocity: CannonUtils.convertToCannonVector3(velocity),
                angularVelocity: CannonUtils.convertToCannonVector3(angularVelocity)
            });
        }
    }
}

