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
                //todo only compute vertex normals?
                this.computeFaceNormals();
                this.computeVertexNormals();
            }
            else if(!this.hasFaceNormals()){
                this.computeFaceNormals();
            }

            //todo compute morphTarget normal
        }

        @In(function(){
            var hasFaceNormal = !this.buffers.geometryData.faces[0].faceNormal.isZero();

            if(hasFaceNormal){
                for(let face of this.buffers.geometryData.faces){
                    assert(!face.faceNormal.isZero(), Log.info.FUNC_MUST_BE("faces", "either all has face normal data or all not"));
                }
            }
            else{
                for(let face of this.buffers.geometryData.faces){
                    assert(face.faceNormal.isZero(), Log.info.FUNC_MUST_BE("faces", "either all has face normal data or all not"));
                }
            }
        })
        public hasFaceNormals(){
            return !this.buffers.geometryData.faces[0].faceNormal.isZero();
        }

        @In(function(){
            var hasVertexNormal = this.buffers.geometryData.faces[0].vertexNormals.getCount() > 0;

            if(hasVertexNormal){
                for(let face of this.buffers.geometryData.faces) {
                    assert(face.vertexNormals.getCount() > 0, Log.info.FUNC_MUST_BE("faces", "either all has vertex normal data or all not"));
                }
            }
            else{
                for(let face of this.buffers.geometryData.faces) {
                    assert(face.vertexNormals.getCount() === 0, Log.info.FUNC_MUST_BE("faces", "either all has vertex normal data or all not"));
                }
            }
        })
        public hasVertexNormals(){
            return this.buffers.geometryData.faces[0].vertexNormals.getCount() > 0;
        }

        public isSmoothShading(){
            return this._material.shading === Shading.SMOOTH;
        }

        public dispose(){
            this.buffers.dispose();

            this._material.dispose();
        }

        @In(function(){
            var geometryData:GeometryData = null;

            assert(this.buffers && this.buffers.geometryData, Log.info.FUNC_MUST_DEFINE("buffers->geometryData"));

            geometryData = this.buffers.geometryData;

            assert(GeometryUtils.hasData(geometryData.vertices), Log.info.FUNC_MUST("geometry", "contain vertices"));
            //assert(this._hasData(geometryData.indices), Log.info.FUNC_MUST("geometry", "contain indices"));
            //assert(geometryData.indices.length * 3 === geometryData.vertices.length, Log.info.FUNC_SHOULD_NOT("vertices", "be duplicated"));
            //assert(geometryData.faces.getCount() * 3 === geometryData.indices.length, Log.info.FUNC_SHOULD("faces.count", `be ${geometryData.indices.length / 3}, but actual is ${geometryData.faces.getCount()}`));
        })
        @Out(function(){
            var geometryData:GeometryData = this.buffers.geometryData;

            for(let face of geometryData.faces) {
                assert(face.faceNormal instanceof Vector3, Log.info.FUNC_SHOULD_NOT("faceNormal", "be null"));
            }
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

