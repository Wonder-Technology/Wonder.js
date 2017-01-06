module wd{
    export abstract class MultiLayerKeyFrameAnimation extends Animation{
        protected controllerList:wdCb.Collection<LayerKeyFrameController> = wdCb.Collection.create<LayerKeyFrameController>();

        public init(){
            this.createControllerMap();
        }

        //todo refactor: add AnimationController class
        //todo specify args!
        public playOneTime(...args):void{
            this._isPlayOneTime = true;

            this.play.apply(this, args);
        }

        private _isPlayOneTime:boolean = false;

        protected handleUpdate(elapsed:number){
            this.controllerList.forEach((controller:LayerKeyFrameController) => {
                if(!controller.hasCurrentAnimData()){
                    return;
                }

                this.handleBeforeJudgeWhetherCurrentFrameFinish(controller, elapsed);

                if(this.isCurrentFrameFinish(controller, elapsed)){
                    this.handleWhenCurrentFrameFinish(controller, elapsed)
                }

                this.handleAfterJudgeWhetherCurrentFrameFinish(controller, elapsed);
            });

            if(this._isPlayOneTime){
                let isFinishAnimation = true;

                this.controllerList.forEach((controller:LayerKeyFrameController) => {
                    if(!controller.isFinishAnimation){
                        isFinishAnimation = false;
                        return wdCb.$BREAK;
                    }
                });

                if(isFinishAnimation){
                    this.stop();
                    return;
                }
            }

            this.handleAfterJudgeWhetherAllCurrentFrameFinish(elapsed);
        }

        protected abstract createControllerMap():void;
        protected abstract handleWhenPause(elapsed:number):void;
        protected abstract handleWhenCurrentFrameFinish(controller:LayerKeyFrameController, elapsed:number):void;
        protected abstract handleBeforeJudgeWhetherCurrentFrameFinish(controller:LayerKeyFrameController, elapsed:number):void;
        protected abstract handleAfterJudgeWhetherCurrentFrameFinish(controller:LayerKeyFrameController, elapsed:number):void;
        protected abstract handleAfterJudgeWhetherAllCurrentFrameFinish(elapsed):void;
        protected abstract isCurrentFrameFinish(controller:LayerKeyFrameController, elapsed:number):boolean;
    }
}

