module wd{
    export class UIEngine extends ComponentContainer{
        private static _instance = null;

        public static getInstance() {
            if (this._instance === null) {
                this._instance = new this();
            }

            return this._instance;
        }

        protected list:wdCb.Collection<UI>;

        public update(elapsedTime:number){
            this.list.forEach(function(child:UI){
                child.update(elapsedTime);
            });
        }

        public render(){
            this.list.forEach((ui:UI) => {
                if(this._isDirty(ui.entityObject))
                    ui.render();
            }, this);
        }

        private _isDirty(uiObject:UIObject) {
            return uiObject.getComponent<UIRenderer>(UIRenderer).state === EUIRendererState.DIRTY;
        }
    }
}

