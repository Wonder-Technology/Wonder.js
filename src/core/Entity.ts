export abstract class Entity {
    private static _count: number = 1;

    constructor() {
        this.uid = Entity._count;
        Entity._count += 1;
    }

    public uid: number = null;
    public data: any = null;

    private _tagList: Array<string> = [];

    public addTag(tag: string) {
        this._tagList.push(tag);
    }

    public removeTag(tag: string) {
        this._tagList.splice(this._tagList.indexOf(tag), 1);
    }

    public getTagList() {
        return this._tagList;
    }

    public hasTag(targetTag: string) {
        return this._tagList.indexOf(targetTag) > -1;
    }

    public containTag(targetTag: string) {
        for(let tag of this._tagList){
            if(tag.indexOf(targetTag) > -1){
                return true;
            }
        }

        return false;
    }
}