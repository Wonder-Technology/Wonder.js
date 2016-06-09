module wd {
    export abstract class ActionInterval extends Action{
        protected elapsed:number = null;
        protected duration:number = null;

        private _isStop:boolean = true;
        private _isPause:boolean = false;
        private _timeController:CommonTimeController = CommonTimeController.create();

        get isStop() {
            return this._isStop;
        }

        get isPause() {
            return this._isPause;
        }

        public update(elapsed:number){
            if (elapsed < this._timeController.startTime) {
                return;
            }

            this.elapsed = this._convertToRatio(this._timeController.computeElapseTime(elapsed));

            this.updateBody(elapsed);

            if (this.elapsed === 1) {
                this.finish();
            }
        }

        public start() {
            this._isStop = false;
            this._timeController.start();
        }

        public stop() {
            this._isStop = true;
            this._timeController.stop();
        }

        public reset() {
            super.reset();

            this._isStop = true;
        }

        public pause() {
            this._isPause = true;
            this._timeController.pause();
        }

        public resume(){
            this._isPause = false;
            this._timeController.resume();
        }

        @virtual
        protected updateBody(time:number){
        }

        private _convertToRatio(elapsed:number){
            var ratio = elapsed / this.duration;

            return ratio > 1 ? 1 : ratio;
        }
    }
}

