/// <reference path="../../../../../../filePath.d.ts"/>
module wd {
    export abstract class CannonDataList {
        public getCount(){
            return this.dataList.getCount();
        }

        protected dataList:wdCb.Collection<any> = wdCb.Collection.create<any>();

        protected removeByGameObject(obj:GameObject){
            this.dataList.removeChild(({gameObject, body}) => {
                return JudgeUtils.isEqual(gameObject, obj);
            });
        }
    }
}

