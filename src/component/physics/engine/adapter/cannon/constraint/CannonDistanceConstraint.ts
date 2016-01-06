module wd{
    export class CannonDistanceConstraint extends CannonSingleConstraint{
        public static create(world:CANNON.World, gameObjectDataList:CannonGameObjectDataList, constraintDataList:CannonDistanceConstraintDataList) {
        	var obj = new this(world, gameObjectDataList, constraintDataList);

        	return obj;
        }

        protected constraintDataList:CannonDistanceConstraintDataList;


        protected createCannonConstraint(body:CANNON.Body, distanceConstraint:DistanceConstraint){
            var constraint:CANNON.Constraint = null,
                connectedBody:CANNON.Body = this.findBody(distanceConstraint.connectedBody);

            constraint = new CANNON.DistanceConstraint(body, connectedBody, distanceConstraint.distance !== null ? distanceConstraint.distance : void 0, distanceConstraint.maxForce !== null ? distanceConstraint.maxForce : void 0);

            return constraint;
        }
    }
}
