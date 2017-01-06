module wd{
    export class TransformArticulatedAnimation extends ArticulatedAnimation{
        public static create() {
            var obj = new this();

            return obj;
        }

        protected createController(){
            return TransformArticulatedKeyFrameController.create();
        }
    }
}

