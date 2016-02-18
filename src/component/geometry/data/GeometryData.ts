module wd {
    export abstract class GeometryData {
        constructor(geometry:Geometry) {
            this.geometry = geometry;
        }

        private _vertices:Array<number> = null;
        get vertices() {
            return this._vertices;
        }

        set vertices(vertices:Array<number>) {
            this._vertices = vertices;
            this.isTangentDirty = true;
        }

        @requireGetter(function () {
            assert(this._faces.length > 0, Log.info.FUNC_SHOULD("faces.count", "> 0"));

            for (let face of this._faces) {
                if (this.geometry.isSmoothShading()) {
                    assert(face.vertexNormals && face.vertexNormals.getCount() === 3, Log.info.FUNC_SHOULD("faces->vertexNormals.count", "=== 3"));
                }
                else {
                    assert(face.hasFaceNormal(), Log.info.FUNC_SHOULD("faces->faceNormal", "has data"));
                }
            }
        })
        @cacheGetter(function(){
            return !this._normalDirty && this._normalCache;
        }, function(){
            return this._normalCache;
        }, function(result){
            this._normalCache = result;
            this._normalDirty = false;
        })
        get normals() {
            var geometry = this.geometry;

            if (geometry.isSmoothShading()) {
                if (!this.hasVertexNormals()) {
                    this.computeVertexNormals();
                }

                return this.normalsFromVertexNormals;
            }
            if (!this.hasFaceNormals()) {
                this.computeFaceNormals();
            }

            return this.normalsFromFaceNormal;
        }

        @requireGetter(function(){
            assert(this._faces.length > 0, Log.info.FUNC_SHOULD("geometry", "has faces"));
        })
        @ensureGetter(function (normals:Array<number>) {
            for(let data of normals){
                assert(JudgeUtils.isNumber(data), Log.info.FUNC_SHOULD("normals data", "be number"));
            }
        })
        @cacheGetter(function(){
            return !this._normalDirty && this._normalFromFaceCache;
        }, function(){
            return this._normalFromFaceCache;
        }, function(result){
            this._normalFromFaceCache = result;
            this._normalDirty = false;
        })
        get normalsFromFaceNormal(){
            var normals = null;

            if(!this.hasFaceNormals()){
                return [];
            }

            normals = [];

            this._faces.forEach((face:Face3) => {
                let normal = face.faceNormal;

                GeometryUtils.setThreeComponent(normals, normal, face.aIndex);
                GeometryUtils.setThreeComponent(normals, normal, face.bIndex);
                GeometryUtils.setThreeComponent(normals, normal, face.cIndex);
            });

            //todo optimize:not fill, keep NaN?
            this._fillEmptyData(normals);

            return normals;
        }

        @requireGetter(function(){
            assert(this._faces.length > 0, Log.info.FUNC_SHOULD("geometry", "has faces"));
        })
        @ensureGetter(function (normals:Array<number>) {
            for(let data of normals){
                assert(JudgeUtils.isNumber(data), Log.info.FUNC_SHOULD("normals data", "be number"));
            }
        })
        @cacheGetter(function(){
            return !this._normalDirty && this._normalFromVertexCache;
        }, function(){
            return this._normalFromVertexCache;
        }, function(result){
            this._normalFromVertexCache = result;
            this._normalDirty = false;
        })
        get normalsFromVertexNormals(){
            var normals = null;

            if(!this.hasVertexNormals()){
                return [];
            }

            normals = [];

            this._faces.forEach((face:Face3) => {
                GeometryUtils.setThreeComponent(normals, face.vertexNormals.getChild(0), face.aIndex);
                GeometryUtils.setThreeComponent(normals, face.vertexNormals.getChild(1), face.bIndex);
                GeometryUtils.setThreeComponent(normals, face.vertexNormals.getChild(2), face.cIndex);
            });

            //todo optimize:not fill, remain NaN?
            this._fillEmptyData(normals);

            return normals;
        }

        @cacheGetter(function(){
            return !this._indiceDirty && this._indiceCache;
        }, function(){
            return this._indiceCache;
        }, function(result){
            this._indiceCache = result;
            this._indiceDirty = false;
        })
        get indices():Array<number> {
            var indices = [];

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
            this.onChangeFace();
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
        @ensureGetter(function (colors:Array<number>) {
            assert(colors.length === this._vertices.length, Log.info.FUNC_SHOULD(`colors.length:${colors.length}`, `=== vertices.length:${this._vertices.length}`));
        })
        @cacheGetter(function(){
            return !this.colorDirty && this._colorCache;
        }, function(){
            return this._colorCache;
        }, function(result){
            this._colorCache = result;
            this.colorDirty = false;
        })
        get colors() {
            if(this._needGetColorsFromMaterial()){
                return this._getColorsFromMaterial(this._vertices);
            }

            return this._colors;
        }
        set colors(colors:Array<number>) {
            this._colors = colors;
            this.colorDirty = true;
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
        public colorDirty:boolean = true;

        protected geometry:Geometry = null;

        private _normalCache:Array<number> = null;
        private _normalFromFaceCache:Array<number> = null;
        private _normalFromVertexCache:Array<number> = null;
        private _indiceCache:Array<number> = null;
        private _colorCache:Array<number> = null;
        private _normalDirty:boolean = true;
        private _indiceDirty:boolean = true;
        private _materialColorChangeSubscription:wdFrp.IDisposable = null;

        public init(){
            var self = this;

            this._materialColorChangeSubscription =
                wdFrp.fromArray([
                        EventManager.fromEvent(this.geometry.entityObject, <any>EEngineEvent.MATERIAL_COLOR_CHANGE),
                        EventManager.fromEvent(this.geometry.entityObject, <any>EEngineEvent.MATERIAL_CHANGE)
                    ])
                    .subscribe(() => {
                        if(self._needGetColorsFromMaterial()){
                            self.colorDirty = true;
                        }
                    });
        }

        public dispose(){
            this._materialColorChangeSubscription && this._materialColorChangeSubscription.dispose();
        }

        @require(function(){
            assert(GeometryUtils.hasData(this.vertices), Log.info.FUNC_MUST("contain vertices"));
        })
        @ensure(function(){
            for(let face of this._faces) {
                assert(face.faceNormal instanceof Vector3, Log.info.FUNC_SHOULD_NOT("faceNormal", "be null"));
            }
        })
        public computeFaceNormals() {
            var vertices = this._vertices;

            for (let face of this._faces) {
                face.faceNormal = this.computeFaceNormalsHelper(vertices, face.aIndex, face.bIndex, face.cIndex);
            }
        }

        public computeVertexNormals() {
            var normals = null;

            if(!this.hasFaceNormals()){
                this.computeFaceNormals();
            }

            normals = this.computeVertexNormalsHelper(this._vertices);

            for (let face of this._faces) {
                face.vertexNormals = wdCb.Collection.create<Vector3>([
                    normals[face.aIndex],
                    normals[face.bIndex],
                    normals[face.cIndex]
                ]);
            }
        }

        public hasFaceNormals(){
            //todo optimize:only judge the first face?
            for(let face of this._faces){
                if(!face.hasFaceNormal()){
                    return false;
                }
            }

            return true;
        }

        public hasVertexNormals(){
            //todo optimize:only judge the first face?
            for(let face of this._faces){
                if(!face.hasVertexNormal()){
                    return false;
                }
            }

            return true;
        }

        @virtual
        protected onChangeFace(){
            this.isTangentDirty = true;
            this._normalDirty = true;
            this._indiceDirty = true;
        }

        protected computeFaceNormalsHelper(vertices:Array<number>, aIndex:number, bIndex:number, cIndex:number) {
            var p0 = GeometryUtils.getThreeComponent(vertices, aIndex),
                p1 = GeometryUtils.getThreeComponent(vertices, bIndex),
                p2 = GeometryUtils.getThreeComponent(vertices, cIndex),
                v0 = Vector3.create().sub2(p2, p1),
                v1 = Vector3.create().sub2(p0, p1);

            return Vector3.create().cross(v0, v1).normalize();
        }

        protected computeVertexNormalsHelper(vertices:Array<number>){
            var vl = vertices.length / 3,
                normals = null;

            normals = new Array(vl);

            for (let v = 0; v < vl; v++) {
                normals[v] = Vector3.create();
            }

            for (let face of this._faces) {
                let faceNormal = null;

                faceNormal = face.faceNormal;

                normals[face.aIndex].add(faceNormal);
                normals[face.bIndex].add(faceNormal);
                normals[face.cIndex].add(faceNormal);
            }

            for (let v = 0; v < vl; v++) {
                normals[v].normalize();
            }

            return normals;
        }

        private _getColorsFromMaterial(vertices:Array<number>) {
            var arr = [],
                i = 0,
                color = this.geometry.material.color,
                r = color.r,
                g = color.g,
                b = color.b,
                len = null;

            len = vertices.length / 3;

            for (i = 0; i < len; i++) {
                arr.push(r, g, b);
            }

            return arr;
        }

        private _fillEmptyData(data:Array<number>){
            for(let i = 0,len = data.length; i < len; i++){
                if(isNaN(data[i])){
                    data[i] = 0;
                }
            }
        }

        private _calculateTangents(vertices:Array<number>, normals:Array<number>, texCoords:Array<number>, indices:Array<number>) {
            var triangleCount = indices.length / 3,
                vertexCount = vertices.length / 3,
                i1, i2, i3,
                x1, x2, y1, y2, z1, z2, s1, s2, t1, t2, r,
                sdir = Vector3.create(),
                tdir = Vector3.create(),
                v1 = Vector3.create(),
                v2 = Vector3.create(),
                v3 = Vector3.create(),
                w1 = Vector2.create(),
                w2 = Vector2.create(),
                w3 = Vector2.create(),
                i, // Loop counte
                tan1 = new Float32Array(vertexCount * 3),
                tan2 = new Float32Array(vertexCount * 3),
                n = Vector3.create(),
                temp = Vector3.create(),
                tangents = [];

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

            for (i = 0; i < vertexCount; i++) {
                let ndott = null;

                n.set(normals[i * 3], normals[i * 3 + 1], normals[i * 3 + 2]);
                t1.set(tan1[i * 3], tan1[i * 3 + 1], tan1[i * 3 + 2]);
                t2.set(tan2[i * 3], tan2[i * 3 + 1], tan2[i * 3 + 2]);

                // Gram-Schmidt orthogonalize
                ndott = n.dot(t1);
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

        private _needGetColorsFromMaterial(){
            var colors = this._colors;

            return !colors || colors.length === 0;
        }
    }
}

