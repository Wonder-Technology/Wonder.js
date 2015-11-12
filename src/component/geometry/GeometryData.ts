/// <reference path="../../definitions.d.ts"/>
module dy {
    export class GeometryData {
        public static create(geometry:Geometry) {
            var obj = new this(geometry);

            return obj;
        }

        constructor(geometry:Geometry) {
            this._geometry = geometry;
        }

        private _vertices:Array<number> = null;
        get vertices() {
            return this._vertices;
        }

        set vertices(vertices:Array<number>) {
            this._vertices = vertices;
            this.isTangentDirty = true;
        }

        @InGetter(function () {
            assert(this._faces.length > 0, Log.info.FUNC_SHOULD("faces.count", "> 0"));

            for (let face of this._faces) {
                if (this._geometry.isSmoothShading()) {
                    assert(face.vertexNormals && face.vertexNormals.getCount() === 3, Log.info.FUNC_SHOULD("faces->vertexNormals.count", "=== 3"));
                }
                else {
                    assert(!face.faceNormal.isZero(), Log.info.FUNC_SHOULD("faces->faceNormal", "has data"));
                }
            }
        })
        @OutGetter(function (normals) {
            assert(normals.length > 0, Log.info.FUNC_MUST("geometry", "contain normals data"));
        })
        get normals() {
            var normals = [],
                geometry = this._geometry;

            //todo optimize:add cache
            //move cache to decorator
            if (geometry.isSmoothShading()) {
                if (!geometry.hasVertexNormals()) {
                    geometry.computeVertexNormals();
                }

                this._faces.forEach((face:Face3) => {
                    //        face.vertexNormals.forEach((normal:Vector3) => {
                    //            normals.push(normal.x, normal.y, normal.z);
                    //            normals[face.aIndex] = normal.toArray();
                    //        })
                    //normals[face.aIndex] = face.vertexNormals.getChild(0).toArray();
                    //normals[face.bIndex] = face.vertexNormals.getChild(1).toArray();
                    //normals[face.cIndex] = face.vertexNormals.getChild(2).toArray();
                    GeometryUtils.setThreeComponent(normals, face.vertexNormals.getChild(0), face.aIndex);
                    GeometryUtils.setThreeComponent(normals, face.vertexNormals.getChild(1), face.bIndex);
                    GeometryUtils.setThreeComponent(normals, face.vertexNormals.getChild(2), face.cIndex);
                });
            }
            else {
                if (!geometry.hasFaceNormals()) {
                    geometry.computeFaceNormals();
                }

                this._faces.forEach((face:Face3) => {
                    let normal = face.faceNormal;

                    GeometryUtils.setThreeComponent(normals, normal, face.aIndex);
                    GeometryUtils.setThreeComponent(normals, normal, face.bIndex);
                    GeometryUtils.setThreeComponent(normals, normal, face.cIndex);
                    //normals[face.aIndex] = normal.toArray();
                    //normals[face.bIndex] = normal.toArray();
                    //normals[face.cIndex] = normal.toArray();
                    //normals.push(normal.x, normal.y, normal.z);
                    //normals.push(normal.x, normal.y, normal.z);
                    //normals.push(normal.x, normal.y, normal.z);
                });
            }


            return normals;
        }

        //@InGetter(function () {
        //    assert(this._faces.length > 0, Log.info.FUNC_SHOULD("faces.count", "> 0"));
        //})
        @OutGetter(function (indices) {
            //assert(indices.length > 0, Log.info.FUNC_MUST("geometry", "contain indices data"));
        })
        get indices():Array<number> {
            var indices = [];

            //todo optimize:add cache
            for (let face of this._faces) {
                indices.push(face.aIndex, face.bIndex, face.cIndex);
            }

            return indices;
        }

        private _faces:Array<Face3> = null;
        get faces() {
            return this._faces;
        }

        set faces(faces:Array<Face3>) {
            this._faces = faces;
            this.isTangentDirty = true;
        }

        private _texCoords:Array<number> = null;
        get texCoords() {
            return this._texCoords;
        }

        set texCoords(texCoords:Array<number>) {
            this._texCoords = texCoords;
            this.isTangentDirty = true;
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
            if (this.isTangentDirty) {
                this.isTangentDirty = false;

                this._tangents = this._calculateTangents(this._vertices, this.normals, this.texCoords, this.indices);
            }

            return this._tangents;
        }

        public isTangentDirty:boolean = true;

        private _geometry:Geometry = null;

        public computeFaceNormals() {
            var vertices = this._vertices,
                self = this;

            for (let face of this._faces) {
                var p0 = GeometryUtils.getThreeComponent(vertices, face.aIndex),
                    p1 = GeometryUtils.getThreeComponent(vertices, face.bIndex),
                    p2 = GeometryUtils.getThreeComponent(vertices, face.cIndex),
                    v0 = Vector3.create().sub2(p2, p1),
                    v1 = Vector3.create().sub2(p0, p1);

                face.faceNormal = Vector3.create().cross(v0, v1).normalize();
            }
        }

        //todo refactor
        public computeVertexNormals() {
            var v, vl, normals, self = this;

            normals = new Array(this._vertices.length);

            for (v = 0, vl = this._vertices.length; v < vl; v++) {

                normals[v] = Vector3.create();

            }

            //todo
            //if ( areaWeighted ) {
            //
            //    // vertex normals weighted by triangle areas
            //    // http://www.iquilezles.org/www/articles/normals/normals.htm
            //
            //    var vA, vB, vC;
            //    var cb = Vector3.create(),
            //        ab = Vector3.create();
            //
            //    this.faces.forEach((face:Face3) => {
            //        vA = self._getThreeComponent(self._vertices, face.aIndex);
            //        vB = self._getThreeComponent(self._vertices, face.bIndex);
            //        vC = self._getThreeComponent(self._vertices, face.cIndex);
            //
            //        cb.sub2( vC, vB );
            //        ab.sub2( vA, vB );
            //        cb.cross(cb, ab );
            //
            //        normals[ face.aIndex ].add( cb );
            //        normals[ face.bIndex ].add( cb );
            //        normals[ face.cIndex ].add( cb );
            //    });
            //
            //}
            //else {

            for (let face of this._faces) {
                normals[face.aIndex].add(face.faceNormal);
                normals[face.bIndex].add(face.faceNormal);
                normals[face.cIndex].add(face.faceNormal);
            }

            //}

            for (v = 0, vl = this._vertices.length; v < vl; v++) {

                normals[v].normalize();

            }

            for (let face of this._faces) {
                face.vertexNormals = dyCb.Collection.create<Vector3>([
                    normals[face.aIndex],
                    normals[face.bIndex],
                    normals[face.cIndex]
                ]);
                //if ( vertexNormals.getCount() === 3 ) {
                //
                //    vertexNormals[ 0 ].copy( vertices[ face.a ] );
                //    vertexNormals[ 1 ].copy( vertices[ face.b ] );
                //    vertexNormals[ 2 ].copy( vertices[ face.c ] );
                //
                //}
                //else {
                //
                //    vertexNormals[ 0 ] = vertices[ face.a ].clone();
                //    vertexNormals[ 1 ] = vertices[ face.b ].clone();
                //    vertexNormals[ 2 ] = vertices[ face.c ].clone();
                //
                //}
            }
        }

        private _getColors(colors:Array<number>, vertices:Array<number>) {
            if (colors && colors.length > 0) {
                return colors;
            }
            else {
                //todo compute from vertexColors(refer to threejs)
                return this._getColorsFromMaterial(vertices);
            }
        }

        private _getColorsFromMaterial(vertices:Array<number>) {
            var arr = [],
                i = 0,
                material = this._geometry.material,
                color = material.color,
                len = null;

            dyCb.Log.error(!vertices || vertices.length === 0, dyCb.Log.info.FUNC_MUST("has vertice data"));

            len = vertices.length;

            for (i = 0; i < len; i++) {
                arr.push(color.r, color.g, color.b);
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

