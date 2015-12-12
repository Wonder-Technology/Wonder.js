/// <reference path="../../../../../../filePath.d.ts"/>
module wd {
    export class CannonGameObjectDataList extends CannonDataList{
        public static create() {
            var obj = new this();

            return obj;
        }

        protected dataList:wdCb.Collection<GameObjectData>;

        public updateBodyTransformData(){
            this.dataList.forEach(({gameObject,body}) => {
                let transform = gameObject.transform;

                //todo consider isScale?
                if(transform.isTranslate || transform.isRotate){
                    body.position = CannonUtils.convertToCannonVector3(gameObject.transform.position);
                    body.quaternion = CannonUtils.convertToCannonQuaternion(gameObject.transform.rotation);
                }
            });

        }

        public updateGameObjectTransformData(){
            this.dataList.forEach(({gameObject,body}) => {
                if(gameObject.isRigidbodyChild){
                    return;
                }

                console.log(body.position);
                gameObject.transform.position = CannonUtils.convertToWonderVector3(body.position);
                gameObject.transform.rotation = CannonUtils.convertToWonderQuaternion(body.quaternion);
            });
        }

        public add(obj:GameObject, body:CANNON.Body){
            this.dataList.addChild({
                gameObject:obj,
                body:body
            });
        }

        public findByBody(b:CANNON.Body){
            return this.dataList.findOne(({gameObject, body}) => {
                return body === b;
            });
        }

        public findByGameObject(obj:GameObject){
            return this.dataList.findOne(({gameObject, body}) => {
                return JudgeUtils.isEqual(gameObject, obj);
            });
        }
    }

    export type GameObjectData = {
        gameObject:GameObject,
        body:CANNON.Body
    }
}
