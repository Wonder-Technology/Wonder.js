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

        private _ui:InteractionUI = null;
        private _stateHistory:wdCb.Stack<UIState> = wdCb.Stack.create<UIState>();

        public changeState(state:UIState){
            this._stateHistory.push(state);

            this.transitionManager.changeState(state);
            this._ui.dirty = true;
        }

        public backState(){
            var lastState:UIState = null;

            this._stateHistory.pop();

            lastState = this._stateHistory.top;

            if(!lastState){
                lastState = UIState.NORMAL;
            }

            this.transitionManager.changeState(lastState);
            this._ui.dirty = true;
        }

        public getCurrentState(){
            return this._stateHistory.top || UIState.NORMAL;
        }
    }
}
