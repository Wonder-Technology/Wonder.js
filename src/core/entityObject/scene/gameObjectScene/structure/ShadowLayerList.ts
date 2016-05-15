module wd{
    export class ShadowLayerList{
        public static create() {
        	var obj = new this();

        	return obj;
        }

        public dirty:boolean = false;

        private _list:wdCb.Collection<string> = wdCb.Collection.create<string>();
        private _lastList:wdCb.Collection<string> = null;

        public init(){
            this._lastList = this._list.clone();
        }

        public update(){
            if(this.dirty){
                EventManager.trigger(CustomEvent.create(<any>EEngineEvent.SHADOWMAP_LAYER_CHANGE));

                this.dirty = false;
            }

            this._lastList = this._list.clone();
        }

        public getDiffData(){
            var lastList = this._lastList,
                currentList = this._list,
                addLayerList = null,
                removeLayerList = null;

            if(lastList === null){
                return {
                    addLayerList: this._list.clone(),
                    removeLayerList: wdCb.Collection.create<string>()
                }
            }

            addLayerList = wdCb.Collection.create<string>();
            removeLayerList = wdCb.Collection.create<string>();

            removeLayerList = lastList
                .filter((layer:string) => {
                    return !currentList.hasChild(layer);
                });

            addLayerList = currentList
                .filter((layer:string) => {
                    return !lastList.hasChild(layer);
                });

            return {
                addLayerList: addLayerList,
                removeLayerList: removeLayerList
            }
        }

        public getCount(){
            return this._list.getCount();
        }

        public addChild(layer:string){
            this._list.addChild(layer);

            this.dirty = true;
        }

        public addChildren(...args){
            this._list.addChildren.apply(this._list, args);

            this.dirty = true;
        }

        public removeChild(layer:string){
            this.dirty = true;

            return this._convertCollectionToThis(this._list.removeChild(layer));
        }

        public removeAllChildren(){
            this.dirty = true;

            this._list.removeAllChildren();
        }

        public removeRepeatItems(){
            var result = this._convertCollectionToThis(this._list.removeRepeatItems());

            result.dirty = this.dirty;

            return result;
        }

        public hasRepeatItems(){
            return this._list.hasRepeatItems();
        }

        public forEach(...args){
            this._list.forEach.apply(this._list, args);
        }

        public getChildren(){
            return this._list.getChildren();
        }

        public hasChild(layer:string){
            return this._list.hasChild(layer);
        }

        private _convertCollectionToThis(list:wdCb.Collection<string>){
            var result = ShadowLayerList.create();

            result.addChildren(list.getChildren());

            return result;
        }
    }
}
