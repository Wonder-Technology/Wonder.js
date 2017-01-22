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

        @ensure(function(hasData){
            if(hasData) {
                it("entityObject with ModelGeometry should add MorphAnimation component", () => {
                    expect(ClassUtils.hasComponent(this.entityObject, "MorphAnimation")).true;
                }, this);
            }
        })
        public hasMorphData(){
            return this.morphVertices && this.morphVertices.getCount() > 0;
        }

        @ensure(function(hasData){
            if(hasData) {
                it("entityObject with ModelGeometry should add SkinSkeletonAnimation component", () => {
                    expect(ClassUtils.hasComponent(this.entityObject, "SkinSkeletonAnimation")).true;
                }, this);
                it("jointIndices and jointWeights should has data", () => {
                    expect(this.jointWeights && this.jointWeights.length > 0);
                });
            }
        })
        public hasSkinSkeletonData(){
            return this.jointIndices && this.jointIndices.length > 0;
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

            if(this.hasMorphData()){
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

        protected createBufferContainer():BufferContainer{
            if(this.hasMorphData()){
                let MorphBufferContainer = ClassUtils.getClass("MorphBufferContainer"),
                    MorphAnimation = ClassUtils.getClass("MorphAnimation");

                return MorphBufferContainer.create(this.entityObject, this.entityObject.getComponent<any>(MorphAnimation));
            }

            if(this.hasSkinSkeletonData()){
                let SkinSkeletonBufferContainer = ClassUtils.getClass("SkinSkeletonBufferContainer");

                return SkinSkeletonBufferContainer.create(this.entityObject);
            }

            return BasicBufferContainer.create(this.entityObject);
        }

        protected createGeometryData(computedData:ModelGeometryDataType):GeometryData{
            if(this.hasMorphData()){
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

            if(this.hasSkinSkeletonData()){
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

