module wd{
    export class MorphAnimation extends Animation{
        public static create() {
        	var obj = new this();

        	return obj;
        }

        public interpolation:number = 0;
        public currentFrame:number = 0;
        public nextFrame:number = 1;
        public duration:number = null;
        public fps:number = null;
        public currentAnimName:string = null;

        private _oldTime:number = 0;
        private _frameCount:number = null;
        private _isStartFromStop:boolean = false;

        public init(){
        }

        public dispose(){
        }

        @require(function(animName:string, fps:number){
            var geometry = this.entityObject.getComponent(ModelGeometry);

            assert(geometry, Log.info.FUNC_SHOULD("this entityObject", "add ModelGeometry component"));
            assert(geometry.morphTargets.getChild(animName) && geometry.morphTargets.getChild(animName).getCount() > 0, Log.info.FUNC_NOT_EXIST(`"${animName}" animation`));
        })
        @ensure(function(){
            assert(this._frameCount > 1, Log.info.FUNC_SHOULD("frames.count", "> 1"));
        })
        public play(animName:string, fps:number){
            var geometry = this.entityObject.getComponent<ModelGeometry>(ModelGeometry);

            this.currentAnimName = animName;
            this.fps = fps;

            this.duration = 1.0 / fps * 1000;

            this._frameCount = geometry.morphTargets.getChild(animName).getCount();

            this._start();
        }

        protected getPauseTime(){
            return Director.getInstance().elapsed;
        }

        protected getResumeTime(){
            return this._oldTime;
        }

        protected handleWhenPause(elapsedTime:number):void{
            this._oldTime = elapsedTime;
        }

        protected handleWhenCurrentFrameFinish(elapsedTime:number):void{
            this.isFrameChange = true;
            this._oldTime = this._floor(elapsedTime);

            this.currentFrame = this.nextFrame;
            this.nextFrame ++;
            if(this.nextFrame >= this._frameCount){
                this.nextFrame = 0;
            }
        }

        protected handleBeforeJudgeWhetherCurrentFrameFinish(elapsedTime:number):void{
            if(this._isStartFromStop){
                this._isStartFromStop = false;
                this._resetAnim(elapsedTime);
            }
        }

        protected isCurrentFrameFinish(elapsedTime:number):boolean{
            return elapsedTime - this._oldTime > this.duration;
        }

        protected computeInterpolation(elapsedTime:number):void{
            this.interpolation = this.fps * (elapsedTime - this._oldTime) / 1000;
        }

        protected updateTargets():void{
        }

        protected continueFromPausePoint(elapsedTime:number){
            this._oldTime = elapsedTime - (this.resumeTime - this.pauseTime) % this.duration;
        }

        private _start(){
            this._oldTime = 0;
            this.currentFrame = 0;
            this.nextFrame = this.currentFrame + 1;

            if(this.isStop){
                this._isStartFromStop = true;
            }

            this.state = AnimationState.RUN;
        }

        private _floor(time:number){
            return time - time % this.duration;
        }

        private _resetAnim(elapsedTime:number){
            this._oldTime = elapsedTime;
        }
    }
}

