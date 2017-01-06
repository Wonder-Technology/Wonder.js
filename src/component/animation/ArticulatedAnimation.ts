module wd{
    export abstract class ArticulatedAnimation extends SingleLayerKeyFrameAnimation{
        @cloneAttributeAsCloneable()
        public data:ArticulatedAnimationData = null;

        private _controller:ArticulatedKeyFrameController = this.createController();

        public init(){
            this._controller.entityObject = this.entityObject;
        }

        public dispose(){
        }

        public play(animName:string);
        public play(animIndex:number);

        @require(function(...args){
            if(JudgeUtils.isNumber(args[0])){
                let animIndex:number = args[0];

                it(`should exist animation index:${animIndex}`, () => {
                    expect(this.data.getCount()).greaterThan(animIndex);
                });
            }
            else if(JudgeUtils.isString(args[0])){
                let animName:string = args[0];

                it(`should exist animation name:${animName}`, () => {
                    expect(this.data.hasChild(animName)).true;
                });
            }
        })
        public play(...args){
            this._controller.resetAnim();
            this.pauseDuration = 0;

            if(JudgeUtils.isNumber(args[0])){
                let animIndex:number = args[0],
                    i = 0,
                    self = this;

                this.data.forEach((data:wdCb.Collection<KeyFrameAnimationFrameData>, animName:string) => {
                    if(animIndex === i){
                        self._controller.setCurrentAnimData(animName, data);

                        return wdCb.$BREAK;
                    }

                    i++;
                });
            }
            else if(JudgeUtils.isString(args[0])){
                let animName:string = args[0];

                this._controller.setCurrentAnimData(animName, this.data.getChild(animName));
            }

            this._controller.updateCurrentFrameData();

            this._controller.saveZeroTimeFrameData();

            this._controller.setFrameCount();

            this.state = EAnimationState.RUN;
        }

        protected abstract createController():ArticulatedKeyFrameController;

        protected handleWhenPause(elapsed:number):void{
        }

        protected handleWhenCurrentFrameFinish(elapsed:number):void{
            this.isFrameChange = true;

            this._controller.updateFrame(elapsed, this.pauseDuration);
            this._controller.savePrevFrameData();
        }

        protected handleBeforeJudgeWhetherCurrentFrameFinish(elapsed:number):void{
            this._controller.setBeginElapsedTimeOfFirstFrame(this.getCurrentTime());
        }

        protected isCurrentFrameFinish(elapsed:number):boolean{
            return this._controller.isCurrentFrameFinish(elapsed, this.pauseDuration);
        }

        protected handleAfterJudgeWhetherCurrentFrameFinish(elapsed:number):void{
            this._controller.updateTargets(elapsed, this.pauseDuration);
        }
    }

    export type ArticulatedAnimationData = wdCb.Hash<wdCb.Collection<KeyFrameAnimationFrameData>>
}

