/// <reference path="../../definitions.d.ts"/>
module dy {
    export class CommonGeometryData extends GeometryData{
        public static create(geometry:Geometry) {
            var obj = new this(geometry);

            return obj;
        }
    }
}

