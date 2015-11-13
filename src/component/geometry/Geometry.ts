/// <reference path="../../definitions.d.ts"/>
module dy{
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



        @Out(function(){
            var geometryData = this.buffers.geometryData;

            assert(geometryData.vertices.length > 0, Log.info.FUNC_MUST("vertices.count", "> 0"));
            //assert(geometryData.indices.length * 3 === geometryData.vertices.length, Log.info.FUNC_SHOULD_NOT("vertices", "be duplicated"));
            assert(geometryData.faces.length * 3 === geometryData.indices.length, Log.info.FUNC_SHOULD("faces.count", `be ${geometryData.indices.length / 3}, but actual is ${geometryData.faces.length}`));

            //if(geometryData.normals && geometryData.normals.length > 0){
            //    geometryData.faces.forEach((face:Face3, index:number) => {
            //        assert(face.vertexNormals.getCount() === 3 && face.vertexNormals.isEqual(), Log.info.FUNC_SHOULD())
            //    })
            //
            //}
        })
        public init(){
            var geometryData = null,
                {
                    vertices,
                    faces,
                    texCoords,
                    colors
                    } = this.computeData();

            this.buffers = BufferContainer.create();

            geometryData = GeometryData.create(this);
            geometryData.vertices = vertices;
            geometryData.faces = faces;
            geometryData.texCoords = texCoords;
            geometryData.colors = colors;

            this.buffers.geometryData = geometryData;

            this._material.init();

            if(this.isSmoothShading() && !this.hasVertexNormals()){
                this.computeVertexNormals();
            }
            else if(!this.hasFaceNormals()){
                this.computeFaceNormals();
            }

            //todo compute morphTarget normal
        }

        @In(function(){
            assert(this.buffers && this.buffers.geometryData, Log.info.FUNC_MUST_DEFINE("buffers->geometryData"));
        })
        public hasFaceNormals(){
            return this.buffers.geometryData.hasFaceNormals();
        }

        @In(function(){
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

        @In(function(){
            assert(this.buffers && this.buffers.geometryData, Log.info.FUNC_MUST_DEFINE("buffers->geometryData"));
        })
        public computeFaceNormals() {
            this.buffers.geometryData.computeFaceNormals();
        }

        public computeVertexNormals(){
            this.buffers.geometryData.computeVertexNormals();
        }

        protected abstract computeData(): GeometryDataType;
    }

    export type GeometryDataType = {
        vertices:Array<number>;
        faces?:Array<Face3>;
        texCoords:Array<number>;
        colors?:Array<number>;
    };
}

