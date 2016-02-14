module wd {
    export class UIManager extends ComponentContainer{
        public static create(uiObject:UIObject) {
            var obj = new this(uiObject);

            return obj;
        }

        constructor(uiObject:UIObject){
            super();

            this._uiObject = uiObject;
        }

        private _uiObject:UIObject = null;

        @require(function(elapsedTime:number){
            assert(this.list.getCount() <= 1, Log.info.FUNC_SHOULD("only contain one ui component"));
        })
        public update(elapsedTime:number){
            if(this.list.getCount() === 0){
                return;
            }

            if(this._isDirty()) {
                this.list.forEach((ui:UI) => {
                    ui.update(elapsedTime);
                });
            }
        }

        private _isDirty() {
            return this._uiObject.getComponent<UIRenderer>(UIRenderer).state === EUIRendererState.DIRTY;
        }
    }
}

