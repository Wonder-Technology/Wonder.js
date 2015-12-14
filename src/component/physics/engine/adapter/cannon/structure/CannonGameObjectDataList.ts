/// <reference path="../../../../../../filePath.d.ts"/>
module wd {
    export class CannonGameObjectDataList{
        public static create() {
            var obj = new this();

            return obj;
        }

        private _dataList:wdCb.Collection<CannonGameObjectData> = wdCb.Collection.create<CannonGameObjectData>();

        public remove(obj:GameObject){
            this._dataList.removeChild(({gameObject, body}) => {
                return JudgeUtils.isEqual(gameObject, obj);
            });
        }

        public updateBodyTransformData(){
            this._dataList.forEach(({gameObject,body}) => {
                let transform = gameObject.transform;

                //todo consider isScale?
                if(transform.isTranslate || transform.isRotate){
                    body.position = CannonUtils.convertToCannonVector3(gameObject.transform.position);
                    body.quaternion = CannonUtils.convertToCannonQuaternion(gameObject.transform.rotation);
                }
            });

        }

        public updateGameObjectTransformData(){
            this._dataList.forEach(({gameObject,body}) => {
                if(gameObject.isRigidbodyChild){
                    return;
                }

                gameObject.transform.position = CannonUtils.convertToWonderVector3(body.position);
                gameObject.transform.rotation = CannonUtils.convertToWonderQuaternion(body.quaternion);
            });
        }

        public add(obj:GameObject, body:CANNON.Body){
            this._dataList.addChild({
                gameObject:obj,
                body:body
            });
        }

        public findGameObjectByBody(b:CANNON.Body){
            var result = this._dataList.findOne(({gameObject, body}) => {
                return body === b;
            });

            return result !== null ? result.gameObject : null;
        }

        public findBodyByGameObject(obj:GameObject):any{
            var result = this._dataList.findOne(({gameObject, body}) => {
                return JudgeUtils.isEqual(gameObject, obj);
            });

            return result !== null ? result.body : null;
        }
    }

    export type CannonGameObjectData = {
        gameObject:GameObject,
        body:CANNON.Body
    }
}
