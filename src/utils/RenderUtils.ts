module wd{
    export class RenderUtils{
        public static getGameObjectRenderList(sourceList:wdCb.Collection<GameObject>){
            var renderList = [],
                GameObjectLOD:any = ClassUtils.getClass("GameObjectLOD");

            sourceList.forEach((child:GameObject) => {
                var activeGameObject:GameObject = null;

                if(GameObjectLOD !== void 0){
                    let gameObjectLOD = child.getComponent<any>(GameObjectLOD);

                    activeGameObject = this._getActiveGameObject(child, gameObjectLOD);


                    if(activeGameObject === null){
                        //todo optimize:use temp Collection
                        return wdCb.Collection.create<GameObject>();
                    }
                }
                else{
                    activeGameObject = child;
                }

                if(activeGameObject.isVisible && !InstanceUtils.isObjectInstance(activeGameObject)){
                    renderList.push(activeGameObject);
                }
            });

            //todo optimize:use temp Collection
            return wdCb.Collection.create<GameObject>(renderList);
        }

        public static getGameObjectRenderListForOctree(sourceList:wdCb.Collection<GameObject>){
            var renderList = [],
                GameObjectLOD:any = ClassUtils.getClass("GameObjectLOD");

            sourceList.forEach((child:GameObject) => {
                var activeGameObject:GameObject = null;

                if(GameObjectLOD !== void 0){
                    let gameObjectLOD = child.getComponent<any>(GameObjectLOD);

                    activeGameObject = this._getActiveGameObject(child, gameObjectLOD);


                    if(activeGameObject === null){
                        //todo optimize:use temp Collection
                        return wdCb.Collection.create<GameObject>();
                    }
                }
                else{
                    activeGameObject = child;
                }

                if(activeGameObject.isVisible){
                    renderList.push(activeGameObject);
                }
            });

            //todo optimize:use temp Collection
            return wdCb.Collection.create<GameObject>(renderList);
        }

        private static _getActiveGameObject(source:GameObject, gameObjectLOD:any){
            if(!!gameObjectLOD){
                return gameObjectLOD.activeGameObject;
            }

            return source;
        }
    }
}

