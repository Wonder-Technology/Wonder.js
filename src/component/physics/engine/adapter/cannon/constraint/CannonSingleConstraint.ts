/// <reference path="../../../../../../filePath.d.ts"/>
module wd{
    export abstract class CannonSingleConstraint extends CannonConstraint{
        public removeConstraint(gameObject:GameObject){
            var constraint = this.constraintDataList.findConstraintByGameObject(gameObject);

            if(constraint){
                this.world.removeConstraint(constraint);
            }

            this.constraintDataList.remove(gameObject);
        }

        protected addToConstraintDataList(gameObject:GameObject, wonderConstraint:LockConstraint, cannonConstraint:CANNON.Constraint){
            this.constraintDataList.add(gameObject, cannonConstraint);
        }
    }
}
