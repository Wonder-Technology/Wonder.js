module Engine3D {
    declare var YYC:any;

    //todo module Engine3D.Tool  class Judge{} ...


    export class Tool {
        /**
         * 判断是否为对象字面量（{}）
         */
        public static isDirectObject(obj) {
            if (Object.prototype.toString.call(obj) === "[object Object]") {
                return true;
            }

            return false;
        }

        public static isNumber(obj) {
            return Object.prototype.toString.call(obj) === "[object Number]";
        }

        /**
         * 深拷贝
         *
         * 示例：
         * 如果拷贝对象为数组，能够成功拷贝（不拷贝Array原型链上的成员）
         * expect(extend.extendDeep([1, { x: 1, y: 1 }, "a", { x: 2 }, [2]])).toEqual([1, { x: 1, y: 1 }, "a", { x: 2 }, [2]]);
         *
         * 如果拷贝对象为对象，能够成功拷贝（能拷贝原型链上的成员）
         * var result = null;
         function A() {
	            };
         A.prototype.a = 1;

         function B() {
	            };
         B.prototype = new A();
         B.prototype.b = { x: 1, y: 1 };
         B.prototype.c = [{ x: 1 }, [2]];

         var t = new B();

         result = extend.extendDeep(t);

         expect(result).toEqual(
         {
             a: 1,
             b: { x: 1, y: 1 },
             c: [{ x: 1 }, [2]]
         });
         * @param parent
         * @param child
         * @returns
         */
        public static extendDeep(parent, child?) {
        var i = null,
            len = 0,
            toStr = Object.prototype.toString,
            sArr = "[object Array]",
            sOb = "[object Object]",
            type = "",
            _child = null;

        //数组的话，不获得Array原型上的成员。
        if (toStr.call(parent) === sArr) {
            _child = child || [];

            for (i = 0, len = parent.length; i < len; i++) {
                type = toStr.call(parent[i]);
                if (type === sArr || type === sOb) {    //如果为数组或object对象
                    _child[i] = type === sArr ? [] : {};
                    arguments.callee(parent[i], _child[i]);
                } else {
                    _child[i] = parent[i];
                }
            }
        }
        //对象的话，要获得原型链上的成员。因为考虑以下情景：
        //类A继承于类B，现在想要拷贝类A的实例a的成员（包括从类B继承来的成员），那么就需要获得原型链上的成员。
        else if (toStr.call(parent) === sOb) {
            _child = child || {};

            for (i in parent) {
                type = toStr.call(parent[i]);
                if (type === sArr || type === sOb) {    //如果为数组或object对象
                    _child[i] = type === sArr ? [] : {};
                    arguments.callee(parent[i], _child[i]);
                } else {
                    _child[i] = parent[i];
                }
            }
        }
        else {
            _child = parent;
        }

        return _child;
    }

        //用于测试
        //public static getValues_forTest():number[];
        public static getValues_forTest(values:Float32Array):number[] {

            //public static getValues_forTest(): number[]{
            //    var values = null,
            var len = 0,
                i = 0,
                result = [];

            //if(arguments[0]){
            //    values = arguments[0];
            //}
            //else{
            //    values = this.values;
            //}

            len = values.length;

            for (i = 0; i < len; i++) {
                if (values[i] === -0) {
                    result[i] = 0;
                    continue;
                }
                result[i] = YYC.Tool.math.toFixed(values[i], 7);
            }
            return result;
        }


    }
}
