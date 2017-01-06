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
            target[memberName] = GeometryUtils.mergeFace([], source[memberName]);
        })
        public faces:Array<Face3> = null;
        @cloneAttributeAsCustomType(function(source:ModelGeometry, target:ModelGeometry, memberName:string){
            target[memberName] = this._getDeepCloneMorphData(source[memberName]);
        })
        public morphVertices:wdCb.Hash<MorphTargetsData> = null;
        @cloneAttributeAsCustomType(function(source:ModelGeometry, target:ModelGeometry, memberName:string){
            target[memberName] = this._getDeepCloneMorphData(source[memberName]);
        })
        public morphFaceNormals:wdCb.Hash<wdCb.Collection<Array<number>>> = wdCb.Hash.create<wdCb.Collection<Array<number>>>();
        @cloneAttributeAsCustomType(function(source:ModelGeometry, target:ModelGeometry, memberName:string){
            target[memberName] = this._getDeepCloneMorphData(source[memberName]);
        })
        public morphVertexNormals:wdCb.Hash<wdCb.Collection<Array<number>>> = wdCb.Hash.create<wdCb.Collection<Array<number>>>();

        @cloneAttributeAsCustomType(function(source:ModelGeometry, target:ModelGeometry, memberName:string){
            target[memberName] = CloneUtils.cloneArray(source[memberName]);
        })
        public jointIndices:Array<number> = null;
        @cloneAttributeAsCustomType(function(source:ModelGeometry, target:ModelGeometry, memberName:string){
            target[memberName] = CloneUtils.cloneArray(source[memberName]);
        })
        public jointWeights:Array<number> = null;

        public buffers:any;

        private _merger:ModelGeometryMerger = ModelGeometryMerger.create();

        public hasMorphAnimation(){
            return this._hasMorphTargets() && (this.entityObject && ClassUtils.hasComponent(this.entityObject, "MorphAnimation"));
        }

        public hasSkinSkeletonAnimation(){
            return this._hasJoinData() && (this.entityObject && ClassUtils.hasComponent(this.entityObject, "SkinSkeletonAnimation"));
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
            this._merger.merge(this, geometry, transform);
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
                jointIndices: this.jointIndices,
                jointWeights: this.jointWeights,
                morphVertices: this.morphVertices
            };
        }

        @require(function(){
            if(this.hasMorphAnimation()) {
                it("entityObject with ModelGeometry should add MorphAnimation component", () => {
                    ClassUtils.hasComponent(this.entityObject, "MorphAnimation");
                }, this);
            }
        })
        protected createBufferContainer():BufferContainer{
            if(this.hasMorphAnimation()){
                let MorphBufferContainer = ClassUtils.getClass("MorphBufferContainer"),
                    MorphAnimation = ClassUtils.getClass("MorphAnimation");

                return MorphBufferContainer.create(this.entityObject, this.entityObject.getComponent<any>(MorphAnimation));
            }

            if(this.hasSkinSkeletonAnimation()){
                let SkinSkeletonBufferContainer = ClassUtils.getClass("SkinSkeletonBufferContainer"),
                    SkinSkeletonAnimation = ClassUtils.getClass("SkinSkeletonAnimation");

                return SkinSkeletonBufferContainer.create(this.entityObject);
            }

            return BasicBufferContainer.create(this.entityObject);
        }

        protected createGeometryData(computedData:ModelGeometryDataType):GeometryData{
            if(this.hasMorphAnimation()){
                let {
                        vertices,
                        faces = [],
                        texCoords,
                        colors,
                        morphVertices
                    } = computedData,
                    MorphGeometryData = ClassUtils.getClass("MorphGeometryData"),
                    geometryData = MorphGeometryData.create(this);

                geometryData.vertices = vertices;
                geometryData.faces = faces;
                geometryData.texCoords = texCoords;
                geometryData.colors = colors;
                geometryData.morphVertices = morphVertices;

                return geometryData;
            }

            if(this.hasSkinSkeletonAnimation()){
                let {
                        vertices,
                        faces = [],
                        texCoords,
                        colors,
                        jointIndices,
                        jointWeights
                    } = computedData,
                    SkinSkeletonGeometryData = ClassUtils.getClass("SkinSkeletonGeometryData"),
                    geometryData = SkinSkeletonGeometryData.create(this);

                geometryData.vertices = vertices;
                geometryData.faces = faces;
                geometryData.texCoords = texCoords;
                geometryData.colors = colors;
                geometryData.jointIndices = jointIndices;
                geometryData.jointWeights = jointWeights;

                return geometryData;
            }

            return this.createBasicGeometryData(<GeometryDataType>computedData);
        }

        private _hasMorphTargets(){
            return this.morphVertices && this.morphVertices.getCount() > 0;
        }

        @ensure(function(hasJoinData:boolean){
            it("jointIndices and jointWeights should has data", () => {
                if(!hasJoinData){
                    return;
                }

                expect(this.jointWeights && this.jointWeights.length > 0);
            });
        })
        private _hasJoinData(){
            return this.jointIndices && this.jointIndices.length > 0;
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

    export type ModelGeometryDataType = {
        vertices:Array<number>;
        faces?:Array<Face3>;
        texCoords?:Array<number>;
        colors?:Array<number>;
        jointIndices?:Array<number>;
        jointWeights?:Array<number>;
        morphVertices?:wdCb.Hash<MorphTargetsData>;
    };
}

