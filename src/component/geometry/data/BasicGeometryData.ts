module wd {
    export class BasicGeometryData extends GeometryData{
        public static create(geometry:Geometry) {
            var obj = new this(geometry);

            return obj;
        }
    }
}

