module wd {
    export class BitmapFontGeometryData extends GeometryData{
        public static create(geometry:Geometry) {
            var obj = new this(geometry);

            return obj;
        }

        private _pages:Array<number> = null;
        get pages() {
            return this._pages;
        }
        set pages(pages:Array<number>) {
            this._pages = pages;

            this.geometry.buffers.removeCache("pages");
        }
    }
}

