module wd{
    export class TextureArticulatedAnimation extends ArticulatedAnimation{
        public static create() {
            var obj = new this();

            return obj;
        }

        protected createController(){
            return TextureArticulatedKeyFrameController.create();
        }
    }
}

