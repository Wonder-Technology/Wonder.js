/// <reference path="../../../../../../../filePath.d.ts"/>
module wd {
    export class CannonPointToPointConstraintDataList extends CannonConstraintDataList{
        public static create() {
            var obj = new this();

            return obj;
        }

        protected dataList:wdCb.Collection<CannonPointToPointConstraintData>;

        public add(pointToPointConstraint:PointToPointConstraint, constraint:CANNON.Constraint){
            this.dataList.addChild({
                pointToPointConstraint: pointToPointConstraint,
                cannonConstraint:constraint
            });
        }

        public remove(constraint: PointToPointConstraint){
            this.dataList.removeChild(({pointToPointConstraint, cannonConstraint}) => {
                return JudgeUtils.isEqual(pointToPointConstraint, constraint);
            });
        }

        public findCannonConstraintByPointToPointConstraint(constraint: PointToPointConstraint){
            var result = this.dataList.findOne(({pointToPointConstraint, cannonConstraint}) => {
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
