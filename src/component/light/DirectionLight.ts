module wd{
    export class DirectionLight extends SourceLight{
        public static type:string = "directionLight";
        public static defaultPosition:Vector3 = Vector3.create(0, 0, 1);

        public static create() {
            var obj = new this();

            return obj;
        }

        @cloneAttributeAsBasicType()
        public shadowCameraLeft:number = -1000;
        @cloneAttributeAsBasicType()
        public shadowCameraRight:number = 1000;
        @cloneAttributeAsBasicType()
        public shadowCameraTop:number = 1000;
        @cloneAttributeAsBasicType()
        public shadowCameraBottom:number = -1000;
    }
}

