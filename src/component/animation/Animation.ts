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

        protected state:EAnimationState = EAnimationState.DEFAULT;
        protected pauseTime:number = null;
        protected resumeTime:number = null;
        protected pauseDuration:number = null;
        protected frameCount:number = null;

        private _isResume:boolean = false;

        public abstract play(animName:string, fps:number):void;

        public addToObject(entityObject:EntityObject, isShareComponent:boolean = false){
            var engine:AnimationComponentContainer = AnimationComponentContainer.getInstance();

            super.addToObject(entityObject, isShareComponent);

            if(!engine.hasChild(this)){
                engine.addChild(this);
            }
        }

        public removeFromEngine(){
            AnimationComponentContainer.getInstance().removeChild(this);
        }

        public clone(){
            return CloneUtils.clone(this);
        }

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

            EventManager.emit(this.entityObject, CustomEvent.create(<any>EEngineEvent.ANIMATION_STOP));
        }

        public update(elapsed:number){
            if(this.state === EAnimationState.DEFAULT || this.isStop){
                return;
            }

            if(this.isPause){
                this.handleWhenPause(elapsed);
                return;
            }

            if(this._isResume){
                this._isResume = false;
                this.continueFromPausePoint(elapsed);
            }

            this.handleUpdate(elapsed);
        }

        protected abstract handleWhenPause(elapsed:number):void;
        protected abstract handleUpdate(elapsed:number):void;

        protected getPauseTime(){
            return this.getCurrentTime();
        }

        protected getResumeTime(){
            return this.getCurrentTime();
        }

        protected getCurrentTime(){
            return Director.getInstance().elapsed;
        }

        protected continueFromPausePoint(elapsed:number){
            this.pauseDuration += this.resumeTime - this.pauseTime;
        }
    }

    export enum EAnimationState{
        DEFAULT,
        RUN,
        STOP,
        PAUSE
    }
}

