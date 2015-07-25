declare module dyRt {
    interface IDisposable {
        dispose(): any;
    }
}

/// <reference path="../definitions.d.ts" />
declare module dyRt {
    interface IObserver extends IDisposable {
        next(value: any): any;
        error(error: any): any;
        completed(): any;
    }
}

declare module dyRt {
    var root: any;
}

declare module dyRt {
    var ABSTRACT_METHOD: Function, ABSTRACT_ATTRIBUTE: any;
}

/// <reference path="../definitions.d.ts" />
declare module dyRt {
    class InnerSubscription implements IDisposable {
        static create(subject: Subject, observer: Observer): InnerSubscription;
        private _subject;
        private _observer;
        constructor(subject: Subject, observer: Observer);
        dispose(): void;
    }
}

/// <reference path="../definitions.d.ts" />
declare module dyRt {
    class Entity {
        static UID: number;
        private _uid;
        uid: string;
        constructor(uidPre: string);
    }
}

/// <reference path="../definitions.d.ts" />
declare module dyRt {
    class Stream extends Entity {
        scheduler: Scheduler;
        subscribeFunc: Function;
        private _disposeHandler;
        disposeHandler: dyCb.Collection;
        constructor(subscribeFunc: any);
        subscribe(arg1: Function | Observer | Subject, onError?: Function, onCompleted?: Function): IDisposable;
        buildStream(observer: IObserver): void;
        addDisposeHandler(func: Function): void;
        protected handleSubject(arg: any): boolean;
        do(onNext?: Function, onError?: Function, onCompleted?: Function): DoStream;
        map(selector: Function): MapStream;
        flatMap(selector: Function): MergeAllStream;
        mergeAll(): MergeAllStream;
        takeUntil(otherStream: Stream): TakeUntilStream;
        private _isSubject(subject);
        private _setSubject(subject);
    }
}

/// <reference path="../definitions.d.ts" />
declare module dyRt {
    class Subject implements IObserver {
        static create(): Subject;
        private _source;
        source: Stream;
        private _observers;
        subscribe(arg1?: Function | Observer, onError?: Function, onCompleted?: Function): IDisposable;
        next(value: any): void;
        error(error: any): void;
        completed(): void;
        start(): void;
        remove(observer: Observer): void;
        dispose(): void;
    }
}

/// <reference path="../definitions.d.ts" />
declare module dyRt {
    class Scheduler {
        static create(): Scheduler;
        publishRecursive(observer: IObserver, initial: any, action: Function): void;
        publishInterval(observer: IObserver, initial: any, interval: number, action: Function): number;
    }
}

/// <reference path="../definitions.d.ts" />
declare module dyRt {
    class Observer extends Entity implements IObserver {
        private _isDisposed;
        isDisposed: boolean;
        protected onUserNext: Function;
        protected onUserError: Function;
        protected onUserCompleted: Function;
        private _isStop;
        private _disposeHandler;
        constructor(onNext: Function, onError: Function, onCompleted: Function);
        next(value: any): void;
        error(error: any): void;
        completed(): void;
        dispose(): void;
        setDisposeHandler(disposeHandler: dyCb.Collection): void;
        protected onNext(value: any): void;
        protected onError(error: any): void;
        protected onCompleted(): void;
    }
}

/// <reference path="../definitions.d.ts" />
declare module dyRt {
    class AnonymousObserver extends Observer {
        static create(onNext: Function, onError: Function, onCompleted: Function): AnonymousObserver;
        protected onNext(value: any): void;
        protected onError(error: any): void;
        protected onCompleted(): void;
    }
}

/// <reference path="../definitions.d.ts" />
declare module dyRt {
    class AutoDetachObserver extends Observer {
        static create(onNext: Function, onError: Function, onCompleted: Function): AutoDetachObserver;
        dispose(): void;
        protected onNext(value: any): void;
        protected onError(err: any): void;
        protected onCompleted(): void;
    }
}

/// <reference path="../definitions.d.ts" />
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

/// <reference path="../definitions.d.ts" />
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

/// <reference path="../definitions.d.ts" />
declare module dyRt {
    class MergeAllObserver extends Observer {
        static create(currentObserver: IObserver, streamGroup: dyCb.Collection): MergeAllObserver;
        private _currentObserver;
        currentObserver: IObserver;
        private _streamGroup;
        private _done;
        done: boolean;
        constructor(currentObserver: IObserver, streamGroup: dyCb.Collection);
        protected onNext(innerSource: any): void;
        protected onError(error: any): void;
        protected onCompleted(): void;
    }
}

/// <reference path="../definitions.d.ts" />
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

/// <reference path="../definitions.d.ts" />
declare module dyRt {
    class BaseStream extends Stream {
        subscribeCore(observer: IObserver): void;
        subscribe(arg1: Function | Observer | Subject, onError?: any, onCompleted?: any): IDisposable;
        buildStream(observer: IObserver): void;
    }
}

/// <reference path="../definitions.d.ts" />
declare module dyRt {
    class DoStream extends BaseStream {
        static create(source: Stream, onNext?: Function, onError?: Function, onCompleted?: Function): DoStream;
        private _source;
        private _observer;
        constructor(source: Stream, onNext: Function, onError: Function, onCompleted: Function);
        buildStream(observer: IObserver): void;
    }
}

/// <reference path="../definitions.d.ts" />
declare module dyRt {
    class MapStream extends BaseStream {
        static create(source: Stream, selector: Function): MapStream;
        private _source;
        private _selector;
        constructor(source: Stream, selector: Function);
        buildStream(observer: IObserver): void;
    }
}

/// <reference path="../definitions.d.ts" />
declare module dyRt {
    class FromArrayStream extends BaseStream {
        static create(array: Array<any>, scheduler: Scheduler): FromArrayStream;
        private _array;
        constructor(array: Array<any>, scheduler: Scheduler);
        subscribeCore(observer: IObserver): void;
    }
}

/// <reference path="../definitions.d.ts" />
declare module dyRt {
    class FromPromiseStream extends BaseStream {
        static create(promise: any, scheduler: Scheduler): FromPromiseStream;
        private _promise;
        constructor(promise: any, scheduler: Scheduler);
        subscribeCore(observer: IObserver): void;
    }
}

/// <reference path="../definitions.d.ts" />
declare module dyRt {
    class FromEventPatternStream extends BaseStream {
        static create(addHandler: Function, removeHandler: Function): FromEventPatternStream;
        private _addHandler;
        private _removeHandler;
        constructor(addHandler: Function, removeHandler: Function);
        subscribeCore(observer: IObserver): void;
    }
}

/// <reference path="../definitions.d.ts" />
declare module dyRt {
    class AnonymousStream extends Stream {
        static create(subscribeFunc: Function): AnonymousStream;
        constructor(subscribeFunc: Function);
        subscribe(onNext: any, onError: any, onCompleted: any): IDisposable;
    }
}

/// <reference path="../definitions.d.ts" />
declare module dyRt {
    class IntervalStream extends BaseStream {
        static create(interval: number, scheduler: Scheduler): IntervalStream;
        private _interval;
        constructor(interval: number, scheduler: Scheduler);
        initWhenCreate(): void;
        subscribeCore(observer: IObserver): void;
    }
}

/// <reference path="../definitions.d.ts" />
declare module dyRt {
    class MergeAllStream extends BaseStream {
        static create(source: Stream): MergeAllStream;
        private _source;
        private _observer;
        constructor(source: Stream);
        buildStream(observer: IObserver): void;
    }
}

/// <reference path="../definitions.d.ts" />
declare module dyRt {
    class TakeUntilStream extends BaseStream {
        static create(source: Stream, otherSteam: Stream): TakeUntilStream;
        private _source;
        private _otherStream;
        constructor(source: Stream, otherStream: Stream);
        buildStream(observer: IObserver): void;
    }
}

/// <reference path="../definitions.d.ts" />
declare module dyRt {
    var createStream: (subscribeFunc: any) => AnonymousStream;
    var fromArray: (array: any[], scheduler?: Scheduler) => FromArrayStream;
    var fromPromise: (promise: any, scheduler?: Scheduler) => FromPromiseStream;
    var fromEventPattern: (addHandler: Function, removeHandler: Function) => FromEventPatternStream;
    var interval: (interval: any, scheduler?: Scheduler) => IntervalStream;
}

/// <reference path="../definitions.d.ts" />
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

/// <reference path="../definitions.d.ts" />
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
    }
}

/// <reference path="../definitions.d.ts" />
declare module dyRt {
    class MockPromise {
        static create(scheduler: TestScheduler, messages: [Record]): MockPromise;
        private _messages;
        private _scheduler;
        constructor(scheduler: TestScheduler, messages: [Record]);
        then(successCb: Function, errorCb: Function, observer: IObserver): void;
    }
}

/// <reference path="../definitions.d.ts" />
declare module dyRt {
    class TestScheduler extends Scheduler {
        static next(tick: any, value: any): Record;
        static error(tick: any, error: any): Record;
        static completed(tick: any): Record;
        static create(): TestScheduler;
        private _clock;
        clock: number;
        private _initialClock;
        private _isDisposed;
        private _timerMap;
        private _streamMap;
        private _subscribedTime;
        private _disposedTime;
        setStreamMap(observer: IObserver, messages: [Record]): void;
        remove(observer: Observer): void;
        publishRecursive(observer: IObserver, initial: any, recursiveFunc: Function): void;
        publishInterval(observer: IObserver, initial: any, interval: number, action: Function): number;
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
        subscribeCore(observer: IObserver): void;
    }
}

/// <reference path="definitions.d.ts" />
declare module dyRt {
    class JudgeUtils extends dyCb.JudgeUtils {
        static isPromise(obj: any): boolean;
        static isEqual(ob1: Entity, ob2: Entity): boolean;
    }
}

declare module Engine3D {
    class Point {
        x: number;
        y: number;
        constructor(x?: number, y?: number);
        static create(x?: number, y?: number): Point;
    }
}

declare module Engine3D {
    class Position {
        x: number;
        y: number;
        z: number;
        constructor(x: number, y: number, z: number);
        static create(x: number, y: number, z: number): Position;
    }
}

/// <reference path="../definitions.d.ts" />
declare module Engine3D {
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

/// <reference path="../definitions.d.ts" />
declare module Engine3D {
    class Vector3 {
        static create(x: any, y: any, z: any): Vector3;
        static create(): Vector3;
        private _values;
        values: Float32Array;
        constructor(x: any, y: any, z: any);
        constructor();
        normalize(): Vector3;
        sub(v: Vector3): Vector3;
        reverse(): Vector3;
        copy(): Vector3;
        toVec4(): Vector4;
    }
}

/// <reference path="../definitions.d.ts" />
declare module Engine3D {
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

/// <reference path="../definitions.d.ts" />
declare module Engine3D {
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
        /**
         * Calculate the inverse matrix of specified matrix, and set to this.
         * @param other The source matrix
         * @return this
         */
        setInverseOf(other: Matrix): Matrix;
        /**
         * Calculate the inverse matrix of specified matrix, and set to this.
         * @param other The source matrix
         * @return this
         */
        inverseOf(): Matrix;
        /**
         * Transpose the matrix.
         * @return this
         */
        transpose(): Matrix;
        /**
         * Set the matrix for translation.
         * @param x The X value of a translation.
         * @param y The Y value of a translation.
         * @param z The Z value of a translation.
         * @return this
         */
        setTranslate(x: any, y: any, z: any): Matrix;
        /**
         * Multiply the matrix for translation from the right.
         * @param x The X value of a translation.
         * @param y The Y value of a translation.
         * @param z The Z value of a translation.
         * @return this
         */
        translate(x: any, y: any, z: any): Matrix;
        /**
         * Set the matrix for rotation.
         * The vector of rotation axis may not be normalized.
         * @param angle The angle of rotation (degrees)
         * @param x The X coordinate of vector of rotation axis.
         * @param y The Y coordinate of vector of rotation axis.
         * @param z The Z coordinate of vector of rotation axis.
         * @return this
         */
        setRotate(angle: number, x: number, y: number, z: number): Matrix;
        /**
         * Multiply the matrix for rotation from the right.
         * The vector of rotation axis may not be normalized.
         * @param angle The angle of rotation (degrees)
         * @param x The X coordinate of vector of rotation axis.
         * @param y The Y coordinate of vector of rotation axis.
         * @param z The Z coordinate of vector of rotation axis.
         * @return this
         */
        rotate(angle: any, x: any, y: any, z: any): Matrix;
        /**
         * Set the matrix for scaling.
         * @param x The scale factor along the X axis
         * @param y The scale factor along the Y axis
         * @param z The scale factor along the Z axis
         * @return this
         */
        setScale(x: any, y: any, z: any): Matrix;
        /**
         * Multiply the matrix for scaling from the right.
         * @param x The scale factor along the X axis
         * @param y The scale factor along the Y axis
         * @param z The scale factor along the Z axis
         * @return this
         */
        scale(x: any, y: any, z: any): Matrix;
        setLookAt(eyeX: any, eyeY: any, eyeZ: any, centerX: any, centerY: any, centerZ: any, upX: any, upY: any, upZ: any): Matrix;
        /**
         * Multiply the viewing matrix from the right.
         * @param eyeX, eyeY, eyeZ The position of the eye point.
         * @param centerX, centerY, centerZ The position of the reference point.
         * @param upX, upY, upZ The direction of the up vector.
         * @return this
         */
        lookAt(eyeX: any, eyeY: any, eyeZ: any, centerX: any, centerY: any, centerZ: any, upX: any, upY: any, upZ: any): Matrix;
        setOrtho(near: any, far: any): Matrix;
        ortho(n: any, f: any): Matrix;
        /**
         * Set the perspective projection matrix by fovy and aspect.
         * @param fovy The angle between the upper and lower sides of the frustum.
         * @param aspect The aspect ratio of the frustum. (width/height)
         * @param near The distances to the nearer depth clipping plane. This value must be plus value.
         * @param far The distances to the farther depth clipping plane. This value must be plus value.
         * @return this
         */
        setPerspective(fovy: number, aspect: any, near: any, far: any): Matrix;
        perspective(fovy: any, aspect: any, near: any, far: any): Matrix;
        applyMatrix(other: Matrix): Matrix;
        multiply(matrix2: Matrix): Matrix;
        multiplyVector4(vector: Vector4): Vector4;
        copy(): Matrix;
    }
}

/// <reference path="../definitions.d.ts" />
declare module Engine3D {
    class Action {
        private _isFinish;
        isFinish: boolean;
        protected matrix: Matrix;
        constructor(matrix: Matrix);
        update(): any;
        protected finish(): void;
    }
}

/// <reference path="../definitions.d.ts" />
declare module Engine3D {
    class ActionManager {
        static create(): ActionManager;
        private _children;
        constructor();
        addChild(action: Action): void;
        hasChild(action: Action): boolean;
        update(): void;
    }
}

/// <reference path="../definitions.d.ts" />
declare module Engine3D {
    class Rotate extends Action {
        static create(matrix: any, actionData: any): Rotate;
        private _speed;
        private _axis;
        private _point;
        private _angle;
        constructor(matrix: Matrix, axisData: {
            speed: number;
            axis: Vector3[];
        });
        update(): void;
        private _isNotRotateAroundOriginPoint();
    }
}

/// <reference path="../definitions.d.ts" />
declare module Engine3D {
    class Scale extends Action {
        static create(matrix: any, data: any): Scale;
        private _x;
        private _y;
        private _z;
        constructor(matrix: Matrix, data: {
            x: number;
            y: number;
            z: number;
        });
        update(): void;
    }
}

/// <reference path="../definitions.d.ts" />
declare module Engine3D {
    class Translate extends Action {
        static create(matrix: any, posData: any): Translate;
        private _x;
        private _y;
        private _z;
        constructor(matrix: Matrix, posData: {
            x: number;
            y: number;
            z: number;
        });
        update(): void;
    }
}

declare module Engine3D {
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

/// <reference path="../definitions.d.ts" />
declare module Engine3D {
    class JudgeUtils extends dyCb.JudgeUtils {
        static isView(obj: any): boolean;
        static isEqual(target1: GameObject, target2: GameObject): boolean;
    }
}

declare module Engine3D {
    enum ShaderType {
        VS = 0,
        FS = 1,
    }
}

/// <reference path="../definitions.d.ts" />
declare module Engine3D {
    class Shader {
        constructor();
        static createShader(source: string, type: ShaderType): any;
    }
}

declare module Engine3D {
    enum BufferType {
        UNSIGNED_BYTE,
        SHORT,
        UNSIGNED_SHORT,
        INT,
        UNSIGNED_INT,
        FLOAT,
    }
}

declare module Engine3D {
    enum AttributeDataType {
        FLOAT_4 = 0,
        BUFFER = 1,
    }
}

declare module Engine3D {
    enum DrawMode {
        TRIANGLES,
    }
}

/// <reference path="../definitions.d.ts" />
declare module Engine3D {
    class ElementBuffer {
        static create(data: any, type: BufferType): ElementBuffer;
        private _buffer;
        buffer: any;
        private _type;
        type: string;
        private _num;
        num: number;
        private _typeSize;
        typeSize: number;
        initWhenCreate(data: any, type: BufferType): any;
        private _checkDataType(data, type);
        private _getInfo(type);
    }
}

/// <reference path="../definitions.d.ts" />
declare module Engine3D {
    class ArrayBuffer {
        static create(data: any, num: any, type: BufferType): ArrayBuffer;
        private _buffer;
        buffer: any;
        private _num;
        num: number;
        private _type;
        type: string;
        private _count;
        count: number;
        initWhenCreate(data: any, num: any, type: BufferType): any;
    }
}

declare module Engine3D {
    enum UniformDataType {
        FLOAT_MAT4 = 0,
    }
}

/// <reference path="../definitions.d.ts" />
declare module Engine3D {
    class Program {
        static create(vsSource: string, fsSource: string): Program;
        private _program;
        constructor();
        use(): void;
        setUniformData(name: string, type: UniformDataType, data: Matrix): void;
        setAttributeData(name: string, type: AttributeDataType, data: ArrayBuffer | number[]): void;
        initWhenCreate(vsSource: string, fsSource: string): any;
    }
}

/// <reference path="../definitions.d.ts" />
declare module Engine3D {
    class QuadCommand {
        static create(): QuadCommand;
        private _buffers;
        buffers: any;
        private _color;
        color: Color;
        private _drawMode;
        drawMode: DrawMode;
        execute(scene: Scene): void;
        init(): void;
        private _sendData(program);
        private _draw();
    }
}

/// <reference path="../definitions.d.ts" />
declare module Engine3D {
    class WebGLRenderer {
        static create(): WebGLRenderer;
        private _commandQueue;
        private _clearColor;
        private _clearAlpha;
        createQuadCommand(): QuadCommand;
        addCommand(command: QuadCommand): void;
        render(scene: Scene): void;
        init(): void;
        setClearColor(color: Color, alpha?: number): void;
        private _clearCommand();
    }
}

/// <reference path="../definitions.d.ts" />
declare module Engine3D {
    class MeshMaterial {
        static create(params: any): MeshMaterial;
        private _color;
        color: Color;
        constructor(params: any);
    }
}

/// <reference path="../definitions.d.ts" />
declare module Engine3D {
    class GLSLLoader {
        private static _instance;
        static getInstance(): GLSLLoader;
        private _container;
        load(url: string, id: string): dyRt.DoStream;
        getGLSL(id: string): string;
        private _loadText(url);
    }
}

/// <reference path="../definitions.d.ts" />
declare module Engine3D {
    class LoaderManager {
        private static _instance;
        static getInstance(): LoaderManager;
        private _resCount;
        private _currentLoadedCount;
        onload: Function;
        onloading: Function;
        getResourceCount(): number;
        getCurrentLoadedCount(): number;
        load(resourcesArr: Array<{
            url: string;
            id: string;
        }>): dyRt.MergeAllStream;
        reset(): void;
        onResLoaded(): void;
        onResError(path: any, err: any): void;
        private _isFinishLoad();
    }
}

/// <reference path="../definitions.d.ts" />
declare module Engine3D {
    class Geometry {
        private _vertices;
        vertices: ArrayBuffer;
        private _indices;
        indices: ElementBuffer;
        private _colors;
        colors: ArrayBuffer;
        protected material: MeshMaterial;
        constructor(material: any);
        initWhenCreate(): void;
        protected computeVerticesBuffer(): ArrayBuffer;
        protected computeIndicesBuffer(): ElementBuffer;
        private _computeColorsBuffer(material);
    }
}

/// <reference path="../definitions.d.ts" />
declare module Engine3D {
    class BoxGeometry extends Geometry {
        static create(width: number, height: number, depth: number, material: MeshMaterial): BoxGeometry;
        private _width;
        private _height;
        private _depth;
        constructor(width: number, height: number, depth: number, material: MeshMaterial);
        protected computeVerticesBuffer(): ArrayBuffer;
        protected computeIndicesBuffer(): ElementBuffer;
    }
}

/// <reference path="../definitions.d.ts" />
declare module Engine3D {
    class RectGeometry extends Geometry {
        static create(width: number, height: number, material: MeshMaterial): RectGeometry;
        private _width;
        private _height;
        constructor(width: any, height: any, material: any);
        protected computeVerticesBuffer(): ArrayBuffer;
        protected computeIndicesBuffer(): ElementBuffer;
    }
}

declare module Engine3D {
    enum SphereDrawMode {
        LATITUDELONGTITUDE = 0,
        DECOMPOSITION = 1,
    }
}

/// <reference path="../definitions.d.ts" />
declare module Engine3D {
    class SphereGeometry extends Geometry {
        static create(radius: number, drawMode: SphereDrawMode, segments: number, material: MeshMaterial): SphereGeometry;
        private _radius;
        private _drawMode;
        private _segments;
        private _data;
        constructor(radius: number, drawMode: SphereDrawMode, segments: number, material: MeshMaterial);
        initWhenCreate(): void;
        protected computeVerticesBuffer(): any;
        protected computeIndicesBuffer(): any;
        private _computeData(radius, drawMode, segments);
    }
}

/// <reference path="../definitions.d.ts" />
declare module Engine3D {
    class TriangleGeometry extends Geometry {
        static create(width: number, height: number, material: MeshMaterial): TriangleGeometry;
        private _width;
        private _height;
        constructor(width: number, height: number, material: MeshMaterial);
        protected computeVerticesBuffer(): ArrayBuffer;
        protected computeIndicesBuffer(): ElementBuffer;
    }
}

/// <reference path="../../definitions.d.ts" />
declare module Engine3D {
    interface IEventOffData {
        eventName: EventName;
        wrapHandler: Function;
    }
    class EventListenerMap {
        static create(): EventListenerMap;
        private _listenerMap;
        appendChild(eventName: EventName, data: IEventRegisterData): void;
        getChild(eventName: EventName): any;
        getChild(target: GameObject): any;
        getChild(target: GameObject, eventName: EventName): any;
        hasChild(...args: any[]): boolean;
        filter(func: Function): dyCb.Hash;
        forEach(func: Function): dyCb.Hash;
        removeChild(eventName: EventName): void;
        removeChild(eventName: EventName, handler: Function): void;
        removeChild(uid: number, eventName: EventName): void;
        removeChild(target: GameObject): void;
        removeChild(target: GameObject, eventName: EventName): void;
        removeChild(target: GameObject, eventName: EventName, handler: Function): void;
        getEventOffDataList(target: GameObject, eventName?: EventName): dyCb.Collection;
        getEventNameFromKey(key: string): EventName;
        getUidFromKey(key: string): number;
        isTarget(key: string, target: GameObject, list: dyCb.Collection): boolean;
        private _buildKey(uid, eventName);
        private _buildKey(target, eventName);
        private _buildKeyWithUid(uid, eventName);
    }
}

declare module Engine3D {
    enum EventType {
        MOUSE = 0,
        KEYBOARD = 1,
        CUSTOM = 2,
    }
}

declare module Engine3D {
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

declare module Engine3D {
    enum EventPhase {
        BROADCAST = 0,
        EMIT = 1,
    }
}

/// <reference path="../../definitions.d.ts" />
declare module Engine3D {
    class EventTable {
        static getEventType(eventName: EventName): EventType;
    }
}

/// <reference path="../../definitions.d.ts" />
declare module Engine3D {
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
        copy(): Event;
        stopPropagation(): void;
        protected copyMember(destination: Event, source: Event, memberArr: [any]): Event;
    }
}

/// <reference path="../../definitions.d.ts" />
declare module Engine3D {
    class MouseEvent extends Event {
        static create(event: any, eventName: EventName): MouseEvent;
        constructor(event: any, eventName: EventName);
        type: EventType;
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

/// <reference path="../../definitions.d.ts" />
declare module Engine3D {
    class KeyboardEvent extends Event {
        static create(event: any, eventName: EventName): KeyboardEvent;
        constructor(event: any, eventName: EventName);
        type: EventType;
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

/// <reference path="../../definitions.d.ts" />
declare module Engine3D {
    class CustomEvent extends Event {
        static create(eventName: string): CustomEvent;
        type: EventType;
        private _userData;
        userData: any;
        copyPublicAttri(destination: any, source: any): any;
        copy(): any;
    }
}

declare module Engine3D {
    enum MouseButton {
        LEFT = 0,
        RIGHT = 1,
        CENTER = 2,
    }
}

/// <reference path="../../definitions.d.ts" />
declare module Engine3D {
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
        handlerDataList: dyCb.Collection;
        constructor(option: any);
        initWhenCreate(option: {
            any;
        }): void;
        private _setHandlerDataList(option);
        private _parseEventName(handlerName);
    }
}

/// <reference path="../../definitions.d.ts" />
declare module Engine3D {
    class EventHandler {
        on(...args: any[]): void;
        off(...args: any[]): void;
        trigger(...args: any[]): boolean;
    }
}

/// <reference path="../../definitions.d.ts" />
declare module Engine3D {
    class DomEventHandler extends EventHandler {
        off(...args: any[]): void;
        protected getDom(): any;
        protected buildWrapHandler(target: GameObject, eventName: EventName): any;
        protected handler(target: any, eventName: any, handler: any, priority: any): void;
        private _bind(dom, eventName, target);
        private _unBind(dom, eventName, handler);
    }
}

/// <reference path="../../definitions.d.ts" />
declare module Engine3D {
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

/// <reference path="../../definitions.d.ts" />
declare module Engine3D {
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

/// <reference path="../../definitions.d.ts" />
declare module Engine3D {
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

/// <reference path="../../definitions.d.ts" />
declare module Engine3D {
    class EventDispatcher {
        static create(): EventDispatcher;
        constructor();
        trigger(event: Event): boolean;
        trigger(event: Event, userData: any): void;
        trigger(target: GameObject, event: Event): boolean;
        trigger(target: GameObject, event: Event, notSetTarget: boolean): boolean;
        trigger(target: GameObject, event: Event, userData: any): boolean;
        trigger(target: GameObject, event: Event, userData: any, notSetTarget: boolean): boolean;
        /**
         * transfer event up
         * @param target
         * @param eventObject
         */
        emit(target: GameObject, eventObject: Event, userData?: any): void;
        /**
         * transfer event down
         * @param target
         * @param eventObject
         */
        broadcast(target: GameObject, eventObject: Event, userData?: any): void;
        private _getParent(target);
        private _triggerWithUserData(target, event, userData, notSetTarget);
    }
}

/// <reference path="../../definitions.d.ts" />
declare module Engine3D {
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
        getEventRegisterDataList(eventName: EventName): dyCb.Collection;
        getEventRegisterDataList(currentTarget: GameObject, eventName: EventName): dyCb.Collection;
        setBubbleParent(target: GameObject, parent: GameObject): void;
        isBinded(target: GameObject, eventName: EventName): boolean;
        filter(func: Function): dyCb.Hash;
        forEach(func: Function): dyCb.Hash;
        getChild(target: GameObject, eventName?: EventName): any;
        getEventNameFromKey(key: string): EventName;
        getUidFromKey(key: string): number;
        getWrapHandler(target: GameObject, eventName: EventName): any;
        isTarget(key: string, target: GameObject, list: dyCb.Collection): boolean;
        private _isAllEventHandlerRemoved(target);
        private _handleAfterAllEventHandlerRemoved(target);
    }
}

/// <reference path="../../definitions.d.ts" />
declare module Engine3D {
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

/// <reference path="../../definitions.d.ts" />
declare module Engine3D {
    class FactoryEventHandler {
        static createEventHandler(eventType: EventType): any;
    }
}

/// <reference path="../definitions.d.ts" />
declare module Engine3D {
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
        static fromEvent(eventName: EventName): any;
        static fromEvent(eventName: EventName, priority: number): any;
        static fromEvent(target: GameObject, eventName: EventName): any;
        static fromEvent(target: GameObject, eventName: EventName, priority: number): any;
        static setBubbleParent(target: GameObject, parent: any): void;
    }
}

/// <reference path="../definitions.d.ts" />
declare module Engine3D {
    class GameObject {
        private static _count;
        private _uid;
        uid: number;
        private _position;
        position: Position;
        private _parent;
        parent: GameObject;
        private _bubbleParent;
        bubbleParent: GameObject;
        private _children;
        constructor();
        init(): void;
        dispose(): void;
        onEnter(): void;
        onStartLoop(): void;
        onEndLoop(): void;
        onExit(): void;
        hasChild(child: GameObject): boolean;
        addChild(child: GameObject): GameObject;
        getChilren(): dyCb.Collection;
        sort(): GameObject;
        forEach(func: Function): GameObject;
        removeChild(child: GameObject): GameObject;
        /**
         * remove this game object from parent.
         * @returns {boolean}
         */
        removeMe(): GameObject;
        getTopUnderPoint(point: Point): GameObject;
        isHit(locationInView: Point): boolean;
        private _ascendZ(a, b);
    }
}

/// <reference path="../definitions.d.ts" />
declare module Engine3D {
    class Mesh extends GameObject {
        static create(gemo: Geometry): Mesh;
        private _matrix;
        matrix: Matrix;
        private _gemo;
        private _actionManager;
        constructor(gemo: Geometry);
        runAction(action: Action): void;
        update(): void;
        draw(): void;
        init(): void;
        private _addDrawCommand();
    }
}

/// <reference path="../definitions.d.ts" />
declare module Engine3D {
    class Scene extends GameObject {
        static create(camera: Camera, vsSource: string, fsSource: string): Scene;
        private _camera;
        camera: Camera;
        private _program;
        program: Program;
        constructor(camera: any);
        initWhenCreate(vsSource: string, fsSource: string): void;
        run(): void;
        init(): void;
        private _setData(mesh);
        private _computeMvpMatrix(mesh);
    }
}

/// <reference path="../definitions.d.ts" />
declare module Engine3D {
    class Director {
        private static _instance;
        static getInstance(): Director;
        private _renderer;
        renderer: WebGLRenderer;
        private _view;
        view: IView;
        private _gl;
        gl: any;
        private _scene;
        private _loopId;
        initWhenCreate(): void;
        runWithScene(scene: Scene): void;
        getView(): IView;
        getTopUnderPoint(point: Point): GameObject;
        createGL(canvasId: string): void;
        private _startLoop();
        private _loopBody(time);
    }
}

/// <reference path="definitions.d.ts" />
declare module Engine3D {
    class Camera {
        static create(lookAtParams: any, perspectiveParams: any): Camera;
        private _pMatrix;
        pMatrix: Matrix;
        private _vMatrix;
        vMatrix: Matrix;
        private _moveSpeed;
        moveSpeed: number;
        private _rotateStepX;
        rotateStepX: number;
        private _rotateStepY;
        rotateStepY: number;
        private _zoomSpeed;
        zoomSpeed: number;
        private _eyeX;
        private _eyeY;
        private _eyeZ;
        private _upX;
        private _upY;
        private _upZ;
        private _centerX;
        private _centerY;
        private _centerZ;
        private _zoomAngle;
        private _aspect;
        private _near;
        private _far;
        private _moveX;
        private _moveY;
        private _moveZ;
        private _rotateAngleX;
        private _rotateAngleY;
        private _zoomInAngle;
        private _zoomOutAngle;
        constructor(lookAtParams: any, perspectiveParams: any);
        initWhenCreate(): void;
        computeVpMatrix(): Matrix;
        moveLeft(): void;
        moveRight(): void;
        moveBack(): void;
        moveFront(): void;
        rotate(): void;
        zoomIn(): void;
        zoomOut(): void;
        run(): void;
        pushMatrix(): void;
        popMatrix(): void;
        onStartLoop(): void;
        onEndLoop(): void;
        private _computeMoveDistance(speedVec4);
    }
}
