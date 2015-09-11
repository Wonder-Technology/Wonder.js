/// <reference path="../../definitions.d.ts"/>
module dy{
    export class Geometry extends Component{
        public vertices:ArrayBuffer = null;
        public indices:ElementBuffer = null;
        public texCoords:ArrayBuffer = null;
        public normals:ArrayBuffer = null;
        public colors:ArrayBuffer = null;
        public material:Material = null;

        public init(){
            this.vertices = this.computeVerticesBuffer();
            this.indices = this.computeIndicesBuffer();
            this.normals = this.computeNormalsBuffer();
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

        protected computeVerticesBuffer():ArrayBuffer{
            return dyCb.Log.error(true, dyCb.Log.info.ABSTRACT_METHOD);
        }

        protected computeIndicesBuffer():ElementBuffer{
            return dyCb.Log.error(true, dyCb.Log.info.ABSTRACT_METHOD);
        }
        
        protected computeTexCoordsBuffer():ArrayBuffer{
            return dyCb.Log.error(true, dyCb.Log.info.ABSTRACT_METHOD);
        }

        protected computeNormalsBuffer():ArrayBuffer{
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

            return ArrayBuffer.create(new Float32Array(arr), 4, BufferType.FLOAT);
        }
    }
}

