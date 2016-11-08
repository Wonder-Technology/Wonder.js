module wd {
    export abstract class Entity {
        private static _count:number = 1;

        constructor() {
            this.uid = Entity._count;
            Entity._count += 1;
        }

        public uid:number = null;
        public data:any = null;

        private _tagList:wdCb.Collection<string> = wdCb.Collection.create<string>();


        public addTag(tag:string) {
            this._tagList.addChild(tag);
        }

        public removeTag(tag:string) {
            this._tagList.removeChild(tag);
        }

        public getTagList() {
            return this._tagList;
        }

        public hasTag(tag:string) {
            return this._tagList.hasChild(tag);
        }

        public containTag(tag:string) {
            return this._tagList.hasChildWithFunc((t:string) => {
                return t.indexOf(tag) > -1;
            })
        }
    }
}
