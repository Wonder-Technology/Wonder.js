module wd{
    export class SpriteTransition extends Transition{
        public static create() {
        	var obj = new this();

        	return obj;
        }

        @cloneAttributeAsCloneable()
        public normalSprite:ImageTextureAsset = null;
        @cloneAttributeAsCloneable()
        public highlightSprite:ImageTextureAsset = null;
        @cloneAttributeAsCloneable()
        public pressedSprite:ImageTextureAsset = null;
        @cloneAttributeAsCloneable()
        public disabledSprite:ImageTextureAsset = null;

        public changeState(state:EUIState){
            switch (state){
                case EUIState.NORMAL:
                    this.target = this.normalSprite;
                    break;
                case EUIState.HIGHLIGHT:
                    this.target = this.highlightSprite;
                    break;
                case EUIState.PRESSED:
                    this.target = this.pressedSprite;
                    break;
                case EUIState.DISABLED:
                    this.target = this.disabledSprite;
                    break;
                default:
                    Log.error(true, Log.info.FUNC_UNEXPECT("state"));
                    break;
            }
        }
    }
}

