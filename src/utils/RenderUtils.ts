module wd{
    export class RenderUtils{
        public static getGameObjectRenderList(sourceList:wdCb.Collection<GameObject>){
            var renderList = [];

            sourceList.forEach((child:GameObject) => {
                var gameObjectLOD = child.getComponent<GameObjectLOD>(GameObjectLOD),
                activeGameObject:GameObject = null;

                activeGameObject = this._getActiveGameObject(child);


                if(activeGameObject === null){
                    //todo optimize:use temp Collection
                    return wdCb.Collection.create<GameObject>();
                }


                if(activeGameObject.isVisible && !InstanceUtils.isObjectInstance(activeGameObject)){
                    renderList.push(activeGameObject);
                }
            });

            //todo optimize:use temp Collection
            return wdCb.Collection.create<GameObject>(renderList);
        }

        public static getGameObjectRenderListForOctree(sourceList:wdCb.Collection<GameObject>){
            var renderList = [];

            sourceList.forEach((child:GameObject) => {
                var gameObjectLOD = child.getComponent<GameObjectLOD>(GameObjectLOD),
                    activeGameObject:GameObject = null;

                activeGameObject = this._getActiveGameObject(child);


                if(activeGameObject === null){
                    //todo optimize:use temp Collection
                    return wdCb.Collection.create<GameObject>();
                }


                if(activeGameObject.isVisible){
                    renderList.push(activeGameObject);
                }
            });

            //todo optimize:use temp Collection
            return wdCb.Collection.create<GameObject>(renderList);
        }

        private static _getActiveGameObject(source:GameObject){
            var gameObjectLOD = source.getComponent<GameObjectLOD>(GameObjectLOD);

            if(gameObjectLOD){
                return gameObjectLOD.activeGameObject;
            }

            return source;
        }
    }
}

