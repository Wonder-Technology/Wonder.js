module wd{
    export abstract class Animation extends Component{
        get isStart(){
            return this.state === AnimationState.RUN;
        }
        get isStop(){
            return this.state === AnimationState.STOP;
        }
        get isPause(){
            return this.state === AnimationState.PAUSE;
        }

        public entityObject:GameObject;
        public isFrameChange:boolean = false;

        protected state:AnimationState = AnimationState.DEFAULT;
        protected pauseTime:number = null;
        protected resumeTime:number = null;

        private _isResume:boolean = false;

        public abstract play(animName:string, fps:number):void;

        public pause(){
            this.state = AnimationState.PAUSE;

            this.pauseTime = this.getPauseTime();
        }

        public resume(){
            this.state = AnimationState.RUN;

            this._isResume = true;
            this.resumeTime = this.getResumeTime();
        }

        public stop(){
            this.state = AnimationState.STOP;
        }

        public update(elapsedTime:number){
            if(this.state === AnimationState.DEFAULT || this.isStop){
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

            this.computeInterpolation(elapsedTime);

            this.updateTargets();
        }

        protected abstract getPauseTime():number;
        protected abstract getResumeTime():number;
        protected abstract handleWhenPause(elapsedTime:number):void;
        protected abstract handleWhenCurrentFrameFinish(elapsedTime:number):void;
        protected abstract handleBeforeJudgeWhetherCurrentFrameFinish(elapsedTime:number):void;
        protected abstract continueFromPausePoint(elapsedTime:number):void;
        protected abstract isCurrentFrameFinish(elapsedTime:number):boolean;
        protected abstract computeInterpolation(elapsedTime:number):void;
        protected abstract updateTargets():void;
    }

    export enum AnimationState{
        DEFAULT,
        RUN,
        STOP,
        PAUSE
    }
}

