/// <reference path="../../filePath.d.ts"/>
module wd {
    export class UIManager{
        public static create(gameObject:GameObject) {
        	var obj = new this(gameObject);

        	return obj;
        }

        constructor(gameObject:GameObject){
            this._gameObject = gameObject;
        }

        private _uiList:wdCb.Collection<UI> = wdCb.Collection.create<UI>();
        private _gameObject:GameObject = null;

        public hasChild(ui:UI){
            return this._uiList.hasChild(ui);
        }

        public addChild(ui:UI){
            if(this.hasChild(ui)){
                return;
            }

            this._uiList.addChild(ui);
        }

        public removeChild(ui:UI){
            this._uiList.removeChild(ui);
        }

        public update(elapsedTime:number){
            var uiRenderer = this._getUIRenderer();

            if(uiRenderer && uiRenderer.isClear){
                this._uiList.forEach((ui:UI) => {
                    ui.update(elapsedTime);
                });

                return;
            }

            this._uiList.forEach((ui:UI) => {
                if(ui.dirty){
                    if(uiRenderer && !uiRenderer.isClear){
                        uiRenderer.clearCanvas();
                    }

                    ui.update(elapsedTime);
                }
            });
        }

        @require(function(){
            assert(this._gameObject._getComponentCount(UIRenderer) <= 1, Log.info.FUNC_SHOULD_NOT("gameObject", "contain more than 1 uiRenderer component"));
        })
        private _getUIRenderer():UIRenderer{
            return this._gameObject.getComponent<UIRenderer>(UIRenderer);
        }
    }
}

