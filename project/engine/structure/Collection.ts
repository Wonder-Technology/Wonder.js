/// <reference path="../utils/JudgeUtils.ts"/>
/// <reference path="../utils/ExtendUtils.ts"/>
/// <reference path="../Log.ts"/>
module Engine3D{
    const $BREAK = 1;

    export class Collection{
        public static create():Collection {
            var obj = new this();

            return obj;
        }

        //to use Array extend method(such as contain) defined in jsExtend.js,
        //here should define type "any",not "any[]"
        private _childs:any = [];

        public getCount () {
            return this._childs.length;
        }

        //public sort (func) {
        //    this._childs.sort(func);
        //}

        public hasChild (arg) {
            if (JudgeUtils.isFunction(arguments[0])) {
                let func:Function = <Function>arguments[0];

                return this._contain(this._childs, function (c, i) {
                    return func(c, i);
                });
            }

            let child:any = <any>arguments[0];

            return this._contain(this._childs, function (c, i) {
                if (c === child){
                    //|| (c.getUid && child.getUid && c.getUid() === child.getUid())) {
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

        public addChild (child) {
            this._childs.push(child);

            return this;
        }

        public addChilds (childs:any[]|any) {
            var i = 0,
                len = 0;

            if (!JudgeUtils.isArray(childs)) {
                this.addChild(childs);
            }
            else {
                this._childs = this._childs.concat(childs);
                //for (i = 0, len = childs.length; i < len; i++) {
                //    this.addChild(childs[i]);
                //}
            }

            return this;
        }
        //
        public removeAllChilds () {
            this._childs = [];
        }

        public forEach (fn:Function, context?:any) {
            this._forEach(this._childs, fn, context);
            //this._childs.forEach.apply(this._childs, arguments);
        }

        //public map (handlerName, argArr?) {
        //    this._childs.map.apply(this._childs, arguments);
        //}

        //public filter (func) {
        //    return this._childs.filter(func, this._childs);
        //}

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

        //public removeChild (obj, target) {
        //    if (JudgeUtils.isFunction(obj)) {
        //        return this._childs.removeChild(obj, target);
        //    }
        //    //else if (obj.isInstanceOf
        //    //    && obj.isInstanceOf(YE.Entity)) {
        //    //    return this._childs.removeChild(function (e) {
        //    //        return e.getUid() === obj.getUid();
        //    //    });
        //    //}
        //    else {
        //        return this._childs.removeChild(function (e) {
        //            return e === obj;
        //        });
        //    }
        //}

        private _contain(arr:any[], arg){
            var result = false;

            if (JudgeUtils.isFunction(arg)) {
                let func:Function = <Function>arg;

                this._forEach(arr, function (value, index) {
                    if (!!func.call(null, value, index)) {
                        result = true;
                        return $BREAK;   //如果包含，则置返回值为true,跳出循环
                    }
                });
            }
            else {
                let val:any = <any>arg;

                this._forEach(arr, function (value, index) {
                    if (val === value
                        || (value.contain && value.contain(val))
                    || (value.indexOf && value.indexOf(val) > -1)) {
                        result = true;
                        return $BREAK;   //如果包含，则置返回值为true,跳出循环
                    }
                });
            }

            return result;
        }

        private _forEach(arr:any[], fn:Function, context?:any){
            var scope = context || null;

            for (var i = 0, j = arr.length; i < j; ++i) {
                if (fn.call(scope, arr[i], i) === $BREAK) {
                    break;
                }
            }
        }
    }
}