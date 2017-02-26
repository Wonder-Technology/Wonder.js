import { Collection } from "wonder-commonlib/dist/es2015/Collection";
var Entity = (function () {
    function Entity() {
        this.uid = null;
        this.data = null;
        this._tagList = Collection.create();
        this.uid = Entity._count;
        Entity._count += 1;
    }
    Entity.prototype.addTag = function (tag) {
        this._tagList.addChild(tag);
    };
    Entity.prototype.removeTag = function (tag) {
        this._tagList.removeChild(tag);
    };
    Entity.prototype.getTagList = function () {
        return this._tagList;
    };
    Entity.prototype.hasTag = function (tag) {
        return this._tagList.hasChild(tag);
    };
    Entity.prototype.containTag = function (tag) {
        return this._tagList.hasChildWithFunc(function (t) {
            return t.indexOf(tag) > -1;
        });
    };
    return Entity;
}());
export { Entity };
Entity._count = 1;
//# sourceMappingURL=Entity.js.map