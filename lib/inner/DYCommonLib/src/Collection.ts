/// <reference path="definitions.d.ts"/>
module dyCb {
    export class Collection {
        public static create(children = []){
            var obj = new this(children);

            return obj;
        }

        constructor(children:any = []){
            this._children = children;
        }

        private _children:any[] = null;

        public getCount():number {
            return this._children.length;
        }

        public hasChild(arg):boolean {
            if (JudgeUtils.isFunction(arguments[0])) {
                let func = <Function>arguments[0];

                return this._contain(this._children, (c, i)  => {
                    return func(c, i);
                });
            }

            let child = <any>arguments[0];

            return this._contain(this._children, (c, i) => {
                if (c === child
                    || (c.uid && child.uid && c.uid === child.uid)) {
                    return true;
                }
                else {
                    return false;
                }
            });
        }

        public getChildren () {
            return this._children;
        }

        public getChild(index:number) {
            return this._children[index];
        }

        public addChild(child) {
            this._children.push(child);

            return this;
        }

        public addChildren(arg:any[]|Collection|any) {
            if (JudgeUtils.isArray(arg)) {
                let children = <any[]>arg;

                this._children = this._children.concat(children);
            }
            else if(arg instanceof Collection){
                let children = <Collection>arg;

                this._children = this._children.concat(children.toArray());
            }
            else {
                let child = <any>arg;

                this.addChild(child);
            }

            return this;
        }

        public removeAllChildren() {
            this._children = [];

            return this;
        }

        public forEach(func:Function, context?:any) {
            this._forEach(this._children, func, context);

            return this;
        }

        public filter(func) {
            return this._filter(this._children, func, this._children);
        }

        //public removeChildAt (index) {
        //    Log.error(index < 0, "序号必须大于等于0");
        //
        //    this._children.splice(index, 1);
        //}
        //
        //public copy () {
        //    return ExtendUtils.extendDeep(this._children);
        //}
        //
        //public reverse () {
        //    this._children.reverse();
        //}

        public removeChild(arg:any) {
            if (JudgeUtils.isFunction(arg)) {
                let func = <Function>arg;

                this._removeChild(this._children, func);
            }
            else if (arg.uid) {
                this._removeChild(this._children, (e) => {
                    if (!e.uid) {
                        return false;
                    }
                    return e.uid === arg.uid;
                });
            }
            else {
                this._removeChild(this._children,  (e) => {
                    return e === arg;
                });
            }

            return this;
        }

        public sort(func){
            this._children.sort(func);

            return this;
        }

        public map(func:Function){
            return this._map(this._children, func);
        }

        public toArray(){
            return this._children;
        }

        private _indexOf(arr:any[], arg:any) {
            var result = -1;

            if (JudgeUtils.isFunction(arg)) {
                let func = <Function>arg;

                this._forEach(arr, (value, index) => {
                    if (!!func.call(null, value, index)) {
                        result = index;
                        return $BREAK;   //如果包含，则置返回值为true,跳出循环
                    }
                });
            }
            else {
                let val = <any>arg;

                this._forEach(arr, (value, index) => {
                    if (val === value
                        || (value.contain && value.contain(val))
                        || (value.indexOf && value.indexOf(val) > -1)) {
                        result = index;
                        return $BREAK;   //如果包含，则置返回值为true,跳出循环
                    }
                });
            }

            return result;
        }

        private _contain(arr:any[], arg:any) {
            return this._indexOf(arr, arg) > -1;
        }

        private _forEach(arr:any[], func:Function, context?:any) {
            var scope = context || window,
                i = 0,
                len = arr.length;


            for(i = 0; i < len; i++){
                if (func.call(scope, arr[i], i) === $BREAK) {
                    break;
                }
            }
        }

        private _map(arr:any[], func:Function) {
            var resultArr = [];

            this._forEach(arr, (e, index) => {
                var result = func(e, index);

                if(result !== $REMOVE){
                    resultArr.push(result);
                }
                //e && e[handlerName] && e[handlerName].apply(context || e, valueArr);
            });

            return Collection.create(resultArr);
        }

        private _removeChild(arr:any[], func:Function) {
            var self = this,
                index = null;

            index = this._indexOf(arr, (e, index) => {
                return !!func.call(self, e);
            });

            //if (index !== null && index !== -1) {
            if (index !== -1) {
                arr.splice(index, 1);
                //return true;
            }
            //return false;
            return arr;
        }

        private _filter = function (arr, func, context) {
            var scope = context || window,
                result = [];

            this._forEach(arr, (value, index) => {
                if (!func.call(scope, value, index)) {
                    return;
                }
                result.push(value);
            });

            return Collection.create(result);
        };
    }
}
