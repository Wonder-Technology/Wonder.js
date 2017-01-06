module wd{
    export class JointKeyFrameController extends LayerKeyFrameController{
        public static create() {
            var obj = new this();

            return obj;
        }

        public currentUpdatedTransformMatrix:Matrix4 = Matrix4.create();
        public jointName:string = null;

        @require(function(){
            //todo handle not === 0
            it("first animation data->time should === 0", () => {
                expect(this.currentAnimData.getChild(0).time).equals(0);
            }, this);
        })
        public saveZeroTimeFrameData(){
            this.saveStartFrameData(this.currentAnimData.getChild(0));
        }

        public updateTargets(elapsed:number, pauseDuration:number):void{
            var self = this,
                startFrameDataMap = this.startFrameDataMap,
                position = GlobalTempMathClass.Vector3_1,
                rotation = GlobalTempMathClass.Quaternion_1,
                scale = GlobalTempMathClass.Vector3_Scale_1;

            this.currentFrameData.targets.forEach((target:KeyFrameAnimationFrameTargetData) => {
                var endFrameData = target.data,
                    startFrameData = startFrameDataMap.getChild(<any>target.target),
                    interpolation = self.computeInterpolation(elapsed, pauseDuration, target.interpolationMethod);

                switch (target.target){
                    case EKeyFrameAnimationTarget.TRANSLATION:
                        position = position.clone().lerp(startFrameData, endFrameData, interpolation);
                        break;
                    case EKeyFrameAnimationTarget.ROTATION:
                        rotation = rotation.clone().slerp(startFrameData, endFrameData, interpolation);
                        break;
                    case EKeyFrameAnimationTarget.SCALE:
                        scale = scale.clone().lerp(startFrameData, endFrameData, interpolation);
                        break;
                    default:
                        break;
                }
            });

            this.currentUpdatedTransformMatrix.setTRS(position, rotation, scale);
        }
    }
}

