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

        private _uiObject:UIObject;

        @virtual
        public update(elapsed:number){
            this.list.forEach((ui:UI) => {
                ui.update(elapsed);
            });
        }

        @require(function(){
            assert(this.list.getCount() <= 1, Log.info.FUNC_SHOULD("only contain one ui component"));
        })
        public render(){
            if(this.list.getCount() === 0){
                return;
            }

            if(this._isDirty()) {
                this.list.forEach((ui:UI) => {
                    ui.render();
                });
            }
        }

        private _isDirty() {
            return this._uiObject.getComponent<UIRenderer>(UIRenderer).state === EUIRendererState.DIRTY;
        }
    }
}

