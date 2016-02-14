module wd{
    export class SpriteTransition extends Transition{
        public static create() {
        	var obj = new this();

        	return obj;
        }

        public normalSprite:ImageTextureAsset = null;
        public highlightSprite:ImageTextureAsset = null;
        public pressedSprite:ImageTextureAsset = null;
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

