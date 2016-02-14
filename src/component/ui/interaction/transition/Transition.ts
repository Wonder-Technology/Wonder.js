module wd{
    export abstract class Transition{
        private _target:any = null;
        get target(){
            if(this._target === null){
                this.changeState(EUIState.NORMAL);
            }

            return this._target;
        }
        set target(target:any){
            this._target = target;
        }

        public abstract changeState(state:EUIState);
    }
}
