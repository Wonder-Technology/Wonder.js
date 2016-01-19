module wd{
    export abstract class InteractionUI extends UI{
        protected p_transitionMode:TransitionMode = null;
        get transitionMode(){
            return this.p_transitionMode;
        }
        set transitionMode(transitionMode:TransitionMode){
            this.p_transitionMode = transitionMode;
        }

        public transitionManager:TransitionManager = TransitionManager.create(this);
    }
}
