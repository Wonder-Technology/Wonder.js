module wd {
    export class WDTransformParser extends WDComponentParser{
        public static create() {
            var obj = new this();

            return obj;
        }

        public parse(matrix:Array<number>);
        public parse(translation:Array<number>, rotation:Array<number>, scale:Array<number>);

        public parse(...args){
            var transform:IWDTransform = <any>{};

            if(args.length === 1){
                let matrix:Array<number> = args[0];

                transform.matrix = Matrix4.create(new Float32Array(matrix));
            }
            else if(args.length === 3){
                let translation:Array<number> = args[0],
                    rotation:Array<number> = args[1],
                    scale:Array<number> = args[2];

                transform.position = Vector3.create(translation[0], translation[1], translation[2]);
                transform.rotation = Quaternion.create(rotation[0], rotation[1], rotation[2], rotation[3]);
                transform.scale = Vector3.create(scale[0], scale[1], scale[2]);
            }

            return transform;
        }
    }
}
