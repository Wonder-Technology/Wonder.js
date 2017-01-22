module wd {
    export abstract class BoundingRegion{
        constructor(entityObject:GameObject){
            this.entityObject = entityObject;
        }

        @cloneAttributeAsCloneable()
        public shape:Shape = null;

        protected entityObject:GameObject = null;
        protected isUserSpecifyTheRegion:boolean = false;
        protected originShape:Shape = null;
        protected debugObject:GameObject = null;


        public abstract updateShape();

        public init(){
            this.shape = this.createShape();
        }

        public clone() {
            return CloneUtils.clone(this);
        }

        @ensure(function(returnValue, center, ...args){
            if(this.isBuildUserSpecifyBoundingRegion.apply(this, Array.prototype.slice.call(arguments, 1))){
                assert(this.shape.center.isEqual(center), Log.info.FUNC_SHOULD_NOT("transform shape when build"));
            }
            //else{
            //    assert(this.shape.center.isZero(), Log.info.FUNC_SHOULD_NOT("transform shape when build"));
            //}
        })
        public build(center:Vector3, ...args){
            var params = Array.prototype.slice.call(arguments, 0);

            if(this.isBuildUserSpecifyBoundingRegion.apply(this, params)){
                this.isUserSpecifyTheRegion = true;
                this.shape.setFromShapeParam.apply(this.shape, params);
            }
            else{
                this.shape.setFromPoints(ColliderUtils.getVertices(this.entityObject));
            }

            this.originShape = this.shape.clone();

            if(DebugConfig.debugCollision){
                this.debugObject = this.buildDebugObjectFromShape(this.shape);
                Director.getInstance().scene.addChild(this.debugObject);
            }
        }

        public update(){
            //todo consider morphVertices(if has morphVertices and not change target, return)?
            if(this.isNotTransformed()){
                return;
            }

            if(DebugConfig.debugCollision){
                this.updateShape();
                this.updateDebugObjectFromShape(this.shape);
            }
            else if(!ClassUtils.hasComponent(this.entityObject, "RigidBody")){
                this.updateShape();
            }
        }

        public isIntersectWithSphere(boundingRegion:SphereBoundingRegion){
            return this.shape.isIntersectWithSphere(boundingRegion.shape);
        }

        public isIntersectWithBox(boundingRegion:BoxBoundingRegion){
            return this.shape.isIntersectWithBox(boundingRegion.shape);
        }

        protected abstract createShape():Shape;
        protected abstract isBuildUserSpecifyBoundingRegion(...args):boolean;
        protected abstract isNotTransformed():boolean;
        protected abstract updateDebugObjectFromShape(shape:Shape);
        protected abstract setDebugObjectGeometry(geometry:CustomGeometry, shape:Shape);

        protected buildDebugObjectFromShape(shape:Shape){
            var material = null,
                geometry = null,
                renderer = null,
                entityObject = null;

            material = wd.BasicMaterial.create();
            material.color = wd.Color.create("rgb(255,0,0)");

            geometry = wd.CustomGeometry.create();
            geometry.material = material;
            geometry.drawMode = EDrawMode.LINES;
            this.setDebugObjectGeometry(geometry, shape);

            renderer = wd.MeshRenderer.create();

            entityObject = wd.GameObject.create();
            entityObject.addComponent(geometry);
            entityObject.addComponent(renderer);

            entityObject.transform.translate(shape.center);

            entityObject.name = `debugBoundingRegion${this.entityObject.uid}`;

            entityObject.init();

            return entityObject;
        }
    }
}

