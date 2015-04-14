module Engine3D{
    const $BREAK = 1;

    export class Hash{
        public static create():Hash {
            var obj = new this();

            return obj;
        }

        private _childs:any = {};

        //public getChilds() {
        //    return this._childs;
        //}

        public getChild(key) {
            return this._childs[key];
        }

        public addChild(key, value) {
            this._childs[key] = value;

            return this;
        }

        //public appendChild(key, value) {
        //    if (YE.Tool.judge.isArray(this._childs[key])) {
        //        this._childs[key].push(value);
        //    }
        //    else {
        //        this._childs[key] = [value];
        //    }
        //
        //    return this;
        //}
        //
        //public removeChild(key) {
        //    this._childs[key] = undefined;
        //}

        public hasChild(key) {
            return !!this._childs[key];
        }

        public forEach(fn:Function, context?:any) {
            var i = null,
                childs = this._childs;

            for (i in childs) {
                if (childs.hasOwnProperty(i)) {
                    if (fn.call(context, childs[i], i) === $BREAK) {
                        break;
                    }
                }
            }
        }

        //public map(handlerName:string, argArr?:any[]) {
        //    var i = null,
        //        childs = this._childs;
        //
        //    for (i in childs) {
        //        if (childs.hasOwnProperty(i)) {
        //            childs[i][handlerName].apply(childs[i], argArr);
        //        }
        //    }
        //}
    }
}
