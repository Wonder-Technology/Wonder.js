/// <reference path="../../definitions.d.ts"/>
module dy{
    export class ModelGeometry extends Geometry{
        public static create(){
            var geom = new this();

            return geom;
        }

        public vertices:dyCb.Collection<Vector3> = dyCb.Collection.create<Vector3>();
        public normals:dyCb.Collection<Vector3> = dyCb.Collection.create<Vector3>();
        public texCoords:dyCb.Collection<Vector2> = dyCb.Collection.create<Vector2>();
        public indices:dyCb.Collection<number> = dyCb.Collection.create<number>();


        protected computeData(){
            var vertices = this._convertVector3ToArray(this.vertices),
                indices = this.indices.toArray(),
                normals = this._convertVector3ToArray(this.normals),
                texCoords = this._convertVector2ToArray(this.texCoords);


            return {
                verticeBuffer: ArrayBuffer.create(new Float32Array(vertices), 3, BufferType.FLOAT),
                indiceBuffer: ElementBuffer.create(new Uint16Array(indices), BufferType.UNSIGNED_SHORT),
                normalBuffer: ArrayBuffer.create(new Float32Array(normals), 3, BufferType.FLOAT),
                texCoordBuffer: ArrayBuffer.create(new Float32Array(texCoords), 2, BufferType.FLOAT),
                tangentBuffer: ArrayBuffer.create(new Float32Array(this.calculateTangents(vertices, normals, texCoords, indices)), 3, BufferType.FLOAT),
            };
        }

        private _convertVector3ToArray(list:dyCb.Collection<Vector3>){
            var result = [];

             for(var item of list.toArray()){
                 result.push(item.x);
                 result.push(item.y);
                 result.push(item.z);
            }

            return result;
        }

        private _convertVector2ToArray(list:dyCb.Collection<Vector2>){
            var result = [];

            for(var item of list.toArray()){
                result.push(item.x);
                result.push(item.y);
            }

            return result;
        }
    }
}

