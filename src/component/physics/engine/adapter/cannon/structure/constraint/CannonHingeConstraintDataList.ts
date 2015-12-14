/// <reference path="../../../../../../../filePath.d.ts"/>
module wd {
    export class CannonHingeConstraintDataList extends CannonSingleConstraintDataList{
        public static create() {
            var obj = new this();

            return obj;
        }

        protected dataList:wdCb.Collection<CannonHingeConstraintData>;
    }

    export type CannonHingeConstraintData = {
        gameObject:GameObject,
        constraint:CANNON.Constraint
    }
}
