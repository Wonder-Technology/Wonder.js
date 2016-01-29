module wd {
    export abstract class Collider extends Component {
        get shape():Shape{
            return this.boundingRegion.shape;
        }

        public entityObject:GameObject;

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

        public isCollide(targetObject:GameObject):boolean{
            var collider:Collider = null;

            if(this._isSelf(targetObject) || !targetObject.hasComponent(Collider)){
                return false;
            }

            collider = targetObject.getComponent<Collider>(Collider);

            if(targetObject.hasComponent(RigidBody)){
                collider.updateShape();
            }

            return this.isIntersectWith(collider);
        }

        private _isSelf(entityObject:GameObject){
            return JudgeUtils.isSelf(this.entityObject, entityObject);
        }
    }
}

