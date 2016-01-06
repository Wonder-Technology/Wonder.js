module wd {
    export class CannonLockConstraintDataList extends CannonSingleConstraintDataList{
        public static create() {
            var obj = new this();

            return obj;
        }

        protected dataList:wdCb.Collection<CannonLockConstraintData>;
    }

    export type CannonLockConstraintData = {
        entityObject:GameObject,
        constraint:CANNON.Constraint
    }
}
