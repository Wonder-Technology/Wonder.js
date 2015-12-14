/// <reference path="../../../../../../filePath.d.ts"/>
module wd {
    export class CannonLockConstraintDataList{
        public static create() {
            var obj = new this();

            return obj;
        }

        private _dataList:wdCb.Collection<CannonLockConstraintData> = wdCb.Collection.create<CannonLockConstraintData>();

        public add(obj:GameObject, constraint:CANNON.Constraint){
            this._dataList.addChild({
                gameObject:obj,
                constraint:constraint
            });
        }

        //todo refactor?
        public remove(obj:GameObject){
            this._dataList.removeChild(({gameObject, body}) => {
                return JudgeUtils.isEqual(gameObject, obj);
            });
        }

        public findConstraintByGameObject(obj:GameObject){
            var result = this._dataList.findOne(({gameObject, constraint}) => {
                return JudgeUtils.isEqual(gameObject, obj);
            });

            return result !== null ? result.constraint : null;
        }
    }

    export type CannonLockConstraintData = {
        gameObject:GameObject,
        constraint:CANNON.Constraint
    }
}
