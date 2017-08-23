"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
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
    LinkList.prototype.hasDuplicateNode = function (val) {
        var node = this._first;
        while (node !== null && node.val !== val) {
            node = node.next;
        }
        if (node === null) {
            return false;
        }
        return false;
    };
    return LinkList;
}());
exports.LinkList = LinkList;
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
exports.LinkNode = LinkNode;
//# sourceMappingURL=LinkList.js.map