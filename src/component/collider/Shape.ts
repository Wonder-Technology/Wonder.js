/// <reference path="../../filePath.d.ts"/>
module wd {
    export abstract class Shape{
        public center:Vector3 = Vector3.create(0, 0, 0);

        public abstract setFromShapeParam(...args);
        public abstract setFromPoints(points:Array<number>);
        public abstract copy():Shape;
    }
}

