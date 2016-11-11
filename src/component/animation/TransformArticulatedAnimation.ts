module wd{
    export class TransformArticulatedAnimation extends ArticulatedAnimation{
        public static create() {
            var obj = new this();

            return obj;
        }

        @require(function(target:TransformArticulatedAnimationFrameTargetData, startFrameData:any, endFrameData:any, interpolation:number){
            it("transform animation->interpolationMethod shouldn't be SWITCH", () => {
                switch (target.target){
                    case EArticulatedAnimationTarget.TRANSLATION:
                    case EArticulatedAnimationTarget.ROTATION:
                    case EArticulatedAnimationTarget.SCALE:
                        expect(target.interpolationMethod).not.equals(EKeyFrameInterpolation.SWITCH);
                        break;
                }
            });
        })
        protected updateTarget(target:TransformArticulatedAnimationFrameTargetData, startFrameData:any, endFrameData:any, interpolation:number){
            var transform = this.entityObject.transform;

            switch (target.target){
                case EArticulatedAnimationTarget.TRANSLATION:
                    if(!startFrameData){
                        startFrameData = transform.localPosition;
                    }

                    transform.localPosition = Vector3.create().lerp(startFrameData, endFrameData, interpolation);
                    break;
                case EArticulatedAnimationTarget.ROTATION:
                    if(!startFrameData){
                        startFrameData = transform.localRotation;
                    }

                    transform.localRotation = Quaternion.create().slerp(startFrameData, endFrameData, interpolation);
                    break;
                case EArticulatedAnimationTarget.SCALE:
                    if(!startFrameData){
                        startFrameData = transform.localScale;
                    }

                    transform.localScale = Vector3.create().lerp(startFrameData, endFrameData, interpolation);
                    break;
                default:
                    // Log.error(true, Log.info.FUNC_NOT_SUPPORT(`EArticulatedAnimationTarget:${target.target}`));
                    break;
            }
        }
    }

    export type TransformArticulatedAnimationFrameTargetData = {
        interpolationMethod:EKeyFrameInterpolation,
        target:EArticulatedAnimationTarget,
        data:any
    }
}

