/// <reference path="../../definitions.d.ts"/>
module dy {
    export class GeometryData {
        public static create(geometry:Geometry) {
            var obj = new this(geometry);

            return obj;
        }

        constructor(geometry:Geometry){
            this._geometry = geometry;
        }

        private _vertices:Array<number> = null;
        get vertices() {
            return this._vertices;
        }

        set vertices(vertices:Array<number>) {
            this._vertices = vertices;
            this._isTangentDirty = true;
        }

        private _normals:Array<number> = null;
        get normals() {
            return this._normals;
        }

        set normals(normals:Array<number>) {
            this._normals = normals;
            this._isTangentDirty = true;
        }

        private _indices:Array<number> = null;
        get indices() {
            return this._indices;
        }

        set indices(indices:Array<number>) {
            this._indices = indices;
            this._isTangentDirty = true;
        }

        private _texCoords:Array<number> = null;
        get texCoords() {
            return this._texCoords;
        }

        set texCoords(texCoords:Array<number>) {
            this._texCoords = texCoords;
            this._isTangentDirty = true;
        }

        private _colors:Array<number> = null;
        get colors() {
            return this._getColors(this._colors, this._vertices);
        }

        set colors(colors:Array<number>) {
            this._colors = colors;
        }

        private _tangents:Array<number> = null;
        get tangents() {
            if (this._isTangentDirty) {
                this._isTangentDirty = false;

                this._tangents = this._calculateTangents(this._vertices, this._normals, this.texCoords, this._indices);
            }

            return this._tangents;
        }


        private _geometry:Geometry = null;
        private _isTangentDirty:boolean = false;


        private _getColors(colors:Array<number>, vertices:Array<number>){
            if(colors && colors.length > 0){
                return colors;
            }
            else{
                //todo compute from vertexColors(refer to threejs)
                return this._getColorsFromMaterial(vertices);
            }
        }

        private _getColorsFromMaterial(vertices:Array<number>){
            var arr = [],
                i = 0,
                material = this._geometry.material,
                color = material.color,
                len = null;

            dyCb.Log.error(!vertices || vertices.length === 0, dyCb.Log.info.FUNC_MUST("has vertice data"));

            len = vertices.length;

            for(i = 0; i < len; i++){
                arr.push( color.r, color.g, color.b);
            }
            return arr;
        }

        private _calculateTangents(vertices:Array<number>, normals:Array<number>, texCoords:Array<number>, indices:Array<number>) {
            var triangleCount = indices.length / 3;
            var vertexCount = vertices.length / 3;
            var i1, i2, i3;
            var x1, x2, y1, y2, z1, z2, s1, s2, t1, t2, r;
            var sdir = Vector3.create();
            var tdir = Vector3.create();
            var v1 = Vector3.create();
            var v2 = Vector3.create();
            var v3 = Vector3.create();
            var w1 = Vector2.create();
            var w2 = Vector2.create();
            var w3 = Vector2.create();
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

                w1.set(texCoords[i1 * 2], texCoords[i1 * 2 + 1]);
                w2.set(texCoords[i2 * 2], texCoords[i2 * 2 + 1]);
                w3.set(texCoords[i3 * 2], texCoords[i3 * 2 + 1]);

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

                tangents[i * 4] = temp.x;
                tangents[i * 4 + 1] = temp.y;
                tangents[i * 4 + 2] = temp.z;

                // Calculate handedness
                temp.cross(n, t1);
                tangents[i * 4 + 3] = (temp.dot(t2) < 0.0) ? -1.0 : 1.0;
            }

            return tangents;
        }
    }
}

