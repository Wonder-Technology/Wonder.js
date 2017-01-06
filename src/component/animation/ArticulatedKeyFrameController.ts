module wd{
    export abstract class ArticulatedKeyFrameController extends LayerKeyFrameController{
        public entityObject:GameObject = null;

        public saveZeroTimeFrameData(){
            let firstAnimData = this.currentAnimData.getChild(0);

            if(firstAnimData.time === 0){
                this.saveStartFrameData(firstAnimData);
            }
        }

        public updateTargets(elapsed:number, pauseDuration:number):void{
            var self = this,
                startFrameDataMap = this.startFrameDataMap;

            this.currentFrameData.targets.forEach((target:KeyFrameAnimationFrameTargetData) => {
                var endFrameData = target.data,
                    startFrameData = startFrameDataMap.getChild(<any>target.target),
                    interpolation = self.computeInterpolation(elapsed, pauseDuration, target.interpolationMethod);

                self.updateTarget(target, startFrameData, endFrameData, interpolation);
            });
        }

        protected abstract updateTarget(target:any, startFrameData:any, endFrameData:any, interpolation:number):void;

    }
}

