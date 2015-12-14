/// <reference path="../../../../../../filePath.d.ts"/>
module wd{
    export class CannonLockConstraint extends CannonConstraint{
        public static create(world:CANNON.World, gameObjectDataList:CannonGameObjectDataList, constraintDataList:CannonLockConstraintDataList) {
        	var obj = new this(world, gameObjectDataList, constraintDataList);

        	return obj;
        }

        protected constraintDataList:CannonLockConstraintDataList;


        public removeConstraint(gameObject:GameObject){
            var constraint = this.constraintDataList.findConstraintByGameObject(gameObject);

            if(constraint){
                this.world.removeConstraint(constraint);
            }

            this.constraintDataList.remove(gameObject);
        }

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

        protected addToConstraintDataList(gameObject:GameObject, wonderConstraint:LockConstraint, cannonConstraint:CANNON.Constraint){
            this.constraintDataList.add(gameObject, cannonConstraint);
        }
    }
}
