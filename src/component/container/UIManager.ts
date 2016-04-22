module wd {
    export class UIManager extends ComponentContainer{
        public static create() {
            var obj = new this();

            return obj;
        }

        public entityObject:UIObject;

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
            return this.entityObject.getComponent<UIRenderer>(UIRenderer).state === EUIRendererState.DIRTY;
        }
    }
}

