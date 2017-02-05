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
            this.tangentDirty = true;

            this.geometry.buffers.removeCache(EBufferDataType.VERTICE);
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

            // this.geometry.buffers.removeCache(EBufferDataType.NORMAL);
            this.geometry.buffers.removeCache(EBufferDataType.INDICE);

            this.onChangeFace();
        }

        protected geometry:Geometry = null;

        private _indiceCache:Array<number> = null;
        private _indiceDirty:boolean = true;

        public dispose(){
        }

        @virtual
        protected onChangeFace(){
            // this.tangentDirty = true;
            // this._normalDirty = true;
            this._indiceDirty = true;
        }
    }
}

