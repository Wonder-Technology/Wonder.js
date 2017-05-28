export class LinkList<T>{
    public static create() {
    	var obj = new this();

    	return obj;
    }

    private _first:LinkNode<T> = null;
    private _last:LinkNode<T> = null;

    public shift(){
        var node = this._first;

        if(node === null){
            return null;
        }

        this._first = node.next;

        return node;
    }

    public push(node:LinkNode<T>){
        if(this._last === null){
            this._first = node;
            this._last = node;

            return;
        }

        this._last.next = node;

        this._last = node;
    }
}

export class LinkNode<T>{
    public static create(val:any) {
    	var obj = new this(val);

    	return obj;
    }

    constructor(val:T){
        this.val = val;
    }

    public val:T = null;
    public next:LinkNode<T> = null;
}
