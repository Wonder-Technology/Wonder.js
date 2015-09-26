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

        public vertices:ArrayBuffer = null;
        public indices:ElementBuffer = null;
        public texCoords:ArrayBuffer = null;
        public normals:ArrayBuffer = null;
        public tangents:ArrayBuffer = null;
        public colors:ArrayBuffer = null;

        public init(){
            var {
                vertices,
                indices,
                normals,
                texCoords,
                tangents
                } = this.computeData();
            this.vertices = vertices;
            this.indices = indices;
            this.normals = normals;
            this.texCoords = texCoords;
            this.tangents = tangents;

            //todo compute from vertexColors(refer to threejs)
            this.colors = this._computeColorsBuffer(this._material);

            this._material.init();
        }

        public dispose(){
            this.vertices.dispose();
            this.indices.dispose();
            this.texCoords.dispose();
            this.colors.dispose();

            this._material.dispose();
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

        protected abstract computeData(): GeometryData;

        /**
         * @function
         * @name pc.calculateTangents
         * @description Generates tangent information from the specified vertices, normals, texture coordinates
         * and triangle indices.
         * @param {[Number]} vertices An array of 3-dimensional vertex positions.
         * @param {[Number]} normals An array of 3-dimensional vertex normals.
         * @param {[Number]} uvs An array of 2-dimensional vertex texture coordinates.
         * @param {[Number]} indices An array of triangle indices.
         * @returns {[Number]} An array of 3-dimensional vertex tangents.
         * @example
         * var tangents = pc.calculateTangents(vertices, normals, uvs, indices);
         * var mesh = pc.createMesh(vertices, normals, tangents, uvs, indices);
         * @see pc.createMesh
         * @author Will Eastcott
         */
        protected calculateTangents(vertices:number[], normals:number[], uvs:number[], indices:number[]) {
            var triangleCount = indices.length / 3;
            var vertexCount   = vertices.length / 3;
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

            var tangents = [];

            for (i = 0; i < triangleCount; i++) {
                i1 = indices[i * 3];
                i2 = indices[i * 3 + 1];
                i3 = indices[i * 3 + 2];

                v1.set(vertices[i1 * 3], vertices[i1 * 3 + 1], vertices[i1 * 3 + 2]);
                v2.set(vertices[i2 * 3], vertices[i2 * 3 + 1], vertices[i2 * 3 + 2]);
                v3.set(vertices[i3 * 3], vertices[i3 * 3 + 1], vertices[i3 * 3 + 2]);

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
                n.set(normals[i * 3], normals[i * 3 + 1], normals[i * 3 + 2]);
                t1.set(tan1[i * 3], tan1[i * 3 + 1], tan1[i * 3 + 2]);
                t2.set(tan2[i * 3], tan2[i * 3 + 1], tan2[i * 3 + 2]);

                // Gram-Schmidt orthogonalize
                var ndott = n.dot(t1);
                temp = n.copy().scale(ndott);
                temp.sub2(t1, temp).normalize();

                tangents[i * 4]     = temp.x;
                tangents[i * 4 + 1] = temp.y;
                tangents[i * 4 + 2] = temp.z;

                // Calculate handedness
                temp.cross(n, t1);
                tangents[i * 4 + 3] = (temp.dot(t2) < 0.0) ? -1.0 : 1.0;
            }

            return tangents;
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

    export type GeometryData = {
        vertices:ArrayBuffer;
        indices:ElementBuffer;
        normals:ArrayBuffer;
        texCoords:ArrayBuffer;
        tangents:ArrayBuffer;
    };
}

