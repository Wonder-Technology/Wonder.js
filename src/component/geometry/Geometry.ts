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

        public verticeBuffer:ArrayBuffer = null;
        public indiceBuffer:ElementBuffer = null;
        public texCoordBuffer:ArrayBuffer = null;
        public normalBuffer:ArrayBuffer = null;
        public tangentBuffer:ArrayBuffer = null;
        public colorBuffer:ArrayBuffer = null;

        public init(){
            var {
                verticeBuffer,
                indiceBuffer,
                normalBuffer,
                texCoordBuffer,
                tangentBuffer
                } = this.computeData();
            this.verticeBuffer = verticeBuffer;
            this.indiceBuffer = indiceBuffer;
            this.normalBuffer = normalBuffer;
            this.texCoordBuffer = texCoordBuffer;
            this.tangentBuffer = tangentBuffer;

            //todo compute from vertexColors(refer to threejs)
            this.colorBuffer = this._computeColorsBuffer(this._material);

            this._material.init();
        }

        public dispose(){
            this.verticeBuffer.dispose();
            this.indiceBuffer.dispose();
            this.texCoordBuffer.dispose();
            this.colorBuffer.dispose();

            this._material.dispose();
        }

        public addToGameObject(gameObject:GameObject){
            super.addToGameObject(gameObject);

            Log.assert(!gameObject.geometry, "renderer is overwrite");

            gameObject.geometry = this;
        }

        public removeFromGameObject(gameObject:GameObject){
            super.removeFromGameObject(gameObject);

            gameObject.geometry = null;
        }

        protected abstract computeData(): GeometryData;

        /**
         * @function
         * @name pc.calculateTangents
         * @description Generates tangent information from the specified verticeBuffer, normalBuffer, texture coordinates
         * and triangle indiceBuffer.
         * @param {[Number]} verticeBuffer An array of 3-dimensional vertex positions.
         * @param {[Number]} normalBuffer An array of 3-dimensional vertex normalBuffer.
         * @param {[Number]} uvs An array of 2-dimensional vertex texture coordinates.
         * @param {[Number]} indiceBuffer An array of triangle indiceBuffer.
         * @returns {[Number]} An array of 3-dimensional vertex tangentBuffer.
         * @example
         * var tangentBuffer = pc.calculateTangents(verticeBuffer, normalBuffer, uvs, indiceBuffer);
         * var mesh = pc.createMesh(verticeBuffer, normalBuffer, tangentBuffer, uvs, indiceBuffer);
         * @see pc.createMesh
         * @author Will Eastcott
         */
        protected calculateTangents(verticeBuffer:number[], normalBuffer:number[], uvs:number[], indiceBuffer:number[]) {
            var triangleCount = indiceBuffer.length / 3;
            var vertexCount   = verticeBuffer.length / 3;
            var i1, i2, i3;
            var x1, x2, y1, y2, z1, z2, s1, s2, t1, t2, r;
            var sdir = Vector3.create();
            var tdir = Vector3.create();
            var v1   = Vector3.create();
            var v2   = Vector3.create();
            var v3   = Vector3.create();
            var w1   = Vector2.create();
            var w2   = Vector2.create();
            var w3   = Vector2.create();
            var i; // Loop counter
            var tan1 = new Float32Array(vertexCount * 3);
            var tan2 = new Float32Array(vertexCount * 3);

            var tangentBuffer = [];

            for (i = 0; i < triangleCount; i++) {
                i1 = indiceBuffer[i * 3];
                i2 = indiceBuffer[i * 3 + 1];
                i3 = indiceBuffer[i * 3 + 2];

                v1.set(verticeBuffer[i1 * 3], verticeBuffer[i1 * 3 + 1], verticeBuffer[i1 * 3 + 2]);
                v2.set(verticeBuffer[i2 * 3], verticeBuffer[i2 * 3 + 1], verticeBuffer[i2 * 3 + 2]);
                v3.set(verticeBuffer[i3 * 3], verticeBuffer[i3 * 3 + 1], verticeBuffer[i3 * 3 + 2]);

                w1.set(uvs[i1 * 2], uvs[i1 * 2 + 1]);
                w2.set(uvs[i2 * 2], uvs[i2 * 2 + 1]);
                w3.set(uvs[i3 * 2], uvs[i3 * 2 + 1]);

                x1 = v2.x - v1.x;
                x2 = v3.x - v1.x;
                y1 = v2.y - v1.y;
                y2 = v3.y - v1.y;
                z1 = v2.z - v1.z;
                z2 = v3.z - v1.z;

                s1 = w2.x - w1.x;
                s2 = w3.x - w1.x;
                t1 = w2.y - w1.y;
                t2 = w3.y - w1.y;

                r = 1.0 / (s1 * t2 - s2 * t1);
                sdir.set((t2 * x1 - t1 * x2) * r,
                    (t2 * y1 - t1 * y2) * r,
                    (t2 * z1 - t1 * z2) * r);
                tdir.set((s1 * x2 - s2 * x1) * r,
                    (s1 * y2 - s2 * y1) * r,
                    (s1 * z2 - s2 * z1) * r);

                tan1[i1 * 3 + 0] += sdir.x;
                tan1[i1 * 3 + 1] += sdir.y;
                tan1[i1 * 3 + 2] += sdir.z;
                tan1[i2 * 3 + 0] += sdir.x;
                tan1[i2 * 3 + 1] += sdir.y;
                tan1[i2 * 3 + 2] += sdir.z;
                tan1[i3 * 3 + 0] += sdir.x;
                tan1[i3 * 3 + 1] += sdir.y;
                tan1[i3 * 3 + 2] += sdir.z;

                tan2[i1 * 3 + 0] += tdir.x;
                tan2[i1 * 3 + 1] += tdir.y;
                tan2[i1 * 3 + 2] += tdir.z;
                tan2[i2 * 3 + 0] += tdir.x;
                tan2[i2 * 3 + 1] += tdir.y;
                tan2[i2 * 3 + 2] += tdir.z;
                tan2[i3 * 3 + 0] += tdir.x;
                tan2[i3 * 3 + 1] += tdir.y;
                tan2[i3 * 3 + 2] += tdir.z;
            }

            t1 = Vector3.create();
            t2 = Vector3.create();
            var n = Vector3.create();
            var temp = Vector3.create();

            for (i = 0; i < vertexCount; i++) {
                n.set(normalBuffer[i * 3], normalBuffer[i * 3 + 1], normalBuffer[i * 3 + 2]);
                t1.set(tan1[i * 3], tan1[i * 3 + 1], tan1[i * 3 + 2]);
                t2.set(tan2[i * 3], tan2[i * 3 + 1], tan2[i * 3 + 2]);

                // Gram-Schmidt orthogonalize
                var ndott = n.dot(t1);
                temp = n.copy().scale(ndott);
                temp.sub2(t1, temp).normalize();

                tangentBuffer[i * 4]     = temp.x;
                tangentBuffer[i * 4 + 1] = temp.y;
                tangentBuffer[i * 4 + 2] = temp.z;

                // Calculate handedness
                temp.cross(n, t1);
                tangentBuffer[i * 4 + 3] = (temp.dot(t2) < 0.0) ? -1.0 : 1.0;
            }

            return tangentBuffer;
        }

        private _computeColorsBuffer(material:Material){
            var arr = [],
                color = material.color,
                i = 0,
                len = this.verticeBuffer.count;

            for(i = 0; i < len; i++){
                arr.push( color.r, color.g, color.b, color.a);
            }

            return ArrayBuffer.create(new Float32Array(arr), 4, BufferType.FLOAT);
        }
    }

    export type GeometryData = {
        verticeBuffer:ArrayBuffer;
        indiceBuffer:ElementBuffer;
        normalBuffer:ArrayBuffer;
        texCoordBuffer:ArrayBuffer;
        tangentBuffer:ArrayBuffer;
    };
}

