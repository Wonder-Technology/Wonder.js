/// <reference path="../../../definitions.d.ts"/>
module dy{
    export class Action extends Behavior{
        /*!to avoid be duplicate with child class's private attribute*/
        private dy_isFinish:boolean = false;
        get isFinish(){
            return this.dy_isFinish;
        }
        set isFinish(isFinish:boolean){
            this.dy_isFinish = isFinish;
        }

        get isStart() {
            return !this.isStop;
        }

        get isStop() {
            return dyCb.Log.error(true, dyCb.Log.info.ABSTRACT_METHOD);
        }

        get isPause() {
            return dyCb.Log.error(true, dyCb.Log.info.ABSTRACT_METHOD);
        }

        /*!
        add "p_" prefix to avoid be duplicate with the getter
         */
        protected p_target:GameObject = null;
        get target(){
            return this.p_target;
        }
        set target(target:GameObject){
            this.p_target = target;
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

        public pause() {
            return dyCb.Log.error(true, dyCb.Log.info.ABSTRACT_METHOD);
        }

        public resume() {
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
