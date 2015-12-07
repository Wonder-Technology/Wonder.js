/// <reference path="../../filePath.d.ts"/>
module wd {
    export abstract class BoundingRegion{
        constructor(gameObject:GameObject){
            this.gameObject = gameObject;
        }

        public shape:Shape = null;

        protected gameObject:GameObject = null;
        protected isUserSpecifyTheRegion:boolean = false;
        protected originShape:Shape = null;
        protected debugObject:GameObject = null;


        public init(){
            this.shape = this.createShape();
        }

        @ensure(function(returnValue, center, ...args){
            if(this.isBuildUserSpecifyBoundingRegion.apply(this, Array.prototype.slice.call(arguments, 1))){
                assert(this.shape.center.isEqual(center), Log.info.FUNC_SHOULD_NOT("transform shape when build"));
            }
            else{
                assert(this.shape.center.isZero(), Log.info.FUNC_SHOULD_NOT("transform shape when build"));
            }
        })
        public build(center:Vector3, ...args){
            var params = Array.prototype.slice.call(arguments, 0);

            if(this.isBuildUserSpecifyBoundingRegion.apply(this, params)){
                this.isUserSpecifyTheRegion = true;
                this.shape.setFromShapeParam.apply(this.shape, params);
            }
            else{
                this.shape.setFromPoints(this.gameObject.getComponent<Geometry>(Geometry).geometryData.vertices);
            }

            this.originShape = this.shape.copy();

            if(DebugConfig.debugCollision){
                this.debugObject = this.buildDebugObjectFromShape(this.shape);
                Director.getInstance().scene.addChild(this.debugObject);
            }
        }

        public update(){
            if(this.isNotTransformed()){
                return;
            }

            this.updateShape();

            if(DebugConfig.debugCollision){
                this.updateDebugObjectFromShape(this.shape);
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
        protected abstract updateShape();
        protected abstract updateDebugObjectFromShape(shape:Shape);
        protected abstract setDebugObjectGeometry(geometry:CustomGeometry, shape:Shape);

        protected buildDebugObjectFromShape(shape:Shape){
            var material = null,
                geometry = null,
                renderer = null,
                gameObject = null;

            material = wd.BasicMaterial.create();
            material.color = wd.Color.create("rgb(255,0,0)");

            geometry = wd.CustomGeometry.create();
            geometry.material = material;
            this.setDebugObjectGeometry(geometry, shape);

            renderer = wd.MeshRenderer.create();
            renderer.drawMode = DrawMode.LINES;

            gameObject = wd.GameObject.create();
            gameObject.addComponent(geometry);
            gameObject.addComponent(renderer);

            gameObject.transform.translate(shape.center);

            gameObject.init();

            return gameObject;
        }
    }
}

