/// <reference path="../../filePath.d.ts"/>
module dy{
    export abstract class Action extends Component{
        get isStart() {
            return !this.isStop;
        }

        get isStop() {
            return Log.error(true, Log.info.ABSTRACT_ATTRIBUTE);
        }

        get isPause() {
            return Log.error(true, Log.info.ABSTRACT_ATTRIBUTE);
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

        public abstract update(time:number);

        public abstract start();

        public abstract stop();

        public abstract pause();

        public abstract resume();

        public abstract copy();

        public abstract reverse();

        public addToGameObject(gameObject:GameObject){
            super.addToGameObject(gameObject);

            this.target = gameObject;
            gameObject.actionManager.addChild(this);
        }

        public removeFromGameObject(gameObject:GameObject){
            super.removeFromGameObject(gameObject);

            gameObject.actionManager.removeChild(this);
        }

        public init(){
            this.start();
        }

        protected finish(){
            this.isFinish = true;
            this.stop();
        }
        //todo add hook method like onEnter/onExit?
    }
}
