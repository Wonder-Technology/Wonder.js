/// <reference path="../../../../../../../filePath.d.ts"/>
module wd {
    export class CannonPointToPointConstraintDataList extends CannonConstraintDataList{
        public static create() {
            var obj = new this();

            return obj;
        }

        protected dataList:wdCb.Collection<CannonPointToPointConstraintData>;

        public filter(func:(data:CannonPointToPointConstraintData) => boolean){
            return this.dataList.filter(func);
        }

        public forEach(func:(data:CannonPointToPointConstraintData) => void){
            this.dataList.forEach(func);
        }

        public add(gameObject:GameObject, pointToPointConstraint:PointToPointConstraint, constraint:CANNON.Constraint){
            this.dataList.addChild({
                gameObject:gameObject,
                pointToPointConstraint: pointToPointConstraint,
                cannonConstraint:constraint
            });
        }

        public remove(constraint: PointToPointConstraint){
            this.dataList.removeChild(({pointToPointConstraint}) => {
                return JudgeUtils.isEqual(pointToPointConstraint, constraint);
            });
        }

        public findCannonConstraintByPointToPointConstraint(constraint: PointToPointConstraint){
            var result = this.dataList.findOne(({pointToPointConstraint}) => {
                return JudgeUtils.isEqual(pointToPointConstraint, constraint);
            });

            return result !== null ? result.cannonConstraint : null;
        }
    }

    export type CannonPointToPointConstraintData = {
        gameObject:GameObject,
        pointToPointConstraint:PointToPointConstraint,
        cannonConstraint:CANNON.Constraint
    }
}
