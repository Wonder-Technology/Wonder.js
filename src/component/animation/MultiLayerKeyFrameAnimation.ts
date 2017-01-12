module wd{
    export abstract class MultiLayerKeyFrameAnimation extends Animation{
        protected controllerList:wdCb.Collection<LayerKeyFrameController> = wdCb.Collection.create<LayerKeyFrameController>();

        private _isPlayOneTime:boolean = false;

        public init(){
            this.createControllerMap();
        }

        //todo refactor: add AnimationController class
        public playOneTime(...args):void{
            this._isPlayOneTime = true;

            this.play.apply(this, args);
        }

        protected handleUpdate(elapsed:number){
            var self = this;

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

            if(this._isPlayOneTime && this._isAllControllerFinishAnimation()){
                this.stop();
                return;
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

        private _isAllControllerFinishAnimation()
        {
            var isFinishAnimation = true;

            this.controllerList.forEach((controller: LayerKeyFrameController) => {
                if (!controller.isFinishAnimation) {
                    isFinishAnimation = false;
                    return wdCb.$BREAK;
                }
            });

            return isFinishAnimation;
        }
    }
}

