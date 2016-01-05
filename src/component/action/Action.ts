/// <reference path="../../filePath.d.ts"/>
module wd{
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

        protected p_target:GameEntityObject = null;
        get target(){
            return this.p_target;
        }
        set target(target:GameEntityObject){
            this.p_target = target;
        }

        public isFinish:boolean = false;

        public reset() {
            this.isFinish = false;
        }

        public abstract update(elapsedTime:number);

        public abstract start();

        public abstract stop();

        public abstract pause();

        public abstract resume();

        public abstract copy();

        public abstract reverse();

        public addToObject(entityObject:GameEntityObject){
            super.addToObject(entityObject);

            this.target = entityObject;
            entityObject.actionManager.addChild(this);
        }

        public removeFromObject(entityObject:GameEntityObject){
            super.removeFromObject(entityObject);

            entityObject.actionManager.removeChild(this);
        }

        public init(){
            this.start();
        }

        protected finish(){
            this.isFinish = true;
            this.stop();
        }
    }
}
