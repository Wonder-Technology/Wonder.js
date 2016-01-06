module wd{
    export abstract class TimeController{
        public elapsed:number = null;
        public pauseElapsed:number = 0;
        public pauseTime:number = null;
        public startTime:number = null;

        public start() {
            this.startTime = this.getNow();
            this.pauseElapsed = null;
        }

        public stop(){
            this.startTime = null;
        }

        public pause() {
            this.pauseTime = this.getNow();
        }

        public resume(){
            this.pauseElapsed += this.getNow() - this.pauseTime;
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

        protected abstract getNow();
    }
}
