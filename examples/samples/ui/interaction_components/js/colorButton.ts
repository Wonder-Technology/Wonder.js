/// <reference path="../../../../../dist/wd.d.ts"/>
module sample {
    import Button = wd.Button;
    import PlainFont = wd.PlainFont;
    import UIObject = wd.UIObject;
    import MouseEvent = wd.MouseEvent;
    import ButtonObjectName = wd.ButtonObjectName;
    import LoaderManager = wd.LoaderManager;
    import Image = wd.Image;
    import Color = wd.Color;

    @wd.script("colorButton")
    export class ColorButtonScript implements wd.IEventScriptBehavior {
        constructor(entityObject:UIObject) {
            this._entityObject = entityObject;
        }

        private _entityObject:UIObject = null;

        public init(){
            this._setText();
            this._setBackground();
        }

        public onMouseClick(e:MouseEvent) {
            if(this._entityObject.getComponent<Button>(Button).isDisabled()){
                return;
            }

            console.log("click");
        }

        private _setText(){
            var font = this._entityObject.getComponent<Button>(Button).getObject(ButtonObjectName.TEXT).getComponent<PlainFont>(PlainFont);

            font.fontSize = 30;
        }

        private _setBackground(){
            var image = this._entityObject.getComponent<Button>(Button).getObject(ButtonObjectName.BACKGROUND).getComponent<Image>(Image);

            //if set Button->backgroundTransition->normalColor, background will use it as the source instead of the one setted here
            image.color = Color.create("rgb(255, 255, 0)");
        }
    }
}

