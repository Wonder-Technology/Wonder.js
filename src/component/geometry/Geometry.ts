/// <reference path="../../definitions.d.ts"/>
module dy{
    export class Geometry extends Component{
        public vertices:render.ArrayBuffer = null;
        public indices:render.ElementBuffer = null;
        public texCoords:render.ArrayBuffer = null;
        public colors:render.ArrayBuffer = null;
        public material:Material = null;

        public init(){
            this.vertices = this.computeVerticesBuffer();
            this.indices = this.computeIndicesBuffer();
            //this.normals = this.computeNormals();
            this.texCoords = this.computeTexCoordsBuffer();
            //todo compute from vertexColors(refer to threejs)
            this.colors = this._computeColorsBuffer(this.material);

            this.material.init();
        }

        public dispose(){
            this.vertices.dispose();
            this.indices.dispose();
            this.texCoords.dispose();
            this.colors.dispose();

            this.material.dispose();
        }

        public addToGameObject(gameObject:GameObject){
            super.addToGameObject(gameObject);

            dyCb.Log.assert(!gameObject.geometry, "renderer is overwrite");

            gameObject.geometry = this;
        }

        public removeFromGameObject(gameObject:GameObject){
            super.removeFromGameObject(gameObject);

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
                len = this.vertices.count;

            for(i = 0; i < len; i++){
                arr.push( color.r, color.g, color.b, color.a);
            }

            return render.ArrayBuffer.create(new Float32Array(arr), 4, render.BufferType.FLOAT);
        }
    }
}

