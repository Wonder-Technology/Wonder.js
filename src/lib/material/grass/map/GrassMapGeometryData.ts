module wd {
    export class GrassMapGeometryData extends GeometryData{
        public static create(geometry:Geometry) {
            var obj = new this(geometry);

            return obj;
        }

        private _quadIndices:Array<number> = null;
        get quadIndices() {
            return this._quadIndices;
        }
        set quadIndices(quadIndices:Array<number>) {
            this._quadIndices = quadIndices;

            this.geometry.buffers.removeCache("quadIndices");
        }
    }
}

