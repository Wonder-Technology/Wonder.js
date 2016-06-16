module wd{
    @singleton()
    export class UIEngine extends ComponentContainer{
        public static getInstance():any {}

        protected list:wdCb.Collection<UI>;

        public update(elapsed:number){
            this.list.forEach(function(child:UI){
                child.update(elapsed);
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

