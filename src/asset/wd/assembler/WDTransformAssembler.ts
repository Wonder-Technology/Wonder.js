module wd{
    export class WDTransformAssembler extends WDComponentAssembler{
        public static create() {
            var obj = new this();

            return obj;
        }

        public createComponent(component:IWDTransform):ThreeDTransform{
            var transform:ThreeDTransform = ThreeDTransform.create();

            if(component.matrix){
                transform.localPosition = component.matrix.getTranslation();
                transform.localRotation = component.matrix.getRotation();
                transform.localScale = component.matrix.getScale();
            }
            else{
                transform.localPosition = component.position;
                transform.localRotation = component.rotation;
                transform.localScale = component.scale;
            }

            return transform;
        }
    }
}

