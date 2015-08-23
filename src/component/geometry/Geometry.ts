/// <reference path="../../definitions.d.ts"/>
module dy{
    export class Geometry extends Component{
        private _vertices:render.ArrayBuffer = null;
        get vertices(){
            return this._vertices;
        }
        set vertices(vertices:render.ArrayBuffer){
            this._vertices = vertices;
        }

        private _indices:render.ElementBuffer = null;
        get indices(){
            return this._indices;
        }
        set indices(indices:render.ElementBuffer){
            this._indices = indices;
        }

        private _colors:render.ArrayBuffer = null;
        get colors(){
            return this._colors;
        }
        set colors(colors:render.ArrayBuffer){
            this._colors = colors;
        }

        private _material:Material = null;
        get material(){
            return this._material;
        }
        set material(material:Material){
            this._material = material;
        }

        public polygonOffsetMode:PolygonOffsetMode = PolygonOffsetMode.NONE;

        public init(){
            this._vertices = this.computeVerticesBuffer();
            this._indices = this.computeIndicesBuffer();
            //this._normals = this._computeNormals();
            //this._texCoords = this._computeTexCoords();
            //todo compute from vertexColors(refer to threejs)
            this._colors = this._computeColorsBuffer(this._material);
        }

        protected computeVerticesBuffer():render.ArrayBuffer{
            return dyCb.Log.error(true, dyCb.Log.info.ABSTRACT_METHOD);
        }

        protected computeIndicesBuffer():render.ElementBuffer{
            return dyCb.Log.error(true, dyCb.Log.info.ABSTRACT_METHOD);
        }

        private _computeColorsBuffer(material:Material){
            var arr = [],
                color = material.color,
                i = 0,
                len = this._vertices.count;

            for(i = 0; i < len; i++){
                arr.push( color.r, color.g, color.b, 1.0);
            }

            return render.ArrayBuffer.create(new Float32Array(arr), 4, render.BufferType.FLOAT);
        }
    }
}

