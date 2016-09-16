module wd{
    export class UIStateMachine{
        public static create(ui:InteractionUI) {
        	var obj = new this(ui);

        	return obj;
        }

        constructor(ui:InteractionUI){
            this._ui = ui;
        }

        get transitionManager(){
            return this._ui.transitionManager;
        }

        get currentState(){
            return this._stateHistory.top || EUIState.NORMAL;
        }

        private _ui:InteractionUI = null;
        @cloneAttributeAsCloneable()
        private _stateHistory:wdCb.Stack<EUIState> = wdCb.Stack.create<EUIState>();

        public clone(ui:InteractionUI){
            return CloneUtils.clone(this, null, [ui]);
        }

        public changeState(state:EUIState){
            this._stateHistory.push(state);

            this.transitionManager.changeState(state);
            this._ui.dirty = true;
        }

        public backState(){
            var lastState:EUIState = null;

            this._stateHistory.pop();

            lastState = this._stateHistory.top;

            if(!lastState){
                lastState = EUIState.NORMAL;
            }

            this.transitionManager.changeState(lastState);
            this._ui.dirty = true;
        }

        public isState(state:EUIState){
            return this.currentState === state;
        }
    }
}
