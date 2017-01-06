module wd {
    export abstract class Collider extends Component {
        get shape():Shape{
            return this.boundingRegion.shape;
        }

        public entityObject:GameObject;

        @cloneAttributeAsBasicType()
        public enable:boolean = true;
        @cloneAttributeAsCloneable()
        public boundingRegion:BoundingRegion = null;

        protected abstract type:string;

        public abstract createBoundingRegion();
        public abstract buildBoundingRegion();

        public init(){
            this.boundingRegion = this.createBoundingRegion();
            this.boundingRegion.init();

            this.buildBoundingRegion();
        }

        public addToObject(entityObject:EntityObject, isShareComponent:boolean = false){
            var engine:CollisionEngine = CollisionEngine.getInstance();

            super.addToObject(entityObject, isShareComponent);

            if(!engine.hasChild(this)){
                engine.addChild(this);
            }
        }

        public removeFromEngine(){
            CollisionEngine.getInstance().removeChild(this);
        }

        public clone(){
            return CloneUtils.clone(this);
        }

        public update(elapsed:number){
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

        @require(function(targetObject:GameObject){
            assert(!this._isSelf(targetObject), Log.info.FUNC_SHOULD_NOT("targetObject", "be self"));
            assert(targetObject.hasComponent(Collider), Log.info.FUNC_SHOULD("targetObject", "contain Collider component"));
        })
        public isCollide(targetObject:GameObject):boolean{
            var collider:Collider = null;

            collider = targetObject.getComponent<Collider>(Collider);

            if(ClassUtils.hasComponent(targetObject, "RigidBody")){
                collider.updateShape();
            }

            return this.isIntersectWith(collider);
        }

        private _isSelf(entityObject:GameObject){
            return JudgeUtils.isSelf(this.entityObject, entityObject);
        }
    }
}

