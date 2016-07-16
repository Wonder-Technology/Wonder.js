module wd {
    //todo rename to BasicXXX
    export class CommonGeometryData extends GeometryData{
        public static create(geometry:Geometry) {
            var obj = new this(geometry);

            return obj;
        }
    }
}

