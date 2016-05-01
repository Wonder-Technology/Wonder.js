module wd{
    export class ModelGeometry extends Geometry{
        public static create(){
            var geom = new this();

            return geom;
        }

        @cloneAttributeAsCustomType(function(source:ModelGeometry, target:ModelGeometry, memberName:string){
            target[memberName] = CloneUtils.cloneArray(source[memberName]);
        })
        public vertices:Array<number> = null;
        @cloneAttributeAsCustomType(function(source:ModelGeometry, target:ModelGeometry, memberName:string){
            target[memberName] = CloneUtils.cloneArray(source[memberName]);
        })
        public colors:Array<number> = null;
        @cloneAttributeAsCustomType(function(source:ModelGeometry, target:ModelGeometry, memberName:string){
            target[memberName] = CloneUtils.cloneArray(source[memberName]);
        })
        public texCoords:Array<number> = null;
        @cloneAttributeAsCustomType(function(source:ModelGeometry, target:ModelGeometry, memberName:string){
            target[memberName] = this._mergeFace([], source[memberName]);
        })
        public faces:Array<Face3> = null;
        @cloneAttributeAsCustomType(function(source:ModelGeometry, target:ModelGeometry, memberName:string){
            target[memberName] = this._getDeepCloneMorphData(source[memberName]);
        })
        public morphTargets:wdCb.Hash<MorphTargetsData> = null;
        @cloneAttributeAsCustomType(function(source:ModelGeometry, target:ModelGeometry, memberName:string){
            target[memberName] = this._getDeepCloneMorphData(source[memberName]);
        })
        public morphFaceNormals:wdCb.Hash<wdCb.Collection<Array<number>>> = wdCb.Hash.create<wdCb.Collection<Array<number>>>();
        @cloneAttributeAsCustomType(function(source:ModelGeometry, target:ModelGeometry, memberName:string){
            target[memberName] = this._getDeepCloneMorphData(source[memberName]);
        })
        public morphVertexNormals:wdCb.Hash<wdCb.Collection<Array<number>>> = wdCb.Hash.create<wdCb.Collection<Array<number>>>();

        public buffers:MorphBufferContainer;

        public hasAnimation(){
            return this._hasMorphTargets() && (this.entityObject && this.entityObject.hasComponent(MorphAnimation));
        }

        @require(function(){
            assert(this.buffers && this.buffers.geometryData, Log.info.FUNC_MUST_DEFINE("buffers->geometryData"));
        })
        public hasMorphFaceNormals(){
            return this.buffers.geometryData.hasMorphFaceNormals();
        }

        @require(function(){
            assert(this.buffers && this.buffers.geometryData, Log.info.FUNC_MUST_DEFINE("buffers->geometryData"));
        })
        public hasMorphVertexNormals(){
            return this.buffers.geometryData.hasMorphVertexNormals();
        }

        @require(function(){
            assert(this.buffers && this.buffers.geometryData, Log.info.FUNC_MUST_DEFINE("buffers->geometryData"));
        })
        public computeMorphNormals() {
            this.buffers.geometryData.computeMorphNormals();
        }

        public merge(geometry:Geometry, transform:ThreeDTransform){
            var sourceGeometryData:GeometryDataType = this._getSourceGeometryData(),
                targetGeometryData:GeometryDataType = this._getTargetGeometryData(geometry);

            sourceGeometryData = this._initGeometryData(sourceGeometryData);

            this.faces = this._mergeTransformedFace(sourceGeometryData.faces, targetGeometryData.faces, transform, sourceGeometryData.vertices.length / 3);
            this.vertices = this._mergeData(sourceGeometryData.vertices, this._transformVertices(targetGeometryData.vertices, transform));

            this.texCoords = this._mergeData(sourceGeometryData.texCoords, targetGeometryData.texCoords);
            this.colors = this._mergeData(sourceGeometryData.colors, targetGeometryData.colors);
        }

        private _getSourceGeometryData():GeometryDataType{
            if(this.geometryData !== null){
                return this.geometryData;
            }

            return {
                vertices: this.vertices,
                texCoords: this.texCoords,
                colors: this.colors,
                faces: this.faces
            }
        }

        private _initGeometryData(geometryData:GeometryDataType){
            return {
                vertices: geometryData.vertices || [],
                texCoords: geometryData.texCoords || [],
                colors: geometryData.colors || [],
                faces: geometryData.faces || []
            }
        }

        private _getTargetGeometryData(targetGeometry:Geometry):GeometryDataType{
            if(targetGeometry.geometryData !== null){
                return targetGeometry.geometryData;
            }

            if(targetGeometry instanceof ModelGeometry){
                return {
                    vertices: targetGeometry.vertices,
                    texCoords: targetGeometry.texCoords,
                    colors: targetGeometry.colors,
                    faces: targetGeometry.faces
                }
            }

            return targetGeometry.computeData();
        }

        @require(function(vertices:Array<number>, targetTransform:ThreeDTransform){
            assert(vertices && vertices.length > 0, Log.info.FUNC_MUST("vertices.count", "> 0"));
        })
        private _transformVertices(vertices:Array<number>, targetTransform:ThreeDTransform){
            var modelMatrix = targetTransform.localToWorldMatrix,
                resultVertices:Array<number> = [];

            for (let i = 0, len = vertices.length; i < len; i += 3) {
                let transformedVec3 = Vector3.create(vertices[i], vertices[i + 1], vertices[i + 2]).applyMatrix4(modelMatrix);

                resultVertices.push(transformedVec3.x, transformedVec3.y, transformedVec3.z);
            }

            return resultVertices;
        }

        private _mergeTransformedFace(sourceFaces:Array<Face3>, targetFaces:Array<Face3>, targetTransform:ThreeDTransform, sourceVertexOffset:number){
            var normalMatrix:Matrix3 = null;

            if(!targetFaces){
                return sourceFaces;
            }

            //todo transform add normalMatrix cache
            normalMatrix = targetTransform.localToWorldMatrix.invertTo3x3().transpose();

            for(let face of targetFaces){
                let clonedFace = Face3.create(face.aIndex + sourceVertexOffset, face.bIndex + sourceVertexOffset, face.cIndex + sourceVertexOffset);

                if(face.hasFaceNormal()){
                    clonedFace.faceNormal = face.faceNormal.clone().applyMatrix3(normalMatrix);
                }

                if(face.vertexNormals){
                    let clonedVertexNormals = wdCb.Collection.create<Vector3>();

                    face.vertexNormals.forEach((normal:Vector3) => {
                        clonedVertexNormals.addChild(normal.clone().applyMatrix3(normalMatrix));
                    });

                    clonedFace.vertexNormals = clonedVertexNormals;
                }

                sourceFaces.push(clonedFace);
            }

            return sourceFaces;
        }

        private _mergeData(source:Array<number>, target:Array<number>){
            if(!target){
                return source;
            }

            return source.concat(target);
        }

        private _mergeFace(source:Array<Face3>, target:Array<Face3>){
            if(!target){
                return source;
            }

            for(let face of target){
                source.push(face.clone());
            }

            return source;
        }

        protected computeNormals(){
            super.computeNormals();

            if(this._hasMorphTargets()){
                if(this.isSmoothShading()){
                    if(!this.hasMorphVertexNormals()){
                        this.computeMorphNormals();
                    }
                }
                else{
                    if(!this.hasMorphFaceNormals()){
                        this.computeMorphNormals();
                    }
                }
            }
        }

        public computeData(){
            return <any>{
                vertices: this.vertices,
                faces: this.faces,
                texCoords: this.texCoords,
                colors: this.colors,
                morphTargets: this.morphTargets
            };
        }

        @require(function(){
            if(this.hasAnimation()) {
                assert(this.entityObject.getComponent(MorphAnimation), Log.info.FUNC_SHOULD("entityObject with ModelGeometry", "add MorphAnimation component"));
            }
        })
        protected createBufferContainer():BufferContainer{
            if(this.hasAnimation()){
                return MorphBufferContainer.create(this.entityObject, this.entityObject.getComponent<MorphAnimation>(MorphAnimation));
            }

            return CommonBufferContainer.create(this.entityObject);
        }

        protected createGeometryData(vertices:Array<number>, faces:Array<Face3>, texCoords:Array<number>, colors:Array<number>, morphTargets:wdCb.Hash<MorphTargetsData>):GeometryData{
            if(this.hasAnimation()){
                let geometryData = MorphGeometryData.create(this);

                geometryData.vertices = vertices;
                geometryData.faces = faces;
                geometryData.texCoords = texCoords;
                geometryData.colors = colors;
                geometryData.morphTargets = morphTargets;

                return geometryData;
            }

            return this.createCommonGeometryData(vertices, faces, texCoords, colors);
        }

        private _hasMorphTargets(){
            return this.morphTargets && this.morphTargets.getCount() > 0;
        }

        private _getDeepCloneMorphData(source:wdCb.Hash<wdCb.Collection<Array<number>>>){
            var result = wdCb.Hash.create<wdCb.Collection<Array<number>>>();

            if(source){
                source.forEach((data:wdCb.Collection<Array<number>>, key:string) => {
                    result.addChild(key, data.clone(true));
                });
            }

            return result;
        }
    }
}

