/// <reference path="../../definitions.d.ts"/>
module dy{
    export class DirectionLight extends Light{
        public static create() {
            var obj = new this();

            return obj;
        }

        public type:string = "directionLight";
        public direction:Vector3 = Vector3.create(0, 0, 1);
        public intensity:number = 1;
    }
}

