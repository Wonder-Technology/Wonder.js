module wd{
    export class CannonLockConstraint extends CannonSingleConstraint{
        public static create(world:CANNON.World, gameObjectDataList:CannonGameObjectDataList, constraintDataList:CannonLockConstraintDataList) {
        	var obj = new this(world, gameObjectDataList, constraintDataList);

        	return obj;
        }

        protected constraintDataList:CannonLockConstraintDataList;


        protected createCannonConstraint(body:CANNON.Body, lockConstraint:LockConstraint){
            var constraint:CANNON.Constraint = null,
                connectedBody:CANNON.Body = this.findBody(lockConstraint.connectedBody);

            if(lockConstraint.maxForce){
                constraint = new CANNON.LockConstraint(body, connectedBody, lockConstraint.maxForce);
            }
            else{
                constraint = new CANNON.LockConstraint(body, connectedBody);
            }

            return constraint;
        }
    }
}
