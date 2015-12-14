/// <reference path="../../../../../../filePath.d.ts"/>
module wd{
    export class CannonDistanceConstraint extends CannonConstraint{
        public static create(world:CANNON.World, gameObjectDataList:CannonGameObjectDataList, constraintDataList:CannonDistanceConstraintDataList) {
        	var obj = new this(world, gameObjectDataList, constraintDataList);

        	return obj;
        }

        protected constraintDataList:CannonDistanceConstraintDataList;


        public removeConstraint(gameObject:GameObject){
            var constraint = this.constraintDataList.findConstraintByGameObject(gameObject);

            if(constraint){
                this.world.removeConstraint(constraint);
            }

            this.constraintDataList.remove(gameObject);
        }

        protected createCannonConstraint(body:CANNON.Body, distanceConstraint:DistanceConstraint){
            var constraint:CANNON.Constraint = null,
                connectedBody:CANNON.Body = this.findBody(distanceConstraint.connectedBody);

            constraint = new CANNON.DistanceConstraint(body, connectedBody, distanceConstraint.distance !== null ? distanceConstraint.distance : void 0, distanceConstraint.maxForce !== null ? distanceConstraint.maxForce : void 0);

            return constraint;
        }

        protected addToConstraintDataList(gameObject:GameObject, wonderConstraint:DistanceConstraint, cannonConstraint:CANNON.Constraint){
            this.constraintDataList.add(gameObject, cannonConstraint);
        }
    }
}
