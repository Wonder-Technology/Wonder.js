/// <reference path="../../../../../../dist/wd.d.ts"/>
module sample {
    import Button = wd.Button;
    import PlainFont = wd.PlainFont;
    import UIObject = wd.UIObject;
    import PointEvent = wd.PointEvent;
    import EButtonObjectName = wd.EButtonObjectName;
    import LoaderManager = wd.LoaderManager;
    import Image = wd.Image;

    @wd.script("spriteButton")
    export class SpriteButtonScript implements wd.IEventScriptBehavior {
        constructor(entityObject:UIObject) {
            this._entityObject = entityObject;
        }

        private _entityObject:UIObject = null;

        public init(){
            this._setText();
            this._setBackground();
        }

        public onPointTap(e:PointEvent) {
            if(this._entityObject.getComponent<Button>(Button).isDisabled){
                return;
            }

            console.log("click");
        }

        private _setText(){
            var font = this._entityObject.getComponent<Button>(Button).getObject(EButtonObjectName.TEXT).getComponent<PlainFont>(PlainFont);

            font.fontSize = 30;
        }

        private _setBackground(){
            var image = this._entityObject.getComponent<Button>(Button).getObject(EButtonObjectName.BACKGROUND).getComponent<Image>(Image);

            //if set Button->backgroundTransition->normalSprite, background will use it as the source instead of the one setted here
            image.source = LoaderManager.getInstance().get("normal2");
        }
    }
}

