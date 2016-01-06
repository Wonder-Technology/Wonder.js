module wd {
    export class CannonHingeConstraintDataList extends CannonSingleConstraintDataList{
        public static create() {
            var obj = new this();

            return obj;
        }

        protected dataList:wdCb.Collection<CannonHingeConstraintData>;
    }

    export type CannonHingeConstraintData = {
        entityObject:GameObject,
        constraint:CANNON.Constraint
    }
}
