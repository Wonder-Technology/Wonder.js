module wd{
    export abstract class CannonSingleConstraint extends CannonConstraint{
        public removeConstraint(entityObject:GameObject){
            var constraint = this.constraintDataList.findConstraintByGameObject(entityObject);

            if(constraint){
                this.world.removeConstraint(constraint);
            }

            this.constraintDataList.remove(entityObject);
        }

        protected addToConstraintDataList(entityObject:GameObject, wdConstraint:LockConstraint, cannonConstraint:CANNON.Constraint){
            this.constraintDataList.add(entityObject, cannonConstraint);
        }
    }
}
