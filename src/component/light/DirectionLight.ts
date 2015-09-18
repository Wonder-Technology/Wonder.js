/// <reference path="../../definitions.d.ts"/>
module dy{
    export class DirectionLight extends Light{
        public static type:string = "directionLight";
        //default direction is negative z(origin point to [0, 0, -1] point)
        public static defaultDirection:Vector3 = Vector3.create(0, 0, -1);

        public static create() {
            var obj = new this();

            return obj;
        }

        public intensity:number = 1;
    }
}

