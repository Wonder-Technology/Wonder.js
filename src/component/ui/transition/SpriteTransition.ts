module wd{
    export class SpriteTransition extends Transition{
        public static create() {
        	var obj = new this();

        	return obj;
        }

        public normalSprite:ImageTextureAsset = null;
        public hightlightSprite:ImageTextureAsset = null;
        public pressedSprite:ImageTextureAsset = null;
        public disabledSprite:ImageTextureAsset = null;

        public changeState(state:UIState){
            switch (state){
                case UIState.NORMAL:
                    this.target = this.normalSprite;
                    break;
                case UIState.HIGHLIGHT:
                    this.target = this.hightlightSprite;
                    break;
                case UIState.PRESSED:
                    this.target = this.pressedSprite;
                    break;
                case UIState.DISABLED:
                    this.target = this.disabledSprite;
                    break;
                default:
                    Log.error(true, Log.info.FUNC_UNEXPECT("state"));
                    break;
            }
        }
    }
}

