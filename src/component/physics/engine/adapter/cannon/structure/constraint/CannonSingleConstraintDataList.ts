/// <reference path="../../../../../../../filePath.d.ts"/>
module wd {
    export abstract class CannonSingleConstraintDataList extends CannonConstraintDataList{
        public add(obj:GameObject, constraint:CANNON.Constraint){
            this.dataList.addChild({
                entityObject:obj,
                constraint:constraint
            });
        }

        public remove(obj:GameObject){
            this.removeByGameObject(obj);
        }

        public findConstraintByGameObject(obj:GameObject){
            var result = this.dataList.findOne(({entityObject}) => {
                return JudgeUtils.isEqual(entityObject, obj);
            });

            return result !== null ? result.constraint : null;
        }
    }
}
