module wd{
    export abstract class SingleLayerKeyFrameAnimation extends Animation{
        public isFrameChange:boolean = false;

        protected handleUpdate(elapsed:number){
            this.handleBeforeJudgeWhetherCurrentFrameFinish(elapsed);

            if(this.isCurrentFrameFinish(elapsed)){
                this.handleWhenCurrentFrameFinish(elapsed)
            }
            else{
                this.isFrameChange = false;
            }

            this.handleAfterJudgeWhetherCurrentFrameFinish(elapsed);
        }

        protected abstract handleWhenPause(elapsed:number):void;
        protected abstract handleWhenCurrentFrameFinish(elapsed:number):void;
        protected abstract handleBeforeJudgeWhetherCurrentFrameFinish(elapsed:number):void;
        protected abstract handleAfterJudgeWhetherCurrentFrameFinish(elapsed:number):void;
        protected abstract isCurrentFrameFinish(elapsed:number):boolean;
    }
}

