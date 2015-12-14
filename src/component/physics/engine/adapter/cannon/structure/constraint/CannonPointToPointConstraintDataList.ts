/// <reference path="../../../../../../../filePath.d.ts"/>
module wd {
    export class CannonPointToPointConstraintDataList{
        public static create() {
            var obj = new this();

            return obj;
        }

        private _dataList:wdCb.Collection<CannonPointToPointConstraintData> = wdCb.Collection.create<CannonPointToPointConstraintData>();

        public add(pointToPointConstraint:PointToPointConstraint, constraint:CANNON.Constraint){
            this._dataList.addChild({
                pointToPointConstraint: pointToPointConstraint,
                cannonConstraint:constraint
            });
        }

        public remove(constraint: PointToPointConstraint){
            this._dataList.removeChild(({pointToPointConstraint, cannonConstraint}) => {
                return JudgeUtils.isEqual(pointToPointConstraint, constraint);
            });
        }

        public findCannonConstraintByPointToPointConstraint(constraint: PointToPointConstraint){
            var result = this._dataList.findOne(({pointToPointConstraint, cannonConstraint}) => {
                return JudgeUtils.isEqual(pointToPointConstraint, constraint);
            });

            return result !== null ? result.cannonConstraint : null;
        }
    }

    export type CannonPointToPointConstraintData = {
        pointToPointConstraint:PointToPointConstraint,
        cannonConstraint:CANNON.Constraint
    }
}
