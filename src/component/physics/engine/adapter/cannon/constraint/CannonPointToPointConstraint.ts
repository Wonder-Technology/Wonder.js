module wd{
    export class CannonPointToPointConstraint extends CannonConstraint{
        public static create(world:CANNON.World, gameObjectDataList:CannonGameObjectDataList, constraintDataList:CannonPointToPointConstraintDataList) {
        	var obj = new this(world, gameObjectDataList, constraintDataList);

        	return obj;
        }

        protected constraintDataList:CannonPointToPointConstraintDataList;


        public removeConstraint(pointToPointConstraint:PointToPointConstraint){
            var constraint = this.constraintDataList.findCannonConstraintByPointToPointConstraint(pointToPointConstraint);

            if(constraint){
                this.world.removeConstraint(constraint);
            }

            this.constraintDataList.remove(pointToPointConstraint);
        }

        protected createCannonConstraint(body:CANNON.Body, pointToPointConstraint:PointToPointConstraint){
            var constraint:CANNON.Constraint = null,
                connectedBody:CANNON.Body = this.findBody(pointToPointConstraint.connectedBody),
                pivotA = CannonUtils.convertToCannonVector3(pointToPointConstraint.pivotA),
                pivotB = CannonUtils.convertToCannonVector3(pointToPointConstraint.pivotB);

            if(pointToPointConstraint.maxForce){
                constraint = new CANNON.PointToPointConstraint(body, pivotA, connectedBody, pivotB, pointToPointConstraint.maxForce);
            }
            else{
                constraint = new CANNON.PointToPointConstraint(body, pivotA, connectedBody, pivotB);
            }

            return constraint;
        }

        protected addToConstraintDataList(entityObject:GameObject, wdConstraint:PointToPointConstraint, cannonConstraint:CANNON.Constraint){
            this.constraintDataList.add(entityObject, wdConstraint, cannonConstraint);
        }
    }
}
