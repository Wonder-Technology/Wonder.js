/// <reference path="../../definitions.d.ts"/>
module dy {
    //todo refactor more
    export class CommonGeometryData extends GeometryData{
        public static create(geometry:Geometry) {
            var obj = new this(geometry);

            return obj;
        }
    }
}

