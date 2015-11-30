/// <reference path="../../filePath.d.ts"/>
module wd{
    export abstract class Geometry extends Component{
        private _material:Material = null;
        get material(){
            return this._material;
        }
        set material(material:Material){
            this._material = material;
            this._material.geometry = this;
        }

        get geometryData(){
            return this.buffers.geometryData;
        }

        public buffers:BufferContainer = null;

        @ensure(function(){
            var geometryData = this.buffers.geometryData;

            assert(geometryData.vertices.length > 0, Log.info.FUNC_MUST("vertices.count", "> 0"));
            assert(geometryData.faces.length * 3 === geometryData.indices.length, Log.info.FUNC_SHOULD("faces.count", `be ${geometryData.indices.length / 3}, but actual is ${geometryData.faces.length}`));
        })
        public init(){
            var geometryData = null,
                {
                    vertices,
                    faces,
                    texCoords,
                    colors,
                    morphTargets
                    } = this.computeData();

            //this.buffers = BufferContainer.create();
            this.buffers = this.createBufferContainer();

            geometryData = this.createGeometryData(vertices, faces, texCoords, colors, morphTargets);

            this.buffers.geometryData = geometryData;

            this.buffers.init();

            this._material.init();

            this.computeNormals();
        }

        @virtual
        protected computeNormals(){
            if(this.isSmoothShading()){
                if(!this.hasVertexNormals()){
                    this.computeVertexNormals();
                }
            }
            else{
                if(!this.hasFaceNormals()){
                    this.computeFaceNormals();
                }
            }
        }

        @require(function(){
            assert(this.buffers && this.buffers.geometryData, Log.info.FUNC_MUST_DEFINE("buffers->geometryData"));
        })
        public hasFaceNormals(){
            return this.buffers.geometryData.hasFaceNormals();
        }

        @require(function(){
            assert(this.buffers && this.buffers.geometryData, Log.info.FUNC_MUST_DEFINE("buffers->geometryData"));
        })
        public hasVertexNormals(){
            return this.buffers.geometryData.hasVertexNormals();
        }

        public isSmoothShading(){
            return this._material.shading === Shading.SMOOTH;
        }

        public dispose(){
            this.buffers.dispose();

            this._material.dispose();
        }

        @require(function(){
            assert(this.buffers && this.buffers.geometryData, Log.info.FUNC_MUST_DEFINE("buffers->geometryData"));
        })
        public computeFaceNormals() {
            this.buffers.geometryData.computeFaceNormals();
        }

        public computeVertexNormals(){
            this.buffers.geometryData.computeVertexNormals();
        }

        protected abstract computeData(): GeometryDataType;

        @virtual
        protected createBufferContainer():BufferContainer{
            return CommonBufferContainer.create();
        }

        @virtual
        protected createGeometryData(vertices:Array<number>, faces:Array<Face3>, texCoords:Array<number>, colors:Array<number>, morphTargets:wdCb.Hash<DYFileParseMorphTargetsData>):GeometryData{
            return this.createCommonGeometryData(vertices, faces, texCoords, colors);
        }

        protected createCommonGeometryData(vertices:Array<number>, faces:Array<Face3>, texCoords:Array<number>, colors:Array<number>){
            var geometryData = CommonGeometryData.create(this);

            geometryData.vertices = vertices;
            geometryData.faces = faces;
            geometryData.texCoords = texCoords;
            geometryData.colors = colors;

            return geometryData;
        }
    }

    export type GeometryDataType = {
        vertices:Array<number>;
        faces?:Array<Face3>;
        texCoords?:Array<number>;
        colors?:Array<number>;
        morphTargets?:wdCb.Hash<DYFileParseMorphTargetsData>;
    };
}

