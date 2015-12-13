/// <reference path="../../../../../../filePath.d.ts"/>
module wd {
    export class CannonConstraintDataMap{
        public static create() {
            var obj = new this();

            return obj;
        }

        private _dataMap:wdCb.Hash<wdCb.Collection<CannonConstraintData>> = wdCb.Hash.create<wdCb.Collection<CannonConstraintData>>();

        public add(type:CannonConstraintType, obj:GameObject, constraint:CANNON.Constraint){
            this._dataMap.appendChild(<any>type, {
                gameObject:obj,
                constraint:constraint
            });
        }

        public findConstraintByGameObject(type:CannonConstraintType, obj:GameObject){
            var result = this._dataMap.getChild(<any>type).findOne(({gameObject, constraint}) => {
                return JudgeUtils.isEqual(gameObject, obj);
            });

            return result !== null ? result.constraint : null;
        }
    }

    export type CannonConstraintData = {
        gameObject:GameObject,
        constraint:CANNON.Constraint
    }
}
