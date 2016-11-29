module wd{
    export class ColliderUtils{
        @require(function(entityObject:EntityObject){
            describe("if entityObject is EWDTag.CONTAINER", function(){
                it("children->vertices should has data", () => {
                    let firstChild= entityObject.getChild(0);

                    if(!firstChild){
                        return;
                    }

                    let firstChildVertices = firstChild.getComponent(Geometry).vertices;

                    expect(firstChildVertices).exist;
                    expect(firstChildVertices.length).greaterThan(0);
                });
                it("first child->vertices.length should === second child->vertices.length", () => {
                    let firstChild= entityObject.getChild(0),
                        secondChild = entityObject.getChild(1);

                    if(!firstChild || !secondChild){
                        return;
                    }

                    let firstChildVertices = firstChild.getComponent(Geometry).vertices,
                        secondChildVertices = secondChild.getComponent(Geometry).vertices;


                    expect(firstChildVertices).exist;
                    expect(secondChildVertices).exist;
                    expect(firstChildVertices.length === secondChildVertices.length).true;
                });
            }, function(){
                return !entityObject.hasComponent(Geometry) && entityObject.hasTag(<any>EWDTag.CONTAINER);
            });
        })
        public static getVertices(entityObject:EntityObject){
            if(!entityObject.hasComponent(Geometry)){
                //todo refactor: if entityObject not has geometry data, compute boundRegion from its first child which has geometry data?
                if(entityObject.hasTag(<any>EWDTag.CONTAINER)){
                    return entityObject.getChild(0).getComponent(Geometry).vertices;
                }

                return null;
            }

            return entityObject.getComponent<Geometry>(Geometry).geometryData.vertices;
        }
    }
}