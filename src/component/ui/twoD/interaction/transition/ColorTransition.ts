module wd{
    export class ColorTransition extends Transition{
        public static create() {
        	var obj = new this();

        	return obj;
        }

        @cloneAttributeAsCloneable()
        public normalColor:Color = null;
        @cloneAttributeAsCloneable()
        public highlightColor:Color = null;
        @cloneAttributeAsCloneable()
        public pressedColor:Color = null;
        @cloneAttributeAsCloneable()
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

