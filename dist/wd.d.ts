declare module wdCb {
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
        static isNodeJs(): boolean;
    }
}


declare module wdCb {
    var root: any;
}

declare module wdCb {
}

declare module wdCb {
    const $BREAK: {
        break: boolean;
    };
    const $REMOVE: any;
}

declare module wdCb {
    class Log {
        static info: {
            INVALID_PARAM: string;
            ABSTRACT_ATTRIBUTE: string;
            ABSTRACT_METHOD: string;
            helperFunc: (...args: any[]) => string;
            assertion: (...args: any[]) => any;
            FUNC_INVALID: (...args: any[]) => any;
            FUNC_MUST: (...args: any[]) => any;
            FUNC_MUST_BE: (...args: any[]) => any;
            FUNC_MUST_NOT_BE: (...args: any[]) => any;
            FUNC_SHOULD: (...args: any[]) => any;
            FUNC_SHOULD_NOT: (...args: any[]) => any;
            FUNC_SUPPORT: (...args: any[]) => any;
            FUNC_NOT_SUPPORT: (...args: any[]) => any;
            FUNC_MUST_DEFINE: (...args: any[]) => any;
            FUNC_MUST_NOT_DEFINE: (...args: any[]) => any;
            FUNC_UNKNOW: (...args: any[]) => any;
            FUNC_EXPECT: (...args: any[]) => any;
            FUNC_UNEXPECT: (...args: any[]) => any;
            FUNC_NOT_EXIST: (...args: any[]) => any;
        };
        /**
         * Output Debug message.
         * @function
         * @param {String} message
         */
        static log(...message: any[]): void;
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
        static assert(cond: any, ...message: any[]): void;
        static error(cond: any, ...message: any[]): any;
        static warn(...message: any[]): void;
        private static _exec(consoleMethod, args, sliceBegin?);
    }
}


declare module wdCb {
    class List<T> {
        protected children: Array<T>;
        getCount(): number;
        hasChild(arg: Function | T): boolean;
        getChildren(): T[];
        getChild(index: number): T;
        addChild(child: T): List<T>;
        addChildren(arg: Array<T> | List<T> | any): List<T>;
        unShiftChild(child: T): void;
        removeAllChildren(): List<T>;
        forEach(func: Function, context?: any): List<T>;
        toArray(): T[];
        protected copyChildren(): T[];
        protected removeChildHelper(arg: any): Array<T>;
        private _indexOf(arr, arg);
        private _contain(arr, arg);
        private _forEach(arr, func, context?);
        private _removeChild(arr, func);
    }
}


declare module wdCb {
    class Hash<T> {
        static create<T>(children?: {}): Hash<T>;
        constructor(children?: {
            [s: string]: T;
        });
        private _children;
        getChildren(): {
            [s: string]: T;
        };
        getCount(): number;
        getKeys(): Collection<{}>;
        getValues(): Collection<{}>;
        getChild(key: string): T;
        setValue(key: string, value: any): Hash<T>;
        addChild(key: string, value: any): Hash<T>;
        addChildren(arg: {} | Hash<T>): void;
        appendChild(key: string, value: any): Hash<T>;
        removeChild(arg: any): Collection<{}>;
        removeAllChildren(): void;
        hasChild(arg: any): boolean;
        forEach(func: Function, context?: any): Hash<T>;
        filter(func: Function): Hash<{}>;
        findOne(func: Function): any[];
        map(func: Function): Hash<{}>;
        toCollection(): Collection<any>;
    }
}

declare module wdCb {
    class Queue<T> extends List<T> {
        static create<T>(children?: any[]): Queue<T>;
        constructor(children?: Array<T>);
        push(element: T): void;
        pop(): T;
        clear(): void;
    }
}

declare module wdCb {
    class Stack<T> extends List<T> {
        static create<T>(children?: any[]): Stack<T>;
        constructor(children?: Array<T>);
        push(element: T): void;
        pop(): T;
        clear(): void;
    }
}

declare module wdCb {
    class AjaxUtils {
        static ajax(conf: any): void;
        private static _createAjax(error);
        private static _isLocalFile(status);
        private static _isSoundFile(dataType);
    }
}


declare module wdCb {
    class ArrayUtils {
        static removeRepeatItems(arr: Array<any>, isEqual?: (a: any, b: any) => boolean): any[];
        static contain(arr: Array<any>, ele: any): boolean;
    }
}


declare module wdCb {
    class ConvertUtils {
        static toString(obj: any): string;
        private static _convertCodeToString(fn);
    }
}


declare module wdCb {
    class EventUtils {
        static bindEvent(context: any, func: any): (event: any) => any;
        static addEvent(dom: any, eventName: any, handler: any): void;
        static removeEvent(dom: any, eventName: any, handler: any): void;
    }
}


declare module wdCb {
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


declare module wdCb {
    class PathUtils {
        static basename(path: string, ext?: string): string;
        static extname(path: string): string;
        static dirname(path: string): string;
        private static _splitPath(fileName);
    }
}


declare module wdCb {
    class DomQuery {
        static create(eleStr: string): any;
        static create(dom: HTMLElement): any;
        private _doms;
        constructor(eleStr: string);
        constructor(dom: HTMLElement);
        get(index: any): HTMLElement;
        prepend(eleStr: string): any;
        prepend(dom: HTMLElement): any;
        prependTo(eleStr: string): DomQuery;
        remove(): DomQuery;
        css(property: string, value: string): void;
        private _isDomEleStr(eleStr);
        private _buildDom(eleStr);
        private _buildDom(dom);
        private _createElement(eleStr);
    }
}


declare module wdCb {
    class Collection<T> extends List<T> {
        static create<T>(children?: any[]): Collection<T>;
        constructor(children?: Array<T>);
        copy(isDeep?: boolean): Collection<T>;
        filter(func: (value: T, index: number) => boolean): Collection<T>;
        findOne(func: (value: T, index: number) => boolean): T;
        reverse(): Collection<T>;
        removeChild(arg: any): Collection<T>;
        sort(func: (a: T, b: T) => any): Collection<T>;
        map(func: (value: T, index: number) => any): Collection<any>;
        removeRepeatItems(): Collection<T>;
    }
}


declare module wdCb {
    class FunctionUtils {
        static bind(object: any, func: Function): () => any;
    }
}


declare module wdFrp {
    class JudgeUtils extends wdCb.JudgeUtils {
        static isPromise(obj: any): boolean;
        static isEqual(ob1: Entity, ob2: Entity): boolean;
    }
}


declare module wdFrp {
    abstract class Entity {
        static UID: number;
        private _uid;
        uid: string;
        constructor(uidPre: string);
    }
}

declare module wdFrp {
    interface IDisposable {
        dispose(): any;
    }
}


declare module wdFrp {
    class SingleDisposable implements IDisposable {
        static create(disposeHandler?: Function): SingleDisposable;
        private _disposeHandler;
        constructor(disposeHandler: Function);
        setDisposeHandler(handler: Function): void;
        dispose(): void;
    }
}


declare module wdFrp {
    class GroupDisposable implements IDisposable {
        static create(disposable?: IDisposable): GroupDisposable;
        private _group;
        constructor(disposable?: IDisposable);
        add(disposable: IDisposable): GroupDisposable;
        dispose(): void;
    }
}


declare module wdFrp {
    interface IObserver extends IDisposable {
        next(value: any): any;
        error(error: any): any;
        completed(): any;
    }
}


declare module wdFrp {
    class InnerSubscription implements IDisposable {
        static create(subject: Subject | GeneratorSubject, observer: Observer): InnerSubscription;
        private _subject;
        private _observer;
        constructor(subject: Subject | GeneratorSubject, observer: Observer);
        dispose(): void;
    }
}


declare module wdFrp {
    class InnerSubscriptionGroup implements IDisposable {
        static create(): InnerSubscriptionGroup;
        private _container;
        addChild(child: IDisposable): void;
        dispose(): void;
    }
}


declare module wdFrp {
    var root: any;
}

declare module wdFrp {
    const ABSTRACT_ATTRIBUTE: any;
}


declare module wdFrp {
}


declare module wdFrp {
    abstract class Stream extends Entity {
        scheduler: Scheduler;
        subscribeFunc: (observer: IObserver) => Function | void;
        constructor(subscribeFunc: any);
        abstract subscribe(arg1: Function | Observer | Subject, onError?: Function, onCompleted?: Function): IDisposable;
        buildStream(observer: IObserver): IDisposable;
        do(onNext?: Function, onError?: Function, onCompleted?: Function): DoStream;
        map(selector: Function): MapStream;
        flatMap(selector: Function): MergeAllStream;
        mergeAll(): MergeAllStream;
        takeUntil(otherStream: Stream): TakeUntilStream;
        concat(streamArr: Array<Stream>): any;
        concat(...otherStream: any[]): any;
        merge(streamArr: Array<Stream>): any;
        merge(...otherStream: any[]): any;
        repeat(count?: number): RepeatStream;
        ignoreElements(): IgnoreElementsStream;
        protected handleSubject(arg: any): boolean;
        private _isSubject(subject);
        private _setSubject(subject);
    }
}


declare module wdFrp {
    class Scheduler {
        static create(...args: any[]): Scheduler;
        private _requestLoopId;
        requestLoopId: any;
        publishRecursive(observer: IObserver, initial: any, action: Function): void;
        publishInterval(observer: IObserver, initial: any, interval: number, action: Function): number;
        publishIntervalRequest(observer: IObserver, action: Function): void;
    }
}


declare module wdFrp {
    abstract class Observer extends Entity implements IObserver {
        private _isDisposed;
        isDisposed: boolean;
        protected onUserNext: Function;
        protected onUserError: Function;
        protected onUserCompleted: Function;
        private _isStop;
        private _disposable;
        constructor(observer: IObserver);
        constructor(onNext: Function, onError: Function, onCompleted: Function);
        next(value: any): any;
        error(error: any): void;
        completed(): void;
        dispose(): void;
        setDisposable(disposable: IDisposable): void;
        protected abstract onNext(value: any): any;
        protected abstract onError(error: any): any;
        protected abstract onCompleted(): any;
    }
}


declare module wdFrp {
    class Subject implements IObserver {
        static create(): Subject;
        private _source;
        source: Stream;
        private _observer;
        subscribe(arg1?: Function | Observer, onError?: Function, onCompleted?: Function): IDisposable;
        next(value: any): void;
        error(error: any): void;
        completed(): void;
        start(): void;
        remove(observer: Observer): void;
        dispose(): void;
    }
}


declare module wdFrp {
    class GeneratorSubject extends Entity implements IObserver {
        static create(): GeneratorSubject;
        private _isStart;
        isStart: boolean;
        constructor();
        observer: any;
        onBeforeNext(value: any): void;
        onAfterNext(value: any): void;
        onIsCompleted(value: any): boolean;
        onBeforeError(error: any): void;
        onAfterError(error: any): void;
        onBeforeCompleted(): void;
        onAfterCompleted(): void;
        subscribe(arg1?: Function | Observer, onError?: Function, onCompleted?: Function): IDisposable;
        next(value: any): void;
        error(error: any): void;
        completed(): void;
        toStream(): any;
        start(): void;
        stop(): void;
        remove(observer: Observer): void;
        dispose(): void;
    }
}


declare module wdFrp {
    class AnonymousObserver extends Observer {
        static create(onNext: Function, onError: Function, onCompleted: Function): AnonymousObserver;
        protected onNext(value: any): void;
        protected onError(error: any): void;
        protected onCompleted(): void;
    }
}


declare module wdFrp {
    class AutoDetachObserver extends Observer {
        static create(observer: IObserver): any;
        static create(onNext: Function, onError: Function, onCompleted: Function): any;
        dispose(): void;
        protected onNext(value: any): void;
        protected onError(err: any): void;
        protected onCompleted(): void;
    }
}


declare module wdFrp {
    class MapObserver extends Observer {
        static create(currentObserver: IObserver, selector: Function): MapObserver;
        private _currentObserver;
        private _selector;
        constructor(currentObserver: IObserver, selector: Function);
        protected onNext(value: any): void;
        protected onError(error: any): void;
        protected onCompleted(): void;
    }
}


declare module wdFrp {
    class DoObserver extends Observer {
        static create(currentObserver: IObserver, prevObserver: IObserver): DoObserver;
        private _currentObserver;
        private _prevObserver;
        constructor(currentObserver: IObserver, prevObserver: IObserver);
        protected onNext(value: any): void;
        protected onError(error: any): void;
        protected onCompleted(): void;
    }
}


declare module wdFrp {
    class MergeAllObserver extends Observer {
        static create(currentObserver: IObserver, streamGroup: wdCb.Collection<Stream>, groupDisposable: GroupDisposable): MergeAllObserver;
        private _currentObserver;
        currentObserver: IObserver;
        private _done;
        done: boolean;
        private _streamGroup;
        private _groupDisposable;
        constructor(currentObserver: IObserver, streamGroup: wdCb.Collection<Stream>, groupDisposable: GroupDisposable);
        protected onNext(innerSource: any): void;
        protected onError(error: any): void;
        protected onCompleted(): void;
    }
}


declare module wdFrp {
    class TakeUntilObserver extends Observer {
        static create(prevObserver: IObserver): TakeUntilObserver;
        private _prevObserver;
        constructor(prevObserver: IObserver);
        protected onNext(value: any): void;
        protected onError(error: any): void;
        protected onCompleted(): void;
    }
}


declare module wdFrp {
    class ConcatObserver extends Observer {
        static create(currentObserver: IObserver, startNextStream: Function): ConcatObserver;
        protected currentObserver: any;
        private _startNextStream;
        constructor(currentObserver: IObserver, startNextStream: Function);
        protected onNext(value: any): void;
        protected onError(error: any): void;
        protected onCompleted(): void;
    }
}


declare module wdFrp {
    interface ISubjectObserver {
        addChild(observer: Observer): any;
        removeChild(observer: Observer): any;
    }
}


declare module wdFrp {
    class SubjectObserver implements IObserver {
        observers: wdCb.Collection<IObserver>;
        private _disposable;
        isEmpty(): boolean;
        next(value: any): void;
        error(error: any): void;
        completed(): void;
        addChild(observer: Observer): void;
        removeChild(observer: Observer): void;
        dispose(): void;
        setDisposable(disposable: IDisposable): void;
    }
}


declare module wdFrp {
    class IgnoreElementsObserver extends Observer {
        static create(currentObserver: IObserver): IgnoreElementsObserver;
        private _currentObserver;
        constructor(currentObserver: IObserver);
        protected onNext(value: any): void;
        protected onError(error: any): void;
        protected onCompleted(): void;
    }
}


declare module wdFrp {
    abstract class BaseStream extends Stream {
        abstract subscribeCore(observer: IObserver): IDisposable;
        subscribe(arg1: Function | Observer | Subject, onError?: any, onCompleted?: any): IDisposable;
        buildStream(observer: IObserver): IDisposable;
    }
}


declare module wdFrp {
    class DoStream extends BaseStream {
        static create(source: Stream, onNext?: Function, onError?: Function, onCompleted?: Function): DoStream;
        private _source;
        private _observer;
        constructor(source: Stream, onNext: Function, onError: Function, onCompleted: Function);
        subscribeCore(observer: IObserver): IDisposable;
    }
}


declare module wdFrp {
    class MapStream extends BaseStream {
        static create(source: Stream, selector: Function): MapStream;
        private _source;
        private _selector;
        constructor(source: Stream, selector: Function);
        subscribeCore(observer: IObserver): IDisposable;
    }
}


declare module wdFrp {
    class FromArrayStream extends BaseStream {
        static create(array: Array<any>, scheduler: Scheduler): FromArrayStream;
        private _array;
        constructor(array: Array<any>, scheduler: Scheduler);
        subscribeCore(observer: IObserver): SingleDisposable;
    }
}


declare module wdFrp {
    class FromPromiseStream extends BaseStream {
        static create(promise: any, scheduler: Scheduler): FromPromiseStream;
        private _promise;
        constructor(promise: any, scheduler: Scheduler);
        subscribeCore(observer: IObserver): SingleDisposable;
    }
}


declare module wdFrp {
    class FromEventPatternStream extends BaseStream {
        static create(addHandler: Function, removeHandler: Function): FromEventPatternStream;
        private _addHandler;
        private _removeHandler;
        constructor(addHandler: Function, removeHandler: Function);
        subscribeCore(observer: IObserver): SingleDisposable;
    }
}


declare module wdFrp {
    class AnonymousStream extends Stream {
        static create(subscribeFunc: Function): AnonymousStream;
        constructor(subscribeFunc: Function);
        subscribe(onNext: any, onError: any, onCompleted: any): IDisposable;
    }
}


declare module wdFrp {
    class IntervalStream extends BaseStream {
        static create(interval: number, scheduler: Scheduler): IntervalStream;
        private _interval;
        constructor(interval: number, scheduler: Scheduler);
        initWhenCreate(): void;
        subscribeCore(observer: IObserver): SingleDisposable;
    }
}


declare module wdFrp {
    class IntervalRequestStream extends BaseStream {
        static create(scheduler: Scheduler): IntervalRequestStream;
        private _isEnd;
        constructor(scheduler: Scheduler);
        subscribeCore(observer: IObserver): SingleDisposable;
    }
}


declare module wdFrp {
    class MergeAllStream extends BaseStream {
        static create(source: Stream): MergeAllStream;
        private _source;
        private _observer;
        constructor(source: Stream);
        subscribeCore(observer: IObserver): GroupDisposable;
    }
}


declare module wdFrp {
    class TakeUntilStream extends BaseStream {
        static create(source: Stream, otherSteam: Stream): TakeUntilStream;
        private _source;
        private _otherStream;
        constructor(source: Stream, otherStream: Stream);
        subscribeCore(observer: IObserver): GroupDisposable;
    }
}


declare module wdFrp {
    class ConcatStream extends BaseStream {
        static create(sources: Array<Stream>): ConcatStream;
        private _sources;
        constructor(sources: Array<Stream>);
        subscribeCore(observer: IObserver): GroupDisposable;
    }
}


declare module wdFrp {
    class RepeatStream extends BaseStream {
        static create(source: Stream, count: number): RepeatStream;
        private _source;
        private _count;
        constructor(source: Stream, count: number);
        subscribeCore(observer: IObserver): GroupDisposable;
    }
}


declare module wdFrp {
    class IgnoreElementsStream extends BaseStream {
        static create(source: Stream): IgnoreElementsStream;
        private _source;
        constructor(source: Stream);
        subscribeCore(observer: IObserver): IDisposable;
    }
}


declare module wdFrp {
    class DeferStream extends BaseStream {
        static create(buildStreamFunc: Function): DeferStream;
        private _buildStreamFunc;
        constructor(buildStreamFunc: Function);
        subscribeCore(observer: IObserver): GroupDisposable;
    }
}


declare module wdFrp {
    var createStream: (subscribeFunc: any) => AnonymousStream;
    var fromArray: (array: any[], scheduler?: Scheduler) => FromArrayStream;
    var fromPromise: (promise: any, scheduler?: Scheduler) => FromPromiseStream;
    var fromEventPattern: (addHandler: Function, removeHandler: Function) => FromEventPatternStream;
    var interval: (interval: any, scheduler?: Scheduler) => IntervalStream;
    var intervalRequest: (scheduler?: Scheduler) => IntervalRequestStream;
    var empty: () => AnonymousStream;
    var callFunc: (func: Function, context?: any) => AnonymousStream;
    var judge: (condition: Function, thenSource: Function, elseSource: Function) => any;
    var defer: (buildStreamFunc: Function) => DeferStream;
    var just: (returnValue: any) => AnonymousStream;
}


declare module wdFrp {
    class Record {
        static create(time: number, value: any, actionType?: ActionType, comparer?: Function): Record;
        private _time;
        time: number;
        private _value;
        value: number;
        private _actionType;
        actionType: ActionType;
        private _comparer;
        constructor(time: any, value: any, actionType: ActionType, comparer: Function);
        equals(other: any): any;
    }
}


declare module wdFrp {
    class MockObserver extends Observer {
        static create(scheduler: TestScheduler): MockObserver;
        private _messages;
        messages: [Record];
        private _scheduler;
        constructor(scheduler: TestScheduler);
        protected onNext(value: any): void;
        protected onError(error: any): void;
        protected onCompleted(): void;
        dispose(): void;
        copy(): MockObserver;
    }
}


declare module wdFrp {
    class MockPromise {
        static create(scheduler: TestScheduler, messages: [Record]): MockPromise;
        private _messages;
        private _scheduler;
        constructor(scheduler: TestScheduler, messages: [Record]);
        then(successCb: Function, errorCb: Function, observer: IObserver): void;
    }
}


declare module wdFrp {
    class TestScheduler extends Scheduler {
        static next(tick: any, value: any): Record;
        static error(tick: any, error: any): Record;
        static completed(tick: any): Record;
        static create(isReset?: boolean): TestScheduler;
        constructor(isReset: boolean);
        private _clock;
        clock: number;
        private _isReset;
        private _isDisposed;
        private _timerMap;
        private _streamMap;
        private _subscribedTime;
        private _disposedTime;
        private _observer;
        setStreamMap(observer: IObserver, messages: [Record]): void;
        remove(observer: Observer): void;
        publishRecursive(observer: MockObserver, initial: any, recursiveFunc: Function): void;
        publishInterval(observer: IObserver, initial: any, interval: number, action: Function): number;
        publishIntervalRequest(observer: IObserver, action: Function): number;
        private _setClock();
        startWithTime(create: Function, subscribedTime: number, disposedTime: number): MockObserver;
        startWithSubscribe(create: any, subscribedTime?: number): MockObserver;
        startWithDispose(create: any, disposedTime?: number): MockObserver;
        publicAbsolute(time: any, handler: any): void;
        start(): void;
        createStream(args: any): TestStream;
        createObserver(): MockObserver;
        createResolvedPromise(time: number, value: any): MockPromise;
        createRejectPromise(time: number, error: any): MockPromise;
        private _getMinAndMaxTime();
        private _exec(time, map);
        private _runStream(time);
        private _runAt(time, callback);
        private _tick(time);
    }
}

declare module wdFrp {
    enum ActionType {
        NEXT = 0,
        ERROR = 1,
        COMPLETED = 2,
    }
}

declare module wdFrp {
    class TestStream extends BaseStream {
        static create(messages: [Record], scheduler: TestScheduler): TestStream;
        scheduler: TestScheduler;
        private _messages;
        constructor(messages: [Record], scheduler: TestScheduler);
        subscribeCore(observer: IObserver): SingleDisposable;
    }
}


declare module wdFrp {
    var fromNodeCallback: (func: Function, context?: any) => (...funcArgs: any[]) => AnonymousStream;
    var fromStream: (stream: any, finishEventName?: string) => AnonymousStream;
    var fromReadableStream: (stream: any) => AnonymousStream;
    var fromWritableStream: (stream: any) => AnonymousStream;
    var fromTransformStream: (stream: any) => AnonymousStream;
}


declare module wd {
    var Config: {
        isTest: boolean;
    };
}


declare module wdFrp {
    var fromCollection: (collection: wdCb.Collection<any>, scheduler?: Scheduler) => AnonymousStream;
}


declare module wd {
    function assert(cond: boolean, message?: string): void;
    function require(InFunc: any): (target: any, name: any, descriptor: any) => any;
    function ensure(OutFunc: any): (target: any, name: any, descriptor: any) => any;
    function requireGetter(InFunc: any): (target: any, name: any, descriptor: any) => any;
    function requireSetter(InFunc: any): (target: any, name: any, descriptor: any) => any;
    function ensureGetter(OutFunc: any): (target: any, name: any, descriptor: any) => any;
    function ensureSetter(OutFunc: any): (target: any, name: any, descriptor: any) => any;
    function invariant(func: any): (target: any) => void;
}


declare module wd {
    function cacheGetter(judgeFunc: () => boolean, returnCacheValueFunc: () => any, setCacheFunc: (returnVal) => void): (target: any, name: any, descriptor: any) => any;
    function cache(judgeFunc: (...args) => boolean, returnCacheValueFunc: (...args) => any, setCacheFunc: (...returnVal) => void): (target: any, name: any, descriptor: any) => any;
}


declare module wd {
    function virtual(target: any, name: any, descriptor: any): any;
}

declare module wd {
    const ABSTRACT_ATTRIBUTE: any;
}


declare module wd {
    var root: any;
}

declare module wd {
    class Entity {
        private static _count;
        constructor();
        uid: number;
    }
}


declare module wd {
    abstract class Component extends Entity {
        gameObject: GameObject;
        init(): void;
        dispose(): void;
        transform: Transform;
        addToGameObject(gameObject: GameObject): void;
        removeFromGameObject(gameObject: GameObject): void;
    }
}


declare module wd {
    class Transform extends Entity {
        static create(gameObject: GameObject): Transform;
        private _localToParentMatrix;
        localToParentMatrix: Matrix4;
        private _localToWorldMatrix;
        localToWorldMatrix: Matrix4;
        private _parent;
        parent: Transform;
        private _position;
        position: Vector3;
        private _rotation;
        rotation: Quaternion;
        private _scale;
        scale: Vector3;
        private _eulerAngles;
        eulerAngles: Vector3;
        private _localPosition;
        localPosition: Vector3;
        private _localRotation;
        localRotation: Quaternion;
        private _localEulerAngles;
        localEulerAngles: Vector3;
        private _localScale;
        localScale: Vector3;
        up: Vector3;
        right: Vector3;
        forward: Vector3;
        dirtyWorld: boolean;
        dirtyLocal: boolean;
        private _children;
        private _gameObject;
        constructor(gameObject: GameObject);
        addChild(child: Transform): void;
        removeChild(child: Transform): void;
        sync(): void;
        translateLocal(translation: Vector3): any;
        translateLocal(x: number, y: number, z: number): any;
        translate(translation: Vector3): any;
        translate(x: number, y: number, z: number): any;
        rotate(eulerAngles: Vector3): any;
        rotate(x: number, y: number, z: number): any;
        rotateLocal(eulerAngles: Vector3): any;
        rotateLocal(x: number, y: number, z: number): any;
        rotateAround(angle: number, center: Vector3, axis: Vector3): any;
        rotateAround(angle: number, centerX: number, centerY: number, centerZ: number, axisX: number, axisY: number, axisZ: number): any;
        lookAt(target: Vector3): any;
        lookAt(targetX: number, targetY: number, targetZ: number): any;
        lookAt(target: Vector3, up: Vector3): any;
        lookAt(targetX: number, targetY: number, targetZ: number, upX: number, upY: number, upZ: number): any;
    }
}


declare module wd {
    class GameObject extends Entity {
        static create(): GameObject;
        private _script;
        script: wdCb.Hash<IScriptBehavior>;
        parent: GameObject;
        bubbleParent: GameObject;
        transform: Transform;
        name: string;
        actionManager: ActionManager;
        private _children;
        private _components;
        private _startLoopHandler;
        private _endLoopHandler;
        init(): GameObject;
        onStartLoop(): void;
        onEndLoop(): void;
        onEnter(): void;
        onExit(): void;
        onDispose(): void;
        dispose(): void;
        hasChild(child: GameObject): boolean;
        addChild(child: GameObject): GameObject;
        addChildren(children: Array<GameObject>): any;
        addChildren(children: wdCb.Collection<GameObject>): any;
        sort(): GameObject;
        forEach(func: Function): GameObject;
        getChildren(): wdCb.Collection<GameObject>;
        getChild(index: number): GameObject;
        findChildByUid(uid: number): GameObject;
        findChildByName(name: string): GameObject;
        findChildrenByName(name: string): wdCb.Collection<GameObject>;
        getComponent<T>(_class: Function): T;
        findComponentByUid(uid: number): any;
        getFirstComponent(): Component;
        removeChild(child: GameObject): GameObject;
        getTopUnderPoint(point: Point): GameObject;
        isHit(locationInView: Point): boolean;
        hasComponent(component: Component): boolean;
        hasComponent(_class: Function): boolean;
        addComponent(component: Component): GameObject;
        removeComponent(component: Component): GameObject;
        render(renderer: Renderer, camera: GameObject): void;
        update(time: number): void;
        private _ascendZ(a, b);
        private _execScript(method, arg?);
        private _getGeometry();
        private _getCollider();
        private _getCamera();
        private _getAnimation();
        private _getRendererComponent();
        private _getComponentCount(_class);
    }
}


declare module wd {
    class Scheduler {
        static create(): Scheduler;
        private _scheduleCount;
        private _schedules;
        update(time: number): void;
        scheduleLoop(task: Function, args?: Array<any>): string;
        scheduleFrame(task: any, frame?: number, args?: any): string;
        scheduleInterval(task: any, time?: number, args?: any): string;
        scheduleTime(task: any, time?: number, args?: any): string;
        pause(scheduleId?: string): void;
        resume(scheduleId?: string): void;
        start(scheduleId?: string): void;
        stop(scheduleId?: string): void;
        has(scheduleId: string): boolean;
        remove(scheduleId: string): void;
        removeAll(): void;
        private _schedule(_class, args);
        private _buildId();
    }
}


declare module wd {
    class Director {
        private static _instance;
        static getInstance(): any;
        scene: Scene;
        scheduler: Scheduler;
        renderer: Renderer;
        gameTime: number;
        fps: number;
        isNormal: boolean;
        isStop: boolean;
        isPause: boolean;
        isTimeChange: boolean;
        elapsed: number;
        view: any;
        scriptStreams: wdCb.Hash<wdFrp.Stream>;
        private _gameLoop;
        private _gameState;
        private _timeController;
        private _isFirstStart;
        initWhenCreate(): void;
        start(): void;
        stop(): void;
        pause(): void;
        resume(): void;
        getTopUnderPoint(point: Point): GameObject;
        private startLoop();
        private _buildLoadScriptStream();
        private _buildInitStream();
        private _init();
        private _buildLoopStream();
        private _loopBody(time);
        private _run(time);
    }
}


declare module wd {
    class Main {
        static isTest: boolean;
        static screenSize: any;
        private static _canvasId;
        static setConfig({canvasId, isTest, screenSize}: {
            canvasId: any;
            isTest?: boolean;
            screenSize?: ScreenSize;
        }): typeof Main;
        private static init();
    }
}


declare module wd {
    class Scene extends GameObject {
        static create(): Scene;
        ambientLight: GameObject;
        directionLights: wdCb.Collection<GameObject>;
        pointLights: wdCb.Collection<GameObject>;
        side: Side;
        shadowMap: {
            enable: boolean;
            softType: ShadowMapSoftType;
        };
        shader: Shader;
        camera: GameObject;
        isUseProgram: Boolean;
        private _lightManager;
        private _renderTargetRenderers;
        init(): Scene;
        useProgram(shader: Shader): void;
        unUseProgram(): void;
        addChild(child: GameObject): GameObject;
        addRenderTargetRenderer(renderTargetRenderer: RenderTargetRenderer): void;
        removeRenderTargetRenderer(renderTargetRenderer: RenderTargetRenderer): void;
        render(renderer: Renderer): void;
        private _isCamera(child);
        private _isLight(child);
    }
    type ShadowMapConfig = {
        enable: boolean;
        softType: ShadowMapSoftType;
    };
    enum ShadowMapSoftType {
        NONE = 0,
        PCF = 1,
    }
}


declare module wd {
    class LightManager {
        static create(): LightManager;
        ambientLight: GameObject;
        directionLights: wdCb.Collection<GameObject>;
        pointLights: wdCb.Collection<GameObject>;
        private _lights;
        addChild(light: GameObject): void;
    }
}


declare module wd {
    class Skybox extends GameObject {
        static create(): Skybox;
        initWhenCreate(): void;
    }
}

declare module wd {
    const DEG_TO_RAD: number;
    const RAD_TO_DEG: number;
}


declare module wd {
    class Vector2 {
        static create(x: any, y: any): Vector2;
        static create(): Vector2;
        constructor(x: any, y: any);
        constructor();
        x: number;
        y: number;
        values: Float32Array;
        set(x: number, y: number): void;
    }
}


declare module wd {
    class Vector3 {
        static up: Vector3;
        static forward: Vector3;
        static right: Vector3;
        static create(x: any, y: any, z: any): Vector3;
        static create(): Vector3;
        constructor(x: any, y: any, z: any);
        constructor();
        x: number;
        y: number;
        z: number;
        values: Float32Array;
        normalize(): Vector3;
        isZero(): boolean;
        scale(scalar: number): Vector3;
        set(v: Vector3): any;
        set(x: number, y: number, z: number): any;
        sub(v: Vector3): Vector3;
        sub2(v1: Vector3, v2: Vector3): Vector3;
        add(v: Vector3): Vector3;
        add2(v1: Vector3, v2: Vector3): Vector3;
        reverse(): Vector3;
        copy(): Vector3;
        toVector4(): Vector4;
        length(): any;
        cross(lhs: Vector3, rhs: Vector3): Vector3;
        lerp(lhs: Vector3, rhs: Vector3, alpha: number): Vector3;
        dot(rhs: any): number;
        isEqual(v: Vector3): boolean;
        toArray(): number[];
    }
}


declare module wd {
    class Vector4 {
        static create(x: any, y: any, z: any, w: any): any;
        static create(): any;
        constructor(x: any, y: any, z: any, w: any);
        constructor();
        x: number;
        y: number;
        z: number;
        w: number;
        values: Float32Array;
        normalize(): Vector4;
        copy(): Vector4;
        toVector3(): Vector3;
        multiplyScalar(scalar: number): Vector4;
        dot(v: Vector4): number;
        set(x: number, y: number, z: number, w: number): void;
        protected copyHelper(vector4: Vector4): any;
    }
}


declare module wd {
    class Matrix4 {
        static create(mat: Float32Array): Matrix4;
        static create(): Matrix4;
        constructor(mat: Float32Array);
        constructor();
        values: Float32Array;
        private _matrixArr;
        push(): void;
        pop(): void;
        setIdentity(): Matrix4;
        invert(): Matrix4;
        invertTo3x3(): Matrix3;
        transpose(): Matrix4;
        setTranslate(x: any, y: any, z: any): Matrix4;
        translate(x: any, y: any, z: any): Matrix4;
        setRotate(angle: number, x: number, y: number, z: number): Matrix4;
        rotate(angle: any, vector3: Vector3): Matrix4;
        rotate(angle: any, x: any, y: any, z: any): Matrix4;
        setScale(x: any, y: any, z: any): Matrix4;
        scale(x: any, y: any, z: any): Matrix4;
        setLookAt(eye: Vector3, center: Vector3, up: Vector3): Matrix4;
        setLookAt(eyeX: number, eyeY: number, eyeZ: number, centerX: number, centerY: number, centerZ: number, upX: number, upY: number, upZ: number): Matrix4;
        lookAt(eye: Vector3, center: Vector3, up: Vector3): Matrix4;
        lookAt(eyeX: number, eyeY: number, eyeZ: number, centerX: number, centerY: number, centerZ: number, upX: number, upY: number, upZ: number): Matrix4;
        setOrtho(left: number, right: number, bottom: number, top: number, near: number, far: number): Matrix4;
        ortho(left: number, right: number, bottom: number, top: number, near: number, far: number): Matrix4;
        setPerspective(fovy: number, aspect: number, near: number, far: number): Matrix4;
        perspective(fovy: number, aspect: number, near: number, far: number): Matrix4;
        applyMatrix(other: Matrix4): Matrix4;
        multiply(matrix2: Matrix4): Matrix4;
        multiply(matrix1: Matrix4, matrix2: Matrix4): Matrix4;
        multiplyVector4(vector: Vector4): Vector4;
        multiplyVector3(vector: Vector3): Vector3;
        copy(): Matrix4;
        getX(): Vector3;
        getY(): Vector3;
        getZ(): Vector3;
        getTranslation(): Vector3;
        getScale(): Vector3;
        getEulerAngles(): Vector3;
        setTRS(t: Vector3, r: Quaternion, s: Vector3): Matrix4;
    }
}


declare module wd {
    class Matrix3 {
        static create(mat: Float32Array): Matrix3;
        static create(): Matrix3;
        constructor(mat: Float32Array);
        constructor();
        values: Float32Array;
        setIdentity(): Matrix3;
        invert(): Matrix3;
        multiplyScalar(s: number): Matrix3;
        multiplyVector3(vector: any): Vector3;
        transpose(): Matrix3;
        copy(): Matrix3;
        set(n11: any, n12: any, n13: any, n21: any, n22: any, n23: any, n31: any, n32: any, n33: any): Matrix3;
    }
}


declare module wd {
    class Quaternion {
        static create(x?: number, y?: number, z?: number, w?: number): Quaternion;
        constructor(x?: number, y?: number, z?: number, w?: number);
        x: number;
        y: number;
        z: number;
        w: number;
        setFromEulerAngles(eulerAngles: Vector3): Quaternion;
        multiply(rhs: Quaternion): any;
        multiply(rhs1: Quaternion, rhs2: Quaternion): any;
        setFromMatrix(matrix: Matrix4): Quaternion;
        setFromAxisAngle(angle: number, axis: Vector3): Quaternion;
        invert(): Quaternion;
        conjugate(): Quaternion;
        clone(): Quaternion;
        copy(): Quaternion;
        normalize(): Quaternion;
        length(): any;
        multiplyVector3(vector: Vector3): Vector3;
        set(x: number, y: number, z: number, w: number): void;
        sub(quat: Quaternion): Quaternion;
        getEulerAngles(): Vector3;
    }
}


declare module wd {
    class Plane {
        static create(a: number, b: number, c: number, d: number): Plane;
        constructor(a: number, b: number, c: number, d: number);
        normal: Vector3;
        d: number;
        getReflectionMatrix(): Matrix4;
        normalize(): Plane;
        copy(): Plane;
    }
}


declare module wd {
    abstract class Animation extends Component {
        abstract play(animName: string, fps: number): any;
        abstract pause(): any;
        abstract resume(): any;
        abstract stop(): any;
        abstract update(time: number): any;
    }
}


declare module wd {
    class MorphAnimation extends Animation {
        static create(): MorphAnimation;
        isStart: boolean;
        isStop: boolean;
        isPause: boolean;
        interpolation: number;
        currentFrame: number;
        nextFrame: number;
        duration: number;
        fps: number;
        currentAnimName: string;
        isFrameChange: boolean;
        private _currentTime;
        private _oldTime;
        private _frameCount;
        private _state;
        private _isResume;
        private _isStartFromStop;
        private _pauseTime;
        private _resumeTime;
        init(): void;
        dispose(): void;
        play(animName: string, fps: number): void;
        pause(): void;
        resume(): void;
        stop(): void;
        update(time: number): void;
        private _start();
        private _floor(time);
        private _resetAnim();
        private _continueFromPausePoint(currentTime);
    }
}


declare module wd {
    abstract class Geometry extends Component {
        private _material;
        material: Material;
        geometryData: GeometryData;
        buffers: BufferContainer;
        init(): void;
        protected computeNormals(): void;
        hasFaceNormals(): boolean;
        hasVertexNormals(): boolean;
        isSmoothShading(): boolean;
        dispose(): void;
        computeFaceNormals(): void;
        computeVertexNormals(): void;
        protected abstract computeData(): GeometryDataType;
        protected createBufferContainer(): BufferContainer;
        protected createGeometryData(vertices: Array<number>, faces: Array<Face3>, texCoords: Array<number>, colors: Array<number>, morphTargets: wdCb.Hash<DYFileParseMorphTargetsData>): GeometryData;
        protected createCommonGeometryData(vertices: Array<number>, faces: Array<Face3>, texCoords: Array<number>, colors: Array<number>): CommonGeometryData;
    }
    type GeometryDataType = {
        vertices: Array<number>;
        faces?: Array<Face3>;
        texCoords?: Array<number>;
        colors?: Array<number>;
        morphTargets?: wdCb.Hash<DYFileParseMorphTargetsData>;
    };
}


declare module wd {
    class GeometryUtils {
        static convertToFaces(indices: Array<number>, normals?: Array<number>): Array<Face3>;
        static hasData(data: any): boolean;
        static getThreeComponent(sourceData: Array<number>, index: number): Vector3;
        static setThreeComponent(targetData: Array<number>, sourceData: Vector3, index: number): any;
        static setThreeComponent(targetData: Array<number>, sourceData: Array<number>, index: number): any;
    }
}


declare module wd {
    class ModelGeometry extends Geometry {
        static create(): ModelGeometry;
        vertices: Array<Vector3>;
        colors: Array<Vector3>;
        texCoords: Array<Vector2>;
        faces: Array<Face3>;
        morphTargets: wdCb.Hash<DYFileParseMorphTargetsData>;
        morphFaceNormals: wdCb.Hash<wdCb.Collection<Array<number>>>;
        morphVertexNormals: wdCb.Hash<wdCb.Collection<Array<number>>>;
        buffers: MorphBufferContainer;
        hasAnimation(): boolean;
        hasMorphFaceNormals(): boolean;
        hasMorphVertexNormals(): boolean;
        computeMorphNormals(): void;
        protected computeNormals(): void;
        protected computeData(): any;
        protected createBufferContainer(): BufferContainer;
        protected createGeometryData(vertices: Array<number>, faces: Array<Face3>, texCoords: Array<number>, colors: Array<number>, morphTargets: wdCb.Hash<DYFileParseMorphTargetsData>): GeometryData;
        private _hasMorphTargets();
    }
}


declare module wd {
    class BoxGeometry extends Geometry {
        static create(): BoxGeometry;
        width: number;
        height: number;
        depth: number;
        widthSegments: number;
        heightSegments: number;
        depthSegments: number;
        protected computeData(): {
            vertices: any[];
            faces: Face3[];
            texCoords: any[];
        };
    }
}


declare module wd {
    class RectGeometry extends Geometry {
        static create(): RectGeometry;
        width: number;
        height: number;
        protected computeData(): {
            vertices: any[];
            faces: Face3[];
            texCoords: any[];
        };
    }
}


declare module wd {
    class PlaneGeometry extends Geometry {
        static create(): PlaneGeometry;
        width: number;
        height: number;
        widthSegments: number;
        heightSegments: number;
        protected computeData(): {
            vertices: any[];
            faces: Face3[];
            texCoords: any[];
        };
    }
}

declare module wd {
    enum SphereDrawMode {
        LATITUDELONGTITUDE = 0,
    }
}


declare module wd {
    class SphereGeometry extends Geometry {
        static create(): SphereGeometry;
        radius: number;
        drawMode: SphereDrawMode;
        segments: number;
        protected computeData(): any;
    }
}


declare module wd {
    class TriangleGeometry extends Geometry {
        static create(): TriangleGeometry;
        width: number;
        height: number;
        protected computeData(): {
            vertices: any[];
            faces: Face3[];
            texCoords: any[];
        };
    }
}


declare module wd {
    abstract class GeometryData {
        constructor(geometry: Geometry);
        private _vertices;
        vertices: Array<number>;
        normals: any;
        normalsFromFaceNormal: any;
        normalsFromVertexNormals: any;
        indices: Array<number>;
        private _faces;
        faces: Array<Face3>;
        private _texCoords;
        texCoords: Array<number>;
        private _colors;
        colors: Array<number>;
        private _tangents;
        tangents: number[];
        isTangentDirty: boolean;
        protected geometry: Geometry;
        private _normalCache;
        private _normalFromFaceCache;
        private _normalFromVertexCache;
        private _indiceCache;
        private _normalDirty;
        private _indiceDirty;
        computeFaceNormals(): void;
        computeVertexNormals(): void;
        hasFaceNormals(): boolean;
        hasVertexNormals(): boolean;
        protected onChangeFace(): void;
        protected computeFaceNormalsHelper(vertices: Array<number>, aIndex: number, bIndex: number, cIndex: number): Vector3;
        protected computeVertexNormalsHelper(vertices: Array<number>): any;
        private _getColors(colors, vertices);
        private _getColorsFromMaterial(vertices);
        private _fillEmptyData(data);
        private _calculateTangents(vertices, normals, texCoords, indices);
    }
}


declare module wd {
    class CommonGeometryData extends GeometryData {
        static create(geometry: Geometry): CommonGeometryData;
    }
}


declare module wd {
    class MorphGeometryData extends GeometryData {
        static create(geometry: Geometry): MorphGeometryData;
        morphNormals: any;
        private _morphTargets;
        morphTargets: wdCb.Hash<DYFileParseMorphTargetsData>;
        protected geometry: ModelGeometry;
        private _morphNormalCache;
        private _morphNormalDirty;
        computeMorphNormals(): void;
        hasMorphFaceNormals(): boolean;
        hasMorphVertexNormals(): boolean;
        protected onChangeFace(): void;
        private _copyFaces(faces);
        private _getMorphNormals(geometryData);
    }
}


declare module wd {
    abstract class BufferContainer {
        geometryData: GeometryData;
        init(): void;
        getChild(type: BufferDataType): any;
        hasChild(type: BufferDataType): boolean;
        dispose(): void;
        protected abstract getVertice(type: any): any;
        protected abstract getNormal(type: any): any;
        protected container: wdCb.Hash<Buffer>;
        private _getTangent(type);
        private _getColor(type);
        private _getIndice(type);
        private _getTexCoord(type);
        private _needReCalcuteTangent(type);
    }
}


declare module wd {
    class CommonBufferContainer extends BufferContainer {
        static create(): CommonBufferContainer;
        geometryData: CommonGeometryData;
        protected getVertice(type: BufferDataType): ArrayBuffer;
        protected getNormal(type: BufferDataType): ArrayBuffer;
    }
}


declare module wd {
    class MorphBufferContainer extends BufferContainer {
        static create(animation: MorphAnimation): MorphBufferContainer;
        constructor(animation: MorphAnimation);
        geometryData: MorphGeometryData;
        protected container: wdCb.Hash<Buffer & Array<ArrayBuffer>>;
        private _animation;
        private _isCacheChangeFlag;
        private _isCacheChangeInLastLoop;
        protected getVertice(type: BufferDataType): ArrayBuffer[];
        protected getNormal(type: BufferDataType): ArrayBuffer[];
        private _getMorphData(type, morphDataTargets);
        private _isCacheNotChange(type);
        private _isNotPlayAnimation();
        private _getStaticData(type);
        private _getStaticDataCacheData(type);
    }
}


declare module wd {
    abstract class Camera {
        cameraToWorldMatrix: Matrix4;
        private _worldToCameraMatrix;
        worldToCameraMatrix: Matrix4;
        pMatrix: Matrix4;
        gameObject: GameObject;
        protected dirty: boolean;
        init(): void;
        dispose(): void;
        update(time: number): void;
        protected abstract updateProjectionMatrix(): any;
    }
}


declare module wd {
    class OrthographicCamera extends Camera {
        static create(): OrthographicCamera;
        private _left;
        left: number;
        private _right;
        right: number;
        private _bottom;
        bottom: number;
        private _top;
        top: number;
        private _near;
        near: number;
        private _far;
        far: number;
        protected updateProjectionMatrix(): void;
    }
}


declare module wd {
    class PerspectiveCamera extends Camera {
        static create(): PerspectiveCamera;
        private _fovy;
        fovy: number;
        private _aspect;
        aspect: number;
        private _near;
        near: number;
        private _far;
        far: number;
        zoomIn(speed: number, min?: number): void;
        zoomOut(speed: number, max?: number): void;
        protected updateProjectionMatrix(): void;
    }
}


declare module wd {
    abstract class CameraController extends Component {
        constructor(cameraComponent: Camera);
        cameraToWorldMatrix: Matrix4;
        worldToCameraMatrix: Matrix4;
        pMatrix: Matrix4;
        camera: Camera;
        init(): void;
        update(time: number): void;
        dispose(): void;
    }
}


declare module wd {
    class BasicCameraController extends CameraController {
        static create(cameraComponent: Camera): BasicCameraController;
    }
}


declare module wd {
    class FlyCameraController extends CameraController {
        static create(cameraComponent: Camera): FlyCameraController;
        constructor(cameraComponent: Camera);
        private _control;
        init(): void;
        update(time: number): void;
        dispose(): void;
    }
}


declare module wd {
    abstract class FlyCameraControl {
        constructor(cameraComponent: Camera);
        moveSpeed: number;
        rotateSpeed: number;
        protected cameraComponent: Camera;
        private _rotateX;
        private _rotateY;
        private _isRotate;
        private _mouseDragSubscription;
        private _keydownSubscription;
        private _gameObject;
        init(gameObject: GameObject): void;
        update(time: number): void;
        dispose(): void;
        protected abstract zoom(event: KeyboardEvent): any;
        private _move(event);
        private _bindCanvasEvent();
        private _removeEvent();
    }
}


declare module wd {
    class FlyPerspectiveCameraControl extends FlyCameraControl {
        static create(cameraComponent: Camera): FlyPerspectiveCameraControl;
        zoomSpeed: number;
        protected cameraComponent: PerspectiveCamera;
        protected zoom(event: KeyboardEvent): void;
    }
}


declare module wd {
    class FlyOrthographicCameraControl extends FlyCameraControl {
        static create(cameraComponent: Camera): FlyOrthographicCameraControl;
        protected zoom(event: KeyboardEvent): void;
    }
}


declare module wd {
    class ArcballCameraController extends CameraController {
        static create(cameraComponent: Camera): ArcballCameraController;
        moveSpeedX: number;
        moveSpeedY: number;
        rotateSpeed: number;
        distance: number;
        phi: number;
        theta: number;
        target: Vector3;
        thetaMargin: number;
        minDistance: number;
        private _isChange;
        private _mouseDragSubscription;
        private _mouseWheelSubscription;
        private _keydownSubscription;
        init(): void;
        update(time: number): void;
        dispose(): void;
        private _bindCanvasEvent();
        private _changeOrbit(e);
        private _changeTarget(e);
        private _changeDistance(e);
        private _contrainDistance();
        private _contrainTheta();
        private _removeEvent();
    }
}


declare module wd {
    abstract class Action extends Component {
        isStart: boolean;
        isStop: any;
        isPause: any;
        protected p_target: GameObject;
        target: GameObject;
        isFinish: boolean;
        reset(): void;
        abstract update(time: number): any;
        abstract start(): any;
        abstract stop(): any;
        abstract pause(): any;
        abstract resume(): any;
        abstract copy(): any;
        abstract reverse(): any;
        addToGameObject(gameObject: GameObject): void;
        removeFromGameObject(gameObject: GameObject): void;
        init(): void;
        protected finish(): void;
    }
}


declare module wd {
    abstract class ActionInstant extends Action {
        isStop: boolean;
        isPause: boolean;
        start(): void;
        stop(): void;
        pause(): void;
        resume(): void;
    }
}


declare module wd {
    class CallFunc extends ActionInstant {
        static create(func: Function, context: any, ...data: any[]): CallFunc;
        constructor(func: Function, context: any, dataArr: Array<any>);
        private _context;
        private _callFunc;
        private _dataArr;
        reverse(): CallFunc;
        update(time: any): void;
        copy(): CallFunc;
    }
}


declare module wd {
    abstract class ActionInterval extends Action {
        protected elapsed: number;
        protected duration: number;
        private _isStop;
        private _isPause;
        private _timeController;
        isStop: boolean;
        isPause: boolean;
        update(time: number): void;
        start(): void;
        stop(): void;
        reset(): void;
        pause(): void;
        resume(): void;
        protected updateBody(time: number): void;
        private _convertToRatio(elapsed);
    }
}


declare module wd {
    abstract class Control extends ActionInterval {
        target: GameObject;
        abstract getInnerActions(): any;
        init(): void;
        reverse(): Control;
        reset(): Control;
        protected iterate(method: string, argArr?: Array<any>): void;
    }
}


declare module wd {
    class Sequence extends Control {
        static create(...args: any[]): any;
        constructor(actionArr: Array<Action>);
        private _actions;
        private _currentAction;
        private _actionIndex;
        initWhenCreate(): void;
        update(time: any): any;
        copy(): any;
        reset(): Sequence;
        start(): Sequence;
        stop(): Sequence;
        pause(): Sequence;
        resume(): Sequence;
        reverse(): Sequence;
        getInnerActions(): wdCb.Collection<Action>;
        private _startNextActionAndJudgeFinish();
    }
}


declare module wd {
    class Spawn extends Control {
        static create(...args: any[]): any;
        constructor(actionArr: Array<Action>);
        private _actions;
        update(time: any): void;
        start(): Spawn;
        stop(): Spawn;
        pause(): Spawn;
        resume(): Spawn;
        copy(): any;
        reset(): Spawn;
        reverse(): Spawn;
        getInnerActions(): wdCb.Collection<Action>;
        protected iterate(method: string, argArr?: Array<any>): void;
        private _isFinish();
    }
}


declare module wd {
    class DelayTime extends ActionInterval {
        static create(delayTime: number): DelayTime;
        constructor(delayTime: number);
        reverse(): DelayTime;
        copy(): DelayTime;
    }
}


declare module wd {
    class Repeat extends Control {
        static create(action: Action, times: number): Repeat;
        constructor(action: Action, times: number);
        private _innerAction;
        private _originTimes;
        private _times;
        initWhenCreate(): void;
        update(time: any): void;
        copy(): Repeat;
        reset(): Repeat;
        start(): void;
        stop(): void;
        pause(): void;
        resume(): void;
        getInnerActions(): wdCb.Collection<Action>;
    }
}


declare module wd {
    class RepeatForever extends Control {
        static create(action: Action): RepeatForever;
        constructor(action: Action);
        private _innerAction;
        update(time: any): void;
        copy(): RepeatForever;
        start(): void;
        stop(): void;
        pause(): void;
        resume(): void;
        getInnerActions(): wdCb.Collection<Action>;
    }
}


declare module wd {
    class Tween extends ActionInterval {
        static Easing: {
            Linear: {
                None: (k: any) => any;
            };
            Quadratic: {
                In: (k: any) => number;
                Out: (k: any) => number;
                InOut: (k: any) => number;
            };
            Cubic: {
                In: (k: any) => number;
                Out: (k: any) => number;
                InOut: (k: any) => number;
            };
            Quartic: {
                In: (k: any) => number;
                Out: (k: any) => number;
                InOut: (k: any) => number;
            };
            Quintic: {
                In: (k: any) => number;
                Out: (k: any) => number;
                InOut: (k: any) => number;
            };
            Sinusoidal: {
                In: (k: any) => number;
                Out: (k: any) => any;
                InOut: (k: any) => number;
            };
            Exponential: {
                In: (k: any) => any;
                Out: (k: any) => number;
                InOut: (k: any) => number;
            };
            Circular: {
                In: (k: any) => number;
                Out: (k: any) => any;
                InOut: (k: any) => number;
            };
            Elastic: {
                In: (k: any) => number;
                Out: (k: any) => number;
                InOut: (k: any) => number;
            };
            Back: {
                In: (k: any) => number;
                Out: (k: any) => number;
                InOut: (k: any) => number;
            };
            Bounce: {
                In: (k: any) => number;
                Out: (k: any) => number;
                InOut: (k: any) => number;
            };
        };
        static Interpolation: {
            Linear: (v: any, k: any) => any;
            Bezier: (v: any, k: any) => number;
            CatmullRom: (v: any, k: any) => any;
            Utils: {
                Linear: (p0: any, p1: any, t: any) => any;
                Bernstein: (n: any, i: any) => number;
                Factorial: (n: any) => number;
                CatmullRom: (p0: any, p1: any, p2: any, p3: any, t: any) => any;
            };
        };
        static create(): Tween;
        private _object;
        private _valuesStart;
        private _valuesEnd;
        private _easingFunction;
        private _interpolationFunction;
        private _onStartCallback;
        private _onStartCallbackFired;
        private _onUpdateCallback;
        private _onFinishCallback;
        private _onStopCallback;
        protected updateBody(time: number): boolean;
        from(object: any): Tween;
        to(properties: any, duration?: number): Tween;
        init(): void;
        start(): Tween;
        stop(): Tween;
        copy(): Tween;
        reverse(): void;
        easing(easing: any): Tween;
        interpolation(interpolation: any): Tween;
        onUpdate(callback: Function): Tween;
        onFinish(callback: Function): Tween;
        onStart(callback: Function): Tween;
        onStop(callback: Function): Tween;
        protected finish(): void;
    }
}


declare module wd {
    class ActionManager {
        static create(): ActionManager;
        private _children;
        addChild(action: Action): void;
        removeChild(action: Action): void;
        hasChild(action: Action): boolean;
        update(time: number): void;
    }
}


declare module wd {
    abstract class RendererComponent extends Component {
        abstract render(renderer: Renderer, geometry: Geometry, camera: GameObject): any;
    }
}


declare module wd {
    class MeshRenderer extends RendererComponent {
        static create(): MeshRenderer;
        render(renderer: Renderer, geometry: Geometry, camera: GameObject): void;
        protected createDrawCommand(renderer: Renderer, geometry: Geometry, camera: GameObject): any;
    }
}


declare module wd {
    class SkyboxRenderer extends MeshRenderer {
        static create(): SkyboxRenderer;
        render(renderer: Renderer, geometry: Geometry, camera: GameObject): void;
    }
}


declare module wd {
    abstract class Collider extends Component {
        collideXY(localX: number, localY: number): boolean;
        collide(collider: Collider): boolean;
    }
}


declare module wd {
    class TopCollider extends Collider {
        static create(): TopCollider;
        collideXY(localX: number, localY: number): boolean;
        collide(collider: Collider): boolean;
    }
}


declare module wd {
    class Script extends Component {
        static script: wdCb.Stack<ScriptFileData>;
        static create(): Script;
        static create(url: string): Script;
        static addScript(scriptName: string, _class: Function): void;
        constructor(url?: string);
        url: string;
        createLoadJsStream(): any;
        addToGameObject(gameObject: GameObject): void;
        removeFromGameObject(gameObject: GameObject): void;
        private _addScriptToGameObject(gameObject, data);
    }
    type ScriptFileData = {
        name: string;
        class: any;
    };
}

declare module wd {
    interface IScriptBehavior {
        init?(): any;
        update?(time: number): any;
        onEnter?(): any;
        onExit?(): any;
        onStartLoop?(): any;
        onEndLoop?(): any;
        onDispose?(): any;
    }
}


declare module wd {
    abstract class Light extends Component {
        position: Vector3;
        color: Color;
        castShadow: boolean;
        shadowCameraNear: number;
        shadowCameraFar: number;
        shadowBias: number;
        shadowDarkness: number;
        shadowMapWidth: number;
        shadowMapHeight: number;
        shadowMap: IShadowMapTexture;
        shadowMapRenderer: RenderTargetRenderer;
    }
}


declare module wd {
    class AmbientLight extends Light {
        static type: string;
        static create(): AmbientLight;
    }
}


declare module wd {
    class DirectionLight extends Light {
        static type: string;
        static defaultPosition: Vector3;
        static create(): DirectionLight;
        private _shadowRenderList;
        shadowRenderList: any;
        intensity: number;
        shadowCameraLeft: number;
        shadowCameraRight: number;
        shadowCameraTop: number;
        shadowCameraBottom: number;
        shadowMap: TwoDShadowMapTexture;
        shadowMapRenderer: TwoDShadowMapRenderTargetRenderer;
        private _beforeInitHandler;
        initWhenCreate(): void;
        dispose(): void;
    }
}


declare module wd {
    class PointLight extends Light {
        static type: string;
        static create(): PointLight;
        private _rangeLevel;
        rangeLevel: number;
        range: number;
        constant: number;
        linear: number;
        quadratic: number;
        private _shadowRenderList;
        shadowRenderList: any;
        intensity: number;
        shadowMap: CubemapShadowMapTexture;
        shadowMapRenderer: CubemapShadowMapRenderTargetRenderer;
        private _attenuation;
        private _beforeInitHandler;
        initWhenCreate(): void;
        dispose(): void;
    }
}


declare module wd {
    class Attenuation {
        static create(): Attenuation;
        constant: number;
        private _range;
        range: number;
        private _linear;
        linear: number;
        private _quadratic;
        quadratic: number;
        private _rangeLevel;
        rangeLevel: number;
        setByRangeLevel(): void;
    }
}


declare module wd {
    class JudgeUtils extends wdCb.JudgeUtils {
        static isView(obj: any): boolean;
        static isEqual(target1: GameObject, target2: GameObject): boolean;
        static isPowerOfTwo(value: number): boolean;
        static isFloatArray(data: any): boolean;
    }
}


declare module wd {
    class MathUtils {
        static clamp(num: number, below: number, up: number): number;
        static bigThan(num: number, below: number): number;
    }
}


declare module wd {
    class Log extends wdCb.Log {
    }
}


declare module wd {
    abstract class TimeController {
        elapsed: number;
        pauseElapsed: number;
        pauseTime: number;
        startTime: number;
        start(): void;
        stop(): void;
        pause(): void;
        resume(): void;
        computeElapseTime(time: number): number;
        protected abstract getNow(): any;
    }
}


declare module wd {
    class DirectorTimeController extends TimeController {
        static create(): DirectorTimeController;
        gameTime: number;
        fps: number;
        isTimeChange: boolean;
        private _lastTime;
        tick(time: number): void;
        start(): void;
        resume(): void;
        protected getNow(): any;
        private _updateFps(time);
    }
}


declare module wd {
    class CommonTimeController extends TimeController {
        static create(): CommonTimeController;
        protected getNow(): any;
    }
}


declare module wd {
    abstract class RenderTargetRenderer {
        constructor(renderTargetTexture: RenderTargetTexture);
        protected texture: RenderTargetTexture;
        protected frameBufferOperator: FrameBuffer;
        initWhenCreate(): void;
        init(): void;
        render(renderer: Renderer, camera: GameObject): void;
        dispose(): void;
        protected abstract initFrameBuffer(): any;
        protected abstract renderFrameBufferTexture(renderer: Renderer, camera: GameObject): any;
        protected abstract disposeFrameBuffer(): any;
        protected abstract createCamera(...args: any[]): GameObject;
        protected beforeRender(): void;
        protected afterRender(): void;
    }
}


declare module wd {
    abstract class TwoDRenderTargetRenderer extends RenderTargetRenderer {
        protected frameBuffer: WebGLFramebuffer;
        protected renderBuffer: WebGLRenderbuffer;
        protected abstract beforeRenderFrameBufferTexture(renderCamera: GameObject): any;
        protected abstract getRenderList(): wdCb.Collection<GameObject>;
        protected abstract renderRenderer(renderer: Renderer): any;
        protected initFrameBuffer(): void;
        protected renderFrameBufferTexture(renderer: Renderer, camera: GameObject): void;
        protected disposeFrameBuffer(): void;
    }
}


declare module wd {
    class MirrorRenderTargetRenderer extends TwoDRenderTargetRenderer {
        static create(mirrorTexture: MirrorTexture): MirrorRenderTargetRenderer;
        protected texture: MirrorTexture;
        protected beforeRenderFrameBufferTexture(renderCamera: GameObject): void;
        protected getRenderList(): wdCb.Collection<GameObject>;
        protected renderRenderer(renderer: any): void;
        protected createCamera(camera: GameObject): GameObject;
        private _setSceneSide(side);
        private _setClipPlane(vMatrix, pMatrix, plane);
        private _getClipPlaneInCameraSpace(vMatrix, plane);
    }
}


declare module wd {
    class TwoDShadowMapRenderTargetRenderer extends TwoDRenderTargetRenderer {
        static create(light: DirectionLight): TwoDShadowMapRenderTargetRenderer;
        constructor(light: DirectionLight);
        protected texture: TwoDShadowMapTexture;
        private _light;
        private _shadowMapRendererUtils;
        initWhenCreate(): void;
        init(): void;
        dispose(): void;
        protected beforeRenderFrameBufferTexture(renderCamera: GameObject): void;
        protected getRenderList(): wdCb.Collection<GameObject>;
        protected renderRenderer(renderer: any): void;
        protected beforeRender(): void;
        protected afterRender(): void;
        protected createCamera(): GameObject;
    }
}


declare module wd {
    abstract class CubemapRenderTargetRenderer extends RenderTargetRenderer {
        protected texture: CubemapRenderTargetTexture;
        private _frameBuffers;
        private _renderBuffers;
        protected abstract getRenderList(): wdCb.Hash<any>;
        protected abstract setCamera(cubeCameraComponent: PerspectiveCamera): any;
        protected abstract getPosition(): Vector3;
        protected initFrameBuffer(): void;
        protected renderFrameBufferTexture(renderer: Renderer, camera: GameObject): void;
        protected disposeFrameBuffer(): void;
        protected createCamera(index: number): GameObject;
        private _isEmpty(faceRenderList);
        private _convertIndexToFaceKey(index);
        private _lookAtFace(camera, position, index);
    }
}


declare module wd {
    class CubemapShadowMapRenderTargetRenderer extends CubemapRenderTargetRenderer {
        static create(light: PointLight): CubemapShadowMapRenderTargetRenderer;
        constructor(light: PointLight);
        protected texture: CubemapShadowMapTexture;
        private _light;
        private _shadowMapRendererUtils;
        initWhenCreate(): void;
        init(): void;
        private _shader;
        dispose(): void;
        protected getRenderList(): wdCb.Hash<Array<GameObject> | wdCb.Collection<GameObject>>;
        protected beforeRender(): void;
        protected afterRender(): void;
        protected setCamera(camera: PerspectiveCamera): void;
        protected getPosition(): Vector3;
        private _convertRenderListToCollection(renderList);
    }
}


declare module wd {
    class DynamicCubemapRenderTargetRenderer extends CubemapRenderTargetRenderer {
        static create(texture: DynamicCubemapTexture): DynamicCubemapRenderTargetRenderer;
        protected texture: DynamicCubemapTexture;
        protected getRenderList(): wdCb.Hash<GameObject>;
        protected setCamera(camera: PerspectiveCamera): void;
        protected getPosition(): Vector3;
    }
}


declare module wd {
    abstract class ShadowMapRenderTargetRendererUtils {
        constructor(light: Light, texture: Texture);
        texture: Texture;
        protected light: Light;
        private _endLoopHandler;
        private _shader;
        initWhenCreate(): void;
        init(): void;
        setShadowMapData(target: GameObject): any;
        setShadowMapData(target: GameObject, shadowMapCamera: GameObject): any;
        bindEndLoop(func: Function): void;
        unBindEndLoop(): void;
        beforeRender(): void;
        afterRender(): void;
        createShaderWithShaderLib(lib: BuildShadowMapShaderLib): void;
        protected abstract setMaterialShadowMapData(material: LightMaterial, target: GameObject, shadowMapCamera: GameObject): any;
        protected abstract addShadowMap(material: LightMaterial, shadowMap: IShadowMapTexture): any;
        protected setShadowMap(target: GameObject, shadowMap: IShadowMapTexture): void;
    }
}


declare module wd {
    class CubemapShadowMapRenderTargetRendererUtils extends ShadowMapRenderTargetRendererUtils {
        static create(light: PointLight, texture: CubemapShadowMapTexture): CubemapShadowMapRenderTargetRendererUtils;
        texture: CubemapShadowMapTexture;
        protected light: PointLight;
        initWhenCreate(): void;
        clearCubemapShadowMapData(target: GameObject): void;
        setMaterialShadowMapData(material: LightMaterial, target: GameObject, shadowMapCamera: GameObject): void;
        protected addShadowMap(material: LightMaterial, shadowMap: CubemapShadowMapTexture): void;
    }
}


declare module wd {
    class TwoDShadowMapRenderTargetRendererUtils extends ShadowMapRenderTargetRendererUtils {
        static create(light: DirectionLight, texture: TwoDShadowMapTexture): TwoDShadowMapRenderTargetRendererUtils;
        texture: TwoDShadowMapTexture;
        protected light: DirectionLight;
        initWhenCreate(): void;
        clearTwoDShadowMapData(target: GameObject): void;
        protected setMaterialShadowMapData(material: LightMaterial, target: GameObject, shadowMapCamera: GameObject): void;
        protected addShadowMap(material: LightMaterial, shadowMap: TwoDShadowMapTexture): void;
    }
}


declare module wd {
    abstract class Renderer {
        skyboxCommand: QuadCommand;
        abstract createQuadCommand(): any;
        abstract addCommand(command: QuadCommand): any;
        abstract render(): any;
        init(): void;
    }
}


declare module wd {
    class WebGLRenderer extends Renderer {
        static create(): WebGLRenderer;
        private _commandQueue;
        private _clearOptions;
        createQuadCommand(): QuadCommand;
        addCommand(command: QuadCommand): void;
        render(): void;
        init(): void;
        setClearColor(color: Color): void;
        private _renderOpaqueCommands();
        private _renderSortedTransparentCommands();
        private _getObjectToCameraZDistance(quad);
        private _clearCommand();
        private _setClearOptions(clearOptions);
    }
}

declare module wd {
    enum DrawMode {
        TRIANGLES,
    }
}

declare module wd {
    enum BufferType {
        UNSIGNED_BYTE,
        SHORT,
        UNSIGNED_SHORT,
        INT,
        UNSIGNED_INT,
        FLOAT,
    }
}

declare module wd {
    enum BufferDataType {
        VERTICE,
        INDICE,
        NORMAL,
        TEXCOORD,
        TANGENT,
        COLOR,
    }
}

declare module wd {
    enum BufferUsage {
        STREAM_DRAW,
        STATIC_DRAW,
        DYNAMIC_DRAW,
    }
}


declare module wd {
    class Buffer {
        buffer: any;
        type: string;
        num: number;
        dispose(): void;
    }
}


declare module wd {
    class ElementBuffer extends Buffer {
        static create(data: any, type: BufferType): ElementBuffer;
        private _typeSize;
        typeSize: number;
        data: any;
        initWhenCreate(data: any, type: BufferType): any;
        private _checkDataType(data, type);
        private _getInfo(type);
    }
}


declare module wd {
    class ArrayBuffer extends Buffer {
        static create(data: any, num: number, type: BufferType, usage?: BufferUsage): ArrayBuffer;
        count: number;
        data: any;
        private _type;
        initWhenCreate(data: any, num: number, type: BufferType, usage: BufferUsage): any;
        resetData(data: any, num?: number, type?: BufferType): ArrayBuffer;
    }
}


declare module wd {
    class BufferDataTable {
        static getGeometryDataName(type: BufferDataType): string;
    }
}


declare module wd {
    class Program {
        static create(): Program;
        private _program;
        private _shader;
        use(): void;
        getUniformLocation(name: string): any;
        sendUniformData(name: string, type: VariableType, data: any): any;
        sendUniformData(pos: WebGLUniformLocation, type: VariableType, data: any): any;
        sendUniformDataFromCustomShader(): void;
        sendAttributeData(name: string, type: VariableType, data: any): void;
        sendAttributeDataFromCustomShader(): void;
        sendStructureData(name: string, type: VariableType, data: any): void;
        initWithShader(shader: Shader): Program;
        dispose(): void;
        isUniformDataNotExistByLocation(pos: any): boolean;
        private _convertAttributeDataType(val);
        private _convertToVector3(data);
        private _convertToVector4(data);
    }
}


declare module wd {
    class QuadCommand {
        static create(): QuadCommand;
        program: Program;
        buffers: BufferContainer;
        mMatrix: Matrix4;
        vMatrix: Matrix4;
        pMatrix: Matrix4;
        drawMode: DrawMode;
        z: number;
        material: Material;
        animation: Animation;
        execute(): void;
        init(): void;
        private _draw();
        private _setEffects();
        private _getSide();
    }
}


declare module wd {
    class FrameBuffer {
        static create(width: number, height: number): FrameBuffer;
        constructor(width: number, height: number);
        gl: any;
        width: number;
        height: number;
        private _originScissorTest;
        createFrameBuffer(): any;
        bindFrameBuffer(buffer: WebGLFramebuffer): void;
        setViewport(): void;
        restoreViewport(): void;
        dispose(): void;
        unBind(): void;
        createRenderBuffer(): any;
        attachTexture(glTarget: any, texture: WebGLTexture): void;
        attachRenderBuffer(type: string, renderBuffer: WebGLRenderbuffer): void;
        check(): void;
    }
}


declare module wd {
    class Shader {
        static create(): Shader;
        private _attributes;
        attributes: wdCb.Hash<ShaderData>;
        private _uniforms;
        uniforms: wdCb.Hash<ShaderData>;
        private _vsSource;
        vsSource: string;
        private _fsSource;
        fsSource: string;
        program: Program;
        private _definitionDataDirty;
        private _libs;
        private _sourceBuilder;
        createVsShader(): any;
        createFsShader(): any;
        isEqual(other: Shader): boolean;
        init(): void;
        update(quadCmd: QuadCommand, material: Material): void;
        hasLib(lib: ShaderLib): any;
        hasLib(_class: Function): any;
        addLib(lib: ShaderLib): void;
        addShaderLibToTop(lib: ShaderLib): void;
        getLib(libClass: Function): ShaderLib;
        getLibs(): wdCb.Collection<ShaderLib>;
        removeLib(lib: ShaderLib): any;
        removeLib(func: Function): any;
        removeAllLibs(): void;
        sortLib(func: (a: ShaderLib, b: ShaderLib) => any): void;
        read(definitionData: ShaderDefinitionData): void;
        buildDefinitionData(quadCmd: QuadCommand, material: Material): void;
        private _initShader(shader, source);
        private _isNotEqual(list1, list2);
    }
    type ShaderData = {
        type: VariableType;
        value: any;
    };
    type ShaderDefinitionData = {
        vsSourceTop: string;
        vsSourceDefine: string;
        vsSourceVarDeclare: string;
        vsSourceFuncDeclare: string;
        vsSourceFuncDefine: string;
        vsSourceBody: string;
        fsSourceTop: string;
        fsSourceDefine: string;
        fsSourceVarDeclare: string;
        fsSourceFuncDeclare: string;
        fsSourceFuncDefine: string;
        fsSourceBody: string;
        attributes: ShaderData | wdCb.Hash<ShaderData>;
        uniforms: ShaderData | wdCb.Hash<ShaderData>;
    };
}


declare module wd {
    class ShaderSourceBuilder {
        static create(): ShaderSourceBuilder;
        attributes: wdCb.Hash<ShaderData>;
        uniforms: wdCb.Hash<ShaderData>;
        vsSource: string;
        vsSourceTop: string;
        vsSourceDefine: string;
        vsSourceVarDeclare: string;
        vsSourceFuncDeclare: string;
        vsSourceFuncDefine: string;
        vsSourceBody: string;
        fsSource: string;
        fsSourceTop: string;
        fsSourceDefine: string;
        fsSourceVarDeclare: string;
        fsSourceFuncDeclare: string;
        fsSourceFuncDefine: string;
        fsSourceBody: string;
        vsSourceDefineList: wdCb.Collection<SourceDefine>;
        fsSourceDefineList: wdCb.Collection<SourceDefine>;
        attributesFromShaderLib: wdCb.Hash<ShaderData>;
        uniformsFromShaderLib: wdCb.Hash<ShaderData>;
        vsSourceFromShaderLib: string;
        vsSourceTopFromShaderLib: string;
        vsSourceDefineFromShaderLib: string;
        vsSourceVarDeclareFromShaderLib: string;
        vsSourceFuncDeclareFromShaderLib: string;
        vsSourceFuncDefineFromShaderLib: string;
        vsSourceBodyFromShaderLib: string;
        fsSourceFromShaderLib: string;
        fsSourceTopFromShaderLib: string;
        fsSourceDefineFromShaderLib: string;
        fsSourceVarDeclareFromShaderLib: string;
        fsSourceFuncDeclareFromShaderLib: string;
        fsSourceFuncDefineFromShaderLib: string;
        fsSourceBodyFromShaderLib: string;
        vsSourceDefineListFromShaderLib: wdCb.Collection<SourceDefine>;
        fsSourceDefineListFromShaderLib: wdCb.Collection<SourceDefine>;
        read(definitionData: ShaderDefinitionData): void;
        build(libs: wdCb.Collection<ShaderLib>): void;
        clearShaderDefinition(): void;
        private _readLibSource(libs);
        private _buildVsSource();
        private _buildFsSource();
        private _buildVsSourceTop();
        private _buildVsSourceDefine();
        private _buildVsSourceVarDeclare();
        private _buildVsSourceFuncDeclare();
        private _buildVsSourceFuncDefine();
        private _buildVsSourceBody();
        private _buildFsSourceTop();
        private _buildFsSourceDefine();
        private _buildFsSourceVarDeclare();
        private _buildFsSourceFuncDeclare();
        private _buildFsSourceFuncDefine();
        private _buildFsSourceBody();
        private _buildSourceDefine(defineList);
        private _getPrecisionSource();
        private _generateAttributeSource();
        private _generateUniformSource(sourceVarDeclare, sourceFuncDefine, sourceBody);
        private _isExistInSource(key, source);
        private _convertArrayToArrayBuffer(type, value);
        private _getBufferNum(type);
    }
    type SourceDefine = {
        name: string;
        value: any;
    };
}

declare module wd {
    enum VariableType {
        FLOAT_1 = 0,
        FLOAT_2 = 1,
        FLOAT_3 = 2,
        FLOAT_4 = 3,
        FLOAT_MAT3 = 4,
        FLOAT_MAT4 = 5,
        BUFFER = 6,
        SAMPLER_CUBE = 7,
        SAMPLER_2D = 8,
        NUMBER_1 = 9,
        STRUCTURE = 10,
        STRUCTURES = 11,
    }
}

declare module wd {
    enum VariableCategory {
        ENGINE,
        CUSTOM,
    }
}


declare module wd {
    class VariableLib {
        static a_position: ShaderVariable;
        static a_currentFramePosition: ShaderVariable;
        static a_nextFramePosition: ShaderVariable;
        static a_normal: ShaderVariable;
        static a_currentFrameNormal: ShaderVariable;
        static a_nextFrameNormal: ShaderVariable;
        static a_color: ShaderVariable;
        static a_texCoord: ShaderVariable;
        static a_tangent: ShaderVariable;
        static u_mMatrix: ShaderVariable;
        static u_vMatrix: ShaderVariable;
        static u_pMatrix: ShaderVariable;
        static u_normalMatrix: ShaderVariable;
        static u_samplerCube0: ShaderVariable;
        static u_sampler2D0: ShaderVariable;
        static u_sampler2D1: ShaderVariable;
        static u_diffuseMapSampler: ShaderVariable;
        static u_specularMapSampler: ShaderVariable;
        static u_normalMapSampler: ShaderVariable;
        static u_mirrorSampler: ShaderVariable;
        static u_cameraPos: ShaderVariable;
        static u_refractionRatio: ShaderVariable;
        static u_reflectivity: ShaderVariable;
        static u_sourceRegion: ShaderVariable;
        static u_repeatRegion: ShaderVariable;
        static u_combineMode: ShaderVariable;
        static u_mixRatio: ShaderVariable;
        static u_diffuse: ShaderVariable;
        static u_specular: ShaderVariable;
        static u_shininess: ShaderVariable;
        static u_isBothSide: ShaderVariable;
        static u_opacity: ShaderVariable;
        static u_ambient: ShaderVariable;
        static u_directionLights: ShaderVariable;
        static u_pointLights: ShaderVariable;
        static u_vpMatrixFromLight: ShaderVariable;
        static u_lightPos: ShaderVariable;
        static u_farPlane: ShaderVariable;
        static u_interpolation: ShaderVariable;
    }
    type ShaderVariable = {
        type: VariableType;
        value: any;
    };
}


declare module wd {
    class VariableTypeTable {
        static getVariableType(type: VariableType): string;
    }
}


declare module wd {
    class VariableNameTable {
        static getVariableName(name: string): string;
    }
}


declare module wd {
    abstract class ShaderLib {
        type: string;
        attributes: wdCb.Hash<ShaderVariable>;
        uniforms: wdCb.Hash<ShaderVariable>;
        vsSourceTop: string;
        vsSourceDefine: string;
        vsSourceVarDeclare: string;
        vsSourceFuncDeclare: string;
        vsSourceFuncDefine: string;
        vsSourceBody: string;
        fsSourceTop: string;
        fsSourceDefine: string;
        fsSourceVarDeclare: string;
        fsSourceFuncDeclare: string;
        fsSourceFuncDefine: string;
        fsSourceBody: string;
        vsSourceDefineList: wdCb.Collection<any>;
        fsSourceDefineList: wdCb.Collection<any>;
        abstract sendShaderVariables(program: Program, quadCmd: QuadCommand, material: Material): any;
        setShaderDefinition(quadCmd: QuadCommand, material: Material): void;
        protected getVsChunk(): any;
        protected getVsChunk(type: string): any;
        protected getFsChunk(): any;
        protected getFsChunk(type: string): any;
        protected setVsSource(vs: GLSLChunk, operator?: string): void;
        protected setFsSource(fs: GLSLChunk, operator?: string): void;
        protected addAttributeVariable(variableArr: Array<string>): void;
        protected addUniformVariable(variableArr: Array<string>): void;
        protected sendAttributeData(program: Program, name: string, data: any): void;
        protected sendUniformData(program: Program, name: string, data: any): void;
        private _clearShaderDefinition();
        private _getChunk(type, sourceType);
        private _setSource(chunk, sourceType, operator);
        private _addVariable(target, variableArr);
    }
}


declare module wd {
    class CommonShaderLib extends ShaderLib {
        static create(): CommonShaderLib;
        type: string;
        sendShaderVariables(program: Program, quadCmd: QuadCommand, material: Material): void;
        setShaderDefinition(quadCmd: QuadCommand, material: Material): void;
    }
}


declare module wd {
    class CommonVerticeShaderLib extends ShaderLib {
        static create(): CommonVerticeShaderLib;
        type: string;
        sendShaderVariables(program: Program, quadCmd: QuadCommand, material: Material): void;
        setShaderDefinition(quadCmd: QuadCommand, material: Material): void;
        private _sendAttributeVariables(program, quadCmd);
    }
}


declare module wd {
    class CommonNormalShaderLib extends ShaderLib {
        static create(): CommonNormalShaderLib;
        type: string;
        sendShaderVariables(program: Program, quadCmd: QuadCommand, material: Material): void;
        setShaderDefinition(quadCmd: QuadCommand, material: Material): void;
        private _sendAttributeVariables(program, quadCmd);
    }
}


declare module wd {
    class BasicShaderLib extends ShaderLib {
        static create(): BasicShaderLib;
        type: string;
        sendShaderVariables(program: Program, quadCmd: QuadCommand, material: BasicMaterial): void;
        setShaderDefinition(quadCmd: QuadCommand, material: Material): void;
    }
}


declare module wd {
    class BasicEndShaderLib extends ShaderLib {
        static create(): BasicEndShaderLib;
        type: string;
        sendShaderVariables(program: Program, quadCmd: QuadCommand, material: Material): void;
    }
}


declare module wd {
    class MorphCommonShaderLib extends ShaderLib {
        static create(): MorphCommonShaderLib;
        type: string;
        sendShaderVariables(program: Program, quadCmd: QuadCommand, material: Material): void;
        setShaderDefinition(quadCmd: QuadCommand, material: Material): void;
    }
}


declare module wd {
    class MorphVerticeShaderLib extends ShaderLib {
        static create(): MorphVerticeShaderLib;
        type: string;
        sendShaderVariables(program: Program, quadCmd: QuadCommand, material: Material): void;
        setShaderDefinition(quadCmd: QuadCommand, material: Material): void;
    }
}


declare module wd {
    class MorphNormalShaderLib extends ShaderLib {
        static create(): MorphNormalShaderLib;
        type: string;
        sendShaderVariables(program: Program, quadCmd: QuadCommand, material: Material): void;
        setShaderDefinition(quadCmd: QuadCommand, material: Material): void;
    }
}


declare module wd {
    class SkyboxShaderLib extends ShaderLib {
        static create(): SkyboxShaderLib;
        type: string;
        sendShaderVariables(program: Program, quadCmd: QuadCommand, material: Material): void;
        setShaderDefinition(quadCmd: QuadCommand, material: Material): void;
    }
}


declare module wd {
    abstract class EnvMapForBasicShaderLib extends ShaderLib {
        sendShaderVariables(program: Program, quadCmd: QuadCommand, material: Material): void;
        setShaderDefinition(quadCmd: QuadCommand, material: Material): void;
        protected setEnvMapSource(): void;
    }
}


declare module wd {
    class BasicEnvMapForBasicShaderLib extends EnvMapForBasicShaderLib {
        static create(): BasicEnvMapForBasicShaderLib;
        type: string;
    }
}


declare module wd {
    class ReflectionForBasicShaderLib extends EnvMapForBasicShaderLib {
        static create(): ReflectionForBasicShaderLib;
        type: string;
        setShaderDefinition(quadCmd: QuadCommand, material: Material): void;
    }
}


declare module wd {
    class RefractionForBasicShaderLib extends EnvMapForBasicShaderLib {
        static create(): RefractionForBasicShaderLib;
        type: string;
        sendShaderVariables(program: Program, quadCmd: QuadCommand, material: Material): void;
        setShaderDefinition(quadCmd: QuadCommand, material: Material): void;
    }
}


declare module wd {
    class FresnelForBasicShaderLib extends EnvMapForBasicShaderLib {
        static create(): FresnelForBasicShaderLib;
        type: string;
        sendShaderVariables(program: Program, quadCmd: QuadCommand, material: Material): void;
        setShaderDefinition(quadCmd: QuadCommand, material: Material): void;
    }
}


declare module wd {
    abstract class EnvMapForLightShaderLib extends ShaderLib {
        sendShaderVariables(program: Program, quadCmd: QuadCommand, material: Material): void;
        setShaderDefinition(quadCmd: QuadCommand, material: Material): void;
        protected setEnvMapSource(): void;
    }
}


declare module wd {
    class BasicEnvMapForLightShaderLib extends EnvMapForLightShaderLib {
        static create(): BasicEnvMapForLightShaderLib;
        type: string;
    }
}


declare module wd {
    class ReflectionForLightShaderLib extends EnvMapForLightShaderLib {
        static create(): ReflectionForLightShaderLib;
        type: string;
        setShaderDefinition(quadCmd: QuadCommand, material: Material): void;
    }
}


declare module wd {
    class RefractionForLightShaderLib extends EnvMapForLightShaderLib {
        static create(): RefractionForLightShaderLib;
        type: string;
        sendShaderVariables(program: Program, quadCmd: QuadCommand, material: Material): void;
        setShaderDefinition(quadCmd: QuadCommand, material: Material): void;
    }
}


declare module wd {
    class FresnelForLightShaderLib extends EnvMapForLightShaderLib {
        static create(): FresnelForLightShaderLib;
        type: string;
        sendShaderVariables(program: Program, quadCmd: QuadCommand, material: Material): void;
        setShaderDefinition(quadCmd: QuadCommand, material: Material): void;
    }
}


declare module wd {
    abstract class MapShaderLib extends ShaderLib {
        sendShaderVariables(program: Program, quadCmd: QuadCommand, material: Material): void;
        setShaderDefinition(quadCmd: QuadCommand, material: Material): void;
        private _setMapSource();
    }
}


declare module wd {
    class BasicMapShaderLib extends MapShaderLib {
        static create(): BasicMapShaderLib;
        type: string;
    }
}


declare module wd {
    class MultiMapShaderLib extends MapShaderLib {
        static create(): MultiMapShaderLib;
        type: string;
        sendShaderVariables(program: Program, quadCmd: QuadCommand, material: Material): void;
        setShaderDefinition(quadCmd: QuadCommand, material: Material): void;
    }
}


declare module wd {
    class MirrorForBasicShaderLib extends ShaderLib {
        static create(): MirrorForBasicShaderLib;
        type: string;
        sendShaderVariables(program: Program, quadCmd: QuadCommand, material: Material): void;
        setShaderDefinition(quadCmd: QuadCommand, material: Material): void;
    }
}


declare module wd {
    class LightCommonShaderLib extends ShaderLib {
        static create(): LightCommonShaderLib;
        type: string;
        sendShaderVariables(program: Program, quadCmd: QuadCommand, material: LightMaterial): void;
        setShaderDefinition(quadCmd: QuadCommand, material: Material): void;
    }
}


declare module wd {
    class LightShaderLib extends ShaderLib {
        static create(): LightShaderLib;
        type: string;
        sendShaderVariables(program: Program, quadCmd: QuadCommand, material: LightMaterial): void;
        setShaderDefinition(quadCmd: QuadCommand, material: Material): void;
        private _sendLightVariables(program);
        private _sendPointLightVariables(program, pointLights);
        private _sendDirectionLightVariables(program, directionLights);
        private _isZero(position);
        private _setLightDefinition(material);
        private _addDefine(list, direction_lights_count, point_lights_count);
    }
}


declare module wd {
    class LightEndShaderLib extends ShaderLib {
        static create(): LightEndShaderLib;
        type: string;
        sendShaderVariables(program: Program, quadCmd: QuadCommand, material: LightMaterial): void;
    }
}


declare module wd {
    abstract class LightMapShaderLib extends ShaderLib {
        sendShaderVariables(program: Program, quadCmd: QuadCommand, material: LightMaterial): void;
        setShaderDefinition(quadCmd: QuadCommand, material: Material): void;
    }
}


declare module wd {
    class DiffuseMapShaderLib extends LightMapShaderLib {
        static create(): DiffuseMapShaderLib;
        type: string;
        setShaderDefinition(quadCmd: QuadCommand, material: Material): void;
    }
}


declare module wd {
    class SpecularMapShaderLib extends LightMapShaderLib {
        static create(): SpecularMapShaderLib;
        type: string;
        setShaderDefinition(quadCmd: QuadCommand, material: Material): void;
    }
}


declare module wd {
    class NormalMapShaderLib extends LightMapShaderLib {
        static create(): NormalMapShaderLib;
        type: string;
        sendShaderVariables(program: Program, quadCmd: QuadCommand, material: LightMaterial): void;
        setShaderDefinition(quadCmd: QuadCommand, material: Material): void;
    }
}


declare module wd {
    class NoDiffuseMapShaderLib extends ShaderLib {
        static create(): NoDiffuseMapShaderLib;
        type: string;
        sendShaderVariables(program: Program, quadCmd: QuadCommand, material: LightMaterial): void;
        setShaderDefinition(quadCmd: QuadCommand, material: Material): void;
    }
}


declare module wd {
    class NoSpecularMapShaderLib extends ShaderLib {
        static create(): NoSpecularMapShaderLib;
        type: string;
        sendShaderVariables(program: Program, quadCmd: QuadCommand, material: LightMaterial): void;
        setShaderDefinition(quadCmd: QuadCommand, material: Material): void;
    }
}


declare module wd {
    class NoNormalMapShaderLib extends ShaderLib {
        static create(): NoNormalMapShaderLib;
        type: string;
        sendShaderVariables(program: Program, quadCmd: QuadCommand, material: LightMaterial): void;
    }
}


declare module wd {
    abstract class BuildShadowMapShaderLib extends ShaderLib {
        setShaderDefinition(quadCmd: QuadCommand, material: Material): void;
    }
}


declare module wd {
    class BuildTwoDShadowMapShaderLib extends BuildShadowMapShaderLib {
        static create(): BuildTwoDShadowMapShaderLib;
        type: string;
        sendShaderVariables(program: Program, quadCmd: QuadCommand, material: LightMaterial): void;
        setShaderDefinition(quadCmd: QuadCommand, material: Material): void;
    }
}


declare module wd {
    class BuildCubemapShadowMapShaderLib extends BuildShadowMapShaderLib {
        static create(): BuildCubemapShadowMapShaderLib;
        type: string;
        sendShaderVariables(program: Program, quadCmd: QuadCommand, material: LightMaterial): void;
        setShaderDefinition(quadCmd: QuadCommand, material: Material): void;
    }
}


declare module wd {
    class TotalShadowMapShaderLib extends ShaderLib {
        static create(): TotalShadowMapShaderLib;
        type: string;
        sendShaderVariables(program: Program, quadCmd: QuadCommand, material: LightMaterial): void;
    }
}


declare module wd {
    abstract class ShadowMapShaderLib extends ShaderLib {
        setShaderDefinition(quadCmd: QuadCommand, material: Material): void;
        private _setShadowMapSource();
    }
}


declare module wd {
    class TwoDShadowMapShaderLib extends ShadowMapShaderLib {
        static create(): TwoDShadowMapShaderLib;
        type: string;
        sendShaderVariables(program: Program, quadCmd: QuadCommand, material: LightMaterial): void;
    }
}


declare module wd {
    class CubemapShadowMapShaderLib extends ShadowMapShaderLib {
        static create(): CubemapShadowMapShaderLib;
        type: string;
        sendShaderVariables(program: Program, quadCmd: QuadCommand, material: LightMaterial): void;
    }
}


declare module wd {
    class NoShadowMapShaderLib extends ShaderLib {
        static create(): NoShadowMapShaderLib;
        type: string;
        sendShaderVariables(program: Program, quadCmd: QuadCommand, material: LightMaterial): void;
    }
}


declare module wd {
    class ShaderChunk {
        static empty: GLSLChunk;
        static NULL: number;
        static morphNormal_vertex: GLSLChunk;
        static morphVertice_vertex: GLSLChunk;
        static common_define: GLSLChunk;
        static common_fragment: GLSLChunk;
        static common_function: GLSLChunk;
        static common_vertex: GLSLChunk;
        static highp_fragment: GLSLChunk;
        static lowp_fragment: GLSLChunk;
        static mediump_fragment: GLSLChunk;
        static basicEnd_fragment: GLSLChunk;
        static basic_fragment: GLSLChunk;
        static basic_vertex: GLSLChunk;
        static lightCommon_fragment: GLSLChunk;
        static lightCommon_vertex: GLSLChunk;
        static lightEnd_fragment: GLSLChunk;
        static light_common: GLSLChunk;
        static light_fragment: GLSLChunk;
        static light_vertex: GLSLChunk;
        static map_forBasic_fragment: GLSLChunk;
        static map_forBasic_vertex: GLSLChunk;
        static multi_map_forBasic_fragment: GLSLChunk;
        static mirror_forBasic_fragment: GLSLChunk;
        static mirror_forBasic_vertex: GLSLChunk;
        static skybox_fragment: GLSLChunk;
        static skybox_vertex: GLSLChunk;
        static diffuseMap_fragment: GLSLChunk;
        static diffuseMap_vertex: GLSLChunk;
        static noDiffuseMap_fragment: GLSLChunk;
        static noNormalMap_fragment: GLSLChunk;
        static noNormalMap_vertex: GLSLChunk;
        static noSpecularMap_fragment: GLSLChunk;
        static normalMap_fragment: GLSLChunk;
        static normalMap_vertex: GLSLChunk;
        static specularMap_fragment: GLSLChunk;
        static specularMap_vertex: GLSLChunk;
        static buildCubemapShadowMap_fragment: GLSLChunk;
        static buildCubemapShadowMap_vertex: GLSLChunk;
        static buildTwoDShadowMap_fragment: GLSLChunk;
        static buildTwoDShadowMap_vertex: GLSLChunk;
        static commonBuildShadowMap_fragment: GLSLChunk;
        static cubemapShadowMap_fragment: GLSLChunk;
        static noShadowMap_fragment: GLSLChunk;
        static totalShadowMap_fragment: GLSLChunk;
        static twoDShadowMap_fragment: GLSLChunk;
        static twoDShadowMap_vertex: GLSLChunk;
        static basic_envMap_forBasic_fragment: GLSLChunk;
        static basic_envMap_forBasic_vertex: GLSLChunk;
        static envMap_forBasic_fragment: GLSLChunk;
        static envMap_forBasic_vertex: GLSLChunk;
        static fresnel_forBasic_fragment: GLSLChunk;
        static reflection_forBasic_fragment: GLSLChunk;
        static refraction_forBasic_fragment: GLSLChunk;
        static basic_envMap_forLight_fragment: GLSLChunk;
        static basic_envMap_forLight_vertex: GLSLChunk;
        static envMap_forLight_fragment: GLSLChunk;
        static envMap_forLight_vertex: GLSLChunk;
        static fresnel_forLight_fragment: GLSLChunk;
        static reflection_forLight_fragment: GLSLChunk;
        static refraction_forLight_fragment: GLSLChunk;
    }
    type GLSLChunk = {
        top?: string;
        define?: string;
        varDeclare?: string;
        funcDeclare?: string;
        funcDefine?: string;
        body?: string;
    };
}


declare module wd {
    class ShaderSnippet {
        static main_begin: string;
        static main_end: string;
        static setPos_mvp: string;
    }
}


declare module wd {
    abstract class Material {
        program: Program;
        private _blendType;
        blendType: BlendType;
        envMap: CubemapTexture;
        private _blendSrc;
        blendSrc: BlendFunc;
        private _blendDst;
        blendDst: BlendFunc;
        private _blendEquation;
        blendEquation: BlendEquation;
        shader: Shader;
        color: Color;
        redWrite: boolean;
        greenWrite: boolean;
        blueWrite: boolean;
        alphaWrite: boolean;
        polygonOffsetMode: PolygonOffsetMode;
        side: Side;
        blend: boolean;
        blendFuncSeparate: Array<BlendFunc>;
        blendEquationSeparate: Array<BlendEquation>;
        shading: Shading;
        refractionRatio: number;
        reflectivity: number;
        mapCombineMode: TextureCombineMode;
        mapMixRatio: number;
        mapManager: MapManager;
        geometry: Geometry;
        init(): void;
        dispose(): void;
        updateTexture(): void;
        updateShader(quadCmd: QuadCommand): void;
        protected addShaderLib(): void;
        protected addMap(asset: TextureAsset): any;
        protected addMap(asset: TextureAsset, option: MapVariableData): any;
        protected addMap(map: Texture): any;
        protected addMap(map: Texture, option: MapVariableData): any;
        protected addNormalShaderLib(): void;
        protected setBlendByOpacity(opacity: number): void;
        private _addTopShaderLib();
        private _addShaderLibToTop(lib);
        private _hasAnimation();
    }
    type MapVariableData = {
        samplerVariableName?: string;
        samplerData?: any;
    };
}


declare module wd {
    class BasicMaterial extends Material {
        static create(): BasicMaterial;
        map: any;
        mirrorMap: MirrorTexture;
        private _opacity;
        opacity: number;
        protected addShaderLib(): void;
        private _setMapShaderLib();
        private _setEnvMapShaderLib(envMap);
        private _setMirrorMapShaderLib();
    }
}


declare module wd {
    class SkyboxMaterial extends Material {
        static create(): SkyboxMaterial;
        initWhenCreate(): void;
        protected addShaderLib(): void;
    }
}


declare module wd {
    class LightMaterial extends Material {
        static create(): LightMaterial;
        private _diffuseMap;
        diffuseMap: Texture;
        private _specularMap;
        specularMap: Texture;
        private _normalMap;
        normalMap: Texture;
        private _shininess;
        shininess: number;
        private _opacity;
        opacity: number;
        twoDShadowMapDatas: wdCb.Collection<TwoDShadowMapData>;
        cubemapShadowMapDatas: wdCb.Collection<CubemapShadowMapData>;
        buildTwoDShadowMapData: BuildTwoDShadowMapData;
        buildCubemapShadowMapData: BuildCubemapShadowMapData;
        specular: Color;
        private _twoDShadowMapSamplerIndex;
        private _cubemapShadowMapSamplerIndex;
        addTwoDShadowMap(shadowMap: TwoDShadowMapTexture): void;
        addCubemapShadowMap(shadowMap: CubemapShadowMapTexture): void;
        hasShadowMap(map: IShadowMapTexture): any;
        addTwoDShadowMapData(shadowMapData: TwoDShadowMapData): void;
        addCubemapShadowMapData(shadowMapData: CubemapShadowMapData): void;
        clearTwoDShadowMapData(): void;
        clearCubemapShadowMapData(): void;
        protected addShaderLib(): void;
        private _setPhongMapShaderLib();
        private _setEnvMapShaderLib(envMap);
        private _hasTwoDShadowMap();
        private _hasCubemapShadowMap();
    }
    type BuildTwoDShadowMapData = {
        vpMatrixFromLight: Matrix4;
    };
    type TwoDShadowMapData = {
        shadowBias: number;
        shadowDarkness: number;
        shadowSize: Array<number>;
        lightPos: Vector3;
        vpMatrixFromLight: Matrix4;
    };
    type CubemapShadowMapData = {
        shadowBias: number;
        shadowDarkness: number;
        lightPos: Vector3;
        farPlane: number;
    };
    type BuildCubemapShadowMapData = {
        lightPos: Vector3;
        farPlane: number;
    };
}

declare module wd {
    enum Shading {
        FLAT = 0,
        SMOOTH = 1,
    }
}


declare module wd {
    class MapManager {
        static create(material: Material): MapManager;
        constructor(material: Material);
        private _material;
        private _textures;
        private _mirrorMap;
        init(): void;
        addMap(asset: TextureAsset): any;
        addMap(asset: TextureAsset, option: MapVariableData): any;
        addMap(map: Texture): any;
        addMap(map: Texture, option: MapVariableData): any;
        getMap(index: number): any;
        hasMap(func: (...args) => boolean): any;
        hasMap(map: Texture): any;
        getMapCount(): any;
        getMapCount(filterFunc: (map: Texture) => boolean): any;
        getEnvMap(): CubemapTexture;
        setEnvMap(envMap: CubemapTexture): void;
        getMirrorMap(): MirrorTexture;
        setMirrorMap(mirrorMap: MirrorTexture): void;
        isMirrorMap(map: Texture): boolean;
        removeAllChildren(): void;
        dispose(): void;
        update(): void;
        sendData(program: Program): void;
        private _getMapList();
        private _getMap<T>(key);
        private _setMap(key, map);
        private _setMap(key, map, option);
        private _removeMap(key, map);
        private _setMapOption(map, option);
    }
}


declare module wd {
    abstract class Loader {
        private _container;
        load(url: string): wdFrp.Stream;
        load(url: Array<string>): wdFrp.Stream;
        load(url: string, id: string): wdFrp.Stream;
        load(url: Array<string>, id: string): wdFrp.Stream;
        get(id: string): any;
        has(id: string): boolean;
        dispose(): void;
        protected abstract loadAsset(url: string): wdFrp.Stream;
        protected abstract loadAsset(url: Array<string>): wdFrp.Stream;
        private _errorHandle(path, err);
        private _errorHandle(path, err);
    }
}


declare module wd {
    class GLSLLoader extends Loader {
        private static _instance;
        static getInstance(): any;
        protected loadAsset(url: string): wdFrp.Stream;
        protected loadAsset(url: Array<string>): wdFrp.Stream;
    }
}


declare module wd {
    class JsLoader extends Loader {
        private static _instance;
        static getInstance(): any;
        protected loadAsset(url: string): wdFrp.Stream;
        protected loadAsset(url: Array<string>): wdFrp.Stream;
        private _createScript();
        private _appendScript(script);
    }
}


declare module wd {
    class VideoLoader extends Loader {
        private static _instance;
        static getInstance(): any;
        protected loadAsset(url: string): wdFrp.Stream;
        protected loadAsset(url: Array<string>): wdFrp.Stream;
    }
}


declare module wd {
    class TextureLoader extends Loader {
        private static _instance;
        static getInstance(): any;
        protected loadAsset(url: string): wdFrp.Stream;
        protected loadAsset(url: Array<string>): wdFrp.Stream;
    }
}


declare module wd {
    class ImageLoader {
        static load(url: string): wdFrp.FromPromiseStream;
    }
}


declare module wd {
    class AjaxLoader {
        static load(url: string, dataType: string): wdFrp.FromPromiseStream;
    }
}


declare module wd {
    class ModelLoaderUtils {
        static getPath(filePath: string, mapUrl: string): string;
    }
}


declare module wd {
    interface ITextureAsset {
        width: number;
        height: number;
        generateMipmaps: boolean;
        sourceRegionMethod: TextureSourceRegionMethod;
        format: TextureFormat;
        source: any;
        repeatRegion: RectRegion;
        sourceRegion: RectRegion;
        sourceRegionMapping: TextureSourceRegionMapping;
        flipY: boolean;
        premultiplyAlpha: boolean;
        unpackAlignment: number;
        wrapS: TextureWrapMode;
        wrapT: TextureWrapMode;
        magFilter: TextureFilterMode;
        minFilter: TextureFilterMode;
        type: TextureType;
        mipmaps: wdCb.Collection<any>;
        anisotropy: number;
        needUpdate: boolean;
    }
    interface ICubemapTextureAsset {
        generateMipmaps: boolean;
        width: number;
        height: number;
        minFilter: TextureFilterMode;
        magFilter: TextureFilterMode;
        wrapS: TextureWrapMode;
        wrapT: TextureWrapMode;
        anisotropy: number;
        premultiplyAlpha: boolean;
        unpackAlignment: number;
        needUpdate: boolean;
        mode: EnvMapMode;
    }
    interface ICubemapFaceCompressedTextureAsset {
        type: TextureType;
        format: TextureFormat;
        width: number;
        height: number;
        mipmaps: wdCb.Collection<CompressedTextureMipmap>;
        minFilter: TextureFilterMode;
    }
    interface ICubemapFaceTwoDTextureAsset {
        sourceRegion: RectRegion;
        sourceRegionMethod: TextureSourceRegionMethod;
        type: TextureType;
        format: TextureFormat;
        width: number;
        height: number;
        source: any;
    }
}


declare module wd {
    class CompressedTextureLoader {
        static load(url: string): wdFrp.MapStream;
        private static _getCompressedFormat(format);
    }
}


declare module wd {
    class DDSParser {
        static parse(buffer: any, loadMipmaps?: boolean): DDSData;
        private static _fourCCToInt32(value);
        private static _int32ToFourCC(value);
        private static _loadARGBMip(buffer, dataOffset, width, height);
    }
    class DDSData {
        mipmaps: wdCb.Collection<CompressedTextureMipmap>;
        width: number;
        height: number;
        format: TextureFormat;
        mipmapCount: number;
        isCubemap: boolean;
    }
}


declare module wd {
    abstract class TextureAsset implements ITextureAsset {
        static defaultTexture: any;
        private _width;
        width: number;
        private _height;
        height: number;
        generateMipmaps: boolean;
        sourceRegionMethod: TextureSourceRegionMethod;
        format: TextureFormat;
        source: any;
        repeatRegion: RectRegion;
        sourceRegion: RectRegion;
        sourceRegionMapping: TextureSourceRegionMapping;
        flipY: boolean;
        premultiplyAlpha: boolean;
        unpackAlignment: number;
        wrapS: TextureWrapMode;
        wrapT: TextureWrapMode;
        magFilter: TextureFilterMode;
        minFilter: TextureFilterMode;
        type: TextureType;
        mipmaps: wdCb.Collection<any>;
        anisotropy: number;
        needUpdate: boolean;
        abstract toTexture(): Texture;
        abstract toCubemapFaceTexture(): CubemapFaceTexture;
        abstract copyToCubemapFaceTexture(cubemapFaceTexture: any): any;
        copyToCubemapTexture(cubemapFaceTexture: ICubemapTextureAsset): void;
        copyTo(texture: BasicTexture): BasicTexture;
    }
}


declare module wd {
    class ImageTextureAsset extends TextureAsset {
        static create(source: HTMLImageElement | HTMLCanvasElement): ImageTextureAsset;
        constructor(source: HTMLImageElement | HTMLCanvasElement);
        mipmaps: wdCb.Collection<HTMLCanvasElement | HTMLImageElement | HTMLVideoElement>;
        toTexture(): Texture;
        toCubemapFaceTexture(): CubemapFaceImageTexture;
        copyToCubemapFaceTexture(cubemapFaceTexture: ICubemapFaceTwoDTextureAsset): void;
    }
}


declare module wd {
    class VideoTextureAsset extends TextureAsset {
        static create(video: Video): VideoTextureAsset;
        constructor(video: Video);
        video: Video;
        initWhenCreate(): void;
        toTexture(): Texture;
        toCubemapFaceTexture(): CubemapFaceImageTexture;
        copyToCubemapFaceTexture(cubemapFaceTexture: ICubemapFaceTwoDTextureAsset): void;
    }
}


declare module wd {
    class CompressedTextureAsset extends TextureAsset {
        static create(): CompressedTextureAsset;
        mipmaps: wdCb.Collection<CompressedTextureMipmap>;
        initWhenCreate(): void;
        toTexture(): Texture;
        toCubemapFaceTexture(): CubemapFaceCompressedTexture;
        copyToCubemapFaceTexture(cubemapFaceTexture: ICubemapFaceCompressedTextureAsset): void;
    }
}

declare module wd {
    enum TextureFilterMode {
        NEAREST,
        NEAREST_MIPMAP_MEAREST,
        NEAREST_MIPMAP_LINEAR,
        LINEAR,
        LINEAR_MIPMAP_NEAREST,
        LINEAR_MIPMAP_LINEAR,
    }
}

declare module wd {
    enum TextureWrapMode {
        REPEAT,
        MIRRORED_REPEAT,
        CLAMP_TO_EDGE,
    }
}

declare module wd {
    enum TextureFormat {
        RGB,
        RGBA,
        ALPHA,
        LUMINANCE,
        LUMINANCE_ALPHA,
        RGB_S3TC_DXT1,
        RGBA_S3TC_DXT1,
        RGBA_S3TC_DXT3,
        RGBA_S3TC_DXT5,
    }
}

declare module wd {
    enum TextureType {
        UNSIGNED_BYTE,
        UNSIGNED_SHORT_5_6_5,
        UNSIGNED_SHORT_4_4_4_4,
        UNSIGNED_SHORT_5_5_5_1,
    }
}

declare module wd {
    enum EnvMapMode {
        BASIC = 0,
        REFLECTION = 1,
        REFRACTION = 2,
        FRESNEL = 3,
    }
}

declare module wd {
    enum TextureCombineMode {
        MIX = 0,
        MULTIPLY = 1,
        ADD = 2,
    }
}

declare module wd {
    enum TextureSourceRegionMapping {
        CANVAS = 0,
        UV = 1,
    }
}

declare module wd {
    enum TextureSourceRegionMethod {
        CHANGE_TEXCOORDS_IN_GLSL = 0,
        DRAW_IN_CANVAS = 1,
    }
}

declare module wd {
    enum TextureTarget {
        TEXTURE_2D,
        TEXTURE_CUBE_MAP,
    }
}


declare module wd {
    class LoaderManager {
        private static _instance;
        static getInstance(): any;
        assetCount: number;
        currentLoadedCount: number;
        private _assetTable;
        load(url: string): wdFrp.Stream;
        load(assetArr: Array<{
            url: string;
            id: string;
        }>): wdFrp.Stream;
        load(assetArr: Array<{
            url: Array<string>;
            id: string;
        }>): wdFrp.Stream;
        reset(): void;
        dispose(): void;
        get(id: string): any;
        private _createLoadMultiAssetStream(url, id);
        private _createLoadMultiAssetStream(url, id);
        private _createLoadSingleAssetStream(url, id);
        private _getLoader(url);
        private _getLoader(url);
        private _addToAssetTable(loadStream, id, loader);
    }
}


declare module wd {
    class LoaderFactory {
        static create(extname: string): any;
        static createAllLoader(): wdCb.Collection<Loader>;
    }
}


declare module wd {
    type DYFileJsonData = {
        metadata: DYFileMetadata;
        scene: {
            ambientColor?: Array<number>;
        };
        materials: {
            [name: string]: {
                type: string;
                diffuseColor?: Array<number>;
                specularColor?: Array<number>;
                diffuseMapUrl?: string;
                specularMapUrl?: string;
                normalMapUrl?: string;
                shininess?: number;
                opacity?: number;
            };
        };
        objects: Array<DYFileJsonObjectData>;
    };
    type DYFileJsonObjectData = {
        material: string;
        name: string;
        vertices?: Array<number>;
        morphTargets: Array<DYFileJsonFrameData>;
        normals?: Array<number>;
        colors?: Array<number>;
        uvs?: Array<number>;
        verticeIndices?: Array<number>;
        normalIndices?: Array<number>;
        uvIndices?: Array<number>;
        children: Array<DYFileParseObjectData>;
    };
    type DYFileJsonFrameData = {
        name: string;
        vertices: Array<number>;
        normals?: Array<number>;
    };
    type DYFileParseData = {
        metadata: DYFileMetadata;
        scene: {
            ambientColor?: Color;
        };
        materials: wdCb.Hash<DYFileParseMaterialData>;
        objects: wdCb.Collection<DYFileParseObjectData>;
    };
    type DYFileParseMaterialData = {
        type: string;
        diffuseColor?: Color;
        specularColor?: Color;
        diffuseMapUrl?: string;
        specularMapUrl?: string;
        normalMapUrl?: string;
        shininess?: number;
        opacity?: number;
    };
    type DYFileParseObjectData = {
        material: string;
        name: string;
        isContainer: boolean;
        vertices: Array<number>;
        morphTargets: wdCb.Hash<wdCb.Collection<Array<number>>>;
        morphNormals: wdCb.Hash<wdCb.Collection<Array<number>>>;
        colors?: Array<number>;
        uvs?: Array<number>;
        faces: Array<Face3>;
        parent: DYFileParseObjectData;
        children: wdCb.Collection<DYFileParseObjectData>;
    };
    type DYFileParseMorphTargetsData = wdCb.Collection<Array<number>>;
    type DYFileResult = {
        metadata: wdCb.Hash<DYFileMetadata>;
        scene: wdCb.Hash<{
            ambientColor: Color;
        }>;
        models: wdCb.Collection<GameObject>;
    };
    type DYFileMetadata = {
        formatVersion: number;
        description?: string;
        sourceFile: string;
        generatedBy: string;
    };
}


declare module wd {
    class WDLoader extends Loader {
        private static _instance;
        static getInstance(): any;
        private _wdParser;
        private _wdBuilder;
        private _parseData;
        protected loadAsset(url: string): wdFrp.Stream;
        protected loadAsset(url: Array<string>): wdFrp.Stream;
        private _createLoadMapStream(filePath);
    }
}


declare module wd {
    class WDParser {
        static create(): WDParser;
        private _data;
        private _objectParser;
        parse(json: DYFileJsonData): DYFileParseData;
        private _parseMetadata(json);
        private _parseObject(json);
        private _parseScene(json);
        private _parseMaterial(json);
        private _createColor(colorArr);
    }
}


declare module wd {
    class WDObjectParser {
        static create(): WDObjectParser;
        parse(data: DYFileParseData, json: DYFileJsonData): void;
        private _isObjectContainer(object);
        private _parseFromIndices(object);
        private _duplicateVertexWithDifferentUvs(object);
        private _isSameVertexWithDifferentUvsByCompareToFirstOne(arr, uvIndex, verticeIndex);
        private _addVertexData(object, container, verticeIndex, index);
        private _addDuplicateNormalOfAddedVertex(normals, normalIndices, index, oldVerticeIndex);
        private _isUvIndiceEqualTheOneOfAddedVertex(container, targetVerticeIndex, targetUvIndex);
        private _getVerticeIndexOfAddedVertexByFindContainer(container, targetVerticeIndex, targetUvIndex);
        private _getVerticeIndexOfAddedVertex(vertices);
        private _addThreeComponent(data, index);
        private _addThreeComponent(targetData, sourceData, index);
        private _parseObjectFromIndices(object);
        private _getAnimName(frameName);
        private _removeRebundantIndiceData(object);
        private _removeObjectContainerData(object);
        private _findData(object, dataName);
        private _setUV(targetUVs, sourceUVs, uvIndices, indexArr, verticeIndiceArr);
        private _setTwoComponentData(targetData, sourceData, index, indice);
        private _setThreeComponentData(targetData, sourceData, index, indice);
        private _getThreeComponentData(sourceData, index);
        private _setNormal(targetNormals, sourceNormals, normalIndices, indexArr, verticeIndiceArr);
        private _addNormalData(targetNormals, sourceNormals, normalIndiceArr);
        private _setMorphTargets(object, verticeIndices, normalIndices);
    }
}


declare module wd {
    class WDBuilder {
        static create(): WDBuilder;
        private _result;
        build(parseData: DYFileParseData): wdCb.Hash<DYFileResult>;
        private _buildMetadata(parseData);
        private _buildScene(parseData);
        private _buildModels(parseData);
        private _isModelContainer(object);
        private _buildMaterial(materialName, materials);
    }
}


declare module wd {
    class EventListenerMap {
        static eventSeparator: string;
        static create(): EventListenerMap;
        private _listenerMap;
        appendChild(target: GameObject, eventName: EventName, data: EventRegisterData): void;
        getChild(eventName: EventName): wdCb.Collection<EventRegisterData>;
        getChild(target: GameObject): wdCb.Collection<EventRegisterData>;
        getChild(target: GameObject, eventName: EventName): wdCb.Collection<EventRegisterData>;
        hasChild(func: (...args) => boolean): boolean;
        hasChild(target: GameObject, eventName: EventName): boolean;
        filter(func: Function): wdCb.Hash<{}>;
        forEach(func: Function): wdCb.Hash<wdCb.Collection<{
            target: GameObject;
            originHandler: Function;
            handler: Function;
            domHandler: Function;
            priority: number;
        }>>;
        removeChild(eventName: EventName): wdCb.Collection<wdCb.Collection<EventOffData>>;
        removeChild(eventName: EventName, handler: Function): wdCb.Collection<wdCb.Collection<EventOffData>>;
        removeChild(uid: number, eventName: EventName): wdCb.Collection<wdCb.Collection<EventOffData>>;
        removeChild(target: GameObject): wdCb.Collection<wdCb.Collection<EventOffData>>;
        removeChild(target: GameObject, eventName: EventName): wdCb.Collection<wdCb.Collection<EventOffData>>;
        removeChild(target: GameObject, eventName: EventName, handler: Function): wdCb.Collection<wdCb.Collection<EventOffData>>;
        getEventOffDataList(target: GameObject): any;
        getEventOffDataList(target: GameObject, eventName: EventName): any;
        getEventNameFromKey(key: string): EventName;
        getUidFromKey(key: string): number;
        isTarget(key: string, target: GameObject, list: wdCb.Collection<EventRegisterData>): boolean;
        private _buildKey(uid, eventName);
        private _buildKey(target, eventName);
        private _buildKeyWithUid(uid, eventName);
    }
    type EventOffData = {
        eventName: EventName;
        domHandler: Function;
    };
}

declare module wd {
    enum EventType {
        MOUSE = 0,
        KEYBOARD = 1,
        CUSTOM = 2,
    }
}

declare module wd {
    enum EventName {
        CLICK,
        MOUSEOVER,
        MOUSEUP,
        MOUSEOUT,
        MOUSEMOVE,
        MOUSEDOWN,
        MOUSEWHEEL,
        KEYDOWN,
        KEYUP,
        KEYPRESS,
    }
}

declare module wd {
    enum EventPhase {
        BROADCAST = 0,
        EMIT = 1,
    }
}


declare module wd {
    class EventTable {
        static getEventType(eventName: EventName): EventType;
    }
}


declare module wd {
    abstract class Event {
        constructor(eventName: EventName);
        protected p_type: EventType;
        type: EventType;
        name: EventName;
        target: GameObject;
        currentTarget: GameObject;
        isStopPropagation: boolean;
        phase: EventPhase;
        abstract copy(): any;
        stopPropagation(): void;
        protected copyMember(destination: Event, source: Event, memberArr: [any]): Event;
    }
}


declare module wd {
    abstract class DomEvent extends Event {
        constructor(event: any, eventName: EventName);
        private _event;
        event: any;
        preventDefault(): void;
    }
}


declare module wd {
    class MouseEvent extends DomEvent {
        static create(event: any, eventName: EventName): MouseEvent;
        protected p_type: EventType;
        private _location;
        location: Point;
        private _locationInView;
        locationInView: Point;
        private _button;
        button: number;
        wheel: number;
        movementDelta: {
            x: any;
            y: any;
        };
        copy(): any;
        private _isPointerLocked();
    }
}


declare module wd {
    class KeyboardEvent extends DomEvent {
        static create(event: any, eventName: EventName): KeyboardEvent;
        protected p_type: EventType;
        ctrlKey: any;
        altKey: any;
        shiftKey: any;
        metaKey: any;
        keyCode: any;
        key: any;
        keyState: any;
        copy(): any;
    }
}


declare module wd {
    class CustomEvent extends Event {
        static create(eventName: string): CustomEvent;
        protected p_type: EventType;
        userData: any;
        copyPublicAttri(destination: any, source: any): any;
        copy(): any;
    }
}

declare module wd {
    enum MouseButton {
        LEFT = 0,
        RIGHT = 1,
        CENTER = 2,
    }
}


declare module wd {
    class EventListener {
        static create(option: any): EventListener;
        eventType: EventType;
        priority: number;
        handlerDataList: wdCb.Collection<EventHandlerData>;
        constructor(option: any);
        initWhenCreate(option: {
            any;
        }): void;
        private _setHandlerDataList(option);
        private _parseEventName(handlerName);
    }
    type EventHandlerData = {
        eventName: EventName;
        handler: Function;
    };
}


declare module wd {
    abstract class EventHandler {
        abstract on(...args: any[]): any;
        abstract off(...args: any[]): any;
        abstract trigger(...args: any[]): any;
    }
}


declare module wd {
    abstract class DomEventHandler extends EventHandler {
        off(eventName: EventName): void;
        off(eventName: EventName, handler: Function): void;
        off(uid: number, eventName: EventName): void;
        off(target: GameObject, eventName: EventName): void;
        off(target: GameObject, eventName: EventName, handler: Function): void;
        protected abstract getDom(): any;
        protected abstract triggerDomEvent(event: Event, eventName: EventName, target: GameObject): any;
        protected abstract addEngineHandler(target: GameObject, eventName: EventName, handler: Function): any;
        protected clearHandler(): void;
        protected buildDomHandler(target: GameObject, eventName: EventName): (event: any) => any;
        protected handler(target: GameObject, eventName: EventName, handler: Function, priority: number): void;
        private _bind(dom, eventName, target);
        private _unBind(dom, eventName, handler);
    }
}


declare module wd {
    class MouseEventHandler extends DomEventHandler {
        private static _instance;
        static getInstance(): any;
        lastX: number;
        lastY: number;
        on(target: GameObject, eventName: EventName, handler: (event: MouseEvent) => void, priority: number): void;
        trigger(target: GameObject, event: Event, notSetTarget: boolean): boolean;
        protected getDom(): any;
        protected triggerDomEvent(event: Event, eventName: EventName, target: GameObject): void;
        protected addEngineHandler(target: GameObject, eventName: EventName, handler: (event: MouseEvent) => void): any;
        protected clearHandler(): void;
        private _getTopTarget(event);
        private _handleMove(handler);
        private _createEventObject(event, eventName, currentTarget);
        private _saveLocation(event);
    }
}


declare module wd {
    class KeyboardEventHandler extends DomEventHandler {
        private static _instance;
        static getInstance(): any;
        keyState: any;
        on(eventName: EventName, handler: (event: KeyboardEvent) => void, priority: number): void;
        trigger(event: Event): boolean;
        protected getDom(): any;
        protected triggerDomEvent(event: Event, eventName: EventName, target: GameObject): void;
        protected addEngineHandler(target: GameObject, eventName: EventName, handler: (event: KeyboardEvent) => void): any;
        protected clearHandler(): void;
        private _handleKeyDown(handler);
        private _handleKeyUp(handler);
        private _setKeyStateAllFalse();
        private _createEventObject(event, eventName);
    }
}


declare module wd {
    class CustomEventHandler extends EventHandler {
        private static _instance;
        static getInstance(): any;
        on(eventName: string, handler: Function, priority: number): void;
        on(target: GameObject, eventName: string, handler: Function, priority: number): void;
        off(eventName: string): void;
        off(uid: number, eventName: string): void;
        off(eventName: string, handler: Function): void;
        off(target: GameObject, eventName: string, handler: Function): void;
        trigger(event: Event): boolean;
        trigger(event: Event, userData: any): boolean;
        trigger(target: GameObject, event: Event, notSetTarget: boolean): boolean;
        trigger(target: GameObject, event: Event, userData: any, notSetTarget: boolean): boolean;
        private _triggerEventHandler(event, userData);
        private _triggerTargetAndEventHandler(target, event, userData, notSetTarget);
        private _setUserData(event, userData);
    }
}


declare module wd {
    class EventDispatcher {
        static create(): EventDispatcher;
        trigger(event: Event): boolean;
        trigger(event: Event, userData: any): void;
        trigger(target: GameObject, event: Event): boolean;
        trigger(target: GameObject, event: Event, notSetTarget: boolean): boolean;
        trigger(target: GameObject, event: Event, userData: any): boolean;
        trigger(target: GameObject, event: Event, userData: any, notSetTarget: boolean): boolean;
        emit(target: GameObject, eventObject: Event, userData?: any): void;
        broadcast(target: GameObject, eventObject: Event, userData?: any): void;
        private _getParent(target);
        private _triggerWithUserData(target, event, userData, notSetTarget);
    }
}


declare module wd {
    class EventRegister {
        private static _instance;
        static getInstance(): any;
        private _listenerMap;
        register(target: GameObject, eventName: EventName, handler: Function, originHandler: Function, domHandler: Function, priority: number): void;
        remove(eventName: EventName): void;
        remove(eventName: EventName, handler: Function): void;
        remove(uid: number, eventName: EventName): void;
        remove(target: GameObject): void;
        remove(target: GameObject, eventName: EventName): void;
        remove(target: GameObject, eventName: EventName, handler: Function): void;
        getEventRegisterDataList(eventName: EventName): any;
        getEventRegisterDataList(currentTarget: GameObject, eventName: EventName): any;
        setBubbleParent(target: GameObject, parent: GameObject): void;
        isBinded(target: GameObject, eventName: EventName): boolean;
        filter(func: Function): wdCb.Hash<{}>;
        forEach(func: Function): wdCb.Hash<wdCb.Collection<{
            target: GameObject;
            originHandler: Function;
            handler: Function;
            domHandler: Function;
            priority: number;
        }>>;
        getChild(target: GameObject, eventName?: EventName): any;
        getEventNameFromKey(key: string): EventName;
        getUidFromKey(key: string): number;
        getDomHandler(target: GameObject, eventName: EventName): Function;
        isTarget(key: string, target: GameObject, list: wdCb.Collection<EventRegisterData>): boolean;
        private _isAllEventHandlerRemoved(target);
        private _handleAfterAllEventHandlerRemoved(target);
    }
    type EventRegisterData = {
        target: GameObject;
        originHandler: Function;
        handler: Function;
        domHandler: Function;
        priority: number;
    };
}


declare module wd {
    class EventBinder {
        static create(): EventBinder;
        on(eventName: EventName | string, handler: Function, priority: number): void;
        on(listener: {} | EventListener): void;
        on(target: GameObject, listener: {} | EventListener): void;
        on(target: GameObject, eventName: EventName | string, handler: Function, priority: number): void;
        off(): void;
        off(eventName: EventName): void;
        off(eventName: EventName, handler: Function): void;
        off(target: GameObject): void;
        off(target: GameObject, eventName: EventName): void;
        off(target: GameObject, eventName: EventName, handler: Function): void;
        private _checkEventSeparator(eventName);
    }
}


declare module wd {
    class FactoryEventHandler {
        static createEventHandler(eventType: EventType): any;
    }
}


declare module wd {
    class EventManager {
        private static _eventBinder;
        private static _eventDispatcher;
        static on(eventName: EventName | string, handler: Function): void;
        static on(eventName: EventName | string, handler: Function, priority: number): void;
        static on(listener: {} | EventListener): void;
        static on(target: GameObject, listener: {} | EventListener): void;
        static on(target: GameObject, eventName: EventName | string, handler: Function): void;
        static on(target: GameObject, eventName: EventName | string, handler: Function, priority: number): void;
        static off(): void;
        static off(eventName: EventName | string): void;
        static off(eventName: EventName | string, handler: Function): void;
        static off(target: GameObject): void;
        static off(target: GameObject, eventName: EventName | string): void;
        static off(target: GameObject, eventName: EventName | string, handler: Function): void;
        static trigger(event: Event): void;
        static trigger(event: Event, userData: any): void;
        static trigger(target: GameObject, event: Event): void;
        static trigger(target: GameObject, event: Event, userData: any): void;
        static broadcast(target: GameObject, event: Event): any;
        static broadcast(target: GameObject, event: Event, userData: any): any;
        static emit(target: GameObject, event: Event): any;
        static emit(target: GameObject, event: Event, userData: any): any;
        static fromEvent(eventName: EventName): wdFrp.FromEventPatternStream;
        static fromEvent(eventName: EventName, priority: number): wdFrp.FromEventPatternStream;
        static fromEvent(target: GameObject, eventName: EventName): wdFrp.FromEventPatternStream;
        static fromEvent(target: GameObject, eventName: EventName, priority: number): wdFrp.FromEventPatternStream;
        static setBubbleParent(target: GameObject, parent: any): void;
    }
}

declare module wd {
    enum EngineEvent {
        STARTLOOP,
        ENDLOOP,
        BEFORE_INIT,
        AFTER_INIT,
    }
}


declare module wd {
    class DeviceManager {
        private static _instance;
        static getInstance(): any;
        view: IView;
        gl: WebGLRenderingContext;
        private _scissorTest;
        scissorTest: boolean;
        setScissor(x: number, y: number, width: number, height: number): void;
        setViewport(x: number, y: number, width: number, height: number): void;
        private _depthTest;
        depthTest: boolean;
        private _depthFunc;
        depthFunc: DepthFunction;
        private _side;
        side: Side;
        polygonOffset: Point;
        private _polygonOffsetMode;
        polygonOffsetMode: PolygonOffsetMode;
        private _depthWrite;
        depthWrite: boolean;
        private _blend;
        blend: boolean;
        setBlendFunc(blendSrc: BlendFunc, blendDst: BlendFunc): void;
        setBlendEquation(blendEquation: BlendEquation): void;
        setBlendFuncSeparate(blendFuncSeparate: Array<BlendFunc>): void;
        setBlendEquationSeparate(blendEquationSeparate: Array<BlendEquation>): void;
        setColorWrite(writeRed: any, writeGreen: any, writeBlue: any, writeAlpha: any): void;
        private _writeRed;
        private _writeGreen;
        private _writeBlue;
        private _writeAlpha;
        private _blendSrc;
        private _blendDst;
        private _blendEquation;
        private _blendFuncSeparate;
        private _blendEquationSeparate;
        clear(options: any): void;
        createGL(canvasId: string): void;
        setScreen(): void;
    }
    enum DepthFunction {
        NEVER,
        ALWAYS,
        LESS,
        LEQUAL,
        EQUAL,
        GEQUAL,
        GREATER,
        NOTEQUAL,
    }
    enum Side {
        NONE = 0,
        BOTH = 1,
        BACK = 2,
        FRONT = 3,
    }
    enum PolygonOffsetMode {
        NONE = 0,
        IN = 1,
        OUT = 2,
        CUSTOM = 3,
    }
    enum BlendFunc {
        ZERO,
        ONE,
        SRC_COLOR,
        ONE_MINUS_SRC_COLOR,
        DST_COLOR,
        ONE_MINUS_DST_COLOR,
        SRC_ALPHA,
        SRC_ALPHA_SATURATE,
        ONE_MINUS_SRC_ALPHA,
        DST_ALPHA,
        ONE_MINUS_DST_ALPH,
    }
    enum BlendEquation {
        ADD,
        SUBTRACT,
        REVERSE_SUBTRAC,
    }
    enum BlendType {
        NONE = 0,
        NORMAL = 1,
        ADDITIVE = 2,
        ADDITIVEALPHA = 3,
        MULTIPLICATIVE = 4,
        PREMULTIPLIED = 5,
    }
}


declare module wd {
    class GPUDetector {
        private static _instance;
        static getInstance(): any;
        gl: any;
        maxTextureUnit: number;
        maxTextureSize: number;
        maxCubemapTextureSize: number;
        maxAnisotropy: number;
        extensionCompressedTextureS3TC: any;
        extensionTextureFilterAnisotropic: any;
        precision: number;
        private _isDetected;
        detect(): void;
        private _detectExtension();
        private _detectCapabilty();
        private _getExtension(name);
        private _getMaxAnisotropy();
        private _detectPrecision();
    }
    enum GPUPrecision {
        HIGHP = 0,
        MEDIUMP = 1,
        LOWP = 2,
    }
}

declare module wd {
    enum ScreenSize {
        FULL = 0,
    }
}

declare module wd {
    class Point {
        x: number;
        y: number;
        constructor(x?: number, y?: number);
        static create(x?: number, y?: number): Point;
    }
}


declare module wd {
    class Face3 {
        static create(aIndex: number, bIndex: number, cIndex: number, faceNormal?: Vector3, vertexNormals?: wdCb.Collection<Vector3>): Face3;
        constructor(aIndex: number, bIndex: number, cIndex: number, faceNormal: Vector3, vertexNormals: wdCb.Collection<Vector3>);
        aIndex: number;
        bIndex: number;
        cIndex: number;
        faceNormal: Vector3;
        vertexNormals: wdCb.Collection<Vector3>;
        copy(): Face3;
    }
}


declare module wd {
    class RectRegion extends Vector4 {
        width: number;
        height: number;
        copy(): RectRegion;
        isNotEmpty(): boolean;
    }
}


declare module wd {
    class ViewWebGL implements IView {
        static create(view: any): ViewWebGL;
        constructor(dom: any);
        offset: {
            x: any;
            y: any;
        };
        private _dom;
        dom: any;
        width: number;
        height: number;
        x: number;
        y: number;
        getContext(): WebGLRenderingContext;
    }
    interface IView {
        offset: {
            x: number;
            y: number;
        };
        x: number;
        y: number;
        width: number;
        height: number;
        dom: any;
        getContext(): WebGLRenderingContext;
    }
}

declare module wd {
    class Color {
        static create(colorVal: string): Color;
        r: number;
        g: number;
        b: number;
        a: number;
        constructor();
        initWhenCreate(colorVal: string): void;
        toVector3(): Vector3;
        toVector4(): any;
        private _setColor(colorVal);
        private _getColorValue(color, index, num?);
        private _setHex(hex);
    }
}


declare module wd {
    abstract class Texture {
        geometry: Geometry;
        material: Material;
        width: number;
        height: number;
        variableData: MapVariableData;
        wrapS: TextureWrapMode;
        wrapT: TextureWrapMode;
        magFilter: TextureFilterMode;
        minFilter: TextureFilterMode;
        glTexture: WebGLTexture;
        protected target: TextureTarget;
        abstract init(): any;
        abstract getSamplerName(unit: number): string;
        bindToUnit(unit: number): Texture;
        sendData(program: Program, pos: WebGLUniformLocation, unit: number): void;
        dispose(): void;
        filterFallback(filter: TextureFilterMode): TextureFilterMode;
        protected sendOtherData(program: Program, unit: number): void;
        protected getSamplerNameByVariableData(unit: number, type?: VariableType): string;
        protected getSamplerType(): VariableType;
        protected isSourcePowerOfTwo(): boolean;
        protected setTextureParameters(textureType: any, isSourcePowerOfTwo: any): void;
    }
}


declare module wd {
    class TextureUtils {
        static isPowerOfTwo(width: number, height: number): boolean;
    }
}


declare module wd {
    class BasicTextureUtils extends TextureUtils {
        static isDrawPartOfTexture(sourceRegion: RectRegion, sourceRegionMethod: TextureSourceRegionMethod): boolean;
        static drawPartOfTextureByCanvas(source: HTMLImageElement, canvasWidth: number, canvasHeight: number, sx: number, sy: number, sWidth: number, sHeight: number, dx: number, wd: number, dWidth: number, dHeight: number): any;
        static isSourcePowerOfTwo(sourceRegion: any, sourceRegionMethod: any, width: any, height: any): boolean;
        static needClampMaxSize(maxSize: number, width: number, height: number): boolean;
        static clampToMaxSize(source: any, maxSize: number): any;
    }
}


declare module wd {
    abstract class RenderTargetTexture extends Texture {
        abstract createEmptyTexture(): any;
        init(): RenderTargetTexture;
        getPosition(): Vector3;
        protected setEmptyTexture(texture: any): void;
    }
}


declare module wd {
    abstract class TwoDRenderTargetTexture extends RenderTargetTexture {
        private _renderList;
        renderList: any;
        width: number;
        height: number;
        createEmptyTexture(): void;
    }
}


declare module wd {
    class ShadowMapTextureUtils {
        static setTextureParameters(textureType: any): void;
    }
}

declare module wd {
    interface IShadowMapTexture {
    }
}


declare module wd {
    class MirrorTexture extends TwoDRenderTargetTexture {
        static create(): MirrorTexture;
        private _plane;
        init(): MirrorTexture;
        getSamplerName(unit: number): string;
        getPlane(): Plane;
    }
}


declare module wd {
    class TwoDShadowMapTexture extends TwoDRenderTargetTexture implements IShadowMapTexture {
        static create(): TwoDShadowMapTexture;
        getSamplerName(unit: number): string;
        protected setTextureParameters(textureType: any, isSourcePowerOfTwo: any): void;
    }
}


declare module wd {
    abstract class CubemapRenderTargetTexture extends RenderTargetTexture {
        protected target: TextureTarget;
        createEmptyTexture(): void;
    }
}


declare module wd {
    class CubemapShadowMapTexture extends CubemapRenderTargetTexture implements IShadowMapTexture {
        static create(): CubemapShadowMapTexture;
        getSamplerName(unit: number): string;
    }
}


declare module wd {
    class DynamicCubemapTexture extends CubemapRenderTargetTexture {
        static create(): DynamicCubemapTexture;
        private _renderList;
        renderList: any;
        size: number;
        near: number;
        far: number;
        mode: EnvMapMode;
        init(): DynamicCubemapTexture;
        getSamplerName(unit: number): string;
    }
}


declare module wd {
    abstract class BasicTexture extends Texture implements ITextureAsset {
        protected p_sourceRegionMethod: TextureSourceRegionMethod;
        sourceRegionMethod: TextureSourceRegionMethod;
        generateMipmaps: boolean;
        format: TextureFormat;
        source: any;
        repeatRegion: RectRegion;
        sourceRegion: RectRegion;
        sourceRegionMapping: TextureSourceRegionMapping;
        flipY: boolean;
        premultiplyAlpha: boolean;
        unpackAlignment: number;
        type: TextureType;
        mipmaps: wdCb.Collection<any>;
        anisotropy: number;
        needUpdate: boolean;
        initWhenCreate(...args: any[]): void;
        init(): void;
        update(index: number): BasicTexture;
        getSamplerName(unit: number): string;
        protected sendOtherData(program: Program, unit: number): BasicTexture;
        protected abstract allocateSourceToTexture(isSourcePowerOfTwo: boolean): any;
        protected needClampMaxSize(): boolean;
        protected clampToMaxSize(): void;
        protected setTextureParameters(textureType: any, isSourcePowerOfTwo: any): void;
        protected isSourcePowerOfTwo(): boolean;
        private _setAnisotropy(textureType);
        private _convertSourceRegionCanvasMapToUV(sourceRegion);
        private _convertSourceRegionToUV();
    }
}


declare module wd {
    abstract class TwoDTexture extends BasicTexture {
        initWhenCreate(asset: ImageTextureAsset | CompressedTextureAsset): void;
    }
}


declare module wd {
    abstract class CommonTexture extends TwoDTexture {
        protected allocateSourceToTexture(isSourcePowerOfTwo: boolean): void;
    }
}


declare module wd {
    class ImageTexture extends CommonTexture {
        static create(asset: ImageTextureAsset): any;
        static create(canvas: HTMLCanvasElement): any;
        initWhenCreate(asset: ImageTextureAsset): any;
        initWhenCreate(canvas: HTMLCanvasElement): any;
    }
}


declare module wd {
    class VideoTexture extends CommonTexture {
        static create(asset: VideoTextureAsset): VideoTexture;
        private _video;
        private _startLoopHandler;
        initWhenCreate(asset: VideoTextureAsset): void;
        init(): VideoTexture;
        dispose(): void;
        protected needClampMaxSize(): boolean;
    }
}


declare module wd {
    class CubemapTexture extends BasicTexture {
        static create(assets: Array<CubemapData>): CubemapTexture;
        constructor(assets: Array<CubemapData>);
        assets: Array<CubemapData>;
        textures: wdCb.Collection<CubemapFaceTexture>;
        mode: EnvMapMode;
        protected target: TextureTarget;
        private _areAllCompressedAsset;
        initWhenCreate(assets: Array<CubemapData>): void;
        getSamplerName(unit: number): string;
        protected sendOtherData(program: Program, unit: number): CubemapTexture;
        protected allocateSourceToTexture(isSourcePowerOfTwo: boolean): void;
        protected needClampMaxSize(): boolean;
        protected isSourcePowerOfTwo(): boolean;
        protected clampToMaxSize(): void;
        private _hasNoMipmapCompressedAsset();
        private _isMipmapFilter(filter);
        private _getRepresentAsset(assets);
        private _areAssetsAllImageAssets(assets);
        private _areAssetsAllCompressedAsset(assets);
        private _createTextures(assets);
        private _areTextureSizOfAllFaceseEqual(assets);
        private _hasSourceRegion(assets);
        private _areAllElementsEqual(arr);
    }
    type CubemapData = {
        asset: TextureAsset;
        sourceRegion?: RectRegion;
        type?: TextureType;
    };
}


declare module wd {
    abstract class CubemapFaceTexture {
        type: TextureType;
        format: TextureFormat;
        width: number;
        height: number;
        abstract draw(index: number): void;
        abstract isSourcePowerOfTwo(): boolean;
        abstract needClampMaxSize(): boolean;
        abstract clampToMaxSize(): void;
    }
}


declare module wd {
    class CubemapFaceImageTexture extends CubemapFaceTexture implements ICubemapFaceTwoDTextureAsset {
        static create(asset: ImageTextureAsset): CubemapFaceImageTexture;
        sourceRegionMethod: TextureSourceRegionMethod;
        sourceRegion: RectRegion;
        source: any;
        initWhenCreate(asset: ImageTextureAsset): void;
        isSourcePowerOfTwo(): boolean;
        needClampMaxSize(): boolean;
        clampToMaxSize(): void;
        draw(index: number): void;
    }
}


declare module wd {
    class CubemapFaceCompressedTexture extends CubemapFaceTexture implements ICubemapFaceCompressedTextureAsset {
        static create(asset: CompressedTextureAsset): CubemapFaceCompressedTexture;
        mipmaps: wdCb.Collection<CompressedTextureMipmap>;
        minFilter: TextureFilterMode;
        initWhenCreate(asset: CompressedTextureAsset): void;
        isSourcePowerOfTwo(): boolean;
        needClampMaxSize(): boolean;
        clampToMaxSize(): void;
        draw(index: number): void;
    }
}


declare module wd {
    class CompressedTexture extends TwoDTexture {
        static create(asset: CompressedTextureAsset): CompressedTexture;
        sourceRegionMethod: TextureSourceRegionMethod;
        protected allocateSourceToTexture(isSourcePowerOfTwo: boolean): void;
        protected needClampMaxSize(): boolean;
    }
    type CompressedTextureMipmap = {
        data: any;
        width: number;
        height: number;
    };
}


declare module wd {
    abstract class DrawTextureCommand {
        format: TextureFormat;
        type: TextureType;
        sourceRegion: RectRegion;
        sourceRegionMethod: TextureSourceRegionMethod;
        glTarget: any;
        abstract execute(): any;
        protected getDrawTarget(source: any, sourceRegion?: RectRegion): any;
    }
}


declare module wd {
    class DrawCompressedTextureCommand extends DrawTextureCommand {
        static create(): DrawCompressedTextureCommand;
        mipmaps: wdCb.Collection<CompressedTextureMipmap>;
        execute(): void;
    }
}


declare module wd {
    abstract class DrawTwoDTextureCommand extends DrawTextureCommand {
        source: any;
        protected drawTexture(index: number, source: any): void;
    }
}


declare module wd {
    class DrawMipmapTwoDTextureCommand extends DrawTwoDTextureCommand {
        static create(): DrawMipmapTwoDTextureCommand;
        mipmaps: wdCb.Collection<HTMLCanvasElement | HTMLImageElement | HTMLVideoElement>;
        execute(): void;
    }
}


declare module wd {
    class DrawNoMipmapTwoDTextureCommand extends DrawTwoDTextureCommand {
        static create(): DrawNoMipmapTwoDTextureCommand;
        execute(): void;
    }
}


declare module wd {
    class Video {
        static create(data: any): Video;
        constructor({urlArr, onLoad, onError}: {
            urlArr: any;
            onLoad?: (video: Video) => void;
            onError?: (err: any) => void;
        });
        url: string;
        source: HTMLVideoElement;
        isStop: boolean;
        private _urlArr;
        private _onLoad;
        private _onError;
        initWhenCreate(): void;
        play(): void;
        private _getCanPlayUrl();
        private _canplay(extname);
        private _bindEvent();
    }
}


declare module wd {
    class VideoManager {
        private static _instance;
        static getInstance(): any;
        play(id: string): void;
    }
}


declare module wd {
    class CustomMaterial extends Material {
        static create(): CustomMaterial;
    }
}


declare module wd {
    class CustomGeometry extends Geometry {
        static create(): CustomGeometry;
        vertices: Array<number>;
        texCoords: Array<number>;
        colors: Array<number>;
        indices: Array<number>;
        normals: Array<number>;
        protected computeData(): {
            vertices: number[];
            faces: Face3[];
            texCoords: number[];
            colors: number[];
        };
        protected createBufferContainer(): BufferContainer;
    }
}


declare module wd {
    function script(scriptName: string): (target: any) => void;
}
