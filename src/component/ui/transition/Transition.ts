module wd{
    //todo support color tint
    export abstract class Transition{
        public target:any = null;

        public abstract changeState(state:UIState);
    }
}
