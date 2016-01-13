module wd{
    export class UIStateMachine{
        public static create(ui:InteractionUI) {
        	var obj = new this(ui);

        	return obj;
        }

        constructor(ui:InteractionUI){
            this._ui = ui;
        }

        private _ui:InteractionUI = null;
        private _state:UIState = null;

        public changeState(state:UIState){
            if(state !== this._state){
                this._state = state;

                this._ui.transition.changeState(state);
            }
        }

        public getCurrentState(){
            return this._state;
        }
    }
}
