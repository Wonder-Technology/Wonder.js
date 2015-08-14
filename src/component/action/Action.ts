/// <reference path="../../definitions.d.ts"/>
module dy{
    export class Action extends Component{
        //enabled:boolean = true;

        //to avoid be duplicate with child class's private attribute
        private dy_isFinish:boolean = false;
        get isFinish(){
            return this.dy_isFinish;
        }
        set isFinish(isFinish:boolean){
            this.dy_isFinish = isFinish;
        }

        public isStart() {
            return !this.isStop();
        }

        public reset() {
            this.dy_isFinish = false;
        }

        public update(time:number){
            return dyCb.Log.error(true, dyCb.Log.info.ABSTRACT_METHOD);
        }

        public start() {
            return dyCb.Log.error(true, dyCb.Log.info.ABSTRACT_METHOD);
        }

        public stop() {
            return dyCb.Log.error(true, dyCb.Log.info.ABSTRACT_METHOD);
        }

        public isStop() {
            return dyCb.Log.error(true, dyCb.Log.info.ABSTRACT_METHOD);
        }

        public copy() {
            return dyCb.Log.error(true, dyCb.Log.info.ABSTRACT_METHOD);
        }

        public reverse() {
            return dyCb.Log.error(true, dyCb.Log.info.ABSTRACT_METHOD);
        }

        protected finish(){
            this.dy_isFinish = true;
            this.stop();
        }

        //todo add hook method like onEnter/onExit?
    }
}
