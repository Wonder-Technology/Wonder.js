module wd {
    export class CannonGameObjectDataList extends CannonDataList{
        public static create() {
            var obj = new this();

            return obj;
        }

        protected dataList:wdCb.Collection<CannonGameObjectData>;

        public remove(obj:GameObject){
            this.removeByGameObject(obj);
        }

        public updateBodyTransformData(){
            this.dataList.forEach(({entityObject,body}) => {
                let transform = entityObject.transform;

                //todo consider isScale?
                if(transform.isTranslate || transform.isRotate){
                    body.position = CannonUtils.convertToCannonVector3(entityObject.transform.position);
                    body.quaternion = CannonUtils.convertToCannonQuaternion(entityObject.transform.rotation);
                }
            });

        }

        public updateGameObjectTransformData(){
            this.dataList.forEach(({entityObject,body}) => {
                if(entityObject.hasTag("isRigidbodyChild")){
                    return;
                }

                entityObject.transform.position = CannonUtils.convertToWonderVector3(body.position);
                entityObject.transform.rotation = CannonUtils.convertToWonderQuaternion(body.quaternion);
            });
        }

        public add(obj:GameObject, body:CANNON.Body){
            this.dataList.addChild({
                entityObject:obj,
                body:body
            });
        }

        public findGameObjectByBody(b:CANNON.Body){
            var result = this.dataList.findOne(({entityObject, body}) => {
                return body === b;
            });

            return result !== null ? result.entityObject : null;
        }

        public findBodyByGameObject(obj:GameObject):any{
            var result = this.dataList.findOne(({entityObject, body}) => {
                return JudgeUtils.isEqual(entityObject, obj);
            });

            return result !== null ? result.body : null;
        }
    }

    export type CannonGameObjectData = {
        entityObject:GameObject,
        body:CANNON.Body
    }
}
