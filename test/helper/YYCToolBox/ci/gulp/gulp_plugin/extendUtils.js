module.exports = {
    /**
     * 浅拷贝
     */
    extend: function (destination, source) {
        var property = "";

        for (property in source) {
            destination[property] = source[property];
        }
        return destination;
    },
    extendExist: function (destination, source) {
        var property = "";

        for (property in source) {
            if (destination[property] !== undefined) {    //destination中没有的属性不拷贝
                destination[property] = source[property];
            }
        }
        return destination;
    },
    extendNoExist: function (destination, source) {
        var property = "";

        for (property in source) {
            if (destination[property] === undefined) {
                destination[property] = source[property];
            }
        }
        return destination;
    },
    /**
     * 浅拷贝(不包括source的原型链)
     */
    extendNoPrototype: function (destination, source) {
        //            var temp = {};
        var property = "";

        for (property in source) {
            if (source.hasOwnProperty(property)) {
                destination[property] = source[property];
            }
        }
        return destination;
    },
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
    extendDeep: function (parent, child) {
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
    },
    /**
     * 原型继承
     */
    inherit: function (child, parent) {
        var func = function () {
        };
        func.prototype = parent.prototype;
        child.prototype = new func();
        child.prototype.constructor = child;
        child.prototype.parent = parent;
    }
};
