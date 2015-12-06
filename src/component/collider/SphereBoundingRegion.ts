/// <reference path="../../filePath.d.ts"/>
module wd {
    export class SphereBoundingRegion extends BoundingRegion{
        public static create(gameObject:GameObject) {
            var obj = new this(gameObject);

            return obj;
        }

        public shape:SphereShape = null;
        public isUserSpecifyTheRegion:boolean = false;

        private _originShape:SphereShape = null;
        private _debugSphere:GameObject = null;

        public init(){
            this.shape = SphereShape.create();
        }

        @ensure(function(returnValue, center:Vector3, radius:number){
            assert(this._isBuildUserSpecifyBoundingRegion(center, radius) ? this.shape.center === center : this.shape.center.isZero(), Log.info.FUNC_SHOULD_NOT("transform shape when build"));
        })
        public build(center:Vector3, radius:number){
            if(this._isBuildUserSpecifyBoundingRegion(center, radius)){
                this.isUserSpecifyTheRegion = true;
                this.shape.setFromCenterAndRadius(center, radius);
            }
            else{
                this.shape.setFromPoints(this.gameObject.getComponent<Geometry>(Geometry).geometryData.vertices);
            }

            this._originShape = this.shape.copy();

            if(DebugConfig.debugCollision){
                this._debugSphere = this._buildDebugSphereFromShape(this.shape);
                Director.getInstance().scene.addChild(this._debugSphere);
            }
        }

        public update(){
            var transform = this.gameObject.transform;

            if(this._isNotTransformed()){
                return;
            }

            this.shape.setFromTranslationAndScale(this._originShape, transform.localToWorldMatrix);

            if(DebugConfig.debugCollision){
                this._updateDebugSphereFromShape(this.shape);
            }
        }

        private _isNotTransformed(){
            var transform = this.gameObject.transform;

            //return !transform.isRotate && !transform.isTranslate && !transform.isScale;
            return !transform.isTranslate && !transform.isScale;
        }

        public isIntersectWithSphere(boundingRegion:SphereBoundingRegion){
            return this.shape.isIntersectWithSphere(boundingRegion.shape);
        }

        private _isBuildUserSpecifyBoundingRegion(center:Vector3, radius){
            return center && radius;
        }

        private _buildDebugSphereFromShape(shape:SphereShape){
            var material = null,
                geometry = null,
                renderer = null,
                gameObject = null;

            material = wd.BasicMaterial.create();
            material.color = wd.Color.create("rgb(255,0,0)");

            geometry = wd.CustomGeometry.create();
            geometry.material = material;
            this._setDebugSphereGeometryVertices(geometry, shape.radius);


            renderer = wd.MeshRenderer.create();
            renderer.drawMode = DrawMode.LINES;


            gameObject = wd.GameObject.create();
            gameObject.addComponent(geometry);
            gameObject.addComponent(renderer);

            gameObject.transform.translate(shape.center);

            gameObject.init();

            return gameObject;
        }

        @require(function(shape:SphereShape){
            assert(this._debugSphere, Log.info.FUNC_SHOULD("build debugSphere"));
        })
        private _updateDebugSphereFromShape(shape:SphereShape){
            //var geometry = this._debugSphere.getComponent<CustomGeometry>(CustomGeometry);

            //this._setDebugSphereGeometryVertices(geometry, shape.radius);


            this._debugSphere.transform.position = shape.center;

            var scaleTimes = shape.radius / this._originShape.radius;
            this._debugSphere.transform.scale = Vector3.create(scaleTimes, scaleTimes, scaleTimes);
        }

        @require(function(geometry:CustomGeometry, radius:number){
            assert(radius > 0, Log.info.FUNC_SHOULD("radius", "> 0"));
        })
        private _setDebugSphereGeometryVertices(geometry:CustomGeometry, radius:number){
            //todo refactor to utils
            //var vertices = [];
            //var latitudeBands = 20,
            //    longitudeBands = 20;
            ////var normals = [];
            ////var texCoords = [];
            ////var indices = [];
            //
            //
            //for (var latNumber = 0; latNumber <= latitudeBands; latNumber++) {
            //    var theta = latNumber * Math.PI / latitudeBands;
            //    var sinTheta = Math.sin(theta);
            //    var cosTheta = Math.cos(theta);
            //
            //    for (var longNumber = 0; longNumber <= longitudeBands; longNumber++) {
            //        var phi = longNumber * 2 * Math.PI / longitudeBands;
            //        var sinPhi = Math.sin(phi);
            //        var cosPhi = Math.cos(phi);
            //
            //        var x = radius * cosPhi * sinTheta;
            //        var y = radius *cosTheta;
            //        var z = radius *sinPhi * sinTheta;
            //        //var u = 1 - (longNumber / longitudeBands);
            //        //var v = 1 - (latNumber / latitudeBands);
            //
            //        //normals.push(x);
            //        //normals.push(y);
            //        //normals.push(z);
            //        //texCoords.push(u);
            //        //texCoords.push(v);
            //        vertices.push(x);
            //        vertices.push(y);
            //        vertices.push(z);
            //    }
            //}


            var vertices = [];

            var i, x = 0;
            var theta;
            for (var ring = 0; ring < 3; ring++) {
                var xo = 0;
                var yo = 1;
                var zo = 2;
                if (ring === 1) {
                    xo = 1;
                    yo = 0;
                    zo = 2;
                } else if (ring === 2) {
                    xo = 0;
                    yo = 2;
                    zo = 1;
                }

                for (i = 0; i < 40; i++) {
                    theta = 2 * Math.PI * (i / 40);
                    vertices[x+xo] = radius * Math.cos(theta);
                    vertices[x+yo] = 0;
                    vertices[x+zo] = radius * Math.sin(theta);
                    x += 3;

                    theta = 2 * Math.PI * ((i + 1) / 40);
                    vertices[x+xo] = radius * Math.cos(theta);
                    vertices[x+yo] = 0;
                    vertices[x+zo] = radius * Math.sin(theta);
                    x += 3;
                }
            }



            geometry.vertices = vertices;
        }
    }
}

