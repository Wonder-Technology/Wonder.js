module wd{
    @singleton()
    export class ThreeDUIEngine extends ComponentContainer{
        public static getInstance():any {}

        protected list:wdCb.Collection<ThreeDUI>;

        public update(elapsed:number){
            this.list.forEach(function(child:ThreeDUI){
                child.update(elapsed);
            });
        }

        //public render(){
        //    this.list.forEach((ui:ThreeDUI) => {
        //        if(this._isDirty(ui.entityObject))
        //            ui.render();
        //    }, this);
        //}
        //
        //private _isDirty(uiObject:UIObject) {
        //    return uiObject.getComponent<UIRenderer>(UIRenderer).state === EUIRendererState.DIRTY;
        //}
    }
}

