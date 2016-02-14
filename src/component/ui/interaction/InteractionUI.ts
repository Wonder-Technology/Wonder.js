module wd{
    export abstract class InteractionUI extends UI{
        protected p_transitionMode:ETransitionMode = null;
        get transitionMode(){
            return this.p_transitionMode;
        }
        set transitionMode(transitionMode:ETransitionMode){
            this.p_transitionMode = transitionMode;
        }

        public transitionManager:TransitionManager = TransitionManager.create(this);
    }
}
