module wd{
    export class CannonHingeConstraint extends CannonSingleConstraint{
        public static create(world:CANNON.World, gameObjectDataList:CannonGameObjectDataList, constraintDataList:CannonHingeConstraintDataList) {
        	var obj = new this(world, gameObjectDataList, constraintDataList);

        	return obj;
        }

        protected constraintDataList:CannonHingeConstraintDataList;


        protected createCannonConstraint(body:CANNON.Body, hingeConstraint:HingeConstraint){
            var constraint:CANNON.Constraint = null,
                connectedBody:CANNON.Body = this.findBody(hingeConstraint.connectedBody),
                pivotA = CannonUtils.convertToCannonVector3(hingeConstraint.pivotA),
                axisA = CannonUtils.convertToCannonVector3(hingeConstraint.axisA),
                pivotB = CannonUtils.convertToCannonVector3(hingeConstraint.pivotB),
                axisB = CannonUtils.convertToCannonVector3(hingeConstraint.axisB),
                options:any = {};

            if(hingeConstraint.pivotA){
                options.pivotA = pivotA;
            }
            if(hingeConstraint.axisA){
                options.axisA = axisA;
            }
            if(hingeConstraint.pivotB){
                options.pivotB = pivotB;
            }
            if(hingeConstraint.axisB){
                options.axisB = axisB;
            }
            if(hingeConstraint.maxForce){
                options.maxForce = hingeConstraint.maxForce;
            }

            constraint = new CANNON.HingeConstraint(body, connectedBody, options);

            return constraint;
        }
    }
}
