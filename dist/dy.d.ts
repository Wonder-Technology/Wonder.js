
declare module dyRt {
    class JudgeUtils extends dyCb.JudgeUtils {
        static isPromise(obj: any): boolean;
        static isEqual(ob1: Entity, ob2: Entity): boolean;
    }
}


declare module dyRt {
    class Entity {
        static UID: number;
        private _uid;
        uid: string;
        constructor(uidPre: string);
    }
}

declare module dyRt {
    interface IDisposable {
        dispose(): any;
    }
}


declare module dyRt {
    class SingleDisposable implements IDisposable {
        static create(disposeHandler?: Function): SingleDisposable;
        private _disposeHandler;
        constructor(disposeHandler: Function);
        setDisposeHandler(handler: Function): void;
        dispose(): void;
    }
}


declare module dyRt {
    class GroupDisposable implements IDisposable {
        static create(disposable?: IDisposable): GroupDisposable;
        private _group;
        constructor(disposable?: IDisposable);
        add(disposable: IDisposable): GroupDisposable;
        dispose(): void;
    }
}


declare module dyRt {
    interface IObserver extends IDisposable {
        next(value: any): any;
        error(error: any): any;
        completed(): any;
    }
}


declare module dyRt {
    class Disposer extends Entity {
        static addDisposeHandler(func: Function): void;
        static getDisposeHandler(): dyCb.Collection<Function>;
        static removeAllDisposeHandler(): void;
        private static _disposeHandler;
    }
}


declare module dyRt {
    class InnerSubscription implements IDisposable {
        static create(subject: Subject | GeneratorSubject, observer: Observer): InnerSubscription;
        private _subject;
        private _observer;
        constructor(subject: Subject | GeneratorSubject, observer: Observer);
        dispose(): void;
    }
}


declare module dyRt {
    class InnerSubscriptionGroup implements IDisposable {
        static create(): InnerSubscriptionGroup;
        private _container;
        addChild(child: IDisposable): void;
        dispose(): void;
    }
}

declare module dyRt {
    var root: any;
}

declare module dyRt {
    var ABSTRACT_METHOD: Function, ABSTRACT_ATTRIBUTE: any;
}


declare module dyRt {
}


declare module dyRt {
    class Stream extends Disposer {
        scheduler: Scheduler;
        subscribeFunc: Function;
        constructor(subscribeFunc: any);
        subscribe(arg1: Function | Observer | Subject, onError?: Function, onCompleted?: Function): IDisposable;
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


declare module dyRt {
    class Scheduler {
        static create(...args: any[]): Scheduler;
        private _requestLoopId;
        requestLoopId: any;
        publishRecursive(observer: IObserver, initial: any, action: Function): void;
        publishInterval(observer: IObserver, initial: any, interval: number, action: Function): number;
        publishIntervalRequest(observer: IObserver, action: Function): void;
    }
}


declare module dyRt {
    class Observer extends Entity implements IObserver {
        private _isDisposed;
        isDisposed: boolean;
        protected onUserNext: Function;
        protected onUserError: Function;
        protected onUserCompleted: Function;
        private _isStop;
        private _disposable;
        constructor(onNext: Function, onError: Function, onCompleted: Function);
        next(value: any): void;
        error(error: any): void;
        completed(): void;
        dispose(): void;
        setDisposeHandler(disposeHandler: dyCb.Collection<Function>): void;
        setDisposable(disposable: IDisposable): void;
        protected onNext(value: any): void;
        protected onError(error: any): void;
        protected onCompleted(): void;
    }
}


declare module dyRt {
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


declare module dyRt {
    class GeneratorSubject extends Disposer implements IObserver {
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


declare module dyRt {
    class AnonymousObserver extends Observer {
        static create(onNext: Function, onError: Function, onCompleted: Function): AnonymousObserver;
        protected onNext(value: any): void;
        protected onError(error: any): void;
        protected onCompleted(): void;
    }
}


declare module dyRt {
    class AutoDetachObserver extends Observer {
        static create(onNext: Function, onError: Function, onCompleted: Function): AutoDetachObserver;
        dispose(): void;
        protected onNext(value: any): void;
        protected onError(err: any): void;
        protected onCompleted(): void;
    }
}


declare module dyRt {
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


declare module dyRt {
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


declare module dyRt {
    class MergeAllObserver extends Observer {
        static create(currentObserver: IObserver, streamGroup: dyCb.Collection<Stream>, groupDisposable: GroupDisposable): MergeAllObserver;
        private _currentObserver;
        currentObserver: IObserver;
        private _done;
        done: boolean;
        private _streamGroup;
        private _groupDisposable;
        constructor(currentObserver: IObserver, streamGroup: dyCb.Collection<Stream>, groupDisposable: GroupDisposable);
        protected onNext(innerSource: any): void;
        protected onError(error: any): void;
        protected onCompleted(): void;
    }
}


declare module dyRt {
    class TakeUntilObserver extends Observer {
        static create(prevObserver: IObserver): TakeUntilObserver;
        private _prevObserver;
        constructor(prevObserver: IObserver);
        protected onNext(value: any): void;
        protected onError(error: any): void;
        protected onCompleted(): void;
    }
}


declare module dyRt {
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


declare module dyRt {
    interface ISubjectObserver {
        addChild(observer: Observer): any;
        removeChild(observer: Observer): any;
    }
}


declare module dyRt {
    class SubjectObserver implements IObserver {
        observers: dyCb.Collection<IObserver>;
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


declare module dyRt {
    class IgnoreElementsObserver extends Observer {
        static create(currentObserver: IObserver): IgnoreElementsObserver;
        private _currentObserver;
        constructor(currentObserver: IObserver);
        protected onNext(value: any): void;
        protected onError(error: any): void;
        protected onCompleted(): void;
    }
}


declare module dyRt {
    class BaseStream extends Stream {
        subscribeCore(observer: IObserver): IDisposable;
        subscribe(arg1: Function | Observer | Subject, onError?: any, onCompleted?: any): IDisposable;
        buildStream(observer: IObserver): IDisposable;
    }
}


declare module dyRt {
    class DoStream extends BaseStream {
        static create(source: Stream, onNext?: Function, onError?: Function, onCompleted?: Function): DoStream;
        private _source;
        private _observer;
        constructor(source: Stream, onNext: Function, onError: Function, onCompleted: Function);
        subscribeCore(observer: IObserver): IDisposable;
    }
}


declare module dyRt {
    class MapStream extends BaseStream {
        static create(source: Stream, selector: Function): MapStream;
        private _source;
        private _selector;
        constructor(source: Stream, selector: Function);
        subscribeCore(observer: IObserver): IDisposable;
    }
}


declare module dyRt {
    class FromArrayStream extends BaseStream {
        static create(array: Array<any>, scheduler: Scheduler): FromArrayStream;
        private _array;
        constructor(array: Array<any>, scheduler: Scheduler);
        subscribeCore(observer: IObserver): SingleDisposable;
    }
}


declare module dyRt {
    class FromPromiseStream extends BaseStream {
        static create(promise: any, scheduler: Scheduler): FromPromiseStream;
        private _promise;
        constructor(promise: any, scheduler: Scheduler);
        subscribeCore(observer: IObserver): SingleDisposable;
    }
}


declare module dyRt {
    class FromEventPatternStream extends BaseStream {
        static create(addHandler: Function, removeHandler: Function): FromEventPatternStream;
        private _addHandler;
        private _removeHandler;
        constructor(addHandler: Function, removeHandler: Function);
        subscribeCore(observer: IObserver): SingleDisposable;
    }
}


declare module dyRt {
    class AnonymousStream extends Stream {
        static create(subscribeFunc: Function): AnonymousStream;
        constructor(subscribeFunc: Function);
        subscribe(onNext: any, onError: any, onCompleted: any): IDisposable;
    }
}


declare module dyRt {
    class IntervalStream extends BaseStream {
        static create(interval: number, scheduler: Scheduler): IntervalStream;
        private _interval;
        constructor(interval: number, scheduler: Scheduler);
        initWhenCreate(): void;
        subscribeCore(observer: IObserver): SingleDisposable;
    }
}


declare module dyRt {
    class IntervalRequestStream extends BaseStream {
        static create(scheduler: Scheduler): IntervalRequestStream;
        private _isEnd;
        constructor(scheduler: Scheduler);
        subscribeCore(observer: IObserver): SingleDisposable;
    }
}


declare module dyRt {
    class MergeAllStream extends BaseStream {
        static create(source: Stream): MergeAllStream;
        private _source;
        private _observer;
        constructor(source: Stream);
        subscribeCore(observer: IObserver): GroupDisposable;
    }
}


declare module dyRt {
    class TakeUntilStream extends BaseStream {
        static create(source: Stream, otherSteam: Stream): TakeUntilStream;
        private _source;
        private _otherStream;
        constructor(source: Stream, otherStream: Stream);
        subscribeCore(observer: IObserver): GroupDisposable;
    }
}


declare module dyRt {
    class ConcatStream extends BaseStream {
        static create(sources: Array<Stream>): ConcatStream;
        private _sources;
        constructor(sources: Array<Stream>);
        subscribeCore(observer: IObserver): GroupDisposable;
    }
}


declare module dyRt {
    class RepeatStream extends BaseStream {
        static create(source: Stream, count: number): RepeatStream;
        private _source;
        private _count;
        constructor(source: Stream, count: number);
        subscribeCore(observer: IObserver): GroupDisposable;
    }
}


declare module dyRt {
    class IgnoreElementsStream extends BaseStream {
        static create(source: Stream): IgnoreElementsStream;
        private _source;
        constructor(source: Stream);
        subscribeCore(observer: IObserver): IDisposable;
    }
}


declare module dyRt {
    var createStream: (subscribeFunc: any) => AnonymousStream;
    var fromArray: (array: any[], scheduler?: Scheduler) => FromArrayStream;
    var fromPromise: (promise: any, scheduler?: Scheduler) => FromPromiseStream;
    var fromEventPattern: (addHandler: Function, removeHandler: Function) => FromEventPatternStream;
    var interval: (interval: any, scheduler?: Scheduler) => IntervalStream;
    var intervalRequest: (scheduler?: Scheduler) => IntervalRequestStream;
    var empty: () => AnonymousStream;
    var callFunc: (func: Function, context?: any) => AnonymousStream;
    var judge: (condition: Function, thenSource: Function, elseSource: Function) => any;
}


declare module dyRt {
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


declare module dyRt {
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


declare module dyRt {
    class MockPromise {
        static create(scheduler: TestScheduler, messages: [Record]): MockPromise;
        private _messages;
        private _scheduler;
        constructor(scheduler: TestScheduler, messages: [Record]);
        then(successCb: Function, errorCb: Function, observer: IObserver): void;
    }
}


declare module dyRt {
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

declare module dyRt {
    enum ActionType {
        NEXT = 0,
        ERROR = 1,
        COMPLETED = 2,
    }
}

declare module dyRt {
    class TestStream extends BaseStream {
        static create(messages: [Record], scheduler: TestScheduler): TestStream;
        scheduler: TestScheduler;
        private _messages;
        constructor(messages: [Record], scheduler: TestScheduler);
        subscribeCore(observer: IObserver): SingleDisposable;
    }
}


declare module dyRt {
    var fromCollection: (collection: dyCb.Collection<any>, scheduler?: Scheduler) => AnonymousStream;
}

declare module dy {
    class Entity {
        private static _count;
        constructor();
        private _uid;
        uid: number;
    }
}


declare module dy {
    class Component extends Entity {
        private _gameObject;
        gameObject: GameObject;
        transform: Transform;
        init(): void;
    }
}


declare module dy {
    class Transform extends Entity {
        static create(gameObject: GameObject): Transform;
        private _localToParentMatrix;
        localToParentMatrix: any;
        private _localToWorldMatrix;
        localToWorldMatrix: Matrix;
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
        private _dirtyWorld;
        dirtyWorld: boolean;
        private _dirtyLocal;
        private _children;
        private _gameObject;
        constructor(gameObject: GameObject);
        addChild(child: Transform): void;
        removeChild(child: Transform): void;
        sync(): void;
        translateLocal(translation: Vector3): void;
        translate(translation: Vector3): void;
        rotate(eulerAngles: Vector3): void;
        rotateLocal(eulerAngles: Vector3): void;
        rotateAround(angle: number, center: Vector3, axis: Vector3): void;
        lookAt(target: Vector3): any;
        lookAt(target: Vector3, up: Vector3): any;
    }
}


declare module dy {
    class GameObject extends Entity {
        static create(...args: any[]): GameObject;
        private _parent;
        parent: GameObject;
        private _bubbleParent;
        bubbleParent: GameObject;
        private _transform;
        transform: Transform;
        private _renderer;
        renderer: Renderer;
        private _name;
        name: string;
        private _script;
        script: dyCb.Hash<IScriptBehavior>;
        private _scriptStreams;
        scriptStreams: dyRt.Stream;
        private _collider;
        private _children;
        private _components;
        private _actionManager;
        init(): void;
        onEnter(): void;
        onStartLoop(): void;
        onEndLoop(): void;
        onExit(): void;
        dispose(): void;
        hasChild(child: GameObject): boolean;
        addChild(child: GameObject): GameObject;
        getChildren(): dyCb.Collection<GameObject>;
        sort(): GameObject;
        forEach(func: Function): GameObject;
        removeChild(child: GameObject): GameObject;
        getTopUnderPoint(point: Point): GameObject;
        isHit(locationInView: Point): boolean;
        hasComponent(component: Component): boolean;
        hasComponent(_class: Function): boolean;
        getComponent<T>(_class: Function): T;
        addComponent(component: Component): GameObject;
        removeComponent(component: Component): GameObject;
        render(renderer: render.Renderer, camera: GameObject): void;
        update(time: number): void;
        private _ascendZ(a, b);
    }
}


declare module dy {
    class Stage extends GameObject {
        static create(): Stage;
        program: render.Program;
        private _camera;
        init(): void;
        addChild(child: GameObject): GameObject;
        render(renderer: render.Renderer): void;
        onEnter(): void;
        onStartLoop(): void;
        onEndLoop(): void;
        private _isCamera(child);
    }
}


declare module dy {
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


declare module dy {
    class Director {
        private static _instance;
        static getInstance(): Director;
        private _stage;
        stage: Stage;
        private _scheduler;
        scheduler: Scheduler;
        private _renderer;
        renderer: render.Renderer;
        private _view;
        view: IView;
        private _gl;
        gl: any;
        gameTime: number;
        fps: number;
        isNormal: boolean;
        isStop: boolean;
        isPause: boolean;
        isTimeChange: boolean;
        elapsed: number;
        private _gameLoop;
        private _gameState;
        private _timeController;
        private _isFirstStart;
        initWhenCreate(): void;
        start(): void;
        stop(): void;
        pause(): void;
        resume(): void;
        getView(): IView;
        getTopUnderPoint(point: Point): GameObject;
        createGL(canvasId: string): void;
        private _startLoop();
        private _buildLoadScriptStream();
        private _buildInitStream();
        private _buildLoopStream();
        private _loopBody(time);
        private _run(time);
    }
}

declare module dy {
    class Point {
        x: number;
        y: number;
        constructor(x?: number, y?: number);
        static create(x?: number, y?: number): Point;
    }
}


declare module dy {
    interface IView {
        offset: {
            x: number;
            y: number;
        };
        width: number;
        height: number;
        dom: any;
        getContext(): any;
    }
    class ViewWebGL implements IView {
        static create(view: IView): ViewWebGL;
        offset: {
            x: any;
            y: any;
        };
        private _dom;
        dom: any;
        width: any;
        height: any;
        constructor(dom: any);
        getContext(): any;
    }
}


declare module dy {
    class Geometry extends Component {
        private _vertices;
        vertices: render.ArrayBuffer;
        private _indices;
        indices: render.ElementBuffer;
        private _colors;
        colors: render.ArrayBuffer;
        private _material;
        material: Material;
        init(): void;
        protected computeVerticesBuffer(): render.ArrayBuffer;
        protected computeIndicesBuffer(): render.ElementBuffer;
        private _computeColorsBuffer(material);
    }
}


declare module dy {
    class BoxGeometry extends Geometry {
        static create(): BoxGeometry;
        private _width;
        width: number;
        private _height;
        height: number;
        private _depth;
        depth: number;
        protected computeVerticesBuffer(): render.ArrayBuffer;
        protected computeIndicesBuffer(): render.ElementBuffer;
    }
}


declare module dy {
    class RectGeometry extends Geometry {
        static create(): RectGeometry;
        private _width;
        width: number;
        private _height;
        height: number;
        protected computeVerticesBuffer(): render.ArrayBuffer;
        protected computeIndicesBuffer(): render.ElementBuffer;
    }
}

declare module dy {
    enum SphereDrawMode {
        LATITUDELONGTITUDE = 0,
        DECOMPOSITION = 1,
    }
}


declare module dy {
    class SphereGeometry extends Geometry {
        static create(): SphereGeometry;
        private _radius;
        radius: number;
        private _drawMode;
        drawMode: SphereDrawMode;
        private _segments;
        segments: number;
        private _data;
        init(): void;
        protected computeVerticesBuffer(): any;
        protected computeIndicesBuffer(): any;
        private _computeData(radius, drawMode, segments);
    }
}


declare module dy {
    class TriangleGeometry extends Geometry {
        static create(): TriangleGeometry;
        private _width;
        width: number;
        private _height;
        height: number;
        protected computeVerticesBuffer(): render.ArrayBuffer;
        protected computeIndicesBuffer(): render.ElementBuffer;
    }
}


declare module dy {
    class Behavior extends Component {
        update(time: any): any;
    }
}


declare module dy {
    class Camera extends Behavior {
        static create(): Camera;
        cameraToWorldMatrix: Matrix;
        worldToCameraMatrix: Matrix;
        private _pMatrix;
        pMatrix: Matrix;
        private _vMatrix;
        vMatrix: Matrix;
        private _eye;
        eye: Vector3;
        private _center;
        center: Vector3;
        private _up;
        up: Vector3;
        private _fovy;
        fovy: number;
        private _aspect;
        aspect: number;
        private _near;
        near: number;
        private _far;
        far: number;
        private _dirty;
        init(): void;
        computeVpMatrix(): Matrix;
        zoomIn(speed: number, min?: number): void;
        zoomOut(speed: number, max?: number): void;
        update(time: any): void;
    }
}


declare module dy {
    class Action extends Behavior {
        private dy_isFinish;
        isFinish: boolean;
        isStart: boolean;
        isStop: any;
        isPause: any;
        protected p_target: GameObject;
        target: GameObject;
        reset(): void;
        update(time: number): any;
        start(): any;
        stop(): any;
        pause(): any;
        resume(): any;
        copy(): any;
        reverse(): any;
        protected finish(): void;
    }
}


declare module dy {
    class ActionInstant extends Action {
        isStop: boolean;
        isPause: boolean;
        start(): void;
        stop(): void;
        pause(): void;
        resume(): void;
    }
}


declare module dy {
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


declare module dy {
    class ActionInterval extends Action {
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


declare module dy {
    class Control extends ActionInterval {
        target: GameObject;
        init(): void;
        reverse(): Control;
        reset(): Control;
        getInnerActions(): dyCb.Collection<Action>;
        protected iterate(method: string, argArr?: Array<any>): void;
    }
}


declare module dy {
    class Sequence extends Control {
        static create(...actions: any[]): any;
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
        getInnerActions(): dyCb.Collection<Action>;
        private _startNextActionAndJudgeFinish();
    }
}


declare module dy {
    class Spawn extends Control {
        static create(): any;
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
        getInnerActions(): dyCb.Collection<Action>;
        protected iterate(method: string, argArr?: Array<any>): void;
        private _isFinish();
    }
}


declare module dy {
    class DelayTime extends ActionInterval {
        static create(delayTime: number): DelayTime;
        constructor(delayTime: number);
        reverse(): DelayTime;
        copy(): DelayTime;
    }
}


declare module dy {
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
        getInnerActions(): dyCb.Collection<Action>;
    }
}


declare module dy {
    class RepeatForever extends Control {
        static create(action: Action): RepeatForever;
        constructor(action: Action);
        isFinish: boolean;
        private _innerAction;
        update(time: any): void;
        copy(): RepeatForever;
        start(): void;
        stop(): void;
        pause(): void;
        resume(): void;
        getInnerActions(): dyCb.Collection<Action>;
    }
}


declare module dy {
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
                Out: (k: any) => number;
                InOut: (k: any) => number;
            };
            Exponential: {
                In: (k: any) => number;
                Out: (k: any) => number;
                InOut: (k: any) => number;
            };
            Circular: {
                In: (k: any) => number;
                Out: (k: any) => number;
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


declare module dy {
    class ActionManager {
        static create(): ActionManager;
        private _children;
        addChild(action: Action): void;
        removeChild(action: Action): void;
        hasChild(action: Action): boolean;
        update(time: number): void;
    }
}


declare module dy {
    class Renderer extends Component {
        render(renderer: render.Renderer, geometry: Geometry, camera: GameObject): void;
    }
}


declare module dy {
    class MeshRenderer extends Renderer {
        static create(): MeshRenderer;
        render(renderer: render.Renderer, geometry: Geometry, camera: GameObject): void;
        private _computeMvpMatrix(camera);
        private _addDrawCommand(renderer, geometry, mvpMatrix);
    }
}


declare module dy {
    class Collider extends Component {
        collideXY(localX: number, localY: number): boolean;
        collide(collider: Collider): boolean;
    }
}


declare module dy {
    class TopCollider extends Collider {
        static create(): TopCollider;
        collideXY(localX: number, localY: number): boolean;
        collide(collider: Collider): boolean;
    }
}


declare module dy {
    interface IScriptFileData {
        name: string;
        class: any;
    }
    class Script extends Component {
        static script: dyCb.Stack<IScriptFileData>;
        static create(): Script;
        static create(url: string): Script;
        static create(scriptName: string, callback: Function): Script;
        constructor(url?: string);
        url: string;
        createLoadJsStream(): dyRt.MapStream;
    }
}

declare module dy {
    interface IScriptBehavior {
        init(): any;
        update(time: number): any;
        onEnter(): any;
        onExit(): any;
        onStartLoop(): any;
        onEndLoop(): any;
    }
}

declare module dy {
    const DEG_TO_RAD: number;
    const RAD_TO_DEG: number;
}


declare module dy {
    class Vector3 {
        static up: Vector3;
        static forward: Vector3;
        static right: Vector3;
        static create(x: any, y: any, z: any): Vector3;
        static create(): Vector3;
        private _values;
        values: Float32Array;
        x: number;
        y: number;
        z: number;
        constructor(x: any, y: any, z: any);
        constructor();
        normalize(): Vector3;
        scale(scalar: number): Vector3;
        set(x: number, y: number, z: number): void;
        sub(v: Vector3): Vector3;
        add(v: Vector3): Vector3;
        reverse(): Vector3;
        copy(): Vector3;
        toVec4(): Vector4;
        length(): number;
        cross(lhs: any, rhs: any): Vector3;
    }
}


declare module dy {
    class Vector4 {
        static create(x: any, y: any, z: any, w: any): Vector4;
        static create(): Vector4;
        private _values;
        values: Float32Array;
        constructor(x: any, y: any, z: any, w: any);
        constructor();
        normalize(): Vector4;
        toVec3(): Vector3;
    }
}


declare module dy {
    class Matrix {
        static create(mat: Float32Array): Matrix;
        static create(): Matrix;
        private _values;
        values: Float32Array;
        private _matrixArr;
        constructor(mat: Float32Array);
        constructor();
        push(): void;
        pop(): void;
        setIdentity(): Matrix;
        invert(): Matrix;
        transpose(): Matrix;
        setTranslate(x: any, y: any, z: any): Matrix;
        translate(x: any, y: any, z: any): Matrix;
        setRotate(angle: number, x: number, y: number, z: number): Matrix;
        rotate(angle: any, vector3: Vector3): Matrix;
        rotate(angle: any, x: any, y: any, z: any): Matrix;
        setScale(x: any, y: any, z: any): Matrix;
        scale(x: any, y: any, z: any): Matrix;
        setLookAt(eye: Vector3, center: Vector3, up: Vector3): Matrix;
        setLookAt(eyeX: number, eyeY: number, eyeZ: number, centerX: number, centerY: number, centerZ: number, upX: number, upY: number, upZ: number): Matrix;
        lookAt(eye: Vector3, center: Vector3, up: Vector3): Matrix;
        lookAt(eyeX: number, eyeY: number, eyeZ: number, centerX: number, centerY: number, centerZ: number, upX: number, upY: number, upZ: number): Matrix;
        setOrtho(near: any, far: any): Matrix;
        ortho(n: any, f: any): Matrix;
        setPerspective(fovy: number, aspect: any, near: any, far: any): Matrix;
        perspective(fovy: any, aspect: any, near: any, far: any): Matrix;
        applyMatrix(other: Matrix): Matrix;
        multiply(matrix2: Matrix): Matrix;
        multiply(matrix1: Matrix, matrix2: Matrix): Matrix;
        multiplyVector4(vector: Vector4): Vector4;
        multiplyVector3(vector: Vector3): Vector3;
        copy(): Matrix;
        getX(): Vector3;
        getY(): Vector3;
        getZ(): Vector3;
        getTranslation(): Vector3;
        getScale(): Vector3;
        getEulerAngles(): Vector3;
        setTRS(t: Vector3, r: Quaternion, s: Vector3): Matrix;
    }
}


declare module dy {
    class Quaternion {
        static create(x?: number, y?: number, z?: number, w?: number): Quaternion;
        private _x;
        x: number;
        private _y;
        y: number;
        private _z;
        z: number;
        private _w;
        w: number;
        constructor(x?: number, y?: number, z?: number, w?: number);
        setFromEulerAngles(eulerAngles: Vector3): Quaternion;
        multiply(rhs: Quaternion): any;
        multiply(rhs1: Quaternion, rhs2: Quaternion): any;
        setFromMatrix(matrix: Matrix): Quaternion;
        setFromAxisAngle(angle: number, axis: Vector3): Quaternion;
        invert(): Quaternion;
        conjugate(): Quaternion;
        clone(): Quaternion;
        copy(): Quaternion;
        normalize(): Quaternion;
        length(): number;
        multiplyVector3(vector: Vector3): Vector3;
        set(x: number, y: number, z: number, w: number): void;
        sub(quat: Quaternion): Quaternion;
        getEulerAngles(): Vector3;
    }
}

declare module dy {
    class Color {
        static create(colorVal: string): Color;
        private _r;
        r: number;
        private _g;
        g: number;
        private _b;
        b: number;
        constructor();
        initWhenCreate(colorVal: string): void;
        private _setColor(colorVal);
        private _setHex(hex);
    }
}


declare module dy {
    class JudgeUtils extends dyCb.JudgeUtils {
        static isView(obj: any): boolean;
        static isEqual(target1: GameObject, target2: GameObject): boolean;
    }
}


declare module dy {
    class TimeController {
        elapsed: number;
        pauseElapsed: number;
        pauseTime: number;
        startTime: number;
        start(): void;
        stop(): void;
        pause(): void;
        resume(): void;
        computeElapseTime(time: number): number;
        protected getNow(): any;
    }
}


declare module dy {
    class DirectorTimeController extends TimeController {
        static create(): DirectorTimeController;
        gameTime: number;
        fps: number;
        isTimeChange: boolean;
        private _lastTime;
        tick(time: number): void;
        start(): void;
        resume(): void;
        protected getNow(): number;
        private _updateFps(time);
    }
}


declare module dy {
    class CommonTimeController extends TimeController {
        static create(): CommonTimeController;
        protected getNow(): number;
    }
}


declare module dy.render {
    class Renderer {
        createQuadCommand(): QuadCommand;
        addCommand(command: QuadCommand): any;
        render(): any;
        init(): void;
    }
}


declare module dy.render {
    class WebGLRenderer extends Renderer {
        static create(): WebGLRenderer;
        private _commandQueue;
        private _clearColor;
        private _clearAlpha;
        createQuadCommand(): QuadCommand;
        addCommand(command: QuadCommand): void;
        render(): void;
        init(): void;
        setClearColor(color: Color, alpha?: number): void;
        private _clearCommand();
    }
}


declare module dy.render {
    class Shader {
        static create(vsSource: string, fsSource: string): Shader;
        private _vsSource;
        vsSource: string;
        private _fsSource;
        fsSource: string;
        constructor(vsSource: string, fsSource: string);
        createVsShader(): any;
        createFsShader(): any;
        isEqual(other: Shader): boolean;
        private _initShader(shader, source);
    }
}

declare module dy.render {
    enum BufferType {
        UNSIGNED_BYTE,
        SHORT,
        UNSIGNED_SHORT,
        INT,
        UNSIGNED_INT,
        FLOAT,
    }
}

declare module dy.render {
    enum AttributeDataType {
        FLOAT_4 = 0,
        BUFFER = 1,
    }
}

declare module dy.render {
    enum DrawMode {
        TRIANGLES,
    }
}


declare module dy.render {
    class Buffer {
        buffer: any;
        type: string;
        num: number;
        protected innerBuffer: any;
        protected innerType: any;
        protected innerNum: any;
    }
}


declare module dy.render {
    class ElementBuffer extends Buffer {
        static create(data: any, type: BufferType): ElementBuffer;
        private _typeSize;
        typeSize: number;
        initWhenCreate(data: any, type: BufferType): any;
        private _checkDataType(data, type);
        private _getInfo(type);
    }
}


declare module dy.render {
    class ArrayBuffer extends Buffer {
        static create(data: any, num: any, type: BufferType): render.ArrayBuffer;
        private _count;
        count: number;
        initWhenCreate(data: any, num: any, type: BufferType): any;
    }
}

declare module dy.render {
    enum UniformDataType {
        FLOAT_MAT4 = 0,
    }
}


declare module dy.render {
    class Program {
        static create(): Program;
        private _program;
        private _shader;
        use(): void;
        setUniformData(name: string, type: UniformDataType, data: Matrix): void;
        setAttributeData(name: string, type: AttributeDataType, data: render.ArrayBuffer | number[]): void;
        initWithShader(shader: Shader): any;
        isChangeShader(shader: Shader): boolean;
    }
}


declare module dy.render {
    class QuadCommand {
        static create(): QuadCommand;
        private _buffers;
        buffers: any;
        private _color;
        color: Color;
        shader: Shader;
        private _mvpMatrix;
        mvpMatrix: Matrix;
        private _drawMode;
        drawMode: DrawMode;
        execute(): void;
        init(): void;
        private _sendData();
        private _draw();
    }
}


declare module dy {
    class Material {
        static create(): Material;
        private _color;
        color: Color;
        private _shader;
        shader: render.Shader;
    }
}


declare module dy {
    class Loader {
        private _container;
        load(url: string, id: string): dyRt.Stream;
        get(id: string): string;
        has(id: string): boolean;
        protected loadAsset(url: string): any;
        private _errorHandle(path, err);
    }
}


declare module dy {
    class GLSLLoader extends Loader {
        private static _instance;
        static getInstance(): GLSLLoader;
        protected loadAsset(url: string): RSVP.Promise<{}>;
    }
}


declare module dy {
    class JsLoader extends Loader {
        private static _instance;
        static getInstance(): any;
        protected loadAsset(url: string): RSVP.Promise<{}>;
        private _createScript();
        private _appendScript(script);
    }
}


declare module dy {
    class LoaderManager {
        private static _instance;
        static getInstance(): LoaderManager;
        resCount: number;
        currentLoadedCount: number;
        load(url: string): dyRt.Stream;
        load(resourcesArr: Array<{
            url: string;
            id: string;
        }>): dyRt.Stream;
        reset(): void;
        private _createLoadResourceStream(url, id);
        private _createLoadStream(url, id);
        private _getLoader(url);
    }
}


declare module dy {
    class LoaderFactory {
        static create(extname: string): any;
    }
}


declare module dy {
    interface IEventOffData {
        eventName: EventName;
        wrapHandler: Function;
    }
    class EventListenerMap {
        static create(): EventListenerMap;
        private _listenerMap;
        appendChild(eventName: EventName, data: IEventRegisterData): void;
        getChild(eventName: EventName): dyCb.Collection<IEventRegisterData>;
        getChild(target: GameObject): dyCb.Collection<IEventRegisterData>;
        getChild(target: GameObject, eventName: EventName): dyCb.Collection<IEventRegisterData>;
        hasChild(...args: any[]): boolean;
        filter(func: Function): dyCb.Hash<{}>;
        forEach(func: Function): dyCb.Hash<dyCb.Collection<IEventRegisterData>>;
        removeChild(eventName: EventName): void;
        removeChild(eventName: EventName, handler: Function): void;
        removeChild(uid: number, eventName: EventName): void;
        removeChild(target: GameObject): void;
        removeChild(target: GameObject, eventName: EventName): void;
        removeChild(target: GameObject, eventName: EventName, handler: Function): void;
        getEventOffDataList(target: GameObject, eventName?: EventName): dyCb.Collection<IEventOffData>;
        getEventNameFromKey(key: string): EventName;
        getUidFromKey(key: string): number;
        isTarget(key: string, target: GameObject, list: dyCb.Collection<IEventRegisterData>): boolean;
        private _buildKey(uid, eventName);
        private _buildKey(target, eventName);
        private _buildKeyWithUid(uid, eventName);
    }
}

declare module dy {
    enum EventType {
        MOUSE = 0,
        KEYBOARD = 1,
        CUSTOM = 2,
    }
}

declare module dy {
    enum EventName {
        CLICK,
        MOUSEOVER,
        MOUSEUP,
        MOUSEOUT,
        MOUSEMOVE,
        MOUSEDOWN,
        KEYDOWN,
        KEYUP,
        KEYPRESS,
    }
}

declare module dy {
    enum EventPhase {
        BROADCAST = 0,
        EMIT = 1,
    }
}


declare module dy {
    class EventTable {
        static getEventType(eventName: EventName): EventType;
    }
}


declare module dy {
    class Event {
        constructor(eventName: EventName);
        type: EventType;
        private _name;
        name: EventName;
        private _target;
        target: GameObject;
        private _currentTarget;
        currentTarget: GameObject;
        private _isStopPropagation;
        isStopPropagation: boolean;
        private _phase;
        phase: EventPhase;
        protected innerType: EventType;
        copy(): Event;
        stopPropagation(): void;
        protected copyMember(destination: Event, source: Event, memberArr: [any]): Event;
    }
}


declare module dy {
    class MouseEvent extends Event {
        static create(event: any, eventName: EventName): MouseEvent;
        constructor(event: any, eventName: EventName);
        protected innerType: EventType;
        private _event;
        event: any;
        private _location;
        location: Point;
        private _locationInView;
        locationInView: Point;
        private _button;
        button: number;
        copy(): any;
    }
}


declare module dy {
    class KeyboardEvent extends Event {
        static create(event: any, eventName: EventName): KeyboardEvent;
        constructor(event: any, eventName: EventName);
        protected innerType: EventType;
        private _event;
        event: any;
        ctrlKey: any;
        altKey: any;
        shiftKey: any;
        metaKey: any;
        keyCode: any;
        key: any;
        copy(): any;
    }
}


declare module dy {
    class CustomEvent extends Event {
        static create(eventName: string): CustomEvent;
        protected innerType: EventType;
        private _userData;
        userData: any;
        copyPublicAttri(destination: any, source: any): any;
        copy(): any;
    }
}

declare module dy {
    enum MouseButton {
        LEFT = 0,
        RIGHT = 1,
        CENTER = 2,
    }
}


declare module dy {
    interface IEventHandlerData {
        eventName: EventName;
        handler: Function;
    }
    class EventListener {
        static create(option: any): EventListener;
        private _eventType;
        eventType: EventType;
        private _priority;
        priority: number;
        private _handlerDataList;
        handlerDataList: dyCb.Collection<IEventHandlerData>;
        constructor(option: any);
        initWhenCreate(option: {
            any;
        }): void;
        private _setHandlerDataList(option);
        private _parseEventName(handlerName);
    }
}


declare module dy {
    class EventHandler {
        on(...args: any[]): void;
        off(...args: any[]): void;
        trigger(...args: any[]): boolean;
    }
}


declare module dy {
    class DomEventHandler extends EventHandler {
        off(...args: any[]): void;
        protected getDom(): any;
        protected buildWrapHandler(target: GameObject, eventName: EventName): any;
        protected handler(target: any, eventName: any, handler: any, priority: any): void;
        private _bind(dom, eventName, target);
        private _unBind(dom, eventName, handler);
    }
}


declare module dy {
    class MouseEventHandler extends DomEventHandler {
        private static _instance;
        static getInstance(): MouseEventHandler;
        on(target: GameObject, eventName: EventName, handler: Function, priority: number): void;
        trigger(target: GameObject, event: Event, notSetTarget: boolean): boolean;
        protected getDom(): any;
        protected buildWrapHandler(target: GameObject, eventName: EventName): (event: any) => any;
        private _isTrigger(result);
        private _createEventObject(event, eventName, currentTarget);
    }
}


declare module dy {
    class KeyboardEventHandler extends DomEventHandler {
        private static _instance;
        static getInstance(): KeyboardEventHandler;
        on(eventName: EventName, handler: Function, priority: number): void;
        trigger(event: Event): boolean;
        protected getDom(): any;
        protected buildWrapHandler(target: GameObject, eventName: EventName): (event: any) => any;
        private _isTrigger(result);
        private _createEventObject(event, eventName);
    }
}


declare module dy {
    class CustomEventHandler extends EventHandler {
        private static _instance;
        static getInstance(): CustomEventHandler;
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


declare module dy {
    class EventDispatcher {
        static create(): EventDispatcher;
        constructor();
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


declare module dy {
    interface IEventRegisterData {
        target: GameObject;
        handler: Function;
        wrapHandler: Function;
        priority: number;
    }
    class EventRegister {
        private static _instance;
        static getInstance(): EventRegister;
        private _listenerMap;
        register(target: GameObject, eventName: EventName, handler: Function, wrapHandler: Function, priority: number): void;
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
        filter(func: Function): dyCb.Hash<{}>;
        forEach(func: Function): dyCb.Hash<dyCb.Collection<IEventRegisterData>>;
        getChild(target: GameObject, eventName?: EventName): any;
        getEventNameFromKey(key: string): EventName;
        getUidFromKey(key: string): number;
        getWrapHandler(target: GameObject, eventName: EventName): Function;
        isTarget(key: string, target: GameObject, list: dyCb.Collection<IEventRegisterData>): boolean;
        private _isAllEventHandlerRemoved(target);
        private _handleAfterAllEventHandlerRemoved(target);
    }
}


declare module dy {
    class EventBinder {
        static create(): EventBinder;
        constructor();
        on(eventName: EventName, handler: Function, priority: number): void;
        on(listener: {} | EventListener): void;
        on(target: GameObject, listener: {} | EventListener): void;
        on(target: GameObject, eventName: EventName, handler: Function, priority: number): void;
        off(): void;
        off(eventName: EventName): void;
        off(eventName: EventName, handler: Function): void;
        off(target: GameObject): void;
        off(target: GameObject, eventName: EventName): void;
        off(target: GameObject, eventName: EventName, handler: Function): void;
    }
}


declare module dy {
    class FactoryEventHandler {
        static createEventHandler(eventType: EventType): any;
    }
}


declare module dy {
    class EventManager {
        private static _eventBinder;
        private static _eventDispatcher;
        static on(eventName: EventName, handler: Function): void;
        static on(eventName: EventName, handler: Function, priority: number): void;
        static on(listener: {} | EventListener): void;
        static on(target: GameObject, listener: {} | EventListener): void;
        static on(target: GameObject, eventName: EventName, handler: Function): void;
        static on(target: GameObject, eventName: EventName, handler: Function, priority: number): void;
        static off(): void;
        static off(eventName: EventName): void;
        static off(eventName: EventName, handler: Function): void;
        static off(target: GameObject): void;
        static off(target: GameObject, eventName: EventName): void;
        static off(target: GameObject, eventName: EventName, handler: Function): void;
        static trigger(event: Event): void;
        static trigger(event: Event, userData: any): void;
        static trigger(target: GameObject, event: Event): void;
        static trigger(target: GameObject, event: Event, userData: any): void;
        static broadcast(target: GameObject, event: Event, userData?: any): void;
        static emit(target: GameObject, event: Event, userData?: any): void;
        static fromEvent(eventName: EventName): dyRt.FromEventPatternStream;
        static fromEvent(eventName: EventName, priority: number): dyRt.FromEventPatternStream;
        static fromEvent(target: GameObject, eventName: EventName): dyRt.FromEventPatternStream;
        static fromEvent(target: GameObject, eventName: EventName, priority: number): dyRt.FromEventPatternStream;
        static setBubbleParent(target: GameObject, parent: any): void;
    }
}
