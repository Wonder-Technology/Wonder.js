declare module dyCb {
    const $BREAK: {
        break: boolean;
    };
    const $REMOVE: any;
}

/// <reference path="definitions.d.ts" />
declare module dyCb {
    class Hash {
        static create(children?: {}): Hash;
        constructor(children?: any);
        private _children;
        getChildren(): any;
        getCount(): number;
        getKeys(): Collection;
        getChild(key: string): any;
        addChild(key: string, value: any): Hash;
        appendChild(key: string, value: any): Hash;
        removeChild(arg: any): Hash;
        hasChild(arg: any): boolean;
        forEach(func: Function, context?: any): Hash;
        filter(func: Function): Hash;
        map(func: Function): Hash;
    }
}

declare module dyCb {
    class JudgeUtils {
        static isArray(val: any): boolean;
        static isFunction(func: any): boolean;
        static isNumber(obj: any): boolean;
        static isString(str: any): boolean;
        static isBoolean(obj: any): boolean;
        static isDom(obj: any): boolean;
        /**
         * 判断是否为对象字面量（{}）
         */
        static isDirectObject(obj: any): boolean;
        /**
         * 检查宿主对象是否可调用
         *
         * 任何对象，如果其语义在ECMAScript规范中被定义过，那么它被称为原生对象；
         环境所提供的，而在ECMAScript规范中没有被描述的对象，我们称之为宿主对象。

         该方法用于特性检测，判断对象是否可用。用法如下：

         MyEngine addEvent():
         if (Tool.judge.isHostMethod(dom, "addEventListener")) {    //判断dom是否具有addEventListener方法
            dom.addEventListener(sEventType, fnHandler, false);
            }
         */
        static isHostMethod(object: any, property: any): boolean;
    }
}

declare module dyCb {
    class AjaxUtils {
        static ajax(conf: any): void;
        private static _createAjax(error);
        private static _isLocalFile(status);
        private static _isSoundFile(dataType);
    }
}

/// <reference path="../definitions.d.ts" />
declare module dyCb {
    class ConvertUtils {
        static toString(obj: any): string;
        private static _convertCodeToString(fn);
    }
}

/// <reference path="../definitions.d.ts" />
declare module dyCb {
    class EventUtils {
        static bindEvent(context: any, func: any): (event: any) => any;
        static addEvent(dom: any, eventName: any, handler: any): void;
        static removeEvent(dom: any, eventName: any, handler: any): void;
    }
}

/// <reference path="../definitions.d.ts" />
declare module dyCb {
    class ExtendUtils {
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
        static extendDeep(parent: any, child?: any, filter?: (val: any, i: any) => boolean): any;
        /**
         * 浅拷贝
         */
        static extend(destination: any, source: any): any;
        static copyPublicAttri(source: any): {};
    }
}

declare module dyCb {
    class Log {
        static info: {
            INVALID_PARAM: string;
            ABSTRACT_ATTRIBUTE: string;
            ABSTRACT_METHOD: string;
            helperFunc: (...args: any[]) => string;
            assertion: (...args: any[]) => any;
            FUNC_INVALID: (value: any) => any;
            FUNC_MUST: (...args: any[]) => any;
            FUNC_MUST_BE: (...args: any[]) => any;
            FUNC_MUST_NOT_BE: (...args: any[]) => any;
            FUNC_SHOULD: (...args: any[]) => any;
            FUNC_SUPPORT: (value: any) => any;
            FUNC_NOT_SUPPORT: (value: any) => any;
            FUNC_MUST_DEFINE: (value: any) => any;
            FUNC_MUST_NOT_DEFINE: (value: any) => any;
            FUNC_UNKNOW: (value: any) => any;
            FUNC_EXPECT: (value: any) => any;
            FUNC_UNEXPECT: (value: any) => any;
        };
        /**
         * Output Debug message.
         * @function
         * @param {String} message
         */
        static log(message: any): void;
        /**
         * 断言失败时，会提示错误信息，但程序会继续执行下去
         * 使用断言捕捉不应该发生的非法情况。不要混淆非法情况与错误情况之间的区别，后者是必然存在的并且是一定要作出处理的。
         *
         * 1）对非预期错误使用断言
         断言中的布尔表达式的反面一定要描述一个非预期错误，下面所述的在一定情况下为非预期错误的一些例子：
         （1）空指针。
         （2）输入或者输出参数的值不在预期范围内。
         （3）数组的越界。
         非预期错误对应的就是预期错误，我们通常使用错误处理代码来处理预期错误，而使用断言处理非预期错误。在代码执行过程中，有些错误永远不应该发生，这样的错误是非预期错误。断言可以被看成是一种可执行的注释，你不能依赖它来让代码正常工作（《Code Complete 2》）。例如：
         int nRes = f(); // nRes 由 f 函数控制， f 函数保证返回值一定在 -100 ~ 100
         Assert(-100 <= nRes && nRes <= 100); // 断言，一个可执行的注释
         由于 f 函数保证了返回值处于 -100 ~ 100，那么如果出现了 nRes 不在这个范围的值时，就表明一个非预期错误的出现。后面会讲到“隔栏”，那时会对断言有更加深刻的理解。
         2）不要把需要执行的代码放入断言中
         断言用于软件的开发和维护，而通常不在发行版本中包含断言。
         需要执行的代码放入断言中是不正确的，因为在发行版本中，这些代码通常不会被执行，例如：
         Assert(f()); // f 函数通常在发行版本中不会被执行
         而使用如下方法则比较安全：
         res = f();
         Assert(res); // 安全
         3）对来源于内部系统的可靠的数据使用断言，而不要对外部不可靠的数据使用断言，对于外部不可靠数据，应该使用错误处理代码。
         再次强调，把断言看成可执行的注释。
         * @param cond 如果cond返回false，则断言失败，显示message
         * @param message
         */
        static assert(cond: any, message: any): void;
        static error(cond: any, message: any): any;
    }
}

/// <reference path="definitions.d.ts" />
declare module dyCb {
    class Collection {
        static create(children?: any[]): Collection;
        constructor(children?: any);
        private _children;
        getCount(): number;
        hasChild(arg: any): boolean;
        getChildren(): any[];
        getChild(index: number): any;
        addChild(child: any): Collection;
        addChildren(arg: any[] | Collection | any): Collection;
        removeAllChildren(): Collection;
        forEach(func: Function, context?: any): Collection;
        filter(func: any): Collection;
        removeChild(arg: any): Collection;
        sort(func: any): Collection;
        map(func: Function): Collection;
        toArray(): any[];
        private _indexOf(arr, arg);
        private _contain(arr, arg);
        private _forEach(arr, func, context?);
        private _map(arr, func);
        private _removeChild(arr, func);
        private _filter;
    }
}

/// <reference path="../definitions.d.ts" />
declare module dyCb {
    class DomQuery {
        static create(domStr: string): DomQuery;
        private _doms;
        constructor(domStr: any);
        get(index: any): any;
    }
}
