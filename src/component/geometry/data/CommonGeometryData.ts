/// <reference path="../../../filePath.d.ts"/>
module wd {
    export class CommonGeometryData extends GeometryData{
        public static create(geometry:Geometry) {
            var obj = new this(geometry);

            return obj;
        }
    }
}

