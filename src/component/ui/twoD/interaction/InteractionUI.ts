module wd{
    export abstract class InteractionUI extends TwoDUI{
        protected p_transitionMode:ETransitionMode = null;
        @cloneAttributeAsBasicType()
        get transitionMode(){
            return this.p_transitionMode;
        }
        set transitionMode(transitionMode:ETransitionMode){
            this.p_transitionMode = transitionMode;
        }

        @cloneAttributeAsCloneable()
        public transitionManager:TransitionManager = TransitionManager.create(this);
    }
}
