/// <reference path="../../filePath.d.ts"/>
module wd {
    export abstract class Collider extends Component {
        get shape():Shape{
            return this.boundingRegion.shape;
        }

        public gameObject:GameObject;

        public type:string = ABSTRACT_ATTRIBUTE;

        public boundingRegion:BoundingRegion = null;

        public abstract createBoundingRegion();
        public abstract buildBoundingRegion();

        public init(){
            this.boundingRegion = this.createBoundingRegion();
            this.boundingRegion.init();

            this.buildBoundingRegion();
        }

        public update(elapsedTime:number){
            this.boundingRegion.update();
        }

        public updateShape(){
            this.boundingRegion.updateShape();
        }

        @require(function(collider:Collider){
            assert(collider instanceof Collider, Log.info.FUNC_SHOULD("target", "be collider"))
        })
        public isIntersectWith(collider:Collider){
            if(collider instanceof BoxCollider){
                return this.boundingRegion.isIntersectWithBox(collider.boundingRegion);
            }
            else if(collider instanceof SphereCollider){
                return this.boundingRegion.isIntersectWithSphere(collider.boundingRegion);
            }
            else{
                Log.warn(Log.info.FUNC_NOT_SUPPORT(`${this.type} collider`, `intersect with ${collider.type} collider`));
            }
        }

        public getCollideObjects(checkTargetList:wdCb.Collection<GameObject>):wdCb.Collection<GameObject>{
            var self = this,
                result = wdCb.Collection.create<GameObject>();

            checkTargetList.forEach((gameObject) => {
                var collider:Collider = null;

                if(self._isSelf(gameObject)){
                    return;
                }

                collider = gameObject.getComponent(Collider);

                if(gameObject.hasComponent(RigidBody)){
                    collider.updateShape();
                }

                if(self.isIntersectWith(collider)){
                    result.addChild(gameObject);
                }
            });

            return result;
        }

        private _isSelf(gameObject:GameObject){
            return this.gameObject.uid === gameObject.uid;
        }
    }
}

