/// <reference path="../../../../../../filePath.d.ts"/>
module wd {
    export class CannonDynamicBody extends CannonBody {
        public static create(world:CANNON.World, gameObjectDataList:CannonGameObjectDataList, materialList:CannonMaterialList) {
        	var obj = new this(world, gameObjectDataList, materialList);

        	return obj;
        }

        protected createBody({
            mass,
            linearDamping,
            angularDamping,
            velocity,
            angularVelocity
            }):CANNON.Body{
            return new CANNON.Body({
                mass: mass,
                linearDamping: linearDamping,
                angularDamping: angularDamping,
                velocity: CannonUtils.convertToCannonVector3(velocity),
                angularVelocity: CannonUtils.convertToCannonVector3(angularVelocity)
            });
        }

        protected afterAddShape(body:CANNON.Body, {
            impulse,
            force,
            hitPoint
            }):void{
            if(impulse && hitPoint){
                body.applyImpulse(CannonUtils.convertToCannonVector3(impulse), CannonUtils.convertToCannonVector3(hitPoint));
            }
            if(force && hitPoint){
                body.applyForce(CannonUtils.convertToCannonVector3(force), CannonUtils.convertToCannonVector3(hitPoint));
            }
        }
    }
}

