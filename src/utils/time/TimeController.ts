/// <reference path="../../definitions.d.ts"/>
module dy{
    export class TimeController{
        public static create() {
        	var obj = new this();

        	return obj;
        }

        public elapsed:number = null;
        public pauseElapsed:number = null;
        public pauseTime:number = null;
        public startTime:number = null;

        public start() {
            this.startTime = window.performance.now();
            this.pauseElapsed = null;
        }

        public pause() {
            this.pauseTime = window.performance.now();
        }

        public resume(){
            this.pauseElapsed = window.performance.now() - this.pauseTime;
            this.pauseTime = null;
        }

        public computeElapseTime(time:number){
            if(this.pauseElapsed){
                this.elapsed = time - this.pauseElapsed - this.startTime;

                return this.elapsed;
            }

            this.elapsed = time - this.startTime;

            return this.elapsed;
        }
    }
}
