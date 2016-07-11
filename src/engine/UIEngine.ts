module wd{
    @singleton()
    export class UIEngine extends ComponentContainer{
        public static getInstance():any {}

        protected list:wdCb.Collection<TwoDUI>;

        public update(elapsed:number){
            this.list.forEach(function(child:TwoDUI){
                child.update(elapsed);
            });
        }

        public render(){
            this.list.forEach((ui:TwoDUI) => {
                if(this._isDirty(ui.entityObject))
                    ui.render();
            }, this);
        }

        private _isDirty(uiObject:UIObject) {
            return uiObject.getComponent<UIRenderer>(UIRenderer).state === EUIRendererState.DIRTY;
        }
    }
}

