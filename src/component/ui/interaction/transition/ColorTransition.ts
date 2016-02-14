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

        public changeState(state:EUIState){
            switch (state){
                case EUIState.NORMAL:
                    this.target = this.normalColor;
                    break;
                case EUIState.HIGHLIGHT:
                    this.target = this.highlightColor;
                    break;
                case EUIState.PRESSED:
                    this.target = this.pressedColor;
                    break;
                case EUIState.DISABLED:
                    this.target = this.disabledColor;
                    break;
                default:
                    Log.error(true, Log.info.FUNC_UNEXPECT("state"));
                    break;
            }
        }
    }
}

