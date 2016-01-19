module wd{
    export class ColorTransition extends Transition{
        public static create() {
        	var obj = new this();

        	return obj;
        }

        public normalColor:Color = null;
        public highlightColor:Color = null;
        public pressedColor:Color = null;
        public disabledColor:Color = null;

        public changeState(state:UIState){
            switch (state){
                case UIState.NORMAL:
                    this.target = this.normalColor;
                    break;
                case UIState.HIGHLIGHT:
                    this.target = this.highlightColor;
                    break;
                case UIState.PRESSED:
                    this.target = this.pressedColor;
                    break;
                case UIState.DISABLED:
                    this.target = this.disabledColor;
                    break;
                default:
                    Log.error(true, Log.info.FUNC_UNEXPECT("state"));
                    break;
            }
        }
    }
}

