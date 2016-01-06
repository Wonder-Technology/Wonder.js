module wd {
    export class CannonDistanceConstraintDataList extends CannonSingleConstraintDataList{
        public static create() {
            var obj = new this();

            return obj;
        }

        protected dataList:wdCb.Collection<CannonDistanceConstraintData>;
    }

    export type CannonDistanceConstraintData = {
        entityObject:GameObject,
        constraint:CANNON.Constraint
    }
}
