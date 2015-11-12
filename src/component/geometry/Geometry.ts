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
            assert(geometryData.indices.length * 3 === geometryData.vertices.length, Log.info.FUNC_SHOULD_NOT("vertices", "be duplicated"));
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
                //indices,
                //normals,
                    faces,
                texCoords,
                colors
                } = this.computeData();

            this.buffers = BufferContainer.create();

            geometryData = GeometryData.create(this);
            geometryData.vertices = vertices;

            //geometryData.indices = indices;
            //geometryData.normals = normals;
            //this._addFaces(geometryData, indices, normals);
            geometryData.faces = faces;

            geometryData.texCoords = texCoords;
            geometryData.colors = colors;

            this.buffers.geometryData = geometryData;

            this._material.init();

            if(!this.hasNormals()){
                if(this.isSmoothShading()){
                    //todo only compute vertex normals?
                    this.computeFaceNormals();
                    this.computeVertexNormals();
                }
                else{
                    this.computeFaceNormals();
                }
            }

            //todo compute morphTarget normal
        }

        @In(function(){
            var hasNormal = this.buffers.geometryData.faces[0].vertexNormals.getCount() > 0;

            if(hasNormal){
                for(let face of this.buffers.geometryData.faces){
                    assert(face.vertexNormals.getCount() > 0, Log.info.FUNC_MUST_BE("faces", "either all has normal data or all not"));
                }
            }
            else{
                for(let face of this.buffers.geometryData.faces){
                    assert(face.vertexNormals.getCount() === 0, Log.info.FUNC_MUST_BE("faces", "either all has normal data or all not"));
                }
            }
        })
        public hasNormals(){
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

            assert(this._hasData(geometryData.vertices), Log.info.FUNC_MUST("geometry", "contain vertices"));
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

        //todo
        public computeVertexNormals(){
            this.buffers.geometryData.computeVertexNormals();
        }

        protected abstract computeData(): GeometryDataType;

        //@In(function(geometryData:GeometryData, indices:Array<number>, normals:Array<number>){
        //    assert(indices.length > 0 && indices.length % 3 === 0, Log.info.FUNC_SHOULD("indices.count", "be 3 times"));
        //
        //    if(normals && normals.length > 0){
        //        assert(normals.length === indices.length * 3, Log.info.FUNC_SHOULD("normals.count", `be ${indices.length * 3}, but actual is ${normals.length}`));
        //    }
        //})
        //private _addFaces(geometryData:GeometryData, indices:Array<number>, normals:Array<number>){
        //    var hasData = this._hasData(normals);
        //
        //    geometryData.faces = dyCb.Collection.create<Face3>();
        //
        //    for(let i = 0, len = indices.length; i < len; i+=3){
        //        let a = indices[i],
        //            b = indices[i + 1],
        //            c = indices[i + 2],
        //            face = Face3.create(a, b, c);
        //
        //        if(hasData){
        //            face.vertexNormals = dyCb.Collection.create<Vector3>([
        //                this._getThreeComponent(normals, a),
        //                this._getThreeComponent(normals, b),
        //                this._getThreeComponent(normals, c)
        //            ]);
        //        }
        //
        //        geometryData.faces.addChild(face);
        //    }
        //}

        //todo move to utils?
        private _hasData(data:Array<number>){
            return data && data.length > 0;
        }

        ////todo move to utils?
        //private _getThreeComponent(sourceData:Array<number>, index:number){
        //    var startIndex = 3 * index;
        //
        //    return Vector3.create(
        //        sourceData[startIndex],
        //        sourceData[startIndex + 1],
        //        sourceData[startIndex + 2]
        //    );
        //}
    }

    export type GeometryDataType = {
        vertices:Array<number>;
        //todo change
        indices:Array<number>;
        normals:Array<number>;
        faces?:Array<Face3>;
        texCoords:Array<number>;
        colors?:Array<number>;
    };
}

