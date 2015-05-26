/// <reference path="../utils/JudgeUtils.ts"/>
/// <reference path="../utils/ExtendUtils.ts"/>
/// <reference path="../log/Log.ts"/>
module Engine3D {
    const $BREAK = 1;

    export class Collection {
        public static create():Collection {
            var obj = new this();

            return obj;
        }

        //to use Array extend method(such as contain) defined in jsExtend.js,
        //here should define type "any",not "any[]"
        private _childs:any = [];

        public getCount():number {
            return this._childs.length;
        }

        //public sort (func) {
        //    this._childs.sort(func);
        //}

        public hasChild(arg):boolean {
            if (JudgeUtils.isFunction(arguments[0])) {
                let func = <Function>arguments[0];

                return this._contain(this._childs, function (c, i) {
                    return func(c, i);
                });
            }

            let child = <any>arguments[0];

            return this._contain(this._childs, function (c, i) {
                if (c === child
                    || (c.uid && child.uid && c.uid === child.uid)) {
                    return true;
                }
                else {
                    return false;
                }
            });
        }

        //public getChilds () {
        //    return this._childs;
        //}

        //public getChildAt (index:number) {
        //    return this._childs[index];
        //}

        public addChild(child):Collection {
            this._childs.push(child);

            return this;
        }

        public addChilds(arg:any[]|any):Collection {
            var i = 0,
                len = 0;

            if (!JudgeUtils.isArray(arg)) {
                let child = <any>arg;

                this.addChild(child);
            }
            else {
                let childs = <any[]>arg;

                this._childs = this._childs.concat(childs);
                //for (i = 0, len = childs.length; i < len; i++) {
                //    this.addChild(childs[i]);
                //}
            }

            return this;
        }

        //
        public removeAllChilds():Collection {
            this._childs = [];

            return this;
        }

        public forEach(func:Function, context?:any):Collection {
            this._forEach(this._childs, func, context);
            //this._childs.forEach.apply(this._childs, arguments);

            return this;
        }

        //public map (handlerName:string, argArr?:any[], context?:any) {
        //    this._map(this._childs, handlerName, argArr, context);
        //}

        public filter(func):Collection {
            this._filter(this._childs, func, this._childs);

            return this;
        }

        //public removeChildAt (index) {
        //    Log.error(index < 0, "序号必须大于等于0");
        //
        //    this._childs.splice(index, 1);
        //}
        //
        //public copy () {
        //    return ExtendUtils.extendDeep(this._childs);
        //}
        //
        //public reverse () {
        //    this._childs.reverse();
        //}

        public removeChild(arg:any):Collection {
            if (JudgeUtils.isFunction(arg)) {
                let func = <Function>arg;

                this._removeChild(this._childs, func);
            }
            else if (arg.uid) {
                this._removeChild(this._childs, function (e) {
                    if (!e.uid) {
                        return false;
                    }
                    return e.uid === arg.uid;
                });
            }
            else {
                this._removeChild(this._childs, function (e) {
                    return e === arg;
                });
            }

            return this;
        }

        public sort(func:Function):Collection {
            this._childs.sort(func);

            return this;
        }

        private _indexOf(arr:any[], arg:any) {
            var result = -1;

            if (JudgeUtils.isFunction(arg)) {
                let func = <Function>arg;

                this._forEach(arr, function (value, index) {
                    if (!!func.call(null, value, index)) {
                        result = index;
                        return $BREAK;   //如果包含，则置返回值为true,跳出循环
                    }
                });
            }
            else {
                let val = <any>arg;

                this._forEach(arr, function (value, index) {
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
            var scope = context || window;

            for (var i = 0, j = arr.length; i < j; ++i) {
                if (func.call(scope, arr[i], i) === $BREAK) {
                    break;
                }
            }
        }

        //private _map(arr:any[], handlerName:string, valueArr?:any[], context?:any) {
        //    if (valueArr && !JudgeUtils.isArray(valueArr)) {
        //        Log.error(valueArr && !JudgeUtils.isArray(valueArr), "参数必须为数组");
        //        return;
        //    }
        //
        //    this._forEach(arr, function (e) {
        //        e && e[handlerName] && e[handlerName].apply(context || e, valueArr);
        //    })
        //}

        private _removeChild(arr:any[], func:Function) {
            var self = this,
                index = null;

            index = this._indexOf(arr, function (e, index) {
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
                //self = this,
                a = Collection.create();

            this._forEach(arr, function (value, index) {
                if (!func.call(scope, value, index)) {
                    return;
                }
                a.addChild(value);
            });

            return a;
        };
    }
}