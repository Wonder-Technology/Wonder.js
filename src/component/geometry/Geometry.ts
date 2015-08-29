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
        
        private _texCoords:render.ArrayBuffer = null;
        get texCoords(){
            return this._texCoords;
        }
        set texCoords(texCoords:render.ArrayBuffer){
            this._texCoords = texCoords;
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

        public init(){
            this._vertices = this.computeVerticesBuffer();
            this._indices = this.computeIndicesBuffer();
            //this._normals = this._computeNormals();
            this._texCoords = this.computeTexCoordsBuffer();
            //todo compute from vertexColors(refer to threejs)
            this._colors = this._computeColorsBuffer(this._material);
        }

        public dispose(){
            this._vertices.dispose();
            this._indices.dispose();
            this._texCoords.dispose();
            this._colors.dispose();

            this.material.dispose();
        }

        public addToGameObject(gameObject:GameObject){
            dyCb.Log.assert(!gameObject.geometry, "renderer is overwrite");

            gameObject.geometry = this;
        }

        public removeFromGameObject(gameObject:GameObject){
            gameObject.geometry = null;
        }

        protected computeVerticesBuffer():render.ArrayBuffer{
            return dyCb.Log.error(true, dyCb.Log.info.ABSTRACT_METHOD);
        }

        protected computeIndicesBuffer():render.ElementBuffer{
            return dyCb.Log.error(true, dyCb.Log.info.ABSTRACT_METHOD);
        }
        
        protected computeTexCoordsBuffer():render.ArrayBuffer{
            return dyCb.Log.error(true, dyCb.Log.info.ABSTRACT_METHOD);
        }

        private _computeColorsBuffer(material:Material){
            var arr = [],
                color = material.color,
                i = 0,
                len = this._vertices.count;

            for(i = 0; i < len; i++){
                arr.push( color.r, color.g, color.b, color.a);
            }

            return render.ArrayBuffer.create(new Float32Array(arr), 4, render.BufferType.FLOAT);
        }
    }
}

