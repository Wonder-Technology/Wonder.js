module wd{
    export abstract class ComponentContainer{
        protected list:wdCb.Collection<Component> = wdCb.Collection.create<Component>();

        public addChild(component:Component){
            this.list.addChild(component);
        }

        public removeChild(component:Component){
            this.list.removeChild(component);
        }

        public removeAllChildren(){
            this.list.removeAllChildren();
        }

        public hasChild(component:Component){
            return this.list.hasChild(component);
        }
    }
}

