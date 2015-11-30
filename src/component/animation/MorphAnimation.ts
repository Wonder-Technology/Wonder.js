/// <reference path="../../filePath.d.ts"/>
module wd{
    export class MorphAnimation extends Animation{
        public static create() {
        	var obj = new this();

        	return obj;
        }

        get isStart(){
            return this._state === AnimationState.RUN;
        }
        get isStop(){
            return this._state === AnimationState.STOP;
        }
        get isPause(){
            return this._state === AnimationState.PAUSE;
        }

        public interpolation:number = 0;
        public currentFrame:number = 0;
        public nextFrame:number = 1;
        public duration:number = null;
        public fps:number = null;
        public currentAnimName:string = null;
        public isFrameChange:boolean = false;

        private _currentTime:number = 0;
        private _oldTime:number = 0;
        private _frameCount:number = null;
        private _state:AnimationState = AnimationState.DEFAULT;
        private _isResume:boolean = false;
        private _isStartFromStop:boolean = false;
        private _pauseTime:number = null;
        private _resumeTime:number = null;

        public init(){
        }

        public dispose(){
        }

        @require(function(animName:string, fps:number){
            var geometry = this.gameObject.getComponent(ModelGeometry);

            assert(geometry, Log.info.FUNC_SHOULD("this gameObject", "add ModelGeometry component"));
            assert(geometry.morphTargets.getChild(animName) && geometry.morphTargets.getChild(animName).getCount() > 0, Log.info.FUNC_NOT_EXIST(`"${animName}" animation`));
        })
        @ensure(function(){
            assert(this._frameCount > 1, Log.info.FUNC_SHOULD("frames.count", "> 1"));
        })
        public play(animName:string, fps:number){
            var geometry = this.gameObject.getComponent<ModelGeometry>(ModelGeometry);

            this.currentAnimName = animName;
            this.fps = fps;

            this.duration = 1.0 / fps * 1000;

            this._frameCount = geometry.morphTargets.getChild(animName).getCount();

            this._start();
        }

        public pause(){
            this._state = AnimationState.PAUSE;
            this._pauseTime = this._currentTime;
        }

        public resume(){
            this._state = AnimationState.RUN;

            this._isResume = true;
            this._resumeTime = this._oldTime;
        }

        public stop(){
            this._state = AnimationState.STOP;
        }

        public update(time:number){
            if(this._state === AnimationState.DEFAULT){
                return;
            }

            if(this.isStop || this.isPause){
                this._oldTime = time;
                return;
            }

            if(this._isResume){
                this._isResume = false;
                this._continueFromPausePoint(time);
            }

            this._currentTime = time;

            if(this._isStartFromStop){
                this._isStartFromStop = false;
                this._resetAnim();
            }

            if(this._currentTime - this._oldTime > this.duration){
                this.isFrameChange = true;
                this._oldTime = this._floor(this._currentTime);

                this.currentFrame = this.nextFrame;
                this.nextFrame ++;
                if(this.nextFrame >= this._frameCount){
                    this.nextFrame = 0;
                }
            }
            else{
                this.isFrameChange = false;
            }

            this.interpolation = this.fps * (this._currentTime - this._oldTime) / 1000;
        }

        private _start(){
            this._currentTime = 0;
            this._oldTime = 0;
            this.currentFrame = 0;
            this.nextFrame = this.currentFrame + 1;

            if(this.isStop){
                this._isStartFromStop = true;
            }

            this._state = AnimationState.RUN;
        }

        private _floor(time:number){
            return time - time % this.duration;
        }

        private _resetAnim(){
            this._oldTime = this._currentTime;
        }

        private _continueFromPausePoint(currentTime:number){
            this._oldTime = currentTime - (this._resumeTime - this._pauseTime) % this.duration;
        }
    }

    enum AnimationState{
        DEFAULT,
        RUN,
        STOP,
        PAUSE
    }
}

