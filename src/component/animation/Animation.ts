module wd{
    export abstract class Animation extends Component{
        get isStart(){
            return this.state === EAnimationState.RUN;
        }
        get isStop(){
            return this.state === EAnimationState.STOP;
        }
        get isPause(){
            return this.state === EAnimationState.PAUSE;
        }

        public entityObject:GameObject;
        public isFrameChange:boolean = false;

        protected state:EAnimationState = EAnimationState.DEFAULT;
        protected pauseTime:number = null;
        protected resumeTime:number = null;

        private _isResume:boolean = false;

        public abstract play(animName:string, fps:number):void;

        public pause(){
            this.state = EAnimationState.PAUSE;

            this.pauseTime = this.getPauseTime();
        }

        public resume(){
            this.state = EAnimationState.RUN;

            this._isResume = true;
            this.resumeTime = this.getResumeTime();
        }

        public stop(){
            this.state = EAnimationState.STOP;
        }

        public update(elapsedTime:number){
            if(this.state === EAnimationState.DEFAULT || this.isStop){
                return;
            }

            if(this.isPause){
                this.handleWhenPause(elapsedTime);
                return;
            }

            if(this._isResume){
                this._isResume = false;
                this.continueFromPausePoint(elapsedTime);
            }

            this.handleBeforeJudgeWhetherCurrentFrameFinish(elapsedTime);

            if(this.isCurrentFrameFinish(elapsedTime)){
                this.handleWhenCurrentFrameFinish(elapsedTime)
            }
            else{
                this.isFrameChange = false;
            }

            this.handleAfterJudgeWhetherCurrentFrameFinish(elapsedTime);

            //this.computeInterpolation(elapsedTime);
            //
            //this.updateTargets();
        }

        protected abstract getPauseTime():number;
        protected abstract getResumeTime():number;
        protected abstract handleWhenPause(elapsedTime:number):void;
        protected abstract handleWhenCurrentFrameFinish(elapsedTime:number):void;
        protected abstract handleBeforeJudgeWhetherCurrentFrameFinish(elapsedTime:number):void;
        protected abstract handleAfterJudgeWhetherCurrentFrameFinish(elapsedTime:number):void;
        protected abstract continueFromPausePoint(elapsedTime:number):void;
        protected abstract isCurrentFrameFinish(elapsedTime:number):boolean;
        //protected abstract computeInterpolation(elapsedTime:number):void;
        //protected abstract updateTargets():void;
    }

    export enum EAnimationState{
        DEFAULT,
        RUN,
        STOP,
        PAUSE
    }
}

