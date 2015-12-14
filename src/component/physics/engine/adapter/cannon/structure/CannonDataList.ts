/// <reference path="../../../../../../filePath.d.ts"/>
module wd {
    export abstract class CannonDataList {
        protected dataList:wdCb.Collection<any> = wdCb.Collection.create<any>();

        protected removeByGameObject(obj:GameObject){
            this.dataList.removeChild(({gameObject, body}) => {
                return JudgeUtils.isEqual(gameObject, obj);
            });
        }
    }
}

