/// <reference path="../../../definitions.d.ts"/>
module dy{
    export class Action extends Behavior{
        get isStart() {
            return !this.isStop;
        }

        get isStop() {
            return dyCb.Log.error(true, dyCb.Log.info.ABSTRACT_METHOD);
        }

        get isPause() {
            return dyCb.Log.error(true, dyCb.Log.info.ABSTRACT_METHOD);
        }

        protected p_target:GameObject = null;
        get target(){
            return this.p_target;
        }
        set target(target:GameObject){
            this.p_target = target;
        }

        public isFinish:boolean = false;

        public reset() {
            this.isFinish = false;
        }

        public update(time:number){
            return dyCb.Log.error(true, dyCb.Log.info.ABSTRACT_METHOD);
        }

        public addToGameObject(gameObject:GameObject){
            super.addToGameObject(gameObject);

            this.target = gameObject;
            gameObject.actionManager.addChild(this);
        }

        public removeFromGameObject(gameObject:GameObject){
            super.removeFromGameObject(gameObject);

            gameObject.actionManager.removeChild(this);
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
            this.isFinish = true;
            this.stop();
        }
        //todo add hook method like onEnter/onExit?
    }
}
