/// <reference path="../definitions.d.ts"/>
module dy {
//    /*!
//     it is designed as singleton, not static class, because it need maintain state(_instance attri).
//
//
//     1>什么时候使用静态类代替singleton :
//     这里有几个很好的静态类比singleton更好的应用场景. 最基本的例子就是在Java中的java.lang.Math类的实现方式, Math类就是用过静态方法来实现的,而不是单例来实现的.
//     总结 :
//     如果你的singleton不提维持任何状态, 仅仅是提供全局的访问 , 这个时候就适合用静态类 , 这样速度也更快, 因为static bind在编译期间(compile during) . 记住不经意维持子类的状态 , 尤其是在并发的情况下, 多个线程并发修改,这容易导致不容易发现的race condition 关于race condition .
//
//     静态类适用于一些工具类 , 其他的如单个访问资源就可以用singleton.
//     2>静态类和singleton之间的区别 :
//     ① static类有更好的访问效率(Static class provides better performance than Singleton pattern, because static methods are bonded on compile time)
//     ③ singleton比static class更容易测试. 那个容易模拟(mock), 哪个就容易测试. singleton很容易用JUnit测试, 因为你能够传递mock对象, 当singleton需要的时候(作为方法参数或者构造函数参数),
//     ④ 如果你的需求是维护(maintain)状态, 那么singleton比static class更好 , 如果使用static class会出现一些问题.
//     ⑤ singleton支持延迟加载 , 而static class 则不支持这样的特性 , 在重量级的对象, 延迟加载就显得非常重要.
//     ⑥ 在一些依赖注入(Dependency injection framework)的框架 , 它能够很好的管理singleton对象 . 例如Spring.
//
//     3>singleton相对于静态类的一些高级特点 :
//     singleton 对于static class 主要的优点是更加面向对象 . 对于singleton你可以使用继承(Inheritance)和多态(polymorphism)来继承一个基类, 实现一个接口, 提供不同功能 的实现. 例如 , Java中java.lang.Runtime ,该类就是一个singleton的, 调用getRuntime(),基于不同的JVM ,返回不同的实现对象, 针对一个一个JVM,确保只有一个Runtime对象 , 如果使用static class就不能很好的来实现这样的功能了 .
//     欢迎转载 转载请注明出处 : http://blog.csdn.net/johnny901114/article/details/11969015
//     */
//

    ////singleton class
    //static class

    export class EventManager {
        //private static static _instance:EventManager = null;
        //
        //public static static getInstance() {
        //    if (this._instance === null) {
        //        this._instance = new this();
        //        //this._instance.initWhenCreate();
        //    }
        //    return this._instance;
        //}

        private static _eventBinder:EventBinder = EventBinder.create();
        private static _eventDispatcher:EventDispatcher = EventDispatcher.create();

        public static on(eventName:EventName, handler:Function):void;
        public static on(eventName:EventName, handler:Function, priority:number):void;
        public static on(listener:{}|EventListener):void;
        public static on(target:GameObject, listener:{}|EventListener):void;
        public static on(target:GameObject, eventName:EventName, handler:Function):void;
        public static on(target:GameObject, eventName:EventName, handler:Function, priority:number):void;

        public static on(args) {
            if(arguments.length === 1){
                let listener = arguments[0];

                this._eventBinder.on(listener);
            }
            else if(arguments.length === 2 && JudgeUtils.isString(arguments[0]) && JudgeUtils.isFunction(arguments[1])){
                let eventName = arguments[0],
                    handler = arguments[1],
                    priority = 1;

                this._eventBinder.on(eventName, handler, priority);
            }
            else if(arguments.length === 2){
                let target = arguments[0],
                    listener = arguments[1];

                this._eventBinder.on(target, listener);
            }
            else if(arguments.length === 3 && JudgeUtils.isString(arguments[0]) && JudgeUtils.isFunction(arguments[1]) && JudgeUtils.isNumber(arguments[2])){
                let eventName = arguments[0],
                    handler = arguments[1],
                    priority = arguments[2];

                this._eventBinder.on(eventName, handler, priority);
            }
            else if(arguments.length === 3 || arguments.length === 4){
                let target = arguments[0],
                    eventName = arguments[1],
                    handler = arguments[2],
                    priority = arguments[3] === undefined? 1 :arguments[3];

                this._eventBinder.on(target, eventName, handler, priority);
            }
        }

        public static off():void;
        public static off(eventName:EventName):void;
        public static off(eventName:EventName, handler:Function):void;
        public static off(target:GameObject):void;
        public static off(target:GameObject, eventName:EventName):void;
        public static off(target:GameObject, eventName:EventName, handler:Function):void;

        public static off() {
            this._eventBinder.off.apply(
                this._eventBinder,
                Array.prototype.slice.call(arguments, 0)
            );
        }

        public static trigger(event:Event):void;
        public static trigger(event:Event, userData:any):void;
        public static trigger(target:GameObject, event:Event):void;
        public static trigger(target:GameObject, event:Event, userData:any):void;

        public static trigger(args) {
            this._eventDispatcher.trigger.apply(this._eventDispatcher, Array.prototype.slice.call(arguments, 0));
        }

        public static broadcast(target:GameObject, event:Event, userData?:any) {
            this._eventDispatcher.broadcast.apply(this._eventDispatcher, Array.prototype.slice.call(arguments, 0));
        }

        public static emit(target:GameObject, event:Event, userData?:any) {
            this._eventDispatcher.emit.apply(this._eventDispatcher, Array.prototype.slice.call(arguments, 0));
        }

        public static fromEvent(eventName:EventName):dyRt.FromEventPatternStream;
        public static fromEvent(eventName:EventName, priority:number):dyRt.FromEventPatternStream;
        public static fromEvent(target:GameObject, eventName:EventName):dyRt.FromEventPatternStream;
        public static fromEvent(target:GameObject, eventName:EventName, priority:number):dyRt.FromEventPatternStream;

        public static fromEvent(args):any {
            var addHandler = null,
                removeHandler = null;

            if (arguments.length === 1) {
                let eventName = arguments[0];

                addHandler = function (handler) {
                    EventManager.on(eventName, handler);
                };
                removeHandler = function (handler) {
                    EventManager.off(eventName, handler);
                };
            }
            else if (arguments.length === 2 && JudgeUtils.isNumber(arguments[1])) {
                let eventName = arguments[0],
                    priority = arguments[1];

                addHandler = function (handler) {
                    EventManager.on(eventName, handler, priority);
                };
                removeHandler = function (handler) {
                    EventManager.off(eventName, handler);
                };
            }
            else if (arguments.length === 2) {
                let target = arguments[0],
                    eventName = arguments[1];

                addHandler = function (handler) {
                    EventManager.on(target, eventName, handler);
                };
                removeHandler = function (handler) {
                    EventManager.off(target, eventName, handler);
                };
            }
            else if (arguments.length === 3) {
                let target = arguments[0],
                    eventName = arguments[1],
                    priority = arguments[2];

                addHandler = function (handler) {
                    EventManager.on(target, eventName, handler, priority);
                };
                removeHandler = function (handler) {
                    EventManager.off(target, eventName, handler);
                };
            }

            return dyRt.fromEventPattern(addHandler, removeHandler);
        }

        public static setBubbleParent(target:GameObject, parent:any) {
            EventRegister.getInstance().setBubbleParent(target, parent);
            //this._eventDispatcher.setBubbleParent(target, parent);
        }

        //public static remove(target:GameObject) {
        //    this._eventBinder.remove(target);
        //}

        //todo add getListenerCount(target, type) method
    }
}
