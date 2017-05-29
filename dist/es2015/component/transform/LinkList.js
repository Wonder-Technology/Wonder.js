var LinkList = (function () {
    function LinkList() {
        this._first = null;
        this._last = null;
    }
    LinkList.create = function () {
        var obj = new this();
        return obj;
    };
    LinkList.prototype.shift = function () {
        var node = this._first;
        if (node === null) {
            return null;
        }
        this._first = node.next;
        return node;
    };
    LinkList.prototype.push = function (node) {
        if (this._last === null) {
            this._first = node;
            this._last = node;
            return;
        }
        this._last.next = node;
        this._last = node;
    };
    return LinkList;
}());
export { LinkList };
var LinkNode = (function () {
    function LinkNode(val) {
        this.val = null;
        this.next = null;
        this.val = val;
    }
    LinkNode.create = function (val) {
        var obj = new this(val);
        return obj;
    };
    return LinkNode;
}());
export { LinkNode };
//# sourceMappingURL=LinkList.js.map