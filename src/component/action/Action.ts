module wd{
    export abstract class Action extends Component{
        public abstract get isStop():boolean;
        public abstract get isPause():boolean;


        get isStart() {
            return !this.isStop;
        }

        protected p_target:EntityObject = null;
        get target(){
            return this.p_target;
        }
        set target(target:EntityObject){
            this.p_target = target;
        }

        public isFinish:boolean = false;

        public abstract update(elapsed:number);
        public abstract start();
        public abstract stop();
        public abstract pause();
        public abstract resume();
        public abstract reverse();

        public clone():Action{
            return CloneUtils.clone(this);
        }

        public reset() {
            this.isFinish = false;
        }


        public addToObject(entityObject:EntityObject, isShareComponent:boolean = false){
            var engine:ActionEngine = ActionEngine.getInstance();

            super.addToObject(entityObject, isShareComponent);

            this.target = entityObject;

            if(!engine.hasChild(this)){
                engine.addChild(this);
            }
        }

        public removeFromEngine(){
            ActionEngine.getInstance().removeChild(this);
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
