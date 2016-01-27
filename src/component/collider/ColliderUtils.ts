module wd{
    export class ColliderUtils{
        @require(function(entityObject:EntityObject){
            if(!entityObject.hasComponent(Geometry)){
                if(entityObject.hasTag(<any>WDTag.CONTAINER)){
                    let firstChildVertices = entityObject.getChild(0).getComponent(Geometry).vertices,
                        secondChildVertices = entityObject.getChild(1).getComponent(Geometry).vertices;

                    assert(!!firstChildVertices && firstChildVertices.length === secondChildVertices.length, Log.info.FUNC_SHOULD("if entityObject is WDTag.CONTAINER, then its children should has its vertices"));
                }
            }
        })
        public static getVertices(entityObject:EntityObject){
            if(!entityObject.hasComponent(Geometry)){
                if(entityObject.hasTag(<any>WDTag.CONTAINER)){
                    return entityObject.getChild(0).getComponent(Geometry).vertices;
                }

                return null;
            }

            return entityObject.getComponent<Geometry>(Geometry).geometryData.vertices;
        }
    }
}