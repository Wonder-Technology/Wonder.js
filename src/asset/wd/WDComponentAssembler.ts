module wd{
    export abstract class WDComponentAssembler{
        public abstract createComponent(component:IWDComponent):Component;
    }
}
