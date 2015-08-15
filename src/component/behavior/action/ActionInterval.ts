/// <reference path="../../../definitions.d.ts"/>
module dy {
    export class ActionInterval extends Action{
        protected elapsed:number = null;
        protected duration:number = null;

        private _isStop:boolean = true;
        private _isPause:boolean = false;
        private _pauseElapsed:number = null;
        private _pauseTime:number = null;
        private _startTime:number = null;

        get isStop() {
            return this._isStop;
        }

        get isPause() {
            return this._isPause;
        }

        public update(time:number){
            if (time < this._startTime) {
                return;
            }

            this.elapsed = this._convertToRatio(this._computeElapseTime(time));

            this.updateBody(time);

            if (this.elapsed === 1) {
                this.finish();
            }
        }

        public start() {
            this._isStop = false;

            this._startTime = window.performance.now();
            this._pauseElapsed = null;
        }

        public stop() {
            this._isStop = true;
        }

        public reset() {
            super.reset();

            this._isStop = true;
        }

        public pause() {
            this._isPause = true;
            this._pauseTime = window.performance.now();
        }

        public resume(){
            this._isPause = false;
            this._pauseElapsed = window.performance.now() - this._pauseTime;
            this._pauseTime = null;
        }

        /*! virtual method */
        protected updateBody(time:number){
        }

        private _computeElapseTime(time:number){
            if(this._pauseElapsed){
                return time - this._pauseElapsed - this._startTime;
            }

            return time - this._startTime;
        }

        private _convertToRatio(elapsed:number){
            var ratio = elapsed / this.duration;

            return ratio > 1 ? 1 : ratio;
        }
    }
}

