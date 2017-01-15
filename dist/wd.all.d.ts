/*!
 * wonder - 3d html5 game engine
 * @version v0.8.0
 * @link https://github.com/yyc-git/Wonder.js
 * @license MIT
 */

declare class bowser{
public static chrome:boolean;
public static android:boolean;
public static osversion:string;
public static tablet:boolean;
public static version:string;
public static webkit:boolean;
public static a:boolean;
public static mobile:boolean;
public static c:boolean;
public static iphone:boolean;
public static ios:boolean;
public static ipad:boolean;
public static name:string;
public static silk:boolean;
public static x:boolean;
public static opera:boolean;
public static safari:boolean;
public static msie:boolean;
public static gecko:boolean;
public static firefox:boolean;
public static firefoxos:boolean;
public static seamonkey:boolean;
public static ipod:boolean;
public static blackberry:boolean;
public static windowsphone:boolean;
public static touchpad:boolean;
public static webos:boolean;
public static bada:boolean;
public static tizen:boolean;
public static sailfish:boolean;
public static phantom:boolean;
}
// Type definitions for chai 3.2.0
// Project: http://chaijs.com/
// Definitions by: Jed Mao <https://github.com/jedmao/>,
//                 Bart van der Schoor <https://github.com/Bartvds>,
//                 Andrew Brown <https://github.com/AGBrown>,
//                 Olivier Chevet <https://github.com/olivr70>
// Definitions: https://github.com/DefinitelyTyped/DefinitelyTyped

// <reference path="../assertion-error/assertion-error.d.ts"/>

declare namespace Chai {

    interface ChaiStatic {
        expect: ExpectStatic;
        should(): Should;
        /**
         * Provides a way to extend the internals of Chai
         */
        use(fn: (chai: any, utils: any) => void): any;
        assert: AssertStatic;
        config: Config;
        AssertionError: typeof AssertionError;
    }

    export interface ExpectStatic extends AssertionStatic {
        fail(actual?: any, expected?: any, message?: string, operator?: string): void;
    }

    export interface AssertStatic extends Assert {
    }

    export interface AssertionStatic {
        (target: any, message?: string): Assertion;
    }

    interface ShouldAssertion {
        equal(value1: any, value2: any, message?: string): void;
        Throw: ShouldThrow;
        throw: ShouldThrow;
        exist(value: any, message?: string): void;
    }

    interface Should extends ShouldAssertion {
        not: ShouldAssertion;
        fail(actual: any, expected: any, message?: string, operator?: string): void;
    }

    interface ShouldThrow {
        (actual: Function): void;
        (actual: Function, expected: string|RegExp, message?: string): void;
        (actual: Function, constructor: Error|Function, expected?: string|RegExp, message?: string): void;
    }

    interface Assertion extends LanguageChains, NumericComparison, TypeComparison {
        not: Assertion;
        deep: Deep;
        any: KeyFilter;
        all: KeyFilter;
        a: TypeComparison;
        an: TypeComparison;
        include: Include;
        includes: Include;
        contain: Include;
        contains: Include;
        ok: Assertion;
        true: Assertion;
        false: Assertion;
        null: Assertion;
        undefined: Assertion;
        NaN: Assertion;
        exist: Assertion;
        empty: Assertion;
        arguments: Assertion;
        Arguments: Assertion;
        equal: Equal;
        equals: Equal;
        eq: Equal;
        eql: Equal;
        eqls: Equal;
        property: Property;
        ownProperty: OwnProperty;
        haveOwnProperty: OwnProperty;
        ownPropertyDescriptor: OwnPropertyDescriptor;
        haveOwnPropertyDescriptor: OwnPropertyDescriptor;
        length: Length;
        lengthOf: Length;
        match: Match;
        matches: Match;
        string(string: string, message?: string): Assertion;
        keys: Keys;
        key(string: string): Assertion;
        throw: Throw;
        throws: Throw;
        Throw: Throw;
        respondTo: RespondTo;
        respondsTo: RespondTo;
        itself: Assertion;
        satisfy: Satisfy;
        satisfies: Satisfy;
        closeTo(expected: number, delta: number, message?: string): Assertion;
        members: Members;
        increase: PropertyChange;
        increases: PropertyChange;
        decrease: PropertyChange;
        decreases: PropertyChange;
        change: PropertyChange;
        changes: PropertyChange;
        extensible: Assertion;
        sealed: Assertion;
        frozen: Assertion;

    }

    interface LanguageChains {
        to: Assertion;
        be: Assertion;
        been: Assertion;
        is: Assertion;
        that: Assertion;
        which: Assertion;
        and: Assertion;
        has: Assertion;
        have: Assertion;
        with: Assertion;
        at: Assertion;
        of: Assertion;
        same: Assertion;
    }

    interface NumericComparison {
        above: NumberComparer;
        gt: NumberComparer;
        greaterThan: NumberComparer;
        least: NumberComparer;
        gte: NumberComparer;
        below: NumberComparer;
        lt: NumberComparer;
        lessThan: NumberComparer;
        most: NumberComparer;
        lte: NumberComparer;
        within(start: number, finish: number, message?: string): Assertion;
    }

    interface NumberComparer {
        (value: number, message?: string): Assertion;
    }

    interface TypeComparison {
        (type: string, message?: string): Assertion;
        instanceof: InstanceOf;
        instanceOf: InstanceOf;
    }

    interface InstanceOf {
        (constructor: Object, message?: string): Assertion;
    }

    interface Deep {
        equal: Equal;
        include: Include;
        property: Property;
        members: Members;
    }

    interface KeyFilter {
        keys: Keys;
    }

    interface Equal {
        (value: any, message?: string): Assertion;
    }

    interface Property {
        (name: string, value?: any, message?: string): Assertion;
    }

    interface OwnProperty {
        (name: string, message?: string): Assertion;
    }

    interface OwnPropertyDescriptor {
        (name: string, descriptor: PropertyDescriptor, message?: string): Assertion;
        (name: string, message?: string): Assertion;
    }

    interface Length extends LanguageChains, NumericComparison {
        (length: number, message?: string): Assertion;
    }

    interface Include {
        (value: Object, message?: string): Assertion;
        (value: string, message?: string): Assertion;
        (value: number, message?: string): Assertion;
        keys: Keys;
        members: Members;
        any: KeyFilter;
        all: KeyFilter;
    }

    interface Match {
        (regexp: RegExp|string, message?: string): Assertion;
    }

    interface Keys {
        (...keys: string[]): Assertion;
        (keys: any[]): Assertion;
        (keys: Object): Assertion;
    }

    interface Throw {
        (): Assertion;
        (expected: string, message?: string): Assertion;
        (expected: RegExp, message?: string): Assertion;
        (constructor: Error, expected?: string, message?: string): Assertion;
        (constructor: Error, expected?: RegExp, message?: string): Assertion;
        (constructor: Function, expected?: string, message?: string): Assertion;
        (constructor: Function, expected?: RegExp, message?: string): Assertion;
    }

    interface RespondTo {
        (method: string, message?: string): Assertion;
    }

    interface Satisfy {
        (matcher: Function, message?: string): Assertion;
    }

    interface Members {
        (set: any[], message?: string): Assertion;
    }

    interface PropertyChange {
        (object: Object, prop: string, msg?: string): Assertion;
    }

    export interface Assert {
        /**
         * @param expression Expression to test for truthiness.
         * @param message Message to display on error.
         */
        (expression: any, message?: string): void;

        fail(actual?: any, expected?: any, msg?: string, operator?: string): void;

        ok(val: any, msg?: string): void;
        isOk(val: any, msg?: string): void;
        notOk(val: any, msg?: string): void;
        isNotOk(val: any, msg?: string): void;

        equal(act: any, exp: any, msg?: string): void;
        notEqual(act: any, exp: any, msg?: string): void;

        strictEqual(act: any, exp: any, msg?: string): void;
        notStrictEqual(act: any, exp: any, msg?: string): void;

        deepEqual(act: any, exp: any, msg?: string): void;
        notDeepEqual(act: any, exp: any, msg?: string): void;

        isTrue(val: any, msg?: string): void;
        isFalse(val: any, msg?: string): void;

        isNull(val: any, msg?: string): void;
        isNotNull(val: any, msg?: string): void;

        isUndefined(val: any, msg?: string): void;
        isDefined(val: any, msg?: string): void;

        isNaN(val: any, msg?: string): void;
        isNotNaN(val: any, msg?: string): void;

        isAbove(val: number, abv: number, msg?: string): void;
        isBelow(val: number, blw: number, msg?: string): void;

        isFunction(val: any, msg?: string): void;
        isNotFunction(val: any, msg?: string): void;

        isObject(val: any, msg?: string): void;
        isNotObject(val: any, msg?: string): void;

        isArray(val: any, msg?: string): void;
        isNotArray(val: any, msg?: string): void;

        isString(val: any, msg?: string): void;
        isNotString(val: any, msg?: string): void;

        isNumber(val: any, msg?: string): void;
        isNotNumber(val: any, msg?: string): void;

        isBoolean(val: any, msg?: string): void;
        isNotBoolean(val: any, msg?: string): void;

        typeOf(val: any, type: string, msg?: string): void;
        notTypeOf(val: any, type: string, msg?: string): void;

        instanceOf(val: any, type: Function, msg?: string): void;
        notInstanceOf(val: any, type: Function, msg?: string): void;

        include(exp: string, inc: any, msg?: string): void;
        include(exp: any[], inc: any, msg?: string): void;

        notInclude(exp: string, inc: any, msg?: string): void;
        notInclude(exp: any[], inc: any, msg?: string): void;

        match(exp: any, re: RegExp, msg?: string): void;
        notMatch(exp: any, re: RegExp, msg?: string): void;

        property(obj: Object, prop: string, msg?: string): void;
        notProperty(obj: Object, prop: string, msg?: string): void;
        deepProperty(obj: Object, prop: string, msg?: string): void;
        notDeepProperty(obj: Object, prop: string, msg?: string): void;

        propertyVal(obj: Object, prop: string, val: any, msg?: string): void;
        propertyNotVal(obj: Object, prop: string, val: any, msg?: string): void;

        deepPropertyVal(obj: Object, prop: string, val: any, msg?: string): void;
        deepPropertyNotVal(obj: Object, prop: string, val: any, msg?: string): void;

        lengthOf(exp: any, len: number, msg?: string): void;
        //alias frenzy
        throw(fn: Function, msg?: string): void;
        throw(fn: Function, regExp: RegExp): void;
        throw(fn: Function, errType: Function, msg?: string): void;
        throw(fn: Function, errType: Function, regExp: RegExp): void;

        throws(fn: Function, msg?: string): void;
        throws(fn: Function, regExp: RegExp): void;
        throws(fn: Function, errType: Function, msg?: string): void;
        throws(fn: Function, errType: Function, regExp: RegExp): void;

        Throw(fn: Function, msg?: string): void;
        Throw(fn: Function, regExp: RegExp): void;
        Throw(fn: Function, errType: Function, msg?: string): void;
        Throw(fn: Function, errType: Function, regExp: RegExp): void;

        doesNotThrow(fn: Function, msg?: string): void;
        doesNotThrow(fn: Function, regExp: RegExp): void;
        doesNotThrow(fn: Function, errType: Function, msg?: string): void;
        doesNotThrow(fn: Function, errType: Function, regExp: RegExp): void;

        operator(val: any, operator: string, val2: any, msg?: string): void;
        closeTo(act: number, exp: number, delta: number, msg?: string): void;

        sameMembers(set1: any[], set2: any[], msg?: string): void;
        sameDeepMembers(set1: any[], set2: any[], msg?: string): void;
        includeMembers(superset: any[], subset: any[], msg?: string): void;

        ifError(val: any, msg?: string): void;

        isExtensible(obj: {}, msg?: string): void;
        extensible(obj: {}, msg?: string): void;
        isNotExtensible(obj: {}, msg?: string): void;
        notExtensible(obj: {}, msg?: string): void;

        isSealed(obj: {}, msg?: string): void;
        sealed(obj: {}, msg?: string): void;
        isNotSealed(obj: {}, msg?: string): void;
        notSealed(obj: {}, msg?: string): void;

        isFrozen(obj: Object, msg?: string): void;
        frozen(obj: Object, msg?: string): void;
        isNotFrozen(obj: Object, msg?: string): void;
        notFrozen(obj: Object, msg?: string): void;


    }

    export interface Config {
        includeStack: boolean;
    }

    export class AssertionError {
        constructor(message: string, _props?: any, ssf?: Function);
        name: string;
        message: string;
        showDiff: boolean;
        stack: string;
    }
}

declare var chai: Chai.ChaiStatic;

declare module "chai" {
    export = chai;
}

interface Object {
    should: Chai.Assertion;
}
// Type definitions for RSVP 3.0.9
// Project: github.com/tildeio/rsvp.js 3.0.9
// Definitions by: Taylor Brown <https://github.com/Taytay>
// Definitions: https://github.com/borisyankov/DefinitelyTyped

// Some of this file was taken from the type definitions for es6-promise https://github.com/borisyankov/DefinitelyTyped/blob/master/es6-promise/es6-promise.d.ts
// Credit for that file goes to: François de Campredon <https://github.com/fdecampredon/>

// Some of this file was taken from the type definitions for Q : https://github.com/borisyankov/DefinitelyTyped/blob/master/q/Q.d.ts
// Credit for that file goes to: Barrie Nemetchek <https://github.com/bnemetchek>, Andrew Gaspar <https://github.com/AndrewGaspar/>, John Reilly <https://github.com/johnnyreilly>

declare module RSVP {

    interface Thenable<R> {
        then<U>(onFulfilled?:(value:R) => Thenable<U>, onRejected?:(error:any) => Thenable<U>): Thenable<U>;
        then<U>(onFulfilled?:(value:R) => Thenable<U>, onRejected?:(error:any) => U): Thenable<U>;
        then<U>(onFulfilled?:(value:R) => Thenable<U>, onRejected?:(error:any) => void): Thenable<U>;
        then<U>(onFulfilled?:(value:R) => U, onRejected?:(error:any) => Thenable<U>): Thenable<U>;
        then<U>(onFulfilled?:(value:R) => U, onRejected?:(error:any) => U): Thenable<U>;
        then<U>(onFulfilled?:(value:R) => U, onRejected?:(error:any) => void): Thenable<U>;
    }

    interface Deferred<T> {
        promise: Promise<T>;
        resolve(value: T): void;
        reject(reason: any): void;
    }

    class Promise<R> implements Thenable<R> {
        /**
         * If you call resolve in the body of the callback passed to the constructor,
         * your promise is fulfilled with result object passed to resolve.
         * If you call reject your promise is rejected with the object passed to resolve.
         * For consistency and debugging (eg stack traces), obj should be an instanceof Error.
         * Any errors thrown in the constructor callback will be implicitly passed to reject().
         */
        constructor(callback:(resolve:(result?:R) => void, reject:(error:any) => void) => void, label? : string);

        /**
         * If you call resolve in the body of the callback passed to the constructor,
         * your promise will be fulfilled/rejected with the outcome of thenable passed to resolve.
         * If you call reject your promise is rejected with the object passed to resolve.
         * For consistency and debugging (eg stack traces), obj should be an instanceof Error.
         * Any errors thrown in the constructor callback will be implicitly passed to reject().
         */
        constructor(callback:(resolve:(thenable?:Thenable<R>) => void, reject:(error:any) => void) => void, label? : string);

        /**
         * onFulfilled is called when/if "promise" resolves. onRejected is called when/if "promise" rejects.
         * Both are optional, if either/both are omitted the next onFulfilled/onRejected in the chain is called.
         * Both callbacks have a single parameter , the fulfillment value or rejection reason.
         * "then" returns a new promise equivalent to the value you return from onFulfilled/onRejected after being passed through Promise.resolve.
         * If an error is thrown in the callback, the returned promise rejects with that error.
         *
         * @param onFulfilled called when/if "promise" resolves
         * @param onRejected called when/if "promise" rejects
         */
        then<U>(onFulfilled?:(value:R) => Thenable<U>, onRejected?:(error:any) => Thenable<U>):Promise<U>;

        /**
         * onFulfilled is called when/if "promise" resolves. onRejected is called when/if "promise" rejects.
         * Both are optional, if either/both are omitted the next onFulfilled/onRejected in the chain is called.
         * Both callbacks have a single parameter , the fulfillment value or rejection reason.
         * "then" returns a new promise equivalent to the value you return from onFulfilled/onRejected after being passed through Promise.resolve.
         * If an error is thrown in the callback, the returned promise rejects with that error.
         *
         * @param onFulfilled called when/if "promise" resolves
         * @param onRejected called when/if "promise" rejects
         */
        then<U>(onFulfilled?:(value:R) => Thenable<U>, onRejected?:(error:any) => U):Promise<U>;

        /**
         * onFulfilled is called when/if "promise" resolves. onRejected is called when/if "promise" rejects.
         * Both are optional, if either/both are omitted the next onFulfilled/onRejected in the chain is called.
         * Both callbacks have a single parameter , the fulfillment value or rejection reason.
         * "then" returns a new promise equivalent to the value you return from onFulfilled/onRejected after being passed through Promise.resolve.
         * If an error is thrown in the callback, the returned promise rejects with that error.
         *
         * @param onFulfilled called when/if "promise" resolves
         * @param onRejected called when/if "promise" rejects
         */
        then<U>(onFulfilled?:(value:R) => Thenable<U>, onRejected?:(error:any) => void):Promise<U>;

        /**
         * onFulfilled is called when/if "promise" resolves. onRejected is called when/if "promise" rejects.
         * Both are optional, if either/both are omitted the next onFulfilled/onRejected in the chain is called.
         * Both callbacks have a single parameter , the fulfillment value or rejection reason.
         * "then" returns a new promise equivalent to the value you return from onFulfilled/onRejected after being passed through Promise.resolve.
         * If an error is thrown in the callback, the returned promise rejects with that error.
         *
         * @param onFulfilled called when/if "promise" resolves
         * @param onRejected called when/if "promise" rejects
         */
        then<U>(onFulfilled?:(value:R) => U, onRejected?:(error:any) => Thenable<U>):Promise<U>;

        /**
         * onFulfilled is called when/if "promise" resolves. onRejected is called when/if "promise" rejects.
         * Both are optional, if either/both are omitted the next onFulfilled/onRejected in the chain is called.
         * Both callbacks have a single parameter , the fulfillment value or rejection reason.
         * "then" returns a new promise equivalent to the value you return from onFulfilled/onRejected after being passed through Promise.resolve.
         * If an error is thrown in the callback, the returned promise rejects with that error.
         *
         * @param onFulfilled called when/if "promise" resolves
         * @param onRejected called when/if "promise" rejects
         */
        then<U>(onFulfilled?:(value:R) => U, onRejected?:(error:any) => U):Promise<U>;

        /**
         * onFulfilled is called when/if "promise" resolves. onRejected is called when/if "promise" rejects.
         * Both are optional, if either/both are omitted the next onFulfilled/onRejected in the chain is called.
         * Both callbacks have a single parameter , the fulfillment value or rejection reason.
         * "then" returns a new promise equivalent to the value you return from onFulfilled/onRejected after being passed through Promise.resolve.
         * If an error is thrown in the callback, the returned promise rejects with that error.
         *
         * @param onFulfilled called when/if "promise" resolves
         * @param onRejected called when/if "promise" rejects
         */
        then<U>(onFulfilled?:(value:R) => U, onRejected?:(error:any) => void):Promise<U>;

        /**
         * Sugar for promise.then(undefined, onRejected)
         *
         * @param onRejected called when/if "promise" rejects
         */
        catch<U>(onRejected?:(error:any) => Thenable<U>):Promise<U>;

        /**
         * Sugar for promise.then(undefined, onRejected)
         *
         * @param onRejected called when/if "promise" rejects
         */
        catch<U>(onRejected?:(error:any) => U):Promise<U>;

        /**
         * Sugar for promise.then(undefined, onRejected)
         *
         * @param onRejected called when/if "promise" rejects
         */
        catch<U>(onRejected?:(error:any) => void):Promise<U>;

        finally(finallyCallback: () => any): Promise<R>;

        static all<T>(promises: Thenable<T>[]): Promise<T[]>;
        static all<T>(promises: any[]): Promise<T[]>;
        static race<R>(promises:Promise<R>[]):Promise<R>;

        /**
         @method resolve
         @param {Any} value value that the returned promise will be resolved with
         @param {String} label optional string for identifying the returned promise.
         Useful for tooling.
         @return {Promise} a promise that will become fulfilled with the given
         `value`
         */
        static resolve<T>(object: Thenable<T>): Promise<T>;
        static resolve<T>(object: T): Promise<T>;

        /**
         @method cast (Deprecated in favor of resolve
         @param {Any} value value that the returned promise will be resolved with
         @param {String} label optional string for identifying the returned promise.
         Useful for tooling.
         @return {Promise} a promise that will become fulfilled with the given
         `value`
         */
        static cast<T>(object: Thenable<T>, label? : string): Promise<T>;
        static cast<T>(object: T, label? : string): Promise<T>;

        /**
         `RSVP.Promise.reject` returns a promise rejected with the passed `reason`.
         */
        static reject(reason?: any): Promise<any>;
    }

    interface PromiseState<T> {
        state: string /* "fulfilled", "rejected", "pending" */;
        value?: T;
        reason?: any;
    }

    interface InstrumentEvent{
        guid:string;      // guid of promise. Must be globally unique, not just within the implementation
        childGuid:string; // child of child promise (for chained via `then`)
        eventName:string; // one of ['created', 'chained', 'fulfilled', 'rejected']
        detail:any;    // fulfillment value or rejection reason, if applicable
        label:string;     // label passed to promise's constructor
        timeStamp:number; // milliseconds elapsed since 1 January 1970 00:00:00 UTC up until now
    }

    export function on(eventName : string, callback: (value:any)=>void) : void;
    export function on(eventName : "error", errorHandler: (reason:any)=>void): void;
    export function on(eventName : "created", listener: (event:InstrumentEvent)=>void): void;
    export function on(eventName : "chained", listener: (event:InstrumentEvent)=>void): void;
    export function on(eventName : "fulfilled", listener: (event:InstrumentEvent)=>void): void;
    export function on(eventName : "rejected", listener: (event:InstrumentEvent)=>void): void;

    export function configure(configName : string, value : any): void;
    export function configure(configName : "instrument", shouldInstrument : boolean): void;

    /**
     * configure('onerror', handler) is deprecated in favor of on('error', handler)
     * @param configName
     * @param errorHandler
     */
    export function configure(configName : "onerror", errorHandler : (reason:any)=>void): void;

    /**
     * Make a promise that fulfills when every item in the array fulfills, and rejects if (and when) any item rejects.
     * the array passed to all can be a mixture of promise-like objects and other objects.
     * The fulfillment value is an array (in order) of fulfillment values. The rejection value is the first rejection value.
     */
    export function all<T>(promises: Thenable<T>[]): Promise<T[]>;
    export function all<T>(promises: any[]): Promise<T[]>;
    /**
     * Make a promise that fulfills when every item in the array fulfills, and rejects if (and when) any item rejects.
     * the array passed to all can be a mixture of promise-like objects and other objects.
     * The fulfillment value is an array (in order) of fulfillment values. The rejection value is the first rejection value.
     * The key difference to the all() function is that both the fulfillment value and the argument to the hash() function
     * are object literals. This allows you to simply reference the results directly off the returned object without
     * having to remember the initial order like you would with all().
     *
     */
    export function hash<T>(promises: Thenable<T>[]): Promise<T[]>;
    export function hash<T>(promises: any[]): Promise<T[]>;

    /**
     `RSVP.map` is similar to JavaScript's native `map` method, except that it
     waits for all promises to become fulfilled before running the `mapFn` on
     each item in given to `promises`. `RSVP.map` returns a promise that will
     become fulfilled with the result of running `mapFn` on the values the promises
     become fulfilled with.
     */
    export function map<T>(promises: Thenable<T>[], mapFn : (item:any)=>any, label? : string): Promise<T[]>;
    export function map<T>(promises: any[], mapFn : (item:any)=>any, label? : string): Promise<T[]>;


    /**
     * `RSVP.allSettled` is similar to `RSVP.all`, but instead of implementing
     * a fail-fast method, it waits until all the promises have returned and
     * shows you all the results. This is useful if you want to handle multiple
     * promises' failure states together as a set.
     */
    export function allSettled<T>(promises: Thenable<T>[]): Promise<PromiseState<T>[]>;
    export function allSettled<T>(promises: any[]): Promise<PromiseState<T>[]>;

    /**
     * `RSVP.hashSettled` is similar to `RSVP.allSettled`, but takes an object
     * instead of an array for its `promises` argument.
     *
     * Unlike `RSVP.all` or `RSVP.hash`, which implement a fail-fast method,
     * but like `RSVP.allSettled`, `hashSettled` waits until all the
     * constituent promises have returned and then shows you all the results
     * with their states and values/reasons. This is useful if you want to
     * handle multiple promises' failure states together as a set.
     */
    export function hashSettled<T>(promises: Thenable<T>[]): Promise<PromiseState<T>[]>;
    export function hashSettled<T>(promises: any[]): Promise<PromiseState<T>[]>;

    /**
     * Make a Promise that fulfills when any item fulfills, and rejects if any item rejects.
     */
    function race<R>(promises:Promise<R>[]):Promise<R>;

    /**
     * `RSVP.denodeify` takes a "node-style" function and returns a function that
     * will return an `RSVP.Promise`. You can use `denodeify` in Node.js or the
     *  browser when you'd prefer to use promises over using callbacks. For example,
     * `denodeify` transforms the following:
     */
    export function denodeify<T>(nodeFunction: Function, ...args: any[]): (...args: any[]) => Promise<T>;

    /**
     * Favor the Promise Constructor instead (if possible)
     *
     */
    export function defer<T>(): Deferred<T>;


    /**
     `RSVP.Promise.reject` returns a promise rejected with the passed `reason`.
     */
    export function reject(reason?: any): Promise<any>;

    /**
     `RSVP.Promise.resolve` returns a promise that will become resolved with the
     passed `value`.
     */
    export function resolve<T>(object: Thenable<T>): Promise<T>;
    export function resolve<T>(object: T): Promise<T>;

    /**
     * `RSVP.filter` is similar to JavaScript's native `filter` method, except that it
     * waits for all promises to become fulfilled before running the `filterFn` on
     * each item in given to `promises`. `RSVP.filter` returns a promise that will
     * become fulfilled with the result of running `filterFn` on the values the
     * promises become fulfilled with.
     */
    export function filter<T>(promises: Thenable<T>[], filterFn:(value:any)=>any): Promise<T[]>;

    /**
     `RSVP.rethrow` will rethrow an error on the next turn of the JavaScript event
     loop in order to aid debugging.

     Promises A+ specifies that any exceptions that occur with a promise must be
     caught by the promises implementation and bubbled to the last handler. For
     this reason, it is recommended that you always specify a second rejection
     handler function to `then`. However, `RSVP.rethrow` will throw the exception
     outside of the promise, so it bubbles up to your console if in the browser,
     or domain/cause uncaught exception in Node. `rethrow` will also throw the
     error again so the error can be handled by the promise per the spec.
     */
    export function rethrow(reason : any):void;

}

declare module wdCb {
    class JudgeUtils {
        static isArray(arr: any): boolean;
        static isArrayExactly(arr: any): boolean;
        static isNumber(num: any): boolean;
        static isNumberExactly(num: any): boolean;
        static isString(str: any): boolean;
        static isStringExactly(str: any): boolean;
        static isBoolean(bool: any): boolean;
        static isDom(obj: any): boolean;
        static isObject(obj: any): boolean;
        static isDirectObject(obj: any): boolean;
        static isHostMethod(object: any, property: any): boolean;
        static isNodeJs(): boolean;
        static isFunction(func: any): boolean;
    }
}

declare var global: any, window: Window;
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
            FUNC_EXIST: (...args: any[]) => any;
            FUNC_NOT_EXIST: (...args: any[]) => any;
            FUNC_ONLY: (...args: any[]) => any;
            FUNC_CAN_NOT: (...args: any[]) => any;
        };
        static log(...messages: any[]): void;
        static assert(cond: any, ...messages: any[]): void;
        static error(cond: any, ...message: any[]): any;
        static warn(...message: any[]): void;
        private static _exec(consoleMethod, args, sliceBegin?);
    }
}

declare module wdCb {
    class List<T> {
        protected children: Array<T>;
        getCount(): number;
        hasChild(child: any): boolean;
        hasChildWithFunc(func: Function): boolean;
        getChildren(): T[];
        getChild(index: number): T;
        addChild(child: T): this;
        addChildren(arg: Array<T> | List<T> | any): this;
        setChildren(children: Array<T>): this;
        unShiftChild(child: T): void;
        removeAllChildren(): this;
        forEach(func: Function, context?: any): this;
        toArray(): T[];
        protected copyChildren(): T[];
        protected removeChildHelper(arg: any): Array<T>;
        private _forEach(arr, func, context?);
        private _removeChild(arr, func);
    }
}

declare module wdCb {
    class Collection<T> extends List<T> {
        static create<T>(children?: any[]): Collection<T>;
        constructor(children?: Array<T>);
        clone(): any;
        clone(isDeep: boolean): any;
        clone(target: Collection<T>): any;
        clone(target: Collection<T>, isDeep: boolean): any;
        filter(func: (value: T, index: number) => boolean): Collection<T>;
        findOne(func: (value: T, index: number) => boolean): T;
        reverse(): Collection<T>;
        removeChild(arg: any): Collection<T>;
        sort(func: (a: T, b: T) => any, isSortSelf?: boolean): Collection<T>;
        map(func: (value: T, index: number) => any): Collection<any>;
        removeRepeatItems(): Collection<T>;
        hasRepeatItems(): false;
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
        getKeys(): Collection<string>;
        getValues(): Collection<T>;
        getChild(key: string): T;
        setValue(key: string, value: any): this;
        addChild(key: string, value: any): this;
        addChildren(arg: {} | Hash<T>): this;
        appendChild(key: string, value: any): this;
        setChildren(children: {
            [s: string]: T;
        }): void;
        removeChild(arg: any): Collection<T>;
        removeAllChildren(): void;
        hasChild(key: string): boolean;
        hasChildWithFunc(func: Function): boolean;
        forEach(func: Function, context?: any): this;
        filter(func: Function): Hash<T>;
        findOne(func: Function): any[];
        map(func: Function): Hash<T>;
        toCollection(): Collection<any>;
        toArray(): Array<T>;
        clone(): any;
        clone(isDeep: boolean): any;
        clone(target: Hash<T>): any;
        clone(target: Hash<T>, isDeep: boolean): any;
    }
}

declare module wdCb {
    class Queue<T> extends List<T> {
        static create<T>(children?: any[]): Queue<T>;
        constructor(children?: Array<T>);
        readonly front: T;
        readonly rear: T;
        push(element: T): void;
        pop(): T;
        clear(): void;
    }
}

declare module wdCb {
    class Stack<T> extends List<T> {
        static create<T>(children?: any[]): Stack<T>;
        constructor(children?: Array<T>);
        readonly top: T;
        push(element: T): void;
        pop(): T;
        clear(): void;
        clone(): any;
        clone(isDeep: boolean): any;
        clone(target: Stack<T>): any;
        clone(target: Stack<T>, isDeep: boolean): any;
        filter(func: (value: T, index: number) => boolean): Collection<T>;
        findOne(func: (value: T, index: number) => boolean): T;
        reverse(): Collection<T>;
        removeChild(arg: any): Collection<T>;
        sort(func: (a: T, b: T) => any, isSortSelf?: boolean): Collection<T>;
        map(func: (value: T, index: number) => any): Collection<any>;
        removeRepeatItems(): Collection<T>;
        hasRepeatItems(): false;
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
        static extendDeep(parent: any, child?: any, filter?: (val: any, i: any) => boolean): any;
        static extend(destination: any, source: any): any;
        static copyPublicAttri(source: any): {};
    }
}

declare module wdCb {
    class PathUtils {
        static basename(path: string, ext?: string): string;
        static changeExtname(pathStr: string, extname: string): string;
        static changeBasename(pathStr: string, basename: string, isSameExt?: boolean): string;
        static extname(path: string): string;
        static dirname(path: string): string;
        private static _splitPath(fileName);
    }
}

declare module wdCb {
    class FunctionUtils {
        static bind(object: any, func: Function): () => any;
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
        prependTo(eleStr: string): this;
        remove(): this;
        css(property: string, value: string): void;
        attr(name: string): any;
        attr(name: string, value: string): any;
        text(str?: string): string;
        private _isDomEleStr(eleStr);
        private _buildDom(eleStr);
        private _buildDom(dom);
        private _createElement(eleStr);
    }
}

declare module wdFrp {
    class JudgeUtils extends wdCb.JudgeUtils {
        static isPromise(obj: any): boolean;
        static isEqual(ob1: Entity, ob2: Entity): boolean;
        static isIObserver(i: IObserver): () => any;
    }
}

declare module wdFrp {
    var fromNodeCallback: (func: Function, context?: any) => (...funcArgs: any[]) => AnonymousStream;
    var fromStream: (stream: any, finishEventName?: string) => AnonymousStream;
    var fromReadableStream: (stream: any) => AnonymousStream;
    var fromWritableStream: (stream: any) => AnonymousStream;
    var fromTransformStream: (stream: any) => AnonymousStream;
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
    class Main {
        static isTest: boolean;
    }
}

declare module wdFrp {
    function assert(cond: boolean, message?: string): void;
    function require(InFunc: any): (target: any, name: any, descriptor: any) => any;
    function ensure(OutFunc: any): (target: any, name: any, descriptor: any) => any;
    function requireGetter(InFunc: any): (target: any, name: any, descriptor: any) => any;
    function requireSetter(InFunc: any): (target: any, name: any, descriptor: any) => any;
    function ensureGetter(OutFunc: any): (target: any, name: any, descriptor: any) => any;
    function ensureSetter(OutFunc: any): (target: any, name: any, descriptor: any) => any;
    function invariant(func: any): (target: any) => void;
}

declare module wdFrp {
    interface IDisposable {
        dispose(): void;
    }
}

declare module wdFrp {
    class SingleDisposable extends Entity implements IDisposable {
        static create(disposeHandler?: Function): SingleDisposable;
        private _disposeHandler;
        private _isDisposed;
        constructor(disposeHandler: Function);
        setDisposeHandler(handler: Function): void;
        dispose(): void;
    }
}

declare module wdFrp {
    class GroupDisposable extends Entity implements IDisposable {
        static create(disposable?: IDisposable): GroupDisposable;
        private _group;
        private _isDisposed;
        constructor(disposable?: IDisposable);
        add(disposable: IDisposable): this;
        remove(disposable: IDisposable): this;
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

declare var global: any, window: Window;
declare module wdFrp {
    var root: any;
}

declare module wdFrp {
}

declare module wdFrp {
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
        concatMap(selector: Function): any;
        mergeAll(): MergeAllStream;
        concatAll(): any;
        skipUntil(otherStream: Stream): SkipUntilStream;
        takeUntil(otherStream: Stream): TakeUntilStream;
        take(count?: number): AnonymousStream;
        takeLast(count?: number): AnonymousStream;
        takeWhile(predicate: (value: any, index: number, source: Stream) => boolean, thisArg?: this): AnonymousStream;
        lastOrDefault(defaultValue?: any): AnonymousStream;
        filter(predicate: (value: any) => boolean, thisArg?: this): any;
        filterWithState(predicate: (value: any) => boolean, thisArg?: this): any;
        concat(streamArr: Array<Stream>): any;
        concat(...otherStream: any[]): any;
        merge(maxConcurrent: number): any;
        merge(streamArr: Array<Stream>): any;
        merge(...otherStreams: any[]): any;
        repeat(count?: number): RepeatStream;
        ignoreElements(): IgnoreElementsStream;
        protected handleSubject(subject: any): boolean;
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
        publishTimeout(observer: IObserver, time: number, action: Function): number;
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
        protected onError(error: any): void;
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
        constructor(currentObserver: IObserver, streamGroup: wdCb.Collection<Stream>, groupDisposable: GroupDisposable);
        done: boolean;
        currentObserver: IObserver;
        private _streamGroup;
        private _groupDisposable;
        protected onNext(innerSource: any): void;
        protected onError(error: any): void;
        protected onCompleted(): void;
    }
}

declare module wdFrp {
    class MergeObserver extends Observer {
        static create(currentObserver: IObserver, maxConcurrent: number, streamGroup: wdCb.Collection<Stream>, groupDisposable: GroupDisposable): MergeObserver;
        constructor(currentObserver: IObserver, maxConcurrent: number, streamGroup: wdCb.Collection<Stream>, groupDisposable: GroupDisposable);
        done: boolean;
        currentObserver: IObserver;
        activeCount: number;
        q: Array<Stream>;
        private _maxConcurrent;
        private _groupDisposable;
        private _streamGroup;
        handleSubscribe(innerSource: any): void;
        protected onNext(innerSource: any): void;
        protected onError(error: any): void;
        protected onCompleted(): void;
        private _isReachMaxConcurrent();
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
    class SkipUntilSourceObserver extends Observer {
        static create(prevObserver: IObserver, skipUntilStream: SkipUntilStream): SkipUntilSourceObserver;
        private _prevObserver;
        private _skipUntilStream;
        constructor(prevObserver: IObserver, skipUntilStream: SkipUntilStream);
        protected onNext(value: any): void;
        protected onError(error: any): void;
        protected onCompleted(): void;
    }
}

declare module wdFrp {
    class SkipUntilOtherObserver extends Observer {
        static create(prevObserver: IObserver, skipUntilStream: SkipUntilStream): SkipUntilOtherObserver;
        otherDisposable: IDisposable;
        private _prevObserver;
        private _skipUntilStream;
        constructor(prevObserver: IObserver, skipUntilStream: SkipUntilStream);
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
    class FilterObserver extends Observer {
        static create(prevObserver: IObserver, predicate: (value: any, index?: number, source?: Stream) => boolean, source: Stream): FilterObserver;
        constructor(prevObserver: IObserver, predicate: (value: any) => boolean, source: Stream);
        protected prevObserver: IObserver;
        protected source: Stream;
        protected i: number;
        protected predicate: (value: any, index?: number, source?: Stream) => boolean;
        protected onNext(value: any): void;
        protected onError(error: any): void;
        protected onCompleted(): void;
    }
}

declare module wdFrp {
    class FilterWithStateObserver extends FilterObserver {
        static create(prevObserver: IObserver, predicate: (value: any, index?: number, source?: Stream) => boolean, source: Stream): FilterWithStateObserver;
        private _isTrigger;
        protected onNext(value: any): void;
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
        subscribe(subject: Subject): IDisposable;
        subscribe(observer: IObserver): IDisposable;
        subscribe(onNext: (value: any) => void): IDisposable;
        subscribe(onNext: (value: any) => void, onError: (e: any) => void): IDisposable;
        subscribe(onNext: (value: any) => void, onError: (e: any) => void, onComplete: () => void): IDisposable;
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
    class TimeoutStream extends BaseStream {
        static create(time: number, scheduler: Scheduler): TimeoutStream;
        private _time;
        constructor(time: number, scheduler: Scheduler);
        subscribeCore(observer: IObserver): SingleDisposable;
    }
}

declare module wdFrp {
    class MergeAllStream extends BaseStream {
        static create(source: Stream): MergeAllStream;
        constructor(source: Stream);
        private _source;
        private _observer;
        subscribeCore(observer: IObserver): GroupDisposable;
    }
}

declare module wdFrp {
    class MergeStream extends BaseStream {
        static create(source: Stream, maxConcurrent: number): MergeStream;
        constructor(source: Stream, maxConcurrent: number);
        private _source;
        private _maxConcurrent;
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
    class SkipUntilStream extends BaseStream {
        static create(source: Stream, otherSteam: Stream): SkipUntilStream;
        isOpen: boolean;
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
    class FilterStream extends BaseStream {
        static create(source: Stream, predicate: (value: any, index?: number, source?: Stream) => boolean, thisArg: any): FilterStream;
        constructor(source: Stream, predicate: (value: any, index?: number, source?: Stream) => boolean, thisArg: any);
        predicate: (value: any, index?: number, source?: Stream) => boolean;
        private _source;
        subscribeCore(observer: IObserver): IDisposable;
        internalFilter(predicate: (value: any, index?: number, source?: Stream) => boolean, thisArg: any): Stream;
        protected createObserver(observer: IObserver): Observer;
        protected createStreamForInternalFilter(source: Stream, innerPredicate: any, thisArg: any): Stream;
        private _innerPredicate(predicate, self);
    }
}

declare module wdFrp {
    class FilterWithStateStream extends FilterStream {
        static create(source: Stream, predicate: (value: any, index?: number, source?: Stream) => boolean, thisArg: any): FilterWithStateStream;
        protected createObserver(observer: IObserver): FilterWithStateObserver;
        protected createStreamForInternalFilter(source: Stream, innerPredicate: any, thisArg: any): Stream;
    }
}

declare module wdFrp {
    var createStream: (subscribeFunc: any) => AnonymousStream;
    var fromArray: (array: any[], scheduler?: Scheduler) => FromArrayStream;
    var fromPromise: (promise: any, scheduler?: Scheduler) => FromPromiseStream;
    var fromEventPattern: (addHandler: Function, removeHandler: Function) => FromEventPatternStream;
    var interval: (interval: any, scheduler?: Scheduler) => IntervalStream;
    var intervalRequest: (scheduler?: Scheduler) => IntervalRequestStream;
    var timeout: (time: any, scheduler?: Scheduler) => TimeoutStream;
    var empty: () => AnonymousStream;
    var callFunc: (func: Function, context?: any) => AnonymousStream;
    var judge: (condition: Function, thenSource: Function, elseSource: Function) => any;
    var defer: (buildStreamFunc: Function) => DeferStream;
    var just: (returnValue: any) => AnonymousStream;
}

declare module wdFrp {
    enum FilterState {
        TRIGGER = 0,
        ENTER = 1,
        LEAVE = 2,
    }
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
        clone(): MockObserver;
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
        publishTimeout(observer: IObserver, time: number, action: Function): number;
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

declare module wd {
    var DebugConfig: {
        isTest: boolean;
        debugCollision: boolean;
        showDebugPanel: boolean;
    };
}

declare module wd {
    class DebugStatistics {
        static count: {
            readonly totalGameObjects: number;
            renderGameObjects: number;
            drawCalls: number;
        };
        static during: {
            readonly fps: any;
        };
        private static _startLoopSubscription;
        private static _panelBuilder;
        private static _updateCount;
        static resetData(): void;
        static init(): void;
        static dispose(): void;
        private static _updateDebugInfo();
    }
    type DebugStatisticsCountData = {
        totalGameObjects: number;
        renderGameObjects: number;
        drawCalls: number;
    };
    type DebugStatisticsDuringData = {
        fps: number;
    };
}

declare module wd {
    class DebugPanelBuilder {
        static create(): DebugPanelBuilder;
        private _panel;
        private _fps;
        private _totalGameObjects;
        private _renderGameObjects;
        private _renderer;
        createDebugPanel(): void;
        updateDebugInfo(count: DebugStatisticsCountData, during: DebugStatisticsDuringData): void;
        show(): void;
        hide(): void;
        dispose(): void;
        private _createFont(renderer, anchorX, anchorY);
        private _createPanel(renderer);
    }
}

declare module wdFrp {
    var fromCollection: (collection: wdCb.Collection<any>, scheduler?: Scheduler) => AnonymousStream | FromArrayStream;
}

declare module wd {
    var CompileConfig: {
        isCompileTest: boolean;
        closeContractTest: boolean;
    };
}

declare module wd {
    type LayoutCharData = {
        position: Array<number>;
        data: FntCharData;
        index: number;
        line: number;
    };
}

declare module wd {
    function assert(cond: boolean, message?: string): void;
    function describe(message: string, func: Function, preCondition?: Function, context?: any): void;
    function it(message: string, func: Function, context?: any): void;
    function require(inFunc: any): (target: any, name: any, descriptor: any) => any;
    function ensure(outFunc: any): (target: any, name: any, descriptor: any) => any;
    function requireGetterAndSetter(inGetterFunc: any, inSetterFunc: any): (target: any, name: any, descriptor: any) => any;
    function requireGetter(inFunc: any): (target: any, name: any, descriptor: any) => any;
    function requireSetter(inFunc: any): (target: any, name: any, descriptor: any) => any;
    function ensureGetterAndSetter(outGetterFunc: any, outSetterFunc: any): (target: any, name: any, descriptor: any) => any;
    function ensureGetter(outFunc: any): (target: any, name: any, descriptor: any) => any;
    function ensureSetter(outFunc: any): (target: any, name: any, descriptor: any) => any;
    function invariant(func: any): (target: any) => void;
}

declare module wd {
    function singleton(isInitWhenCreate?: boolean): (target: any) => void;
}

declare module wd {
    function cacheGetter(judgeFunc: () => boolean, returnCacheValueFunc: () => any, setCacheFunc: (returnVal) => void): (target: any, name: any, descriptor: any) => any;
    function cache(judgeFunc: (...args) => boolean, returnCacheValueFunc: (...args) => any, setCacheFunc: (...returnVal) => void): (target: any, name: any, descriptor: any) => any;
    function cacheBufferForBufferContainer(): (target: any, name: any, descriptor: any) => any;
    function cacheBufferForBufferContainerWithFuncParam(setDataNameFuncName: string): (target: any, name: any, descriptor: any) => any;
}

declare module wd {
    function virtual(target: any, name: any, descriptor: any): any;
}

declare module wd {
    function operateBodyDataGetterAndSetter(dataName: any): (target: any, name: any, descriptor: any) => any;
    function operateWorldDataGetterAndSetter(dataName: any): (target: any, name: any, descriptor: any) => any;
}

declare module wd {
    function script(scriptName: string): (target: any) => void;
}

declare module wd {
    function execOnlyOnce(flagName: string): (target: any, name: any, descriptor: any) => any;
}

declare module wd {
    function cloneAttributeAsBasicType(configData?: CloneAttributeAsBasicTypeConfigData): (target: any, memberName: string | symbol) => void;
    function cloneAttributeAsCloneable(configData?: CloneAttributeAsCloneableConfigData): (target: any, memberName: string | symbol) => void;
    function cloneAttributeAsCustomType(cloneFunc: (source: any, target: any, memberName: string, cloneData: any) => void, configData?: CloneAttributeAsCustomTypeConfigData): (target: any, memberName: string | symbol) => void;
    class CloneUtils {
        static clone<T>(source: T, cloneData?: any, createDataArr?: Array<any>, target?: any): T;
        static cloneArray(arr: Array<any> | null, isDeep?: boolean): any;
        static markNotClone(entityObject: EntityObject): void;
        static isNotClone(entityObject: EntityObject): boolean;
    }
    type CloneAttributeAsBasicTypeConfigData = {
        order?: number;
    };
    type CloneAttributeAsCloneableConfigData = {
        order?: number;
    };
    type CloneAttributeAsCustomTypeConfigData = {
        order?: number;
    };
    enum CloneType {
        CLONEABLE = 0,
        BASIC = 1,
        CUSTOM = 2,
    }
}

declare module wd {
    class AngleUtils {
        static convertDegreeToRadians(angle: number): number;
        static convertRadiansToDegree(angle: number): number;
    }
}

declare module wd {
    class ArrayUtils extends wdCb.ArrayUtils {
        static hasRepeatItems(arr: Array<any>): boolean;
        static contain(arr: Array<any>, item: any): boolean;
    }
}

declare module wd {
    class BufferUtils {
        static convertArrayToArrayBuffer(type: EVariableType, value: Array<any>): ArrayBuffer;
        private static _getBufferSize(type);
    }
}

declare module wd {
    class ClassUtils {
        static getClassName(objInstance: any): any;
        static getClass(className: string): any;
        static hasComponent(entityObject: EntityObject, className: string): boolean;
        static createClassInstance(className: string, ...args: Array<any>): any;
        static createClassInstanceOrEmpty(className: string, emptyClassName: string, ...args: Array<any>): any;
        static execSingletonMethod(className: string, method: string, ...args: Array<any>): void;
    }
}

declare module wd {
    class CoordinateUtils {
        static convertWebGLPositionToCanvasPosition(position: Vector3): Vector2;
        static convertCanvasPositionToWebGLPosition(position: Vector2): Vector3;
        static convertLeftCornerPositionToCenterPositionInWebGL(position: Vector2, width: number, height: number): Vector2;
        static convertLeftCornerPositionXToCenterPositionXInWebGL(positionX: number, width: number): number;
        static convertLeftCornerPositionYToCenterPositionYInWebGL(positionY: number, height: number): number;
        static convertLeftCornerPositionToCenterPositionInCanvas(position: Vector2, width: number, height: number): Vector2;
        static convertLeftCornerPositionXToCenterPositionXInCanvas(positionX: number, width: number): number;
        static convertLeftCornerPositionYToCenterPositionYInCanvas(positionY: number, height: number): number;
    }
}

declare module wd {
    class GlobalGeometryUtils {
        static hasMorphAnimation(geometry: Geometry): boolean;
        static hasSkinSkeletonAnimation(geometry: Geometry): boolean;
    }
}

declare module wd {
    class GlobalScriptUtils {
        static addScriptToEntityObject(entityObject: EntityObject, data: ScriptFileData): void;
    }
}

declare module wd {
    class GlobalTextureUtils {
        static convertSourceRegionCanvasMapToUV(sourceRegion: RectRegion, textureWidth: number, textureHeight: number): RectRegion;
    }
}

declare module wd {
    class InstanceUtils {
        static isHardwareSupport(): boolean;
        static isInstance(gameObject: GameObject): boolean;
        static isSourceInstance(gameObject: GameObject): boolean;
        static isOneToOneSourceInstance(gameObject: GameObject): boolean;
        static isOneToManySourceInstance(gameObject: GameObject): boolean;
        static isObjectInstance(gameObject: GameObject): boolean;
        static addModelMatrixShaderLib(shader: Shader, gameObject: GameObject): void;
        static addNormalModelMatrixShaderLib(shader: Shader, gameObject: GameObject): void;
    }
}

declare module wd {
    class IterateUtils {
        static forEachAll(entityObject: EntityObject, handler: (entityObject: EntityObject) => void): void;
    }
}

declare module wd {
    class JudgeUtils extends wdCb.JudgeUtils {
        static isView(obj: any): boolean;
        static isEqual(target1: any, target2: any): boolean;
        static isPowerOfTwo(value: number): boolean;
        static isFloatArray(data: any): boolean;
        static isInterface(target: any, memberOfInterface: string): boolean;
        static isSpacePartitionObject(entityObject: EntityObject): boolean;
        static isSelf(self: Entity, entityObject: Entity): boolean;
        static isComponenet(component: Component): boolean;
        static isDom(obj: any): boolean;
        static isCollection(list: wdCb.Collection<any>): boolean;
        static isClass(objInstance: any, className: string): boolean;
    }
}

declare module wd {
    class LightUtils {
        static getPointLightPosition(lightComponent: PointLight): Vector3;
        static getDirectionLightPosition(lightComponent: DirectionLight): Vector3;
        private static _isZero(position);
    }
}

declare module wd {
    class Log extends wdCb.Log {
    }
}

declare module wd {
    class MathUtils {
        static clamp(num: number, below: number, up: number): number;
        static bigThan(num: number, below: number): number;
        static generateZeroToOne(): number;
        static generateMinToMax(min: number, max: number): number;
        static generateInteger(min: number, max: number): number;
        static mod(a: number, b: number): number;
        static maxFloorIntegralMultiple(a: number, b: number): number;
    }
}

declare module wd {
    class RenderUtils {
        static getGameObjectRenderList(sourceList: wdCb.Collection<GameObject>): wdCb.Collection<GameObject>;
        static getGameObjectRenderListForOctree(sourceList: wdCb.Collection<GameObject>): wdCb.Collection<GameObject>;
        private static _getActiveGameObject(source, gameObjectLOD);
    }
}

declare module wd {
    class ShaderLibUtils {
        static addVerticeShaderLib(geometry: Geometry, shader: Shader): void;
    }
}

declare module wd {
    class SortUtils {
        static insertSort(targetArr: Array<any>, compareFunc: (a: any, b: any) => boolean, isChangeSelf?: boolean): Array<any>;
        static quickSort(targetArr: Array<any>, compareFunc: (a: any, b: any) => boolean, isChangeSelf?: boolean): Array<any>;
        private static _swap(children, i, j);
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
        deltaTime: number;
        private _lastTime;
        tick(time: number): void;
        start(): void;
        resume(): void;
        protected getNow(): any;
        private _updateFps(deltaTime);
    }
}

declare module wd {
    class CommonTimeController extends TimeController {
        static create(): CommonTimeController;
        protected getNow(): any;
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
        add(v: Vector2): this;
        mul(v: Vector2): this;
        isEqual(v: Vector2): boolean;
        clone(): Vector2;
    }
}

declare module wd {
    class Vector3 {
        static up: Vector3;
        static forward: Vector3;
        static right: Vector3;
        static create(x: number, y: number, z: number): Vector3;
        static create(): Vector3;
        constructor(x: number, y: number, z: number);
        constructor();
        x: number;
        y: number;
        z: number;
        values: Float32Array;
        normalize(): Vector3;
        isZero(): boolean;
        scale(scalar: number): any;
        scale(x: number, y: number, z: number): any;
        set(v: Vector3): any;
        set(x: number, y: number, z: number): any;
        sub(v: Vector3): Vector3;
        sub2(v1: Vector3, v2: Vector3): this;
        add(v: Vector3): this;
        add2(v1: Vector3, v2: Vector3): this;
        mul(v: Vector3): this;
        mul2(v1: Vector3, v2: Vector3): this;
        reverse(): Vector3;
        clone(): Vector3;
        toVector4(): Vector4;
        length(): any;
        cross(lhs: Vector3, rhs: Vector3): this;
        lerp(lhs: Vector3, rhs: Vector3, alpha: number): this;
        dot(rhs: any): number;
        calAngleCos(v1: Vector3): number;
        min(v: Vector3): this;
        max(v: Vector3): this;
        isEqual(v: Vector3): boolean;
        toArray(): number[];
        applyMatrix3(m: Matrix3): this;
        applyMatrix4(m: Matrix4): this;
        distanceTo(v: Vector3): any;
        distanceToSquared(v: Vector3): number;
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
        isEqual(v: Vector4): boolean;
        clone(): Vector4;
        toVector3(): Vector3;
        lengthManhattan(): any;
        multiplyScalar(scalar: number): this;
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
        set(initialM11: number, initialM12: number, initialM13: number, initialM14: number, initialM21: number, initialM22: number, initialM23: number, initialM24: number, initialM31: number, initialM32: number, initialM33: number, initialM34: number, initialM41: number, initialM42: number, initialM43: number, initialM44: number): any;
        set(matrix: Matrix4): any;
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
        applyMatrix(other: Matrix4, notChangeSelf?: boolean): Matrix4;
        multiply(matrix: Matrix4): Matrix4;
        multiply(matrix1: Matrix4, matrix2: Matrix4): Matrix4;
        multiplyVector4(vector: Vector4): Vector4;
        multiplyVector3(vector: Vector3): Vector3;
        multiplyPoint(vector: Vector3): Vector3;
        clone(): Matrix4;
        cloneToArray(array: Float32Array, offset?: number): Matrix4;
        getX(): Vector3;
        getY(): Vector3;
        getZ(): Vector3;
        getTranslation(): Vector3;
        getScale(): Vector3;
        getRotation(): Quaternion;
        getEulerAngles(): any;
        setTRS(t: Vector3, r: Quaternion, s: Vector3): this;
    }
}

declare module wd {
    class Matrix3 {
        static create(mat: Float32Array): Matrix3;
        static create(): Matrix3;
        constructor(mat: Float32Array);
        constructor();
        a: number;
        c: number;
        b: number;
        d: number;
        tx: number;
        ty: number;
        values: Float32Array;
        setIdentity(): Matrix3;
        invert(): Matrix3;
        multiplyScalar(s: number): this;
        multiplyVector2(vector: Vector2): Vector2;
        multiplyPoint(vector: Vector2): Vector2;
        multiply(matrix: Matrix3): this;
        transpose(): Matrix3;
        clone(): Matrix3;
        cloneToArray(array: Float32Array, offset?: number): Matrix3;
        set(matrix: Matrix3): this;
        setTS(t: Vector2, s: Vector2): void;
        rotate(angle: number): this;
        setRotation(angle: number): this;
        translate(x: number, y: number): void;
        setPosition(x: number, y: number): void;
        scale(x: number, y: number): this;
        setScale(x: number, y: number): this;
        getTranslation(): Vector2;
        getScale(): Vector2;
        getRotation(): number;
        getSkew(): Vector2;
        private _getDeltaTransformPoint(matrix, point);
        private _getSkewX();
        private _getSkewY();
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
        setFromEulerAngles(eulerAngles: Vector3): this;
        multiply(rhs: Quaternion): any;
        multiply(rhs1: Quaternion, rhs2: Quaternion): any;
        setFromMatrix(matrix: Matrix4): this;
        setFromAxisAngle(angle: number, axis: Vector3): this;
        invert(): this;
        conjugate(): this;
        clone(): Quaternion;
        normalize(): this;
        length(): any;
        multiplyVector3(vector: Vector3): Vector3;
        set(x: number, y: number, z: number, w: number): void;
        sub(quat: Quaternion): this;
        getEulerAngles(): any;
        slerp(left: Quaternion, right: Quaternion, amount: number): Quaternion;
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
        clone(): Plane;
        dotCoordinate(point: any): number;
    }
}

declare module wd {
    class Ray {
        static create(origin: Vector3, direction: Vector3): Ray;
        constructor(origin: Vector3, direction: Vector3);
        private _origin;
        private _direction;
        isIntersectWithAABB(aabb: AABBShape): boolean;
        isIntersectWithAABB(minPoint: Vector3, maxPoint: Vector3): boolean;
        isIntersectWithSphere(sphere: SphereShape): boolean;
    }
}

declare module wd {
    abstract class Entity {
        private static _count;
        constructor();
        uid: number;
        data: any;
        private _tagList;
        addTag(tag: string): void;
        removeTag(tag: string): void;
        getTagList(): wdCb.Collection<string>;
        hasTag(tag: string): boolean;
        containTag(tag: string): boolean;
    }
}

declare module wd {
    abstract class Component extends Entity {
        readonly transform: Transform;
        entityObject: EntityObject;
        init(): void;
        dispose(): void;
        clone(): any;
        addToObject(entityObject: EntityObject, isShareComponent?: boolean): void;
        addToComponentContainer(): void;
        removeFromObject(entityObject: EntityObject): void;
        removeFromComponentContainer(): void;
    }
}

declare module wd {
    class Scheduler {
        static create(): Scheduler;
        private _scheduleCount;
        private _schedules;
        update(elapsed: number): void;
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
        static getInstance(): any;
        private constructor();
        readonly gameTime: number;
        readonly fps: number;
        readonly isNormal: boolean;
        readonly isStop: boolean;
        readonly isPause: boolean;
        readonly isTimeChange: boolean;
        readonly elapsed: number;
        readonly view: any;
        scene: SceneDispatcher;
        scheduler: Scheduler;
        renderer: Renderer;
        domEventManager: any;
        private _gameLoop;
        private _eventSubscription;
        private _gameState;
        private _timeController;
        initWhenCreate(): void;
        start(): void;
        stop(): void;
        pause(): void;
        resume(): void;
        getDeltaTime(): number;
        initUIObjectScene(): void;
        runUIObjectScene(elapsed: number): void;
        private _startLoop();
        private _buildInitStream();
        private _init();
        private _initGameObjectScene();
        private _buildLoopStream();
        private _loopBody(time);
        private _run(elapsed);
        private _update(elapsed);
        private _render();
        private _initDomEvent();
    }
}

declare module wd {
    class Main {
        private static _isTest;
        static isTest: boolean;
        static screenSize: any;
        private static _canvasId;
        private static _contextConfig;
        private static _useDevicePixelRatio;
        static setConfig({canvasId, isTest, screenSize, useDevicePixelRatio, contextConfig}: {
            canvasId?: null;
            isTest?: boolean;
            screenSize?: EScreenSize;
            useDevicePixelRatio?: boolean;
            contextConfig?: {
                options: {
                    alpha: boolean;
                    depth: boolean;
                    stencil: boolean;
                    antialias: boolean;
                    premultipliedAlpha: boolean;
                    preserveDrawingBuffer: boolean;
                };
            };
        }): typeof Main;
        static init(): typeof Main;
        private static _setIsTest(isTestFromDebugConfig);
    }
    type ContextConfigData = {
        options: {
            alpha: boolean;
            depth: boolean;
            stencil: boolean;
            antialias: boolean;
            premultipliedAlpha: boolean;
            preserveDrawingBuffer: boolean;
        };
    };
}

declare module wd {
    class DomEventManager {
        static create(): DomEventManager;
        readonly scene: SceneDispatcher;
        designatedTriggerList: any;
        private _lastTriggerList;
        private _isDragEventTriggering;
        private _triggerListOfDragEvent;
        private _pointEventBinder;
        initDomEvent(): any;
        dispose(): void;
        private _buildPointDragStream();
        private _resetLastPosition(e);
        private _isDragEventFirstTriggered();
        private _buildPointMoveStream();
        private _getPointOverAndPointOutObject(currentTriggerList, lastTriggerList);
        private _setPointOverTag(objects);
        private _setPointOutTag(objects);
        private _setEventNameByEventTag(object, e);
        private _removeEventTag(object);
        private _trigger(e, entityObject);
        private _trigger(e, entityObject, isBubble);
        private _getPointEventTriggerList(e);
        private _isSceneAsTopOne(e, triggerList);
        private _findTopGameObject(e, gameObjectScene);
        private _getDistanceToCamera(obj);
        private _findTopUIObject(e, uiObjectScene);
        private _findTriggerGameObjectList(e, objectScene);
        private _findTriggerUIObjectList(e, objectScene);
        private _addTriggerObjectByQueryDetector(entityObject, e, triggerObjectList);
        private _isTriggerScene(e);
        private _getPointEventTriggerListData(e, triggerList);
    }
}

declare module wd {
    class PointEventBinder {
        static create(): PointEventBinder;
        private _pointDownSubscription;
        private _pointTapSubscription;
        private _pointUpSubscription;
        private _pointMoveSubscription;
        private _pointScaleSubscription;
        initPointEvent(): void;
        dispose(): void;
        private _isSupportTouch();
        private _convertTouchEventToPointEvent(e, eventName);
        private _convertMouseEventToPointEvent(e, eventName);
    }
}

declare module wd {
    abstract class EntityObject extends Entity {
        private _bubbleParent;
        bubbleParent: EntityObject;
        componentDirty: boolean;
        readonly transform: Transform;
        name: string;
        parent: EntityObject;
        customEventMap: wdCb.Hash<wdCb.Collection<CustomEventRegisterData>>;
        scriptManager: ScriptManager;
        protected componentManager: ComponentManager;
        private _hasComponentCache;
        private _getComponentCache;
        private _componentChangeSubscription;
        private _entityObjectManager;
        initWhenCreate(): void;
        clone(config?: CloneEntityObjectConfigData): any;
        init(): this;
        onEnter(): void;
        onExit(): void;
        onDispose(): void;
        dispose(): void;
        hasChild(child: EntityObject): boolean;
        addChild(child: EntityObject): EntityObject;
        addChildren(children: EntityObject): any;
        addChildren(children: Array<EntityObject>): any;
        addChildren(children: wdCb.Collection<EntityObject>): any;
        forEach(func: (entityObject: EntityObject, index: number) => void): this;
        filter(func: (entityObject: EntityObject) => boolean): wdCb.Collection<any>;
        sort(func: (a: EntityObject, b: EntityObject) => any, isSortSelf?: boolean): wdCb.Collection<any>;
        getChildren(): wdCb.Collection<any>;
        getChild(index: number): any;
        findChildByUid(uid: number): any;
        findChildByTag(tag: string): any;
        findChildByName(name: string): any;
        findChildrenByName(name: string): wdCb.Collection<EntityObject>;
        removeChild(child: EntityObject): EntityObject;
        removeAllChildren(): void;
        getComponent<T>(_class: any): T;
        getComponents(): wdCb.Collection<any>;
        findComponentByUid(uid: number): any;
        forEachComponent(func: (component: Component) => void): this;
        hasComponent(component: Component): boolean;
        hasComponent(_class: Function): boolean;
        addComponent(component: Component, isShareComponent?: boolean): this;
        removeComponent(component: Component): any;
        removeComponent(_class: Function): any;
        removeAllComponent(): wdCb.Collection<Component>;
        addAllComponentToComponentContainer(): void;
        removeAllComponentFromComponentContainer(): void;
        render(renderer: Renderer, camera: GameObject): void;
        update(elapsed: number): void;
        getComponentCount(_class: Function): number;
        getAllChildren(): wdCb.Collection<EntityObject>;
        getGeometry(): Geometry;
        protected abstract createTransform(): Transform;
        protected afterInitChildren(): void;
        protected getRenderList(): wdCb.Collection<any>;
        clearCache(): void;
        private _getHasComponentCacheKey(...args);
        private _onComponentChange();
        private _cloneChildren(result);
    }
    type CloneEntityObjectConfigData = {
        cloneChildren?: boolean;
        shareGeometry?: boolean;
        cloneGeometry?: boolean;
    };
}

declare module wd {
    class ComponentManager {
        static create(entityObject: EntityObject): ComponentManager;
        constructor(entityObject: EntityObject);
        transform: Transform;
        private _entityObject;
        private _components;
        private _rendererComponent;
        private _collider;
        private _geometry;
        init(): void;
        dispose(): void;
        removeAllComponent(): wdCb.Collection<Component>;
        getComponent<T>(_class: any): T;
        getComponents(): wdCb.Collection<any>;
        findComponentByUid(uid: number): any;
        forEachComponent(func: (component: Component) => void): this;
        hasComponent(component: Component): boolean;
        hasComponent(_class: Function): boolean;
        addComponent(component: Component, isShareComponent?: boolean): this;
        removeComponent(component: Component): any;
        removeComponent(_class: Function): any;
        addAllComponentToComponentContainer(): void;
        removeAllComponentFromComponentContainer(): void;
        getComponentCount(_class: Function): number;
        getGeometry(): Geometry;
        getRendererComponent(): RendererComponent;
        getCollider(): Collider;
        private _removeComponentHandler(component);
    }
}

declare module wd {
    class EntityObjectManager {
        static create(entityObject: EntityObject): EntityObjectManager;
        constructor(entityObject: EntityObject);
        private _entityObject;
        private _children;
        init(): void;
        dispose(): void;
        hasChild(child: EntityObject): boolean;
        addChild(child: EntityObject): this;
        addChildren(children: EntityObject): any;
        addChildren(children: Array<EntityObject>): any;
        addChildren(children: wdCb.Collection<EntityObject>): any;
        forEach(func: (entityObject: EntityObject, index: number) => void): this;
        filter(func: (entityObject: EntityObject) => boolean): wdCb.Collection<any>;
        sort(func: (a: EntityObject, b: EntityObject) => any, isSortSelf?: boolean): wdCb.Collection<any>;
        getChildren(): wdCb.Collection<any>;
        getAllChildren(): wdCb.Collection<EntityObject>;
        getChild(index: number): any;
        findChildByUid(uid: number): any;
        findChildByTag(tag: string): any;
        findChildByName(name: string): any;
        findChildrenByName(name: string): wdCb.Collection<EntityObject>;
        removeChild(child: EntityObject): this;
        removeAllChildren(): void;
    }
}

declare module wd {
    class ScriptManager {
        static create(entityObject: EntityObject): ScriptManager;
        constructor(entityObject: EntityObject);
        private _scriptList;
        private _entityObject;
        private _scriptExecuteHistory;
        addChild(scriptName: string, classInstance: IScriptBehavior): void;
        getChild(scriptName: string): IScriptBehavior;
        removeChild(targetClassInstance: IScriptBehavior): wdCb.Collection<IScriptBehavior>;
        hasChild(targetClassInstance: IScriptBehavior): boolean;
        execScriptOnlyOnce(method: string): void;
        execScriptWithData(method: string, data: any): void;
        execScript(method: string): void;
        execEventScriptWithData(method: string, data: any): void;
        private _addToScriptExecuteHistory(scriptName, method);
        private _isScriptExecuted(scriptName, method);
        private _buildScriptHistoryKey(scriptName, method);
    }
}

declare module wd {
    abstract class ComponentContainer {
        protected list: wdCb.Collection<Component>;
        addChild(component: Component): void;
        removeChild(component: Component): void;
        removeAllChildren(): void;
        hasChild(component: Component): boolean;
    }
}

declare module wd {
    class ScriptComponentContainer {
        static getInstance(): any;
        private constructor();
        private _scriptList;
        addChild(entityObject: EntityObject, scriptName: string, classInstance: IScriptBehavior): void;
        removeChild(entityObject: EntityObject, classInstance: IScriptBehavior): void;
        removeAllChildren(): void;
        findScript(entityObject: EntityObject, scriptName: string): IScriptBehavior;
        execEntityObjectScript(entityObject: EntityObject, method: string): void;
        execEntityObjectScriptOnlyOnce(entityObject: EntityObject, method: string): void;
        execEntityObjectScriptWithData(entityObject: EntityObject, method: string, data: any): void;
        execScript(method: string): void;
        execScriptWithData(method: string, data: any): void;
        execEntityObjectEventScriptWithData(entityObject: EntityObject, method: string, data: any): void;
    }
}

declare module wd {
    class CollisionComponentContainer extends ComponentContainer {
        static getInstance(): any;
        private constructor();
        protected list: wdCb.Collection<Collider>;
        private _collisionDetector;
        update(elapsed: number): void;
        detect(elapsed: number): void;
    }
}

declare module wd {
    class ActionComponentContainer extends ComponentContainer {
        static getInstance(): any;
        private constructor();
        protected list: wdCb.Collection<Action>;
        update(elapsed: number): void;
    }
}

declare module wd {
    class LODComponentContainer extends ComponentContainer {
        static getInstance(): any;
        private constructor();
        protected list: wdCb.Collection<LOD>;
        update(elapsed: number): void;
    }
}

declare module wd {
    class SpacePartitionComponentContainer extends ComponentContainer {
        static getInstance(): any;
        private constructor();
        protected list: wdCb.Collection<SpacePartition>;
        update(elapsed: number): void;
    }
}

declare module wd {
    class AnimationComponentContainer extends ComponentContainer {
        static getInstance(): any;
        private constructor();
        protected list: wdCb.Collection<Animation>;
        update(elapsed: number): void;
    }
}

declare module wd {
    class PhysicsComponentContainer extends ComponentContainer {
        static getInstance(): any;
        private constructor();
        physicsEngineAdapter: IPhysicsEngineAdapter;
        protected list: wdCb.Collection<RigidBody>;
        removeChild(body: RigidBody): void;
        initPhysicsComponentContainerAdapter(): void;
        initBody(): void;
        initConstraint(): void;
        update(elapsed: number): void;
    }
}

declare module wd {
    class BillboardComponentContainer extends ComponentContainer {
        static getInstance(): any;
        private constructor();
        update(elapsed: number): void;
    }
}

declare module wd {
    abstract class UIComponentContainer extends ComponentContainer {
        update(elapsed: number): void;
    }
}

declare module wd {
    class ThreeDUIComponentContainer extends UIComponentContainer {
        static getInstance(): any;
        private constructor();
        protected list: wdCb.Collection<ThreeDUI>;
    }
}

declare module wd {
    class TwoDUIComponentContainer extends UIComponentContainer {
        static getInstance(): any;
        private constructor();
        protected list: wdCb.Collection<TwoDUI>;
        render(): void;
        private _isDirty(uiObject);
    }
}

declare module wd {
    class UIObject extends EntityObject {
        static create(): UIObject;
        transform: RectTransform;
        parent: UIObject;
        private _isVisible;
        isVisible: boolean;
        protected children: wdCb.Collection<UIObject>;
        protected createTransform(): RectTransform;
        initWhenCreate(): void;
        addComponent(component: Component): this;
        addChild(child: EntityObject): this;
    }
}

declare module wd {
    class GameObject extends EntityObject {
        static create(): GameObject;
        static merge(gameObjectArr: Array<GameObject>): GameObject;
        transform: ThreeDTransform;
        parent: GameObject;
        renderGroup: number;
        renderPriority: number;
        isVisible: boolean;
        protected children: wdCb.Collection<GameObject>;
        initWhenCreate(): void;
        getSpacePartition(): any;
        getGeometry(): Geometry;
        protected createTransform(): ThreeDTransform;
        protected getRenderList(): any;
        protected afterInitChildren(): any;
    }
}

declare module wd {
    class SceneDispatcher extends EntityObject {
        static create(): SceneDispatcher;
        scriptManager: ScriptManager;
        readonly ambientLight: GameObject;
        readonly directionLights: wdCb.Collection<GameObject>;
        readonly pointLights: wdCb.Collection<GameObject>;
        side: ESide;
        readonly shadowMap: ShadowMapModel;
        currentCamera: GameObject;
        physics: any;
        glslData: wdCb.Hash<any>;
        readonly isUseShader: boolean;
        readonly currentShaderType: EShaderTypeOfScene;
        name: string;
        uiObjectScene: any;
        gameObjectScene: GameObjectScene;
        initWhenCreate(): void;
        useShaderType(type: EShaderTypeOfScene): void;
        unUseShader(): void;
        addChild(child: EntityObject): EntityObject;
        addCommonRenderTargetRenderer(renderTargetRenderer: RenderTargetRenderer): void;
        addProceduralRenderTargetRenderer(renderTargetRenderer: ProceduralRenderTargetRenderer): void;
        dispose(): void;
        hasChild(child: EntityObject): boolean;
        addChildren(children: EntityObject): any;
        addChildren(children: Array<EntityObject>): any;
        addChildren(children: wdCb.Collection<EntityObject>): any;
        getChildren(): any;
        findChildByUid(uid: number): any;
        findChildByTag(tag: string): any;
        findChildByName(name: string): any;
        findChildrenByName(name: string): wdCb.Collection<EntityObject>;
        removeChild(child: EntityObject): EntityObject;
        onEnter(): void;
        onExit(): void;
        onDispose(): void;
        protected createTransform(): any;
    }
}

declare module wd {
    abstract class Scene extends EntityObject {
    }
}

declare module wd {
    class UIObjectScene extends Scene {
        static create(): UIObjectScene;
        private _startLoopSubscription;
        private _endLoopSubscription;
        init(): this;
        update(elapsed: number): void;
        onDispose(): void;
        render(): void;
        protected createTransform(): any;
        private _getUIRenderer(uiObject);
        private _resetAllRendererClearCanvasFlag();
        private _resetAllRendererState();
        private _sortSiblingChildren();
    }
}

declare module wd {
    class BufferTable {
        static lastBindedArrayBufferListUidStr: string;
        static lastBindedElementBuffer: ElementBuffer;
        private static _table;
        static bindIndexBuffer(indexBuffer: ElementBuffer): void;
        static hasBuffer(key: string): boolean;
        static addBuffer(key: string, buffer: Buffer): void;
        static getBuffer<T>(key: string): T;
        static dispose(): void;
        static clearAll(): void;
        static resetBindedArrayBuffer(): void;
        static resetBindedElementBuffer(): void;
    }
    enum BufferTableKey {
        PROCEDURAL_VERTEX,
        PROCEDURAL_INDEX,
    }
}

declare module wd {
    class ProgramTable {
        static lastUsedProgram: Program;
        private static _table;
        static hasProgram(key: string): boolean;
        static addProgram(key: string, program: Program): void;
        static getProgram(key: string): Program;
        static dispose(): void;
        static clearAll(): void;
    }
}

declare module wd {
    class TextureCache {
        private static _bindTextureUnitCache;
        static isCached(unit: number, texture: Texture): boolean;
        static addActiveTexture(unit: number, texture: Texture): void;
        static getActiveTexture(unit: number): Texture;
        static clearAll(): void;
        static clearAllBindTextureUnitCache(): void;
        static clearBindTextureUnitCache(unit: number): void;
        private static _checkUnit(unit);
    }
}

declare module wd {
    class GameObjectScene extends Scene {
        static create(): GameObjectScene;
        readonly ambientLight: GameObject;
        readonly directionLights: wdCb.Collection<GameObject>;
        readonly pointLights: wdCb.Collection<GameObject>;
        private _currentCamera;
        currentCamera: any;
        readonly isUseShader: boolean;
        side: ESide;
        shadowMap: ShadowMapModel;
        physics: any;
        glslData: wdCb.Hash<any>;
        currentShaderType: EShaderTypeOfScene;
        renderTargetRendererManager: RenderTargetRendererManager;
        shadowManager: any;
        private _lightManager;
        private _cameraList;
        init(): this;
        dispose(): void;
        addChild(child: GameObject): GameObject;
        update(elapsed: number): void;
        render(renderer: Renderer): void;
        useShaderType(type: EShaderTypeOfScene): void;
        unUseShader(): void;
        protected getRenderList(): wdCb.Collection<GameObject>;
        protected createTransform(): any;
        private _getCameras(gameObject);
        private _getLights(gameObject);
        private _find(gameObject, judgeFunc);
        private _isCamera(child);
        private _isLight(child);
        private _getCurrentCameraComponent();
    }
    class ShadowMapModel {
        static create(scene: GameObjectScene): ShadowMapModel;
        constructor(scene: GameObjectScene);
        private _scene;
        private _enable;
        enable: boolean;
        private _softType;
        softType: EShadowMapSoftType;
        shadowLayerList: any;
        getTwoDShadowMapDataMap(layer: string): any;
        getCubemapShadowMapDataMap(layer: string): any;
    }
}

declare module wd {
    class CollisionDetector {
        static create(): CollisionDetector;
        private _collisionTable;
        private _lastCollisionTable;
        update(elapsed: number): void;
        private _recordCollideObjects(sourceObject, checkTargetList);
        private _isGameObjectCollideWithGameObject(sourceObject, sourceCollider, targetObject);
        private _clearCollisionTable();
        private _isCollidedInTable(sourceObject, targetObject);
        private _recordToTable(sourceObject, targetObject);
        private _handleCollisionBetweenGameObjectAndSpacePartition(targetObjectCollider, spacePartition);
        private _handleCollisionBetweenSpacePartitionAndSpacePartition(sourceSpacePartition, targetSpacePartition);
        private _handleCollisionBetweenGameObjectAndGameObject(sourceObjectCollider, targetObject);
        private _isCollisionStart(gameObjectScene);
        private _triggerCollisionEventOfCollideObjectWhichHasRigidBody(collideObjects, currentGameObject, eventList);
        private _triggerCollisionEvent();
        private _triggerCollisionEndEvent();
        private _isNotTransform(gameObjectScene);
    }
    type CollisionDataInTable = {
        sourceObject: GameObject;
        targetObjectMap: wdCb.Hash<GameObject>;
    };
}

declare module wd {
    class ShadowManager {
        static create(gameObjectScene: GameObjectScene): ShadowManager;
        constructor(gameObjectScene: GameObjectScene);
        readonly twoDShadowMapDataMap: wdCb.Hash<wdCb.Collection<TwoDShadowMapData>>;
        readonly twoDShadowMapCountForGLSL: number;
        readonly cubemapShadowMapDataMap: wdCb.Hash<wdCb.Collection<CubemapShadowMapData>>;
        readonly cubemapShadowMapCountForGLSL: number;
        gameObjectScene: GameObjectScene;
        private _shadowRenderList;
        private _endLoopSubscription;
        private _shadowMapManager;
        private _shadowMapLayerChangeSubscription;
        update(elapsed: number): void;
        dispose(): void;
        getTwoDShadowMapDataMap(layer: string): wdCb.Collection<TwoDShadowMapData>;
        getCubemapShadowMapDataMap(layer: string): wdCb.Collection<CubemapShadowMapData>;
        setShadowRenderListForCurrentLoop(): void;
        getShadowRenderListByLayer(layer: string): wdCb.Collection<GameObject>;
        getShadowLayerList(): ShadowLayerList;
        init(): void;
        private _getShadowRenderList();
        private _updateWhenShadowLayerChange();
        private _refreshRenderTargerRendererList(addTwoDShadowMapData, removeTwoDShadowMapData, addCubemapShadowMapData, removeCubemapShadowMapData);
        private _initShadowList();
        private _isCastShadow(gameObject);
        private _removeShadowMapGLSLData();
        private _hasShadow();
        private _isShadowMapEnable();
    }
}

declare module wd {
    class EmptyShadowManager {
        static create(): EmptyShadowManager;
        update(elapsed: number): void;
        dispose(): void;
        getTwoDShadowMapDataMap(layer: string): any;
        getCubemapShadowMapDataMap(layer: string): any;
        setShadowRenderListForCurrentLoop(): void;
        getShadowRenderListByLayer(layer: string): any;
        getShadowLayerList(): any;
        init(): void;
    }
}

declare module wd {
    class ShadowMapManager {
        static create(shadowManager: ShadowManager): ShadowMapManager;
        constructor(shadowManager: ShadowManager);
        readonly twoDShadowMapCountForGLSL: number;
        readonly cubemapShadowMapCountForGLSL: number;
        twoDShadowMapDataMap: wdCb.Hash<wdCb.Collection<TwoDShadowMapData>>;
        cubemapShadowMapDataMap: wdCb.Hash<wdCb.Collection<CubemapShadowMapData>>;
        private _shadowManager;
        private _lastTwoDShadowMapDataMap;
        private _lastCubemapShadowMapDataMap;
        initShadowMapData(shadowLayerList: ShadowLayerList): void;
        updateWhenShadowLayerChange({addLayerList, removeLayerList}: {
            addLayerList: any;
            removeLayerList: any;
        }): void;
        getAllDiffShadowMapDataWhenShadowLayerChange(): any;
        private _getDiffShadowMapDataWhenShadowLayerChange(lastShadowMapDataMap, currentShadowMapDataMap);
        private _addTwoDShadowMapDataWithLayer(layerList, light);
        private _addCubemapShadowMapDataWithLayer(layerList, light);
        dispose(): void;
    }
    type TwoDShadowMapData = {
        shadowMap: TwoDShadowMapTexture;
        light: DirectionLight;
    };
    type CubemapShadowMapData = {
        shadowMap: CubemapShadowMapTexture;
        light: DirectionLight;
    };
}

declare module wd {
    class LightManager {
        static create(): LightManager;
        readonly ambientLight: GameObject;
        readonly directionLights: wdCb.Collection<GameObject>;
        readonly pointLights: wdCb.Collection<GameObject>;
        private _lights;
        addChild(light: GameObject): void;
        addChildren(lightList: wdCb.Collection<GameObject>): void;
        private _getLights(type);
    }
}

declare module wd {
    class RenderTargetRendererManager {
        static create(): RenderTargetRendererManager;
        private _commonRenderTargetRendererList;
        private _proceduralRendererList;
        init(): void;
        dispose(): void;
        addCommonRenderTargetRenderer(renderTargetRenderer: CommonRenderTargetRenderer): void;
        getCommonRenderTargetRendererList(): wdCb.Collection<CommonRenderTargetRenderer>;
        removeCommonRenderTargetRenderer(func: (renderTargetRenderer: CommonRenderTargetRenderer) => boolean): wdCb.Collection<CommonRenderTargetRenderer>;
        addProceduralRenderTargetRenderer(renderTargetRenderer: ProceduralRenderTargetRenderer): void;
        render(renderer: Renderer, camera: GameObject): void;
    }
}

declare module wd {
    class ShadowLayerList {
        static create(): ShadowLayerList;
        dirty: boolean;
        private _list;
        private _lastList;
        init(): void;
        update(): void;
        getDiffData(): {
            addLayerList: any;
            removeLayerList: any;
        };
        getCount(): number;
        addChild(layer: string): void;
        addChildren(...args: any[]): void;
        removeChild(layer: string): ShadowLayerList;
        removeAllChildren(): void;
        removeRepeatItems(): ShadowLayerList;
        hasRepeatItems(): false;
        forEach(...args: any[]): void;
        getChildren(): string[];
        hasChild(layer: string): boolean;
        private _convertCollectionToThis(list);
    }
}

declare module wd {
    class EventManager {
        static on(eventName: EEventName | EEngineEvent | string, handler: Function): void;
        static on(eventName: EEventName | EEngineEvent | string, handler: Function, priority: number): void;
        static on(target: EntityObject, eventName: EEventName | EEngineEvent | string, handler: Function): void;
        static on(dom: HTMLElement, eventName: EEventName | EEngineEvent | string, handler: Function): void;
        static on(target: EntityObject, eventName: EEventName | EEngineEvent | string, handler: Function, priority: number): void;
        static on(dom: HTMLElement, eventName: EEventName | EEngineEvent | string, handler: Function, priority: number): void;
        static off(): void;
        static off(eventName: EEventName | EEngineEvent | string): void;
        static off(target: EntityObject): void;
        static off(dom: HTMLElement): void;
        static off(eventName: EEventName | EEngineEvent | string, handler: Function): void;
        static off(target: EntityObject, eventName: EEventName | EEngineEvent | string): void;
        static off(dom: HTMLElement, eventName: EEventName): void;
        static off(target: EntityObject, eventName: EEventName | EEngineEvent | string, handler: Function): void;
        static off(dom: HTMLElement, eventName: EEventName, handler: Function): void;
        static trigger(event: Event): void;
        static trigger(event: Event, userData: any): void;
        static trigger(target: EntityObject, event: Event): void;
        static trigger(dom: HTMLElement, event: Event): void;
        static trigger(target: EntityObject, event: Event, userData: any): void;
        static trigger(target: EntityObject, event: Event, userData: any, notSetTarget: boolean): void;
        static broadcast(target: EntityObject, event: Event): any;
        static broadcast(target: EntityObject, event: Event, userData: any): any;
        static emit(target: EntityObject, event: Event): any;
        static emit(target: EntityObject, event: Event, userData: any): any;
        static fromEvent(eventName: EEventName | EEngineEvent | string): wdFrp.FromEventPatternStream;
        static fromEvent(eventName: EEventName | EEngineEvent | string, priority: number): wdFrp.FromEventPatternStream;
        static fromEvent(target: EntityObject, eventName: EEventName | EEngineEvent | string): wdFrp.FromEventPatternStream;
        static fromEvent(dom: HTMLElement, eventName: EEventName | EEngineEvent | string): wdFrp.FromEventPatternStream;
        static fromEvent(target: EntityObject, eventName: EEventName | EEngineEvent | string, priority: number): wdFrp.FromEventPatternStream;
        static fromEvent(dom: HTMLElement, eventName: EEventName | EEngineEvent | string, priority: number): wdFrp.FromEventPatternStream;
        static setBubbleParent(target: EntityObject, parent: any): void;
    }
}

declare module wd {
    enum EEngineEvent {
        STARTLOOP,
        ENDLOOP,
        POINT_TAP,
        POINT_DOWN,
        POINT_UP,
        POINT_MOVE,
        POINT_OVER,
        POINT_OUT,
        POINT_SCALE,
        POINT_DRAG,
        MATERIAL_CHANGE,
        UI_WIDTH_CHANGE,
        UI_HEIGHT_CHANGE,
        TRANSFORM_TRANSLATE,
        TRANSFORM_ROTATE,
        TRANSFORM_SCALE,
        SHADOWMAP_SOFTTYPE_CHANGE,
        SHADOWMAP_LAYER_CHANGE,
        COMPONENT_CHANGE,
        AFTER_SCENEGRAPH_BUILD,
        ANIMATION_STOP,
        EXIT,
        ENTER,
    }
}

declare module wd {
    abstract class EventListenerMap {
        abstract getChild(...args: any[]): wdCb.Collection<any>;
        abstract removeChild(...args: any[]): any;
        abstract hasChild(...args: any[]): boolean;
        abstract appendChild(...args: any[]): void;
        abstract forEachAll(func: (list: wdCb.Collection<any>, eventName: EEventName) => void): void;
        abstract forEachEventName(func: (list: wdCb.Collection<any>, eventName: EEventName) => void): void;
        abstract clear(): void;
        protected abstract buildFirstLevelKey(target: EntityObject | HTMLElement): string;
        protected buildSecondLevelKey(eventName: EEventName): string;
    }
}

declare module wd {
    class CustomEventListenerMap extends EventListenerMap {
        static create(): CustomEventListenerMap;
        private _globalListenerMap;
        private _targetRecordMap;
        hasChild(target: EntityObject): boolean;
        appendChild(eventName: EEventName, data: any): any;
        appendChild(target: EntityObject, eventName: EEventName, data: any): any;
        forEachAll(func: (list: wdCb.Collection<CustomEventRegisterData>, eventName: EEventName) => void): void;
        forEachEventName(func: (list: wdCb.Collection<CustomEventRegisterData>, eventName: EEventName) => void): void;
        clear(): void;
        getChild(eventName: EEventName): wdCb.Collection<CustomEventRegisterData>;
        getChild(target: EntityObject): wdCb.Collection<CustomEventRegisterData>;
        getChild(target: EntityObject, eventName: EEventName): wdCb.Collection<CustomEventRegisterData>;
        removeChild(eventName: EEventName): void;
        removeChild(target: EntityObject): void;
        removeChild(eventName: EEventName, handler: Function): void;
        removeChild(uid: number, eventName: EEventName): void;
        removeChild(target: EntityObject, eventName: EEventName): void;
        removeChild(target: EntityObject, eventName: EEventName, handler: Function): void;
        protected buildFirstLevelKey(target: EntityObject): any;
        protected buildFirstLevelKey(uid: number): any;
    }
}

declare module wd {
    class DomEventListenerMap extends EventListenerMap {
        static create(): DomEventListenerMap;
        private _targetListenerMap;
        hasChild(dom: HTMLElement, eventName: EEventName): boolean;
        appendChild(dom: HTMLElement, eventName: EEventName, data: any): void;
        forEachAll(func: (list: wdCb.Collection<DomEventRegisterData>, eventName: EEventName) => void): void;
        forEachEventName(func: (list: wdCb.Collection<DomEventRegisterData>, eventName: EEventName) => void): void;
        clear(): void;
        getChild(dom: HTMLElement): wdCb.Collection<DomEventRegisterData>;
        getChild(dom: HTMLElement, eventName: EEventName): wdCb.Collection<DomEventRegisterData>;
        removeChild(eventName: EEventName): wdCb.Collection<DomEventOffData>;
        removeChild(eventName: EEventName, handler: Function): wdCb.Collection<DomEventOffData>;
        removeChild(dom: HTMLElement, eventName: EEventName): wdCb.Collection<DomEventOffData>;
        removeChild(dom: HTMLElement, eventName: EEventName, handler: Function): wdCb.Collection<DomEventOffData>;
        protected buildFirstLevelKey(dom: HTMLElement): string;
        private _getEventDataOffDataList(eventName, result);
    }
    type DomEventOffData = {
        dom: HTMLElement;
        eventName: EEventName;
        domHandler: Function;
    };
}

declare module wd {
    interface IEventData {
        returnValue: boolean;
        preventDefault: () => void;
    }
    interface IKeyboardEventData extends IEventData {
        ctrlKey: number;
        altKey: number;
        shiftKey: number;
        metaKey: number;
        keyCode: number;
    }
    interface IMouseEventData extends IEventData {
        clientX: number;
        clientY: number;
        pageX: number;
        pageY: number;
        button: number;
        detail?: number;
        wheelDelta?: number;
        movementX?: number;
        webkitMovementX?: number;
        mozMovementX?: number;
        movementY?: number;
        webkitMovementY?: number;
        mozMovementY?: number;
        target: HTMLElement;
        currentTarget: HTMLElement;
    }
    interface ITouchEventData extends IEventData {
        touches: Array<ITouchData>;
        changedTouches: Array<ITouchData>;
        targetTouches: Array<ITouchData>;
        target: HTMLElement;
        currentTarget: HTMLElement | null;
    }
    interface ITouchData {
        clientX: number;
        clientY: number;
        identifier: number;
        pageX: number;
        pageY: number;
        screenX: number;
        screenY: number;
        radiusX: number;
        radiusY: number;
        rotationAngle: number;
        force: number;
        target: HTMLElement;
    }
    interface IPointEventData extends IEventData {
        clientX: number;
        clientY: number;
        pageX: number;
        pageY: number;
        button?: number;
        detail?: number;
        wheelDelta?: number;
        movementX?: number;
        webkitMovementX?: number;
        mozMovementX?: number;
        movementY?: number;
        webkitMovementY?: number;
        mozMovementY?: number;
        target: HTMLElement;
        currentTarget: HTMLElement | null;
    }
}

declare module wd {
    enum EEventType {
        MOUSE = 0,
        TOUCH = 1,
        POINT = 2,
        KEYBOARD = 3,
        CUSTOM = 4,
    }
}

declare module wd {
    enum EEventName {
        CLICK,
        MOUSEOVER,
        MOUSEUP,
        MOUSEOUT,
        MOUSEMOVE,
        MOUSEDOWN,
        MOUSEWHEEL,
        MOUSEDRAG,
        TOUCHUP,
        TOUCHMOVE,
        TOUCHDOWN,
        KEYDOWN,
        KEYUP,
        KEYPRESS,
    }
    class EventNameHandler {
        static handleEventName(domEventName: EEventName): any;
        private static _isFallbackEventName(eventName);
        private static _getSpecifyBrowserEventName(specifyBrowserEventNameArr);
    }
}

declare module wd {
    enum EEventPhase {
        BROADCAST = 0,
        EMIT = 1,
    }
}

declare module wd {
    class EventTable {
        static getEventType(eventName: EEventName): EEventType;
    }
}

declare module wd {
    abstract class Event {
        protected constructor(eventName: EEventName);
        readonly abstract type: EEventType;
        name: string | EEventName | EEngineEvent;
        target: HTMLElement | EntityObject;
        currentTarget: HTMLElement | EntityObject;
        isStopPropagation: boolean;
        phase: EEventPhase;
        abstract clone(): any;
        stopPropagation(): void;
        protected copyMember(destination: Event, source: Event, memberArr: [any]): Event;
    }
}

declare module wd {
    abstract class DomEvent extends Event {
        constructor(event: any, eventName: EEventName);
        private _event;
        event: any;
        preventDefault(): void;
        getDataFromCustomEvent(event: CustomEvent): void;
    }
}

declare module wd {
    class KeyboardEvent extends DomEvent {
        static create(event: any, eventName: EEventName): KeyboardEvent;
        event: IKeyboardEventData;
        readonly ctrlKey: number;
        readonly altKey: number;
        readonly shiftKey: number;
        readonly metaKey: number;
        readonly keyCode: number;
        readonly key: any;
        readonly type: EEventType;
        keyState: any;
        clone(): KeyboardEvent;
    }
}

declare module wd {
    abstract class PointEvent extends DomEvent {
        event: IPointEventData;
        abstract location: Point;
        abstract locationInView: Point;
        abstract button: number | null;
        readonly abstract wheel: number | null;
        readonly abstract movementDelta: Point;
        lastX: number;
        lastY: number;
        readonly type: EEventType;
        eventObj: MouseEvent | TouchEvent;
        abstract getDataFromEventObj(eventObj: TouchEvent | MouseEvent): void;
        protected cloneHelper(eventObj: PointEvent): PointEvent;
    }
}

declare module wd {
    class TouchPointEvent extends PointEvent {
        static create(eventName: EEventName): TouchPointEvent;
        eventObj: TouchEvent;
        location: Point;
        locationInView: Point;
        readonly wheel: any;
        readonly movementDelta: {
            x: any;
            y: any;
        };
        button: number;
        getDataFromEventObj(e: TouchEvent): void;
        clone(): any;
    }
}

declare module wd {
    class MousePointEvent extends PointEvent {
        static create(eventName: EEventName): MousePointEvent;
        eventObj: MouseEvent;
        location: Point;
        locationInView: Point;
        button: number;
        readonly wheel: number;
        readonly movementDelta: {
            x: any;
            y: any;
        };
        getDataFromEventObj(e: MouseEvent): void;
        clone(): any;
    }
}

declare module wd {
    class MouseEvent extends DomEvent {
        static create(event: IMouseEventData, eventName: EEventName): MouseEvent;
        event: IMouseEventData;
        private _location;
        location: Point;
        private _locationInView;
        locationInView: Point;
        private _button;
        button: number;
        readonly wheel: number;
        readonly movementDelta: {
            x: any;
            y: any;
        };
        readonly type: EEventType;
        lastX: number;
        lastY: number;
        clone(): MouseEvent;
        private _isPointerLocked();
    }
}

declare module wd {
    class TouchEvent extends DomEvent {
        static create(event: ITouchEventData, eventName: EEventName): TouchEvent;
        event: ITouchEventData;
        private _location;
        location: Point;
        readonly touchData: ITouchData;
        private _locationInView;
        locationInView: Point;
        readonly movementDelta: {
            x: any;
            y: any;
        };
        readonly type: EEventType;
        lastX: number;
        lastY: number;
        clone(): TouchEvent;
    }
}

declare module wd {
    class CustomEvent extends Event {
        static create(eventName: string): any;
        static create(eventName: string, userData: any): any;
        constructor(eventName: string);
        constructor(eventName: string, userData: any);
        readonly type: EEventType;
        userData: any;
        copyPublicAttri(destination: any, source: any): any;
        clone(): CustomEvent;
        getDataFromDomEvent(event: DomEvent): void;
    }
}

declare module wd {
    enum EMouseButton {
        LEFT = 0,
        RIGHT = 1,
        CENTER = 2,
    }
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
        off(): void;
        off(eventName: EEventName): void;
        off(eventName: EEventName, handler: Function): void;
        off(dom: HTMLElement, eventName: EEventName): void;
        off(dom: HTMLElement, eventName: EEventName, handler: Function): void;
        trigger(event: Event): void;
        trigger(dom: HTMLElement, event: Event): void;
        protected abstract triggerDomEvent(dom: HTMLElement, event: IEventData, eventName: EEventName): any;
        protected abstract addEngineHandler(eventName: EEventName, handler: Function): any;
        protected abstract getDefaultDom(): HTMLElement;
        protected abstract createEventData(): wdCb.Hash<any>;
        protected clearHandler(): void;
        protected buildDomHandler(dom: HTMLElement, eventName: EEventName): (event: any) => any;
        protected handler(dom: HTMLElement, eventName: EEventName, handler: Function, priority: number): void;
        private _bind(dom, eventName);
        private _unBind(dom, eventName, handler);
    }
}

declare module wd {
    abstract class PointEventHandler extends DomEventHandler {
        on(eventName: EEventName, handler: (event: DomEvent) => void, priority: number): any;
        on(dom: HTMLElement, eventName: EEventName, handler: (event: DomEvent) => void, priority: number): any;
        protected abstract createEventObject(dom: HTMLElement, event: IEventData, eventName: EEventName): DomEvent;
        protected getDefaultDom(): HTMLElement;
        protected triggerDomEvent(dom: HTMLElement, event: IEventData, eventName: EEventName): void;
        protected createEventData(): wdCb.Hash<any>;
        protected handleMove(handler: (event: MouseEvent | TouchEvent) => void): (event: TouchEvent | MouseEvent, eventData: wdCb.Hash<any>) => void;
        private _copyEventDataToEventObject(event, eventData);
        private _saveLocation(event, eventData);
    }
}

declare module wd {
    class MouseEventHandler extends PointEventHandler {
        static getInstance(): any;
        private constructor();
        protected addEngineHandler(eventName: EEventName, handler: (event: MouseEvent) => void): any;
        protected createEventObject(dom: HTMLElement, event: IMouseEventData, eventName: EEventName): MouseEvent;
    }
}

declare module wd {
    class TouchEventHandler extends PointEventHandler {
        static getInstance(): any;
        private constructor();
        protected addEngineHandler(eventName: EEventName, handler: (event: TouchEvent) => void): any;
        protected createEventObject(dom: HTMLElement, event: ITouchEventData, eventName: EEventName): TouchEvent;
    }
}

declare module wd {
    class KeyboardEventHandler extends DomEventHandler {
        static getInstance(): any;
        private constructor();
        on(eventName: EEventName, handler: (event: KeyboardEvent) => void, priority: number): any;
        on(dom: HTMLElement, eventName: EEventName, handler: (event: KeyboardEvent) => void, priority: number): any;
        protected triggerDomEvent(dom: HTMLElement, event: IKeyboardEventData, eventName: EEventName): void;
        protected getDefaultDom(): HTMLElement;
        protected addEngineHandler(eventName: EEventName, handler: (event: KeyboardEvent) => void): any;
        protected createEventData(): wdCb.Hash<any>;
        private _handleKeyDown(handler);
        private _handleKeyUp(handler);
        private _copyEventDataToEventObject(event, eventData);
        private _setKeyStateAllFalse(keyState);
        private _createEventObject(dom, event, eventName);
    }
}

declare module wd {
    class CustomEventHandler extends EventHandler {
        static getInstance(): any;
        private constructor();
        on(eventName: string, handler: Function, priority: number): void;
        on(target: EntityObject, eventName: string, handler: Function, priority: number): void;
        off(eventName: string): void;
        off(uid: number, eventName: string): void;
        off(eventName: string, handler: Function): void;
        off(target: EntityObject, eventName: string, handler: Function): void;
        trigger(event: Event): boolean;
        trigger(event: Event, userData: any): boolean;
        trigger(target: EntityObject, event: Event, notSetTarget: boolean): boolean;
        trigger(target: EntityObject, event: Event, userData: any, notSetTarget: boolean): boolean;
        private _triggerEventHandler(event, userData);
        private _triggerTargetAndEventHandler(target, event, userData, notSetTarget);
        private _setUserData(event, userData);
    }
}

declare module wd {
    abstract class EventDispatcher {
        abstract trigger(...args: any[]): any;
    }
}

declare module wd {
    class CustomEventDispatcher extends EventDispatcher {
        static getInstance(): any;
        private constructor();
        trigger(event: Event): boolean;
        trigger(event: Event, userData: any): boolean;
        trigger(target: EntityObject, event: Event): boolean;
        trigger(target: EntityObject, event: Event, notSetTarget: boolean): boolean;
        trigger(target: EntityObject, event: Event, userData: any): boolean;
        trigger(target: EntityObject, event: Event, userData: any, notSetTarget: boolean): boolean;
        emit(target: EntityObject, eventObject: Event, userData?: any): void;
        broadcast(target: EntityObject, eventObject: Event, userData?: any): void;
        private _triggerWithUserData(target, event, userData, notSetTarget);
    }
}

declare module wd {
    class DomEventDispatcher extends EventDispatcher {
        static getInstance(): any;
        private constructor();
        trigger(event: Event): void;
        trigger(dom: HTMLElement, event: Event): void;
    }
}

declare module wd {
    abstract class EventRegister {
        protected abstract listenerMap: EventListenerMap;
        abstract register(...args: any[]): void;
        abstract remove(...args: any[]): any;
        getEventRegisterDataList(eventName: EEventName): any;
        getEventRegisterDataList(currentTarget: EntityObject, eventName: EEventName): any;
        getEventRegisterDataList(dom: HTMLElement, eventName: EEventName): any;
        forEachAll(func: (list: wdCb.Collection<any>, eventName: EEventName) => void): void;
        forEachEventName(func: (list: wdCb.Collection<EventRegisterData>, eventName: EEventName) => void): void;
        clear(): void;
        getChild(target: EntityObject): any;
        getChild(dom: HTMLElement): any;
        getChild(target: EntityObject, eventName: EEventName): any;
        getChild(dom: HTMLElement, eventName: EEventName): any;
    }
    type EventRegisterData = {
        originHandler: Function;
        handler: Function;
        domHandler: Function;
        priority: number;
    };
}

declare module wd {
    class CustomEventRegister extends EventRegister {
        static getInstance(): any;
        private constructor();
        protected listenerMap: CustomEventListenerMap;
        register(eventName: EEventName, handler: Function, originHandler: Function, domHandler: Function, priority: number): any;
        register(target: EntityObject, eventName: EEventName, handler: Function, originHandler: Function, domHandler: Function, priority: number): any;
        remove(eventName: EEventName): any;
        remove(target: EntityObject): any;
        remove(eventName: EEventName, handler: Function): any;
        remove(uid: number, eventName: EEventName): any;
        remove(target: EntityObject, eventName: EEventName): any;
        remove(target: EntityObject, eventName: EEventName, handler: Function): any;
        setBubbleParent(target: EntityObject, parent: EntityObject): void;
        private _isAllEventHandlerRemoved(target);
        private _handleAfterAllEventHandlerRemoved(target);
    }
    type CustomEventRegisterData = {
        target: EntityObject;
        originHandler: Function;
        handler: Function;
        domHandler: Function;
        priority: number;
    };
}

declare module wd {
    class DomEventRegister extends EventRegister {
        static getInstance(): any;
        private constructor();
        protected listenerMap: DomEventListenerMap;
        register(dom: HTMLElement, eventName: EEventName, eventData: wdCb.Hash<any>, handler: Function, originHandler: Function, domHandler: Function, priority: number): void;
        remove(eventName: EEventName): any;
        remove(eventName: EEventName, handler: Function): any;
        remove(dom: HTMLElement, eventName: EEventName): any;
        remove(dom: HTMLElement, eventName: EEventName, handler: Function): any;
        isBinded(dom: HTMLElement, eventName: EEventName): boolean;
        getDomHandler(dom: HTMLElement, eventName: EEventName): Function;
    }
    type DomEventRegisterData = {
        dom?: HTMLElement;
        target?: EntityObject;
        eventData: wdCb.Hash<any>;
        originHandler: Function;
        handler: Function;
        domHandler: Function;
        priority: number;
    };
}

declare module wd {
    abstract class EventBinder {
        abstract on(...args: any[]): void;
        abstract off(...args: any[]): void;
    }
}

declare module wd {
    class CustomEventBinder extends EventBinder {
        static getInstance(): any;
        private constructor();
        on(eventName: EEventName | string, handler: Function): void;
        on(eventName: EEventName | string, handler: Function, priority: number): void;
        on(target: EntityObject, eventName: EEventName | string, handler: Function): void;
        on(target: EntityObject, eventName: EEventName | string, handler: Function, priority: number): void;
        off(): void;
        off(eventName: EEventName | string): void;
        off(target: EntityObject): void;
        off(eventName: EEventName | string, handler: Function): void;
        off(target: EntityObject, eventName: EEventName | string): void;
        off(target: EntityObject, eventName: EEventName | string, handler: Function): void;
    }
}

declare module wd {
    class DomEventBinder extends EventBinder {
        static getInstance(): any;
        private constructor();
        on(eventName: EEventName | string, handler: Function): void;
        on(eventName: EEventName | string, handler: Function, priority: number): void;
        on(dom: HTMLElement, eventName: EEventName | string, handler: Function): void;
        on(dom: HTMLElement, eventName: EEventName | string, handler: Function, priority: number): void;
        off(): void;
        off(eventName: EEventName | string): void;
        off(dom: HTMLElement): void;
        off(eventName: EEventName | string, handler: Function): void;
        off(dom: HTMLElement, eventName: EEventName): void;
        off(dom: HTMLElement, eventName: EEventName, handler: Function): void;
    }
}

declare module wd {
    class EventHandlerFactory {
        static createEventHandler(eventType: EEventType): any;
    }
}

declare module wd {
    class EventBinderFactory {
        static createEventBinder(eventName: EEventName): any;
    }
}

declare module wd {
    class EventDispatcherFactory {
        static createEventDispatcher(event: Event): any;
    }
}

declare module wd {
    class EventUtils {
        static isEvent(arg: any): boolean;
        static isEntityObject(arg: EntityObject): boolean;
    }
}

declare module wd {
    abstract class Action extends Component {
        readonly abstract isStop: boolean;
        readonly abstract isPause: boolean;
        readonly isStart: boolean;
        protected p_target: EntityObject;
        target: EntityObject;
        isFinish: boolean;
        abstract update(elapsed: number): any;
        abstract start(): any;
        abstract stop(): any;
        abstract pause(): any;
        abstract resume(): any;
        abstract reverse(): any;
        clone(): Action;
        reset(): void;
        addToObject(entityObject: EntityObject, isShareComponent?: boolean): void;
        addToComponentContainer(): void;
        removeFromComponentContainer(): void;
        init(): void;
        protected finish(): void;
    }
}

declare module wd {
    abstract class ActionInstant extends Action {
        readonly isStop: boolean;
        readonly isPause: boolean;
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
        clone(): Action;
        reverse(): this;
        update(elapsed: any): void;
    }
}

declare module wd {
    abstract class ActionInterval extends Action {
        protected elapsed: number;
        protected duration: number;
        private _isStop;
        private _isPause;
        private _timeController;
        readonly isStop: boolean;
        readonly isPause: boolean;
        update(elapsed: number): void;
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
        target: EntityObject;
        abstract getInnerActions(): any;
        init(): void;
        reverse(): this;
        reset(): this;
        protected iterate(method: string, argArr?: Array<any>): void;
    }
}

declare module wd {
    class Sequence extends Control {
        static create(...args: any[]): Sequence;
        constructor(actionArr: Array<Action>);
        private _actions;
        private _currentAction;
        private _actionIndex;
        initWhenCreate(): void;
        clone(): Action;
        update(elapsed: any): any;
        reset(): this;
        start(): this;
        stop(): this;
        pause(): this;
        resume(): this;
        reverse(): this;
        getInnerActions(): wdCb.Collection<Action>;
        private _startNextActionAndJudgeFinish();
    }
}

declare module wd {
    class Spawn extends Control {
        static create(...args: any[]): any;
        constructor(actionArr: Array<Action>);
        private _actions;
        clone(): Action;
        update(elapsed: any): void;
        start(): this;
        stop(): this;
        pause(): this;
        resume(): this;
        reset(): this;
        reverse(): this;
        getInnerActions(): wdCb.Collection<Action>;
        protected iterate(method: string, argArr?: Array<any>): void;
        private _isFinish();
    }
}

declare module wd {
    class DelayTime extends ActionInterval {
        static create(delayTime: number): DelayTime;
        protected duration: number;
        constructor(delayTime: number);
        clone(): Action;
        reverse(): this;
    }
}

declare module wd {
    class Repeat extends Control {
        static create(action: Action, times: number): Repeat;
        constructor(action: Action, times: number);
        private _innerAction;
        private _originTimes;
        private _times;
        clone(): Action;
        initWhenCreate(): void;
        update(elapsed: any): void;
        reset(): this;
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
        clone(): Action;
        update(elapsed: any): void;
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
                In: (k: any) => number;
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
        protected duration: number;
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
        from(object: any): this;
        to(properties: any, duration?: number): this;
        init(): void;
        start(): this;
        stop(): this;
        reverse(): void;
        easing(easing: any): this;
        interpolation(interpolation: any): this;
        onUpdate(callback: Function): this;
        onFinish(callback: Function): this;
        onStart(callback: Function): this;
        onStop(callback: Function): this;
        protected finish(): void;
    }
}

declare module wd {
    abstract class Animation extends Component {
        readonly isStart: boolean;
        readonly isStop: boolean;
        readonly isPause: boolean;
        entityObject: GameObject;
        protected state: EAnimationState;
        protected pauseTime: number;
        protected resumeTime: number;
        protected pauseDuration: number;
        protected frameCount: number;
        private _isResume;
        abstract play(...args: any[]): void;
        addToComponentContainer(): void;
        removeFromComponentContainer(): void;
        clone(): this;
        pause(): void;
        resume(): void;
        stop(): void;
        update(elapsed: number): void;
        protected abstract handleWhenPause(elapsed: number): void;
        protected abstract handleUpdate(elapsed: number): void;
        protected getPauseTime(): any;
        protected getResumeTime(): any;
        protected getCurrentTime(): any;
        protected continueFromPausePoint(elapsed: number): void;
    }
    enum EAnimationState {
        DEFAULT = 0,
        RUN = 1,
        STOP = 2,
        PAUSE = 3,
    }
}

declare module wd {
    abstract class SingleLayerKeyFrameAnimation extends Animation {
        isFrameChange: boolean;
        protected handleUpdate(elapsed: number): void;
        protected abstract handleWhenPause(elapsed: number): void;
        protected abstract handleWhenCurrentFrameFinish(elapsed: number): void;
        protected abstract handleBeforeJudgeWhetherCurrentFrameFinish(elapsed: number): void;
        protected abstract handleAfterJudgeWhetherCurrentFrameFinish(elapsed: number): void;
        protected abstract isCurrentFrameFinish(elapsed: number): boolean;
    }
}

declare module wd {
    abstract class MultiLayerKeyFrameAnimation extends Animation {
        protected controllerList: wdCb.Collection<LayerKeyFrameController>;
        private _isPlayOneTime;
        init(): void;
        playOneTime(...args: any[]): void;
        protected handleUpdate(elapsed: number): void;
        protected abstract createControllerMap(): void;
        protected abstract handleWhenPause(elapsed: number): void;
        protected abstract handleWhenCurrentFrameFinish(controller: LayerKeyFrameController, elapsed: number): void;
        protected abstract handleBeforeJudgeWhetherCurrentFrameFinish(controller: LayerKeyFrameController, elapsed: number): void;
        protected abstract handleAfterJudgeWhetherCurrentFrameFinish(controller: LayerKeyFrameController, elapsed: number): void;
        protected abstract handleAfterJudgeWhetherAllCurrentFrameFinish(elapsed: any): void;
        protected abstract isCurrentFrameFinish(controller: LayerKeyFrameController, elapsed: number): boolean;
        private _isAllControllerFinishAnimation();
    }
}

declare module wd {
    class MorphAnimation extends SingleLayerKeyFrameAnimation {
        static create(): MorphAnimation;
        readonly nextFrame: number;
        interpolation: number;
        currentFrame: number;
        duration: number;
        fps: number;
        currentAnimName: string;
        private _prevFrameEndTime;
        init(): void;
        dispose(): void;
        play(animName: string, fps: number): void;
        protected handleWhenPause(elapsed: number): void;
        protected handleWhenCurrentFrameFinish(elapsed: number): void;
        protected handleBeforeJudgeWhetherCurrentFrameFinish(elapsed: number): void;
        protected isCurrentFrameFinish(elapsed: number): boolean;
        protected handleAfterJudgeWhetherCurrentFrameFinish(elapsed: number): void;
        private _resetAnim();
        private _computeInterpolation(elapsed);
        private _isFinishAllFrames();
    }
}

declare module wd {
    class SkinSkeletonAnimation extends MultiLayerKeyFrameAnimation {
        static create(): SkinSkeletonAnimation;
        private _jointMatrices;
        readonly jointMatrices: Float32Array;
        readonly maxJoints: number;
        bindShapeMatrix: Matrix4;
        boneMatrixMap: wdCb.Hash<BoneMatrix>;
        jointNames: Array<string>;
        inverseBindMatrices: Array<Matrix4>;
        jointTransformData: SkinSkeletonAnimationData;
        private _jointOrderMap;
        private _afterSceneGraphBuildSubcription;
        private _inverseNodeToRootMatrix;
        initWhenCreate(): void;
        init(): void;
        dispose(): void;
        play(animName: string): any;
        play(animIndex: number): any;
        protected createControllerMap(): void;
        protected handleWhenPause(elapsed: number): void;
        protected handleWhenCurrentFrameFinish(controller: JointKeyFrameController, elapsed: number): void;
        protected handleBeforeJudgeWhetherCurrentFrameFinish(controller: JointKeyFrameController, elapsed: number): void;
        protected isCurrentFrameFinish(controller: JointKeyFrameController, elapsed: number): boolean;
        protected handleAfterJudgeWhetherCurrentFrameFinish(controller: JointKeyFrameController, elapsed: number): void;
        protected handleAfterJudgeWhetherAllCurrentFrameFinish(elapsed: number): void;
        private _initJointMatrices();
        private _bindPreComputeEvent();
    }
}

declare module wd {
    abstract class ArticulatedAnimation extends SingleLayerKeyFrameAnimation {
        data: ArticulatedAnimationData;
        private _controller;
        init(): void;
        dispose(): void;
        play(animName: string): any;
        play(animIndex: number): any;
        protected abstract createController(): ArticulatedKeyFrameController;
        protected handleWhenPause(elapsed: number): void;
        protected handleWhenCurrentFrameFinish(elapsed: number): void;
        protected handleBeforeJudgeWhetherCurrentFrameFinish(elapsed: number): void;
        protected isCurrentFrameFinish(elapsed: number): boolean;
        protected handleAfterJudgeWhetherCurrentFrameFinish(elapsed: number): void;
    }
    type ArticulatedAnimationData = wdCb.Hash<wdCb.Collection<KeyFrameAnimationFrameData>>;
}

declare module wd {
    class TransformArticulatedAnimation extends ArticulatedAnimation {
        static create(): TransformArticulatedAnimation;
        protected createController(): TransformArticulatedKeyFrameController;
    }
}

declare module wd {
    class TextureArticulatedAnimation extends ArticulatedAnimation {
        static create(): TextureArticulatedAnimation;
        protected createController(): TextureArticulatedKeyFrameController;
    }
}

declare module wd {
    class BoneMatrix {
        static create(localMatrix: Matrix4): BoneMatrix;
        constructor(localMatrix: Matrix4);
        private _localMatrix;
        readonly localMatrix: Matrix4;
        private _globalMatrix;
        readonly globalMatrix: Matrix4;
        private _parent;
        parent: BoneMatrix;
        dirtyLocal: boolean;
        dirtyGlobal: boolean;
        private _children;
        clone(): this;
        updateLocalMatrix(localMatrix: Matrix4): void;
        removeChild(boneMat: BoneMatrix): void;
        addChild(boneMat: BoneMatrix): void;
    }
}

declare module wd {
    abstract class LayerKeyFrameController {
        private _isFinishAnimation;
        isFinishAnimation: boolean;
        isPlayed: boolean;
        protected startFrameDataMap: wdCb.Hash<any>;
        protected currentAnimData: wdCb.Collection<KeyFrameAnimationFrameData>;
        protected currentFrameData: KeyFrameAnimationFrameData;
        private _frameCount;
        private _currentAnimName;
        private _currentFrame;
        private _beginElapsedTimeOfFirstFrame;
        private _prevFrameTime;
        private _prevFrameData;
        abstract saveZeroTimeFrameData(): void;
        abstract updateTargets(elapsed: number, pauseDuration: number): void;
        setCurrentAnimData(animName: string, data: wdCb.Collection<KeyFrameAnimationFrameData>): void;
        updateCurrentFrameData(): void;
        hasCurrentAnimData(): boolean;
        setBeginElapsedTimeOfFirstFrame(currentTime: number): void;
        savePrevFrameData(): void;
        resetAnim(): void;
        setFrameCount(): void;
        updateFrame(elapsed: number, pauseDuration: number): void;
        isCurrentFrameFinish(elapsed: number, pauseDuration: number): boolean;
        protected saveStartFrameData(frameData: KeyFrameAnimationFrameData): void;
        protected computeInterpolation(elapsed: number, pauseDuration: number, interpolationMethod: EKeyFrameInterpolation): number;
        private _getBeginElapsedTimeOfFirstFrameWhenFinishAllFrames(elapsed);
        private _isFinishAllFrames();
        private _updateCurrentFrameIndex(elapsed, pauseDuration);
        private _judgeBeginElapsedTime(elapsed, isFirstUpdateAttributeName);
    }
}

declare module wd {
    class JointKeyFrameController extends LayerKeyFrameController {
        static create(): JointKeyFrameController;
        currentUpdatedTransformMatrix: Matrix4;
        jointName: string;
        saveZeroTimeFrameData(): void;
        getFirstFrameTime(): number;
        addBoneMatrixAsTheFirstFrameWhoseTimeIsZero(boneMatrix: BoneMatrix): void;
        updateTargets(elapsed: number, pauseDuration: number): void;
    }
}

declare module wd {
    abstract class ArticulatedKeyFrameController extends LayerKeyFrameController {
        entityObject: GameObject;
        saveZeroTimeFrameData(): void;
        updateTargets(elapsed: number, pauseDuration: number): void;
        protected abstract updateTarget(target: any, startFrameData: any, endFrameData: any, interpolation: number): void;
    }
}

declare module wd {
    class TransformArticulatedKeyFrameController extends ArticulatedKeyFrameController {
        static create(): TransformArticulatedKeyFrameController;
        protected updateTarget(target: TransformArticulatedAnimationFrameTargetData, startFrameData: any, endFrameData: any, interpolation: number): void;
    }
    type TransformArticulatedAnimationFrameTargetData = {
        interpolationMethod: EKeyFrameInterpolation;
        target: EKeyFrameAnimationTarget;
        data: any;
    };
}

declare module wd {
    class TextureArticulatedKeyFrameController extends ArticulatedKeyFrameController {
        static create(): TextureArticulatedKeyFrameController;
        protected updateTarget(target: TextureArticulatedAnimationFrameTargetData, startFrameData: Array<number>, endFrameData: Array<number>, interpolation: number): void;
        private _updateTextureData(target, startFrameData, endFrameData, interpolation);
    }
    type TextureArticulatedAnimationFrameTargetData = {
        interpolationMethod: EKeyFrameInterpolation;
        target: EKeyFrameAnimationTarget;
        data: Array<number>;
        extra: {
            target: string;
        };
    };
}

declare module wd {
    class Billboard extends Component {
        static create(): Billboard;
        entityObject: GameObject;
        mode: EBillboardMode;
        addToComponentContainer(): void;
        removeFromComponentContainer(): void;
        update(elapsed: number): void;
        private _rotateByYAxis(camera, objToCamProj, cameraPos, objPos, objTransform);
        private _rotateLocalByXAxis(camera, objToCamProj, cameraPos, objPos, objTransform);
    }
}

declare module wd {
    enum EBillboardMode {
        NONE = 0,
        Y = 1,
        ALL = 2,
    }
}

declare module wd {
    abstract class LOD extends Component {
        entityObject: GameObject;
        abstract addLevel(distanceBetweenCameraAndObject: any, targetLevel: any, ...args: any[]): void;
        abstract update(elapsed: number): void;
        addToComponentContainer(): void;
        removeFromComponentContainer(): void;
    }
}

declare module wd {
    class GeometryLOD extends LOD {
        static create(): GeometryLOD;
        activeGeometry: Geometry;
        private _levelList;
        private _originGeometry;
        init(): void;
        addLevel(distanceBetweenCameraAndObject: any, geometryLevel: Geometry | ELODState): void;
        update(elapsed: number): void;
    }
    type LevelData = {
        distanceBetweenCameraAndObject: number;
        geometry: Geometry | ELODState;
    };
}

declare module wd {
    class GameObjectLOD extends LOD {
        static create(): GameObjectLOD;
        activeGameObject: GameObject;
        defaultGameObjectSwitchHandler: Function;
        private _levelList;
        private _lastActiveGameObject;
        private _lastNotNullActiveGameObject;
        init(): void;
        addLevel(distanceBetweenCameraAndObject: any, gameObjectLevel: GameObject | ELODState, switchHandler?: (gameObject: GameObject) => void): void;
        update(elapsed: number): void;
        private _computeCurrentDistanceBetweenCameraAndObject(currentCameraPos, gameObject);
        private _isSwitch();
    }
}

declare module wd {
    enum ELODState {
        INVISIBLE = 0,
    }
}

declare module wd {
    abstract class SpacePartition extends Component {
        isCollideEnable: boolean;
        abstract build(): void;
        abstract getRenderListByFrustumCull(): wdCb.Collection<GameObject>;
        abstract getRenderList(): wdCb.Collection<GameObject>;
        abstract getIntersectListWithRay(e: PointEvent): wdCb.Collection<GameObject>;
        abstract getCollideObjects(shape: Shape): wdCb.Collection<GameObject>;
        abstract getChildren(): wdCb.Collection<GameObject>;
        abstract update(elapsed: number): void;
        addToComponentContainer(): void;
        removeFromComponentContainer(): void;
    }
}

declare module wd {
    class Octree extends SpacePartition {
        static create(): Octree;
        maxDepth: number;
        maxNodeCapacity: number;
        private _root;
        private _selectionList;
        private _renderListCache;
        init(): void;
        update(elapsed: number): void;
        getRenderList(): wdCb.Collection<GameObject>;
        build(): void;
        getRenderListByFrustumCull(): any;
        getIntersectListWithRay(e: PointEvent): any;
        getCollideObjects(shape: Shape): any;
        getChildren(): wdCb.Collection<any>;
        private _visitRoot(method, args);
        private _updateColliderForFirstCheck(gameObjectList);
        private _getWorldExtends(gameObjectList);
        private _createCollider();
        private _checkExtends(v, min, max);
        private _setToRenderInstanceListOfChildren(sourceObject, sourceInstanceComponent);
        private _addSelfToToRenderInstanceList(self, instanceComponent);
        private _getRenderListForCurrentLoop();
    }
}

declare module wd {
    class OctreeNode {
        static create(minPoint: Vector3, maxPoint: Vector3, capacity: number, depth: number, maxDepth: number): OctreeNode;
        readonly gameObjectCount: number;
        gameObjectList: wdCb.Collection<GameObject>;
        nodeList: wdCb.Collection<OctreeNode>;
        private _depth;
        private _maxDepth;
        private _capacity;
        private _minPoint;
        private _maxPoint;
        private _boundingVectors;
        constructor(minPoint: Vector3, maxPoint: Vector3, capacity: number, depth: number, maxDepth: number);
        initWhenCreate(): void;
        addGameObjects(gameObjectList: wdCb.Collection<GameObject>): void;
        addNode(node: OctreeNode): void;
        findAndAddToRenderList(frustumPlanes: Array<Plane>, selectionList: wdCb.Collection<GameObject>): void;
        findAndAddToIntersectList(ray: Ray, selectionList: wdCb.Collection<GameObject>): void;
        findAndAddToCollideList(shape: Shape, selectionList: wdCb.Collection<GameObject>): void;
        private _hasNode();
    }
}

declare module wd {
    abstract class RigidBody extends Component {
        private _friction;
        friction: number;
        private _restitution;
        restitution: number;
        private _children;
        children: any;
        entityObject: GameObject;
        lockConstraint: LockConstraint;
        distanceConstraint: DistanceConstraint;
        hingeConstraint: HingeConstraint;
        pointToPointConstraintList: PointToPointConstraintList;
        addConstraint(): void;
        addToComponentContainer(): void;
        removeFromComponentContainer(): void;
        dispose(): void;
        getPhysicsComponentContainerAdapter(): any;
        initBody(): void;
        initConstraint(): void;
        protected abstract addBody(): any;
        protected addBodyToPhysicsComponentContainer(method: string, data?: any): void;
        private _onContact(collideObject);
        private _onCollisionStart(collideObject);
        private _onCollisionEnd();
        private _isContainer(entityObject);
    }
}

declare module wd {
    class DynamicRigidBody extends RigidBody {
        static create(): DynamicRigidBody;
        private _linearDamping;
        linearDamping: number;
        private _angularDamping;
        angularDamping: number;
        private _velocity;
        velocity: Vector3;
        private _angularVelocity;
        angularVelocity: Vector3;
        private _mass;
        mass: number;
        impulse: Vector3;
        force: Vector3;
        hitPoint: Vector3;
        protected addBody(): void;
    }
}

declare module wd {
    class KinematicRigidBody extends RigidBody {
        static create(): KinematicRigidBody;
        private _velocity;
        velocity: Vector3;
        private _angularVelocity;
        angularVelocity: Vector3;
        private _mass;
        mass: number;
        protected addBody(): void;
    }
}

declare module wd {
    class StaticRigidBody extends RigidBody {
        static create(): StaticRigidBody;
        protected addBody(): void;
    }
}

declare module wd {
    abstract class PhysicsConstraint {
        constructor(rigidBody: RigidBody);
        maxForce: number;
        protected rigidBody: RigidBody;
        clone(constraint: this): this;
    }
    class LockConstraint extends PhysicsConstraint {
        static create(rigidBody: RigidBody): LockConstraint;
        private _connectedBody;
        connectedBody: RigidBody;
    }
    class DistanceConstraint extends PhysicsConstraint {
        static create(rigidBody: RigidBody): DistanceConstraint;
        private _connectedBody;
        connectedBody: RigidBody;
        distance: number;
    }
    class HingeConstraint extends PhysicsConstraint {
        static create(rigidBody: RigidBody): HingeConstraint;
        private _connectedBody;
        connectedBody: RigidBody;
        pivotA: Vector3;
        pivotB: Vector3;
        axisA: Vector3;
        axisB: Vector3;
    }
    class PointToPointConstraint extends PhysicsConstraint {
        static create(): PointToPointConstraint;
        connectedBody: RigidBody;
        pivotA: Vector3;
        pivotB: Vector3;
    }
    class PointToPointConstraintList {
        static create(rigidBody: RigidBody): PointToPointConstraintList;
        constructor(rigidBody: RigidBody);
        private _rigidBody;
        private _list;
        clone(rigidBody: RigidBody): this;
        forEach(func: (PointToPointConstraint) => void, context?: any): void;
        getCount(): number;
        getChildren(): wdCb.Collection<PointToPointConstraint>;
        getChild(index: number): PointToPointConstraint;
        addChild(constraint: PointToPointConstraint): void;
        addChildren(arg: Array<PointToPointConstraint> | wdCb.List<PointToPointConstraint>): void;
        removeChild(constraint: PointToPointConstraint): void;
    }
}

declare module wd {
    class PhysicsConfig {
        static create(): PhysicsConfig;
        private _gravity;
        gravity: Vector3;
        enable: boolean;
        engine: EPhysicsEngineType;
        iterations: number;
    }
}

declare module wd {
    class PhysicsEngineFactory {
        static createNullAdapter(): IPhysicsEngineAdapter;
        static create(enable: boolean, type: EPhysicsEngineType): IPhysicsEngineAdapter;
    }
}

declare module wd {
    interface IPhysicsEngineAdapter {
        world: any;
        init(): void;
        update(elapsed: number): void;
        getGravity(gravity: number): Vector3;
        setGravity(gravity: Vector3): void;
        getFriction(obj: GameObject, friction: number): number;
        setFriction(obj: GameObject, friction: number): void;
        getRestitution(obj: GameObject, restitution: number): number;
        setRestitution(obj: GameObject, restitution: number): void;
        getLinearDamping(obj: GameObject): number;
        setLinearDamping(obj: GameObject, linearDamping: number): void;
        getAngularDamping(obj: GameObject): number;
        setAngularDamping(obj: GameObject, angularDamping: number): void;
        getMass(obj: GameObject): number;
        setMass(obj: GameObject, mass: number): void;
        getVelocity(obj: GameObject): Vector3;
        setVelocity(obj: GameObject, velocity: Vector3): void;
        getAngularVelocity(obj: GameObject): Vector3;
        setAngularVelocity(obj: GameObject, angularVelocity: Vector3): void;
        addDynamicBody(entityObject: GameObject, shape: Shape, options: any): void;
        addKinematicBody(entityObject: GameObject, shape: Shape, options: any): void;
        addStaticBody(entityObject: GameObject, shape: Shape, options: any): void;
        addLockConstraint(entityObject: GameObject, lockConstraint: LockConstraint): void;
        removeLockConstraint(entityObject: GameObject): void;
        addDistanceConstraint(entityObject: GameObject, distanceConstraint: DistanceConstraint): void;
        removeDistanceConstraint(entityObject: GameObject): void;
        addHingeConstraint(entityObject: GameObject, hingeConstraint: HingeConstraint): void;
        removeHingeConstraint(entityObject: GameObject): void;
        addPointToPointConstraint(entityObject: GameObject, pointToPointConstraint: PointToPointConstraint): void;
        removePointToPointConstraint(pointToPointConstraint: PointToPointConstraint): void;
        removeGameObject(obj: GameObject): void;
        removeConstraints(obj: GameObject): void;
    }
}

declare module wd {
    enum EPhysicsEngineType {
        CANNON = 0,
    }
}

declare module wd {
    class NullPhysicsEngineAdapter implements IPhysicsEngineAdapter {
        static create(): NullPhysicsEngineAdapter;
        world: any;
        getGravity(gravity: number): any;
        setGravity(gravity: Vector3): void;
        getFriction(obj: GameObject, friction: number): any;
        setFriction(obj: GameObject, friction: number): void;
        getRestitution(obj: GameObject, restitution: number): any;
        setRestitution(obj: GameObject, restitution: number): void;
        getLinearDamping(obj: GameObject): any;
        setLinearDamping(obj: GameObject, linearDamping: number): void;
        getAngularDamping(obj: GameObject): any;
        setAngularDamping(obj: GameObject, angularDamping: number): void;
        getMass(obj: GameObject): any;
        setMass(obj: GameObject, mass: number): void;
        getVelocity(obj: GameObject): any;
        setVelocity(obj: GameObject, velocity: Vector3): void;
        getAngularVelocity(obj: GameObject): any;
        setAngularVelocity(obj: GameObject, angularVelocity: Vector3): void;
        init(): void;
        addDynamicBody(entityObject: GameObject, data: any): void;
        addKinematicBody(entityObject: GameObject, data: any): void;
        addStaticBody(entityObject: GameObject, data: any): void;
        addLockConstraint(entityObject: GameObject, lockConstraint: LockConstraint): void;
        removeLockConstraint(entityObject: GameObject): void;
        addDistanceConstraint(entityObject: GameObject, distanceConstraint: DistanceConstraint): void;
        removeDistanceConstraint(entityObject: GameObject): void;
        addHingeConstraint(entityObject: GameObject, hingeConstraint: HingeConstraint): void;
        removeHingeConstraint(entityObject: GameObject): void;
        addPointToPointConstraint(entityObject: GameObject, pointToPointConstraint: PointToPointConstraint): void;
        removePointToPointConstraint(pointToPointConstraint: PointToPointConstraint): void;
        removeGameObject(obj: GameObject): void;
        removeConstraints(obj: GameObject): void;
        update(elapsed: number): void;
    }
}

declare module wd {
    abstract class CannonDataList {
        getCount(): number;
        protected dataList: wdCb.Collection<any>;
        protected removeByGameObject(obj: GameObject): void;
    }
}

declare module wd {
    class CannonGameObjectDataList extends CannonDataList {
        static create(): CannonGameObjectDataList;
        protected dataList: wdCb.Collection<CannonGameObjectData>;
        remove(obj: GameObject): void;
        updateBodyTransformData(): void;
        updateGameObjectTransformData(): void;
        add(obj: GameObject, body: CANNON.Body): void;
        findGameObjectByBody(b: CANNON.Body): GameObject;
        findBodyByGameObject(obj: GameObject): any;
    }
    type CannonGameObjectData = {
        entityObject: GameObject;
        body: CANNON.Body;
    };
}

declare module wd {
    class CannonMaterialList extends CannonDataList {
        static create(): CannonMaterialList;
        protected dataList: wdCb.Collection<CannonMaterialData>;
        remove(obj: GameObject): void;
        findMaterialByGameObject(obj: GameObject): CANNON.Material;
        add(obj: GameObject, material: CANNON.Material): void;
        addContactMaterial(world: CANNON.World, currentMaterial: CANNON.Material, friction: number, restitution: number): void;
        getContactMaterialData(world: CANNON.World, currentMaterial: CANNON.Material, dataName: string): any;
        getContactMaterials(world: CANNON.World, currentMaterial: CANNON.Material): any[];
        setContactMaterialData(world: CANNON.World, currentMaterial: CANNON.Material, dataName: string, data: any): void;
    }
    type CannonMaterialData = {
        entityObject: GameObject;
        material: CANNON.Material;
    };
}

declare module wd {
    abstract class CannonConstraintDataList extends CannonDataList {
    }
}

declare module wd {
    abstract class CannonSingleConstraintDataList extends CannonConstraintDataList {
        add(obj: GameObject, constraint: CANNON.Constraint): void;
        remove(obj: GameObject): void;
        findConstraintByGameObject(obj: GameObject): any;
    }
}

declare module wd {
    class CannonLockConstraintDataList extends CannonSingleConstraintDataList {
        static create(): CannonLockConstraintDataList;
        protected dataList: wdCb.Collection<CannonLockConstraintData>;
    }
    type CannonLockConstraintData = {
        entityObject: GameObject;
        constraint: CANNON.Constraint;
    };
}

declare module wd {
    class CannonPointToPointConstraintDataList extends CannonConstraintDataList {
        static create(): CannonPointToPointConstraintDataList;
        protected dataList: wdCb.Collection<CannonPointToPointConstraintData>;
        filter(func: (data: CannonPointToPointConstraintData) => boolean): wdCb.Collection<CannonPointToPointConstraintData>;
        forEach(func: (data: CannonPointToPointConstraintData) => void): void;
        add(entityObject: GameObject, pointToPointConstraint: PointToPointConstraint, constraint: CANNON.Constraint): void;
        remove(constraint: PointToPointConstraint): void;
        findCannonConstraintByPointToPointConstraint(constraint: PointToPointConstraint): CANNON.Constraint;
    }
    type CannonPointToPointConstraintData = {
        entityObject: GameObject;
        pointToPointConstraint: PointToPointConstraint;
        cannonConstraint: CANNON.Constraint;
    };
}

declare module wd {
    class CannonDistanceConstraintDataList extends CannonSingleConstraintDataList {
        static create(): CannonDistanceConstraintDataList;
        protected dataList: wdCb.Collection<CannonDistanceConstraintData>;
    }
    type CannonDistanceConstraintData = {
        entityObject: GameObject;
        constraint: CANNON.Constraint;
    };
}

declare module wd {
    class CannonHingeConstraintDataList extends CannonSingleConstraintDataList {
        static create(): CannonHingeConstraintDataList;
        protected dataList: wdCb.Collection<CannonHingeConstraintData>;
    }
    type CannonHingeConstraintData = {
        entityObject: GameObject;
        constraint: CANNON.Constraint;
    };
}

declare module wd {
    class CannonUtils {
        static convertToCannonVector3(v: Vector3): CANNON.Vec3;
        static convertToCannonQuaternion(rotation: Quaternion): CANNON.Quaternion;
        static convertToWDVector3(v: CANNON.Vec3): Vector3;
        static convertToWDQuaternion(r: CANNON.Quaternion): Quaternion;
    }
}

declare module wd {
    class CannonAdapter implements IPhysicsEngineAdapter {
        static create(): CannonAdapter;
        world: CANNON.World;
        private _materialList;
        private _gameObjectDataList;
        private _lockConstraintDataList;
        private _distanceConstraintDataList;
        private _hingeConstraintDataList;
        private _pointToPointConstraintDataList;
        private _dynamicBody;
        private _kinematicBody;
        private _staticBody;
        private _lockConstraint;
        private _distanceConstraint;
        private _hingeConstraint;
        private _pointToPointConstraint;
        getGravity(gravity: number): Vector3;
        setGravity(gravity: Vector3): void;
        getFriction(obj: GameObject, friction: number): any;
        setFriction(obj: GameObject, friction: number): void;
        getRestitution(obj: GameObject, restitution: number): any;
        setRestitution(obj: GameObject, restitution: number): void;
        getLinearDamping(obj: GameObject): any;
        setLinearDamping(obj: GameObject, linearDamping: number): any;
        getAngularDamping(obj: GameObject): any;
        setAngularDamping(obj: GameObject, angularDamping: number): any;
        getMass(obj: GameObject): any;
        setMass(obj: GameObject, mass: number): any;
        getVelocity(obj: GameObject): Vector3;
        setVelocity(obj: GameObject, velocity: Vector3): void;
        getAngularVelocity(obj: GameObject): Vector3;
        setAngularVelocity(obj: GameObject, angularVelocity: Vector3): void;
        init(): void;
        addDynamicBody(entityObject: GameObject, data: any): void;
        addKinematicBody(entityObject: GameObject, data: any): void;
        addStaticBody(entityObject: GameObject, data: any): void;
        addLockConstraint(entityObject: GameObject, lockConstraint: LockConstraint): void;
        removeLockConstraint(entityObject: GameObject): void;
        addDistanceConstraint(entityObject: GameObject, distanceConstraint: DistanceConstraint): void;
        removeDistanceConstraint(entityObject: GameObject): void;
        addHingeConstraint(entityObject: GameObject, hingeConstraint: HingeConstraint): void;
        removeHingeConstraint(entityObject: GameObject): void;
        addPointToPointConstraint(entityObject: GameObject, pointToPointConstraint: PointToPointConstraint): void;
        removePointToPointConstraint(pointToPointConstraint: PointToPointConstraint): void;
        removeGameObject(obj: GameObject): void;
        removeConstraints(obj: GameObject): void;
        update(elapsed: number): void;
        private _getMaterial(obj);
        private _getNumberData(obj, dataName);
        private _setNumberData(obj, dataName, data);
        private _getVec3Data(obj, dataName);
        private _setVec3Data(obj, dataName, data);
        private _getMaterialData(obj, dataName);
        private _setMaterialData(obj, dataName, data);
    }
}

declare module wd {
    abstract class CannonBody {
        constructor(world: CANNON.World, gameObjectDataList: CannonGameObjectDataList, materialList: CannonMaterialList);
        protected world: CANNON.World;
        protected materialList: CannonMaterialList;
        protected gameObjectList: CannonGameObjectDataList;
        addBody(entityObject: GameObject, data: any): CANNON.Body;
        protected abstract createBody(data: any): CANNON.Body;
        protected afterAddShape(body: CANNON.Body, data: any): void;
        private _createShape(shape);
        private _bindCollideEvent(targetBody, onCollisionStart, onContact, onCollisionEnd);
        private _createMaterial(entityObject, friction, restitution);
        private _getMaterial(obj);
        private _addMaterial(entityObject, currentMaterial, friction, restitution);
        private _addCompounds(entityObject, children, body);
    }
}

declare module wd {
    class CannonDynamicBody extends CannonBody {
        static create(world: CANNON.World, gameObjectDataList: CannonGameObjectDataList, materialList: CannonMaterialList): CannonDynamicBody;
        protected createBody({mass, linearDamping, angularDamping, velocity, angularVelocity}: {
            mass: any;
            linearDamping: any;
            angularDamping: any;
            velocity: any;
            angularVelocity: any;
        }): CANNON.Body;
        protected afterAddShape(body: CANNON.Body, {impulse, force, hitPoint}: {
            impulse: any;
            force: any;
            hitPoint: any;
        }): void;
    }
}

declare module wd {
    class CannonKinematicBody extends CannonBody {
        static create(world: CANNON.World, gameObjectDataList: CannonGameObjectDataList, materialList: CannonMaterialList): CannonKinematicBody;
        protected createBody({mass, velocity, angularVelocity}: {
            mass: any;
            velocity: any;
            angularVelocity: any;
        }): CANNON.Body;
    }
}

declare module wd {
    class CannonStaticBody extends CannonBody {
        static create(world: CANNON.World, gameObjectDataList: CannonGameObjectDataList, materialList: CannonMaterialList): CannonStaticBody;
        protected createBody({}: {}): CANNON.Body;
    }
}

declare module wd {
    abstract class CannonConstraint {
        constructor(world: CANNON.World, gameObjectDataList: CannonGameObjectDataList, constraintDataList: any);
        protected world: CANNON.World;
        protected gameObjectList: CannonGameObjectDataList;
        protected constraintDataList: any;
        addConstraint(entityObject: GameObject, wdConstraint: any): void;
        protected abstract createCannonConstraint(body: CANNON.Body, wdConstraint: PhysicsConstraint): CANNON.Constraint;
        protected abstract addToConstraintDataList(entityObject: GameObject, wdConstraint: PhysicsConstraint, cannonConstraint: CANNON.Constraint): void;
        protected findBody(rigidBody: RigidBody): any;
    }
}

declare module wd {
    abstract class CannonSingleConstraint extends CannonConstraint {
        removeConstraint(entityObject: GameObject): void;
        protected addToConstraintDataList(entityObject: GameObject, wdConstraint: LockConstraint, cannonConstraint: CANNON.Constraint): void;
    }
}

declare module wd {
    class CannonLockConstraint extends CannonSingleConstraint {
        static create(world: CANNON.World, gameObjectDataList: CannonGameObjectDataList, constraintDataList: CannonLockConstraintDataList): CannonLockConstraint;
        protected constraintDataList: CannonLockConstraintDataList;
        protected createCannonConstraint(body: CANNON.Body, lockConstraint: LockConstraint): CANNON.Constraint;
    }
}

declare module wd {
    class CannonPointToPointConstraint extends CannonConstraint {
        static create(world: CANNON.World, gameObjectDataList: CannonGameObjectDataList, constraintDataList: CannonPointToPointConstraintDataList): CannonPointToPointConstraint;
        protected constraintDataList: CannonPointToPointConstraintDataList;
        removeConstraint(pointToPointConstraint: PointToPointConstraint): void;
        protected createCannonConstraint(body: CANNON.Body, pointToPointConstraint: PointToPointConstraint): CANNON.Constraint;
        protected addToConstraintDataList(entityObject: GameObject, wdConstraint: PointToPointConstraint, cannonConstraint: CANNON.Constraint): void;
    }
}

declare module wd {
    class CannonDistanceConstraint extends CannonSingleConstraint {
        static create(world: CANNON.World, gameObjectDataList: CannonGameObjectDataList, constraintDataList: CannonDistanceConstraintDataList): CannonDistanceConstraint;
        protected constraintDataList: CannonDistanceConstraintDataList;
        protected createCannonConstraint(body: CANNON.Body, distanceConstraint: DistanceConstraint): CANNON.Constraint;
    }
}

declare module wd {
    class CannonHingeConstraint extends CannonSingleConstraint {
        static create(world: CANNON.World, gameObjectDataList: CannonGameObjectDataList, constraintDataList: CannonHingeConstraintDataList): CannonHingeConstraint;
        protected constraintDataList: CannonHingeConstraintDataList;
        protected createCannonConstraint(body: CANNON.Body, hingeConstraint: HingeConstraint): CANNON.Constraint;
    }
}

declare module wd {
    class BitmapFontLayout {
        static create(): BitmapFontLayout;
        private _layoutList;
        private _searchGlyph;
        getLayoutData(text: string, fntId: string, {width, tabSize, letterSpacing, align}: {
            width?: number;
            tabSize?: number;
            letterSpacing?: number;
            align?: EFontXAlignment;
        }): wdCb.Collection<{
            position: number[];
            data: FntCharData;
            index: number;
            line: number;
        }>;
        private _getFntObj(fntId);
    }
}

declare module wd {
    class BitmapFontParser {
        static getKerning(fntObj: FntData, left: string, right: string): number;
    }
}

declare module wd {
    class BitmapFontSearchGlyph {
        static create(): BitmapFontSearchGlyph;
        private _fallbackSpaceGlyph;
        private _fallbackTabGlyph;
        getGlyph(fntObj: FntData, id: number): FntCharData;
        getGlyphById(fntObj: FntData, id: number): FntCharData;
        setupSpaceGlyphs(fntObj: FntData, tabSize: number): void;
        private _getMGlyph(fntObj);
        private _getFirstGlyph(fntObj);
        private _getFontDefDictionary(fntObj);
    }
}

declare module wd {
    class BitmapFontWordWrapper {
        static getLines(fntObj: FntData, text: string, searchGlyph: BitmapFontSearchGlyph, {letterSpacing, width, start, end}: {
            letterSpacing: any;
            width?: number;
            start?: number;
            end?: number;
        }): any[];
        private static _greedy(fntObj, text, letterSpacing, searchGlyph, start, end, width);
        private static _computeMetrics(fntObj, text, letterSpacing, searchGlyph, start, end, width);
        private static _findNewLineIndex(text, chr, start, end);
        private static _isWhitespace(chr);
    }
}

declare module wd {
    abstract class ThreeDUI extends Component {
        update(elapsed: number): void;
        addToComponentContainer(): void;
        removeFromComponentContainer(): void;
    }
}

declare module wd {
    abstract class Line extends ThreeDUI {
    }
}

declare module wd {
    class SolidLine extends Line {
        static create(): SolidLine;
    }
}

declare module wd {
    class DashLine extends Line {
        static create(): DashLine;
    }
}

declare module wd {
    class Arrow extends ThreeDUI {
        static create(): Arrow;
    }
}

declare module wd {
    abstract class ThreeDFont extends ThreeDUI {
        protected needFormat: boolean;
        private _isFirstUpdate;
        update(elapsed: number): void;
        protected reFormat(): void;
    }
}

declare module wd {
    abstract class TwoDUI extends Component {
        dirty: boolean;
        readonly width: number;
        readonly height: number;
        entityObject: UIObject;
        context: CanvasRenderingContext2D;
        update(elapsed: number): void;
        init(): void;
        addToComponentContainer(): void;
        removeFromComponentContainer(): void;
        render(): void;
        protected draw(): void;
        protected shouldNotRender(): boolean;
        protected getContext(): any;
        protected getCanvas(): HTMLCanvasElement;
        protected getUIRenderer(): UIRenderer;
        protected drawInCenterPoint(context: CanvasRenderingContext2D, source: any, position: Vector2, width: number, height: number): any;
        protected drawInCenterPoint(context: CanvasRenderingContext2D, source: any, sx: number, sy: number, sw: number, sh: number, position: Vector2, width: number, height: number): any;
        private _setCanvasTransformForRotation();
    }
}

declare module wd {
    enum EFontXAlignment {
        LEFT = 0,
        CENTER = 1,
        RIGHT = 2,
    }
}

declare module wd {
    enum EFontYAlignment {
        TOP = 0,
        MIDDLE = 1,
        BOTTOM = 2,
    }
}

declare module wd {
    abstract class TwoDFont extends TwoDUI {
        protected needFormat: boolean;
        private _sizeChangeEventSubscription;
        init(): void;
        dispose(): void;
        update(elapsed: number): void;
        protected reFormat(): void;
        protected getLeftCornerPosition(): Vector2;
    }
}

declare module wd {
    class PlainFont extends TwoDFont {
        static create(): PlainFont;
        private _text;
        text: string;
        private _fontSize;
        fontSize: number;
        private _fontFamily;
        fontFamily: string;
        private _xAlignment;
        xAlignment: EFontXAlignment;
        private _yAlignment;
        yAlignment: EFontYAlignment;
        private _lineHeight;
        private _strArr;
        private _isLineHeightDirty;
        private _formater;
        private _drawer;
        init(): void;
        setFillStyle(fillStyle: string): void;
        enableStroke(strokeStyle: string, strokeSize: number): void;
        enableFill(fillStyle: string): void;
        setLineHeight(lineHeight: number): void;
        protected reFormat(): void;
        protected draw(): void;
        private _getDefaultLineHeight();
        private _measure(text);
    }
}

declare module wd {
    class PlainFontFormater {
        static create(): PlainFontFormater;
        private _strArr;
        private _context;
        private _fontSize;
        private _fontFamily;
        trimStr(text: string): string;
        formatText(context: CanvasRenderingContext2D, strArr: Array<string>, maxWidth: number, fontSize: number, fontFamily: string): void;
        private _formatMultiLine(i, text, allWidth, maxWidth);
        private _measure(text);
    }
}

declare module wd {
    class PlainFontDrawer {
        static create(): PlainFontDrawer;
        private _context;
        private _strArr;
        private _leftCornerPosition;
        private _fontSize;
        private _fontFamily;
        private _maxWidth;
        private _height;
        private _lineHeight;
        private _xAlignment;
        private _yAlignment;
        private _fontClientHeightCache;
        private _fillEnabled;
        private _fillStyle;
        private _strokeEnabled;
        private _strokeStyle;
        private _strokeSize;
        setFillStyle(fillStyle: string): void;
        enableStroke(strokeStyle: string, strokeSize: number): void;
        enableFill(fillStyle: string): void;
        clone(): any;
        draw(data: any): void;
        private _getFontClientHeight();
        private _drawMultiLine();
        private _drawSingleLine();
        private _measure(text);
    }
}

declare module wd {
    class PlainFontUtils {
        static measure(context: CanvasRenderingContext2D, text: string, fontSize: number, fontFamily: string): number;
        static computeLineHeight(lineHeight: number | string, fontSize: number, fontFamily: string): any;
    }
}

declare module wd {
    class TwoDBitmapFont extends TwoDFont {
        static create(): TwoDBitmapFont;
        private _text;
        text: string;
        private _xAlignment;
        xAlignment: EFontXAlignment;
        fntId: string;
        bitmapId: string;
        private _charFontList;
        private _layout;
        init(): boolean;
        dispose(): void;
        protected reFormat(): boolean;
        private _getImageAsset();
        private _createAndAddFontCharUIObjects(layoutDataList, imageAsset);
        private _createCharFont(index, uiRenderer);
        private _addCharFontUIObject(charFontUIObject);
        private _setCharFontUIObjectPosition(charFontUIObject, x, y);
        private _removeAllCharFont();
    }
}

declare module wd {
    class CharFont extends TwoDFont {
        static create(): CharFont;
        x: number;
        readonly y: number;
        private _char;
        char: string;
        startPosX: number;
        xAdvance: number;
        image: HTMLImageElement;
        rectRegion: RectRegion;
        private _subscription;
        clone(): any;
        init(): void;
        dispose(): void;
        protected shouldNotRender(): boolean;
        protected draw(): void;
    }
}

declare module wd {
    class ProgressBar extends TwoDUI {
        static create(): ProgressBar;
        private _percent;
        percent: number;
        borderStyle: string;
        fillStyle: string;
        radius: number;
        private _offScreenCanvas;
        private _offScreenContext;
        init(): void;
        protected shouldNotRender(): boolean;
        protected draw(): void;
        private _drawFromLeft(position);
        private _drawBorder(position);
        private _createOffScreenCanvas();
        private _drawProgressBar();
    }
}

declare module wd {
    class Image extends TwoDUI {
        static constructorForBlend: (obj: any) => boolean;
        static constructorInitForBlend: boolean;
        static create(): Image;
        private _source;
        source: ImageTextureAsset;
        color: Color;
        targetSource: ImageTextureAsset;
        targetColor: Color;
        private _blendColorWithSource;
        protected shouldNotRender(): boolean;
        protected draw(): void;
        private _setFillStyle(style);
        private _getDrawSource();
        private _getDrawColor();
        private _blendByMultiply();
        private _blendByPerPixel();
        private _setGlobalCompositeOperation(context, mode);
        private _setGlobalAlpha(context, alpha);
    }
}

declare module wd {
    abstract class InteractionUI extends TwoDUI {
        protected p_transitionMode: ETransitionMode;
        transitionMode: ETransitionMode;
        transitionManager: TransitionManager;
    }
}

declare module wd {
    class Button extends InteractionUI {
        static create(): Button;
        private _text;
        text: string;
        readonly isDisabled: boolean;
        readonly currentState: EUIState;
        private _pointdownSubscription;
        private _pointupSubscription;
        private _pointoverSubscription;
        private _pointoutSubscription;
        private _stateMachine;
        initWhenCreate(): void;
        init(): void;
        dispose(): void;
        getObject(objectName: EButtonObjectName): UIObject;
        getObjectTransition(objectName: EButtonObjectName): Transition;
        enable(): void;
        disable(): void;
        update(elapsed: number): void;
        render(): void;
        private _createBackgroundObject();
        private _createFontObject();
        private _hasFontObject();
        private _bindEvent();
    }
}

declare module wd {
    enum EButtonObjectName {
        BACKGROUND,
        TEXT,
    }
}

declare module wd {
    enum EUIState {
        NORMAL = 0,
        HIGHLIGHT = 1,
        PRESSED = 2,
        DISABLED = 3,
    }
}

declare module wd {
    class UIStateMachine {
        static create(ui: InteractionUI): UIStateMachine;
        constructor(ui: InteractionUI);
        readonly transitionManager: TransitionManager;
        readonly currentState: EUIState;
        private _ui;
        private _stateHistory;
        clone(machine: this): this;
        changeState(state: EUIState): void;
        backState(): void;
        isState(state: EUIState): boolean;
    }
}

declare module wd {
    abstract class Transition {
        private _target;
        target: any;
        abstract changeState(state: EUIState): any;
        clone(): this;
    }
}

declare module wd {
    class SpriteTransition extends Transition {
        static create(): SpriteTransition;
        normalSprite: ImageTextureAsset;
        highlightSprite: ImageTextureAsset;
        pressedSprite: ImageTextureAsset;
        disabledSprite: ImageTextureAsset;
        changeState(state: EUIState): void;
    }
}

declare module wd {
    class ColorTransition extends Transition {
        static create(): ColorTransition;
        normalColor: Color;
        highlightColor: Color;
        pressedColor: Color;
        disabledColor: Color;
        changeState(state: EUIState): void;
    }
}

declare module wd {
    enum ETransitionMode {
        SPRITE = 0,
        COLOR = 1,
    }
}

declare module wd {
    class TransitionManager {
        static create(ui: InteractionUI): TransitionManager;
        constructor(ui: InteractionUI);
        private _ui;
        private _spriteTransitionMap;
        private _colorTransitionMap;
        clone(manager: this): this;
        getObjectTransition(objectName: EButtonObjectName): Transition;
        getObjectTarget(objectName: EButtonObjectName): any;
        changeState(state: EUIState): void;
        private _getTransitionMap();
        private _createTransitionInstance();
    }
}

declare module wd {
    class RoundedRectUtils {
        static drawRoundedRect(context: CanvasRenderingContext2D, strokeStyle: string, fillStyle: string, cornerX: number, cornerY: number, width: number, height: number, cornerRadius: number): void;
    }
}

declare module wd {
    class UIRendererUtils {
        static getUIRenderer(uiObject: UIObject): UIRenderer;
    }
}

declare module wd {
    class ComponentInitOrderTable {
        static getOrder(component: Component): number;
    }
}

declare module wd {
    abstract class Instance extends Component {
        entityObject: GameObject;
        addToObject(entityObject: GameObject, isShareComponent?: boolean): void;
        clone(): this;
    }
}

declare module wd {
    abstract class SourceInstance extends Instance {
        private _instanceBuffer;
        readonly instanceBuffer: InstanceBuffer;
        entityObject: GameObject;
    }
}

declare module wd {
    class OneToOneSourceInstance extends SourceInstance {
        static create(): OneToOneSourceInstance;
        readonly toRenderInstanceListForDraw: wdCb.Collection<any>;
        readonly defaultToRenderInstanceList: wdCb.Collection<{}>;
        instanceList: wdCb.Collection<any>;
        private _toRenderInstanceList;
        private _endLoopSubscription;
        private _isAddSourceInstanceToChildren;
        private _enterSubscription;
        private _exitSubscription;
        init(): void;
        dispose(): void;
        cloneInstance(name: string): GameObject;
        hasToRenderInstance(): boolean;
        addToRenderIntance(instanceObj: GameObject): void;
        forEachToRenderInstanceList(func: (toRenderInstance: GameObject) => void): void;
        private _addComponentsFromSourceToObject(source, instance);
        private _addSourceInstanceToChildren();
        private _addAllInstances();
        private _removeAllInstances();
        private _buildInstanceChildName(parentName, childName);
    }
}

declare module wd {
    class OneToManySourceInstance extends SourceInstance {
        static create(): OneToManySourceInstance;
    }
}

declare module wd {
    class ObjectInstance extends Instance {
        static create(): ObjectInstance;
        sourceObject: GameObject;
        private _enterSubscription;
        private _exitSubscription;
        init(): void;
        dispose(): void;
        private _addToSourceAndItsChildren();
        private _removeFromSourceAndItsChildren();
    }
}

declare module wd {
    enum EInstanceTag {
        isRemoveSourceInstance,
        isAddSourceInstance,
    }
}

declare module wd {
    abstract class EventTriggerDetector extends Component {
        abstract isTrigger(e: PointEvent): boolean;
        clone(): this;
    }
}

declare module wd {
    class UIEventTriggerDetector extends EventTriggerDetector {
        static create(): UIEventTriggerDetector;
        isTrigger(e: PointEvent): boolean;
    }
}

declare module wd {
    class RayCasterEventTriggerDetector extends EventTriggerDetector {
        static create(): RayCasterEventTriggerDetector;
        isTrigger(e: PointEvent): boolean;
    }
}

declare module wd {
    class SceneEventTriggerDetector extends EventTriggerDetector {
        static create(): SceneEventTriggerDetector;
        isTrigger(e: PointEvent): boolean;
    }
}

declare module wd {
    class EventTriggerDetectorUtils {
        static isInRect(locationInView: Point, leftUpCornerPosition: Vector2, width: number, height: number): boolean;
    }
}

declare module wd {
    class EventTriggerTable {
        static getScriptHandlerName(eventName: EEventName): string;
        static getScriptEngineEvent(eventName: EEventName): string;
    }
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
        onContact?(collisionObjects: wdCb.Collection<GameObject>): any;
        onCollisionStart?(collisionObjects: wdCb.Collection<GameObject>): any;
        onCollisionEnd?(): any;
    }
}

declare module wd {
    interface IEventScriptBehavior extends IScriptBehavior {
        onPointDown?(e: PointEvent): any;
        onPointUp?(e: PointEvent): any;
        onPointMove?(e: PointEvent): any;
        onPointOver?(e: PointEvent): any;
        onPointOut?(e: PointEvent): any;
        onPointScale?(e: PointEvent): any;
        onPointTap?(e: PointEvent): any;
        onPointDrag?(e: PointEvent): any;
    }
}

declare module wd {
    class Script extends Component {
        static scriptList: wdCb.Stack<ScriptFileData>;
        static create(): Script;
        static create(id: string): Script;
        static addScript(scriptName: string, _class: Function): void;
        constructor(id?: string);
        id: string;
        addToComponentContainer(): void;
    }
    type ScriptFileData = {
        name: string;
        class: any;
    };
}

declare module wd {
    abstract class Transform extends Component {
        protected p_parent: Transform;
        parent: Transform;
        isTransform: boolean;
        private _isTranslate;
        isTranslate: boolean;
        private _isRotate;
        isRotate: boolean;
        private _isScale;
        isScale: boolean;
        isLocalTranslate: boolean;
        isLocalRotate: boolean;
        isLocalScale: boolean;
        dirtyLocal: boolean;
        protected children: wdCb.Collection<Transform>;
        private _endLoopSubscription;
        init(): void;
        dispose(): void;
        addChild(child: Transform): void;
        removeChild(child: Transform): void;
        setChildrenTransformState(state: boolean): any;
        setChildrenTransformState(transformState: ETransformState, state: boolean): any;
        protected abstract clearCache(): void;
        protected handleWhenSetTransformState(transformState?: ETransformState): void;
        protected setParent(parent: Transform): void;
        protected getMatrix<T>(syncMethod: string, matrixAttriName: string): T;
        private _setGlobalTransformState(state);
        private _setGlobalTransformState(transformState, state);
        private _setLocalTransformState(transformState, state);
        private _resetTransformFlag();
    }
}

declare module wd {
    class ThreeDTransform extends Transform {
        static create(): ThreeDTransform;
        private _localToWorldMatrix;
        localToWorldMatrix: Matrix4;
        readonly normalMatrix: Matrix3;
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
        readonly up: Vector3;
        readonly right: Vector3;
        readonly forward: any;
        dirtyWorld: boolean;
        protected p_parent: ThreeDTransform;
        protected children: wdCb.Collection<ThreeDTransform>;
        private _localToParentMatrix;
        private _localToWorldMatrixCache;
        private _positionCache;
        private _rotationCache;
        private _scaleCache;
        private _eulerAnglesCache;
        private _localEulerAnglesCache;
        private _normalMatrixCache;
        private _isUserSpecifyTheLocalToWorldMatrix;
        private _userLocalToWorldMatrix;
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
        protected clearCache(): void;
        protected handleWhenSetTransformState(transformState?: ETransformState): void;
    }
}

declare module wd {
    class RectTransform extends Transform {
        static create(): RectTransform;
        entityObject: UIObject;
        private _rotationMatrix;
        readonly rotationMatrix: Matrix3;
        private _localPositionAndScaleMatrix;
        readonly localPositionAndScaleMatrix: Matrix3;
        private _position;
        position: Vector2;
        private _rotation;
        rotation: number;
        private _scale;
        scale: Vector2;
        private _localPosition;
        localPosition: Vector2;
        private _localScale;
        localScale: Vector2;
        private _anchorX;
        anchorX: Vector2;
        private _anchorY;
        anchorY: Vector2;
        private _width;
        width: number;
        private _height;
        height: number;
        dirtyRotation: boolean;
        dirtyPositionAndScale: boolean;
        pivot: Vector2;
        zIndex: number;
        protected p_parent: RectTransform;
        protected children: wdCb.Collection<RectTransform>;
        private _localRotationMatrix;
        private _localToParentMatrix;
        private _rotationMatrixCache;
        private _localPositionAndScaleMatrixCache;
        syncRotation(): void;
        syncPositionAndScale(): void;
        translate(translation: Vector2): any;
        translate(x: number, y: number): any;
        rotate(angle: number): this;
        rotateAround(angle: number, center: Vector2): any;
        rotateAround(angle: number, centerX: number, centerY: number): any;
        private _translateInRotationMatrix(x, y);
        resetPosition(): void;
        resetScale(): void;
        resetRotation(): void;
        protected handleWhenSetTransformState(transformState: ETransformState): void;
        protected clearCache(): void;
        private _rotateAroundCanvasOriginPoint(angle);
        private _getParentWidth();
        private _getParentHeight();
        private _getParentPosition();
        private _getParentScale();
        private _markRendererDirty();
    }
}

declare module wd {
    enum ETransformState {
        ISTRANSLATE,
        ISROTATE,
        ISSCALE,
        ISLOCALTRANSLATE,
        ISLOCALROTATE,
        ISLOCALSCALE,
    }
}

declare module wd {
    class Shadow extends Component {
        static create(): Shadow;
        entityObject: GameObject;
        private _receive;
        receive: boolean;
        private _cast;
        cast: boolean;
        private _layer;
        layer: string;
        private _shadowMapLayerChangeSubscription;
        private _isInit;
        addToObject(entityObject: EntityObject, isShareComponent?: boolean): void;
        init(): void;
        dispose(): void;
        private _addAllShadowMaps(twoDShadowMapDataMap, cubemapShadowMapDataMap, mapManager);
        private _isFirstLevelObjectOfSceneOrSpacePartition();
        private _addBuildShadowMapShaderAndShadowMapsToObjectAndChildren();
        private _addBuildShadowMapShaderToObjectAndChildren();
        private _addBuildTwoDShadowMapShader(material, shader);
        private _addBuildCubemapShadowMapShader(material, shader);
        private _createBuildTwoDShadowMapShader(gameObject, geometry);
        private _createBuildCubemapShadowMapShader(gameObject, geometry);
        private _createBuildShadowMapShader(gameObject, geometry);
        private _addShadowMapsToObjectAndChildren();
        private _removeShadowMapsOfObjectAndChildren();
        private _switchToShadowMapShaderLib(gameObject);
        private _switchToNoShadowMapShaderLib(gameObject);
        private _isTwoDShadowMap(mapManager);
        private _isCubemapShadowMap(mapManager);
    }
}

declare module wd {
    class ShadowUtils {
        static isReceive(gameObject: GameObject): boolean;
    }
}

declare module wd {
    enum EShadowLayer {
        DEFAULT,
    }
}

declare module wd {
    abstract class Geometry extends Component {
        private _material;
        material: Material;
        readonly geometryData: GeometryData;
        entityObject: GameObject;
        buffers: BufferContainer;
        vaoManager: VAOManager;
        drawMode: EDrawMode;
        abstract computeData(): GeometryDataType;
        init(): void;
        hasFaceNormals(): boolean;
        hasVertexNormals(): boolean;
        hasColors(): boolean;
        isSmoothShading(): boolean;
        dispose(): void;
        computeFaceNormals(): void;
        computeVertexNormals(): void;
        createBuffersFromGeometryData(): void;
        protected computeNormals(): void;
        protected createBufferContainer(): BufferContainer;
        protected createGeometryData(computedData: GeometryDataType): GeometryData;
        protected createBasicGeometryData(computedData: GeometryDataType): BasicGeometryData;
    }
    type GeometryDataType = {
        vertices: Array<number>;
        faces?: Array<Face3>;
        texCoords?: Array<number>;
        colors?: Array<number>;
    };
}

declare module wd {
    abstract class InstanceGeometry extends Geometry {
        private _customGeometry;
        vertices: Array<number>;
        texCoords: Array<number>;
        colors: Array<number>;
        indices: Array<number>;
        normals: Array<number>;
        readonly instanceAttributeData: wdCb.Collection<InstanceAttributeData>;
        readonly instanceCount: number;
        private _attributeData;
        readonly attributeData: wdCb.Collection<wdCb.Collection<InstanceAttributeData>>;
        dirty: boolean;
        addInstanceAttributes(attributes: Array<InstanceAttributeData>): void;
        clearInstanceAttributeData(): void;
        computeData(): {
            vertices: number[];
            faces: Face3[];
            texCoords: number[];
            colors: number[];
        };
    }
    type InstanceAttributeData = {
        attributeName: string;
        data: Array<number> | Float32Array;
        meshPerAttribute: number;
    };
}

declare module wd {
    class BasicInstanceGeometry extends InstanceGeometry {
        static create(): BasicInstanceGeometry;
    }
}

declare module wd {
    class VAOManager {
        static create(): VAOManager;
        private _vaoMap;
        private _extension;
        init(): void;
        dispose(): void;
        getVAOData(toSendBuffersUidStr: string): {
            vao: any;
            isSetted: boolean;
        };
        sendAllBufferData(toSendBuffersUidStr: string, toSendBufferArr: Array<ArrayBuffer>): void;
    }
}

declare module wd {
    abstract class LineGeometry extends Geometry {
        private _customGeometry;
        vertices: Array<number>;
        computeData(): {
            vertices: number[];
        };
        protected abstract computeVertices(): Array<number>;
    }
}

declare module wd {
    class SolidLineGeometry extends LineGeometry {
        static create(): SolidLineGeometry;
        initWhenCreate(): void;
        protected computeVertices(): Array<number>;
    }
}

declare module wd {
    class DashLineGeometry extends LineGeometry {
        static create(): DashLineGeometry;
        dashSize: number;
        gapSize: number;
        dashCount: number;
        initWhenCreate(): void;
        protected computeVertices(): any[];
    }
}

declare module wd {
    class ConvexPolygonGeometry extends Geometry {
        static create(): ConvexPolygonGeometry;
        private _customGeometry;
        vertices: Array<number>;
        texCoords: Array<number>;
        colors: Array<number>;
        indices: Array<number>;
        normals: Array<number>;
        computeData(): {
            vertices: number[];
            faces: Face3[];
            texCoords: number[];
            colors: number[];
        };
    }
}

declare module wd {
    class GeometryUtils {
        static convertToFaces(indices: Array<number>, normals?: Array<number>): Array<Face3>;
        static hasData(data: any): boolean;
        static getThreeComponent(sourceData: Array<number>, index: number): Vector3;
        static iterateThreeComponent(dataArr: Array<number>, iterator: (v: Vector3) => void): void;
        static setThreeComponent(targetData: Array<number>, sourceData: Vector3, index: number): any;
        static setThreeComponent(targetData: Array<number>, sourceData: Array<number>, index: number): any;
        static mergeFace(source: Array<Face3>, target: Array<Face3>): Face3[];
    }
}

declare module wd {
    class CustomGeometry extends Geometry {
        static create(): CustomGeometry;
        private _vertices;
        vertices: Array<number>;
        private _texCoords;
        texCoords: Array<number>;
        private _colors;
        colors: Array<number>;
        private _indices;
        indices: Array<number>;
        private _normals;
        normals: Array<number>;
        computeData(): {
            vertices: number[];
            faces: Face3[];
            texCoords: number[];
            colors: number[];
        };
    }
}

declare module wd {
    class ModelGeometryMerger {
        static create(): ModelGeometryMerger;
        merge(targetGeometry: ModelGeometry, sourceGeometry: Geometry, transform: ThreeDTransform): void;
        private _getSourceModelGeometryData(targetGeometry);
        private _initModelGeometryData(geometryData);
        private _getTargetModelGeometryData(targetGeometry);
        private _transformVertices(vertices, targetTransform);
        private _mergeTransformedFace(sourceFaces, targetFaces, targetTransform, sourceVertexOffset);
        private _mergeData(source, target);
        private _mergeFace(source, target);
    }
}

declare module wd {
    class ModelGeometry extends Geometry {
        static create(): ModelGeometry;
        vertices: Array<number>;
        colors: Array<number>;
        texCoords: Array<number>;
        faces: Array<Face3>;
        morphVertices: wdCb.Hash<MorphTargetsData>;
        morphFaceNormals: wdCb.Hash<wdCb.Collection<Array<number>>>;
        morphVertexNormals: wdCb.Hash<wdCb.Collection<Array<number>>>;
        jointIndices: Array<number>;
        jointWeights: Array<number>;
        buffers: any;
        private _merger;
        hasMorphAnimation(): boolean;
        hasSkinSkeletonAnimation(): boolean;
        hasMorphFaceNormals(): any;
        hasMorphVertexNormals(): any;
        computeMorphNormals(): void;
        merge(geometry: Geometry, transform: ThreeDTransform): void;
        protected computeNormals(): void;
        computeData(): any;
        protected createBufferContainer(): BufferContainer;
        protected createGeometryData(computedData: ModelGeometryDataType): GeometryData;
        private _hasMorphTargets();
        private _hasJoinData();
        private _getDeepCloneMorphData(source);
    }
    type ModelGeometryDataType = {
        vertices: Array<number>;
        faces?: Array<Face3>;
        texCoords?: Array<number>;
        colors?: Array<number>;
        jointIndices?: Array<number>;
        jointWeights?: Array<number>;
        morphVertices?: wdCb.Hash<MorphTargetsData>;
    };
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
        computeData(): {
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
        computeData(): {
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
        computeData(): {
            vertices: any[];
            faces: Face3[];
            texCoords: any[];
        };
    }
}

declare module wd {
    enum ESphereDrawMode {
        LATITUDELONGTITUDE = 0,
    }
}

declare module wd {
    class SphereGeometry extends Geometry {
        static create(): SphereGeometry;
        radius: number;
        sphereDrawMode: ESphereDrawMode;
        segments: number;
        computeData(): {
            vertices: any[];
            faces: Face3[];
            texCoords: any[];
        };
    }
}

declare module wd {
    class TriangleGeometry extends Geometry {
        static create(): TriangleGeometry;
        width: number;
        height: number;
        computeData(): {
            vertices: any;
            faces: Face3[];
            texCoords: any;
        };
    }
}

declare module wd {
    class TerrainGeometry extends Geometry {
        static create(): TerrainGeometry;
        private _rangeWidth;
        rangeWidth: number;
        private _rangeHeight;
        rangeHeight: number;
        readonly heightMapImageDataWidth: number;
        readonly heightMapImageDataHeight: number;
        heightMapAsset: ImageTextureAsset;
        subdivisions: number;
        minHeight: number;
        maxHeight: number;
        isHeightMapStoreHeightInEachPixel: boolean;
        private _heightMapImageDataCache;
        private _heightMapImageDataCacheWidth;
        private _heightMapImageDataCacheHeight;
        private _heightCache;
        getHeightAtCoordinates(x: number, z: number): number;
        private _getQuadSubdivisionsCoordinateArr(x, z);
        private _getQuadHeightMapCoordinateArr(quadSubdivisionsCoordinateArr);
        private _getBilinearInterpolatedHeight(offset, heightMinXMinZ, heightMaxXMinZ, heightMaxXMaxZ, heightMinXMaxZ);
        private _getCacheHeight(coordinate);
        computeData(): {
            vertices: any[];
            faces: Face3[];
            texCoords: any[];
        };
        private _isReadHeightMapData();
        private _readHeightMapData();
        private _createGroundFromHeightMap();
        private _computeHeightMapColInCanvasCoordinate(x);
        private _computeHeightMapRowInCanvasCoordinate(z);
        private _computeHeightMapColInTexCoordCoordinate(x);
        private _computeHeightMapRowInTexCoordCoordinate(z);
        private _computeHeightMapIndex(heightMapRow, heightMapCol);
        private _getHeightByReadHeightMapData(heightMapIndex);
        private _getIndices();
    }
}

declare module wd {
    abstract class GeometryData {
        constructor(geometry: Geometry);
        private _vertices;
        vertices: Array<number>;
        readonly normals: any;
        readonly normalsFromFaceNormal: any;
        readonly normalsFromVertexNormals: any;
        readonly indices: Array<number>;
        private _faces;
        faces: Array<Face3>;
        private _texCoords;
        texCoords: Array<number>;
        private _colors;
        colors: Array<number>;
        private _tangents;
        readonly tangents: number[];
        tangentDirty: boolean;
        colorDirty: boolean;
        protected geometry: Geometry;
        private _normalCache;
        private _normalFromFaceCache;
        private _normalFromVertexCache;
        private _indiceCache;
        private _colorCache;
        private _normalDirty;
        private _indiceDirty;
        dispose(): void;
        computeFaceNormals(): void;
        computeVertexNormals(): void;
        hasFaceNormals(): boolean;
        hasVertexNormals(): boolean;
        hasColors(): boolean;
        protected onChangeFace(): void;
        protected computeFaceNormalsHelper(vertices: Array<number>, aIndex: number, bIndex: number, cIndex: number): Vector3;
        protected computeVertexNormalsHelper(vertices: Array<number>): any;
        private _fillEmptyData(data);
        private _calculateTangents(vertices, normals, texCoords, indices);
    }
}

declare module wd {
    class BasicGeometryData extends GeometryData {
        static create(geometry: Geometry): BasicGeometryData;
    }
}

declare module wd {
    class MorphGeometryData extends GeometryData {
        static create(geometry: ModelGeometry): MorphGeometryData;
        readonly morphNormals: any;
        private _morphTargets;
        morphVertices: wdCb.Hash<MorphTargetsData>;
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
    class SkinSkeletonGeometryData extends GeometryData {
        static create(geometry: ModelGeometry): SkinSkeletonGeometryData;
        private _jointIndices;
        jointIndices: Array<number>;
        private _jointWeights;
        jointWeights: Array<number>;
        protected geometry: ModelGeometry;
    }
}

declare module wd {
    abstract class BufferContainer {
        constructor(entityObject: GameObject);
        geometryData: GeometryData;
        protected entityObject: GameObject;
        protected container: wdCb.Hash<Buffer>;
        private _colorBuffer;
        private _texCoordBuffer;
        private _tangentBuffer;
        private _indiceBuffer;
        abstract getBufferForRenderSort(): Buffer;
        createBuffersFromGeometryData(): void;
        removeCache(type: EBufferDataType): any;
        removeCache(name: string): any;
        getChild(type: EBufferDataType): any;
        getChild(type: EBufferDataType, dataName: string): any;
        init(): void;
        dispose(): void;
        protected abstract getVertice(type: EBufferDataType): any;
        protected abstract getNormal(type: EBufferDataType): any;
        protected getCustomData(dataName: string): any;
        protected getBuffer(type: EBufferDataType): any;
        protected createOnlyOnceAndUpdateArrayBuffer(bufferAttriName: string, data: Array<number>, size: number, type?: EBufferType, offset?: number, usage?: EBufferUsage): void;
        protected createOnlyOnceAndUpdateElememntBuffer(bufferAttriName: string, data: Array<number>, type?: EBufferType, offset?: number, usage?: EBufferUsage): void;
        protected hasData(data: Array<number> | null): boolean;
        private _getTangent(type);
        private _getColor(type);
        private _getIndice(type);
        private _getTexCoord(type);
        private _needReCalcuteTangent(type);
    }
}

declare module wd {
    abstract class CommonBufferContainer extends BufferContainer {
        geometryData: BasicGeometryData;
        private _verticeBuffer;
        private _normalBuffer;
        getBufferForRenderSort(): Buffer;
        protected getVertice(type: EBufferDataType): ArrayBuffer;
        protected getNormal(type: EBufferDataType): ArrayBuffer;
    }
}

declare module wd {
    class BasicBufferContainer extends CommonBufferContainer {
        static create(entityObject: GameObject): BasicBufferContainer;
    }
}

declare module wd {
    class MorphBufferContainer extends BufferContainer {
        static create(entityObject: GameObject, animation: MorphAnimation): MorphBufferContainer;
        constructor(entityObject: GameObject, animation: MorphAnimation);
        geometryData: MorphGeometryData;
        protected container: wdCb.Hash<Buffer & Array<ArrayBuffer>>;
        private _animation;
        private _isCacheChangeFlag;
        private _isCacheChangeInLastLoop;
        private _currentVerticeBuffer;
        private _nextVerticeBuffer;
        private _currentNormalBuffer;
        private _nextNormalBuffer;
        getBufferForRenderSort(): Buffer;
        protected getVertice(type: EBufferDataType): ArrayBuffer[];
        protected getNormal(type: EBufferDataType): ArrayBuffer[];
        private _getMorphData(type, morphDataTargets);
        private _getFrames(morphDataTargets);
        private _getCurrentBufferWhichIsCreatedOnlyOnce(type, data, size);
        private _getNextBufferWhichIsCreatedOnlyOnce(type, data, size);
        private _isCacheNotChange(type);
        private _isNotPlayAnimation();
        private _getStaticData(type);
        private _getStaticDataCacheData(type);
    }
}

declare module wd {
    class SkinSkeletonBufferContainer extends CommonBufferContainer {
        static create(entityObject: GameObject): SkinSkeletonBufferContainer;
        geometryData: SkinSkeletonGeometryData;
        private _jointIndiceBuffer;
        private _jointWeightBuffer;
        createBuffersFromGeometryData(): void;
        protected getBuffer(type: EBufferDataType): any;
        private _getJointIndice(type);
        private _getJointWeight(type);
    }
}

declare module wd {
    abstract class Camera {
        readonly cameraToWorldMatrix: Matrix4;
        private _worldToCameraMatrix;
        worldToCameraMatrix: Matrix4;
        private _near;
        near: number;
        private _far;
        far: number;
        private _pMatrix;
        pMatrix: Matrix4;
        entityObject: GameObject;
        protected pMatrixDirty: boolean;
        private _isUserSpecifyThePMatrix;
        abstract convertScreenToWorld(screenX: number, screenY: number, distanceFromCamera: number): Vector3;
        abstract convertWorldToScreen(worldX: number, worldY: number, worldZ: number, screenWidth: number, screenHeight: number): Vector2;
        init(): void;
        dispose(): void;
        clone(): this;
        update(elapsed: number): void;
        protected abstract updateProjectionMatrix(): any;
        protected getInvViewProjMat(): Matrix4;
        private _updateProjectionMatrix();
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
        convertScreenToWorld(screenX: number, screenY: number, distanceFromCamera: number): Vector3;
        convertWorldToScreen(worldX: number, worldY: number, worldZ: number, screenWidth: number, screenHeight: number): Vector2;
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
        zoomIn(speed: number, min?: number): void;
        zoomOut(speed: number, max?: number): void;
        convertScreenToWorld(screenX: number, screenY: number, distanceFromCamera: number): Vector3;
        convertWorldToScreen(worldX: number, worldY: number, worldZ: number, screenWidth: number, screenHeight: number): Vector2;
        protected updateProjectionMatrix(): void;
    }
}

declare module wd {
    abstract class CameraController extends Component {
        constructor(cameraComponent: Camera);
        readonly cameraToWorldMatrix: Matrix4;
        readonly worldToCameraMatrix: Matrix4;
        pMatrix: Matrix4;
        entityObject: GameObject;
        camera: Camera;
        private _worldToCameraMatrixCache;
        private _clearCacheSubscription;
        init(): void;
        update(elapsed: number): void;
        dispose(): void;
        clone(): this;
        isIntersectWithRay(entityObject: GameObject, screenX: number, screenY: number): boolean;
        createRay(screenX: number, screenY: number): Ray;
        convertScreenToWorld(screenX: number, screenY: number, distanceFromCamera: number): Vector3;
        convertWorldToScreen(worldX: number, worldY: number, worldZ: number, screenWidth: number, screenHeight: number): Vector2;
        getPlanes(): Array<Plane>;
        protected bindClearCacheEvent(): void;
        protected disposeClearCacheEvent(): void;
        private _setPlanes(transform, frustumPlanes);
        private _clearCache();
        private _getWorldToCameraMatrix();
    }
}

declare module wd {
    class RenderTargetRendererCameraController extends CameraController {
        static create(cameraComponent: Camera): RenderTargetRendererCameraController;
        protected bindClearCacheEvent(): void;
        protected disposeClearCacheEvent(): void;
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
        moveSpeed: number;
        rotateSpeed: number;
        zoomSpeed: number;
        private _control;
        init(): void;
        update(elapsed: number): void;
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
        private _pointDragSubscription;
        private _keydownSubscription;
        private _gameObject;
        init(entityObject: GameObject): void;
        update(elapsed: number): void;
        dispose(): void;
        protected abstract zoom(event: KeyboardEvent): any;
        private _move(event);
        private _bindCanvasEvent();
        private _changeRotation({dx, dy});
        private _removeEvent();
        private _updateTransform();
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
        private _distance;
        distance: number;
        private _minDistance;
        minDistance: number;
        private _phi;
        phi: number;
        private _theta;
        theta: number;
        private _thetaMargin;
        thetaMargin: number;
        private _target;
        target: Vector3;
        moveSpeedX: number;
        moveSpeedY: number;
        rotateSpeed: number;
        wheelSpeed: number;
        private _isChange;
        private _pointDragSubscription;
        private _pointWheelSubscription;
        private _keydownSubscription;
        init(): void;
        update(elapsed: number): void;
        dispose(): void;
        private _bindCanvasEvent();
        private _changeOrbit(e);
        private _changePhi(phi);
        private _changeTheta(theta);
        private _changeTarget(e);
        private _changeTarget(target);
        private _changeDistance(e);
        private _changeDistance(distance);
        private _constrainDistance();
        private _constrainTheta();
        private _removeEvent();
        private _updateTransform();
    }
}

declare module wd {
    abstract class RendererComponent extends Component {
        abstract render(renderer: Renderer, target: EntityObject, camera: GameObject): any;
    }
}

declare module wd {
    class MeshRenderer extends RendererComponent {
        static create(): MeshRenderer;
        entityObject: GameObject;
        render(renderer: Renderer, target: GameObject, camera: GameObject): void;
        protected createDrawCommand(target: GameObject, geometry: Geometry, camera: GameObject): QuadCommand;
        private _createCommand(target, material);
        private _getInstanceState(material);
        private _getInstanceGLSLData(isOneToManyInstance, isModelMatrixInstance, isNormalMatrixInstance);
        private _createOneToOneHardwareInstanceCommand(target, material, glslData);
        private _createOneToManyHardwareInstanceCommand(target, material, glslData);
        private _createOneToOneBatchInstanceCommand(target, material, glslData);
        private _createOneToManyBatchInstanceCommand(target, material, glslData);
    }
}

declare module wd {
    class SkyboxRenderer extends MeshRenderer {
        static create(): SkyboxRenderer;
        render(renderer: Renderer, target: GameObject, camera: GameObject): void;
    }
}

declare module wd {
    class UIRenderer extends RendererComponent {
        static create(): UIRenderer;
        private _zIndex;
        zIndex: number;
        private _dirty;
        dirty: boolean;
        isClearCanvas: boolean;
        state: EUIRendererState;
        context: any;
        canvas: HTMLCanvasElement;
        private _referenceList;
        resetDirty(): void;
        addToObject(object: UIObject): void;
        removeFromObject(object: UIObject): void;
        init(): void;
        initWhenCreate(): void;
        dispose(): void;
        render(renderer: Renderer, target: UIObject, camera: GameObject): void;
        clearCanvas(): void;
        private _createOverlayCanvas();
    }
}

declare module wd {
    enum EUIRendererState {
        NORMAL = 0,
        DIRTY = 1,
        NOT_DIRTY = 2,
    }
}

declare module wd {
    abstract class ColliderForFirstCheck extends Component {
        entityObject: GameObject;
        abstract init(): any;
        abstract update(elapsed: number): any;
        clone(): this;
    }
}

declare module wd {
    class BoxColliderForFirstCheck extends ColliderForFirstCheck {
        static create(): BoxColliderForFirstCheck;
        readonly shape: Shape;
        private _collider;
        init(): void;
        update(elapsed: number): void;
    }
}

declare module wd {
    abstract class Collider extends Component {
        readonly shape: Shape;
        entityObject: GameObject;
        enable: boolean;
        boundingRegion: BoundingRegion;
        protected abstract type: string;
        abstract createBoundingRegion(): any;
        abstract buildBoundingRegion(): any;
        init(): void;
        addToComponentContainer(): void;
        removeFromComponentContainer(): void;
        clone(): this;
        update(elapsed: number): void;
        updateShape(): void;
        isIntersectWith(collider: Collider): any;
        isCollide(targetObject: GameObject): boolean;
        private _isSelf(entityObject);
    }
}

declare module wd {
    class BoxCollider extends Collider {
        static create(): BoxCollider;
        boundingRegion: BoxBoundingRegion;
        center: Vector3;
        halfExtents: Vector3;
        protected type: string;
        createBoundingRegion(): BoxBoundingRegion;
        buildBoundingRegion(): void;
    }
}

declare module wd {
    class SphereCollider extends Collider {
        static create(): SphereCollider;
        boundingRegion: SphereBoundingRegion;
        center: Vector3;
        radius: number;
        protected type: string;
        createBoundingRegion(): SphereBoundingRegion;
        buildBoundingRegion(): void;
    }
}

declare module wd {
    abstract class BoundingRegion {
        constructor(entityObject: GameObject);
        shape: Shape;
        protected entityObject: GameObject;
        protected isUserSpecifyTheRegion: boolean;
        protected originShape: Shape;
        protected debugObject: GameObject;
        abstract updateShape(): any;
        init(): void;
        clone(): this;
        build(center: Vector3, ...args: any[]): void;
        update(): void;
        isIntersectWithSphere(boundingRegion: SphereBoundingRegion): any;
        isIntersectWithBox(boundingRegion: BoxBoundingRegion): any;
        protected abstract createShape(): Shape;
        protected abstract isBuildUserSpecifyBoundingRegion(...args: any[]): boolean;
        protected abstract isNotTransformed(): boolean;
        protected abstract updateDebugObjectFromShape(shape: Shape): any;
        protected abstract setDebugObjectGeometry(geometry: CustomGeometry, shape: Shape): any;
        protected buildDebugObjectFromShape(shape: Shape): any;
    }
}

declare module wd {
    class BoxBoundingRegion extends BoundingRegion {
        static create(entityObject: GameObject): BoxBoundingRegion;
        shape: AABBShape;
        protected originShape: AABBShape;
        updateShape(): void;
        protected createShape(): AABBShape;
        protected updateDebugObjectFromShape(shape: AABBShape): void;
        protected setDebugObjectGeometry(geometry: CustomGeometry, shape: AABBShape): void;
        protected isBuildUserSpecifyBoundingRegion(center: Vector3, halfExtents: Vector3): boolean;
        protected isNotTransformed(): boolean;
    }
}

declare module wd {
    class SphereBoundingRegion extends BoundingRegion {
        static create(entityObject: GameObject): SphereBoundingRegion;
        shape: SphereShape;
        protected originShape: SphereShape;
        updateShape(): void;
        protected createShape(): SphereShape;
        protected updateDebugObjectFromShape(shape: SphereShape): void;
        protected isNotTransformed(): boolean;
        protected isBuildUserSpecifyBoundingRegion(center: Vector3, radius: any): boolean;
        protected setDebugObjectGeometry(geometry: CustomGeometry, shape: SphereShape): void;
    }
}

declare module wd {
    class BoundingRegionUtils {
        static isAABBInFrustum(minPoint: Vector3, maxPoint: Vector3, frustumPlanes: Array<Plane>): boolean;
        static isAABBInFrustum(boundingVectors: Vector3[], frustumPlanes: Plane[]): boolean;
        static isAABBIntersectFrustum(minPoint: Vector3, maxPoint: Vector3, frustumPlanes: Array<Plane>): boolean;
        static isAABBIntersectFrustum(boundingVectors: Array<Vector3>, frustumPlanes: Array<Plane>): boolean;
        static buildBoundingVectors(minPoint: Vector3, maxPoint: Vector3): any[];
    }
}

declare module wd {
    abstract class Shape {
        center: Vector3;
        abstract setFromShapeParam(...args: any[]): any;
        abstract setFromPoints(points: Array<number>): any;
        abstract isIntersectWithBox(shape: AABBShape): any;
        abstract isIntersectWithBox(min: Vector3, max: Vector3): any;
        abstract isIntersectWithSphere(shape: SphereShape): any;
        abstract isIntersectWithRay(ray: Ray): any;
        clone(): this;
        protected isBoxAndSphereIntersected(box: AABBShape, sphere: SphereShape): boolean;
    }
}

declare module wd {
    class AABBShape extends Shape {
        static create(): AABBShape;
        static getCenter(min: Vector3, max: Vector3): any;
        static getHalfExtents(min: Vector3, max: Vector3): any;
        halfExtents: Vector3;
        setMinMax(min: Vector3, max: Vector3): void;
        getMin(): Vector3;
        getMax(): Vector3;
        setFromShapeParam(center: Vector3, halfExtents: Vector3): void;
        setFromPoints(points: Array<number>): this;
        setFromTransformedAABB(aabb: AABBShape, matrix: Matrix4): void;
        setFromTranslationAndScale(aabb: AABBShape, matrix: Matrix4): void;
        setFromObject(entityObject: GameObject): void;
        isIntersectWithBox(shape: AABBShape): any;
        isIntersectWithBox(min: Vector3, max: Vector3): any;
        isIntersectWithSphere(shape: SphereShape): boolean;
        isIntersectWithRay(ray: Ray): boolean;
        closestPointTo(point: Vector3): Vector3;
        containPoint(point: Vector3): boolean;
        private _getEmptyMin();
        private _getEmptyMax();
        private _expandByPoint(point, min, max);
    }
}

declare module wd {
    class SphereShape extends Shape {
        static create(): SphereShape;
        radius: number;
        setFromShapeParam(center: Vector3, radius: number): void;
        setFromPoints(points: Array<number>): void;
        setFromTranslationAndScale(sphere: SphereShape, matrix: Matrix4): void;
        isIntersectWithSphere(shape: SphereShape): boolean;
        isIntersectWithBox(shape: AABBShape): any;
        isIntersectWithBox(min: Vector3, max: Vector3): any;
        isIntersectWithRay(ray: Ray): boolean;
        containPoint(point: Vector3): boolean;
        private _findMaxDistanceOfPointsToCenter(points);
    }
}

declare module wd {
    enum EColliderType {
        BOX,
        SPHERE,
    }
}

declare module wd {
    class ColliderUtils {
        static getVertices(entityObject: EntityObject): any;
    }
}

declare module wd {
    abstract class Light extends Component {
        readonly position: Vector3;
        private _shadowMapWidth;
        shadowMapWidth: number;
        private _shadowMapHeight;
        shadowMapHeight: number;
        entityObject: GameObject;
        color: Color;
        castShadow: boolean;
        shadowCameraNear: number;
        shadowCameraFar: number;
        shadowBias: number;
        shadowDarkness: number;
    }
}

declare module wd {
    class AmbientLight extends Light {
        static type: string;
        static create(): AmbientLight;
    }
}

declare module wd {
    abstract class SourceLight extends Light {
        intensity: number;
    }
}

declare module wd {
    class DirectionLight extends SourceLight {
        static type: string;
        static defaultPosition: Vector3;
        static create(): DirectionLight;
        shadowCameraLeft: number;
        shadowCameraRight: number;
        shadowCameraTop: number;
        shadowCameraBottom: number;
    }
}

declare module wd {
    class PointLight extends SourceLight {
        static type: string;
        static create(): PointLight;
        private _rangeLevel;
        rangeLevel: number;
        range: number;
        constant: number;
        linear: number;
        quadratic: number;
        private _attenuation;
    }
}

declare module wd {
    class Attenuation {
        static create(): Attenuation;
        private _constant;
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
    enum ELightModel {
        PHONG,
        BLINN,
        LAMBERT,
        CONSTANT,
    }
}

declare module wd {
    abstract class RenderTargetRenderer {
        constructor(renderTargetTexture: RenderTargetTexture);
        texture: RenderTargetTexture;
        protected frameBufferOperator: FrameBuffer;
        private _isRenderListEmpty;
        private _renderCount;
        initWhenCreate(): void;
        init(): void;
        needRender(): boolean;
        render(renderer: Renderer): any;
        render(renderer: Renderer, camera: GameObject): any;
        dispose(): void;
        protected abstract initFrameBuffer(): any;
        protected abstract renderFrameBufferTexture(renderList: any, renderer: Renderer, camera?: GameObject): any;
        protected abstract disposeFrameBuffer(): any;
        protected abstract getRenderList(): any;
        protected abstract isRenderListEmpty(renderList: any): boolean;
        protected beforeRender(): void;
        protected afterRender(): void;
        protected isRenderListEmptyWhenRender(): boolean;
        private _shouldRenderOnce();
        private _shouldRenderAtRate(renderRate);
    }
}

declare module wd {
    abstract class ProceduralRenderTargetRenderer extends RenderTargetRenderer {
        texture: ProceduralTexture;
        protected frameBuffer: WebGLFramebuffer;
        private _indexBuffer;
        private _vertexBuffer;
        private _shader;
        private _vaoManager;
        init(): void;
        dispose(): void;
        protected abstract createShader(): ProceduralShader;
        protected initFrameBuffer(): void;
        protected renderFrameBufferTexture(renderList: any, renderer: Renderer): void;
        protected disposeFrameBuffer(): void;
        protected getRenderList(): any;
        protected isRenderListEmpty(): boolean;
        private _initBuffer();
        private _createRenderCommand();
    }
}

declare module wd {
    class CustomProceduralRenderTargetRenderer extends ProceduralRenderTargetRenderer {
        static create(texture: CustomProceduralTexture): CustomProceduralRenderTargetRenderer;
        texture: CustomProceduralTexture;
        protected createShader(): CustomProceduralShader;
    }
}

declare module wd {
    abstract class CommonRenderTargetRenderer extends RenderTargetRenderer {
    }
}

declare module wd {
    abstract class TwoDRenderTargetRenderer extends CommonRenderTargetRenderer {
        protected frameBuffer: WebGLFramebuffer;
        private _renderBuffer;
        private _lastCamera;
        protected abstract beforeRenderFrameBufferTexture(renderCamera: GameObject): any;
        protected abstract renderRenderer(renderer: Renderer): any;
        protected isNeedCreateCamera(): boolean;
        protected createCamera(...args: any[]): GameObject;
        protected setFrameBufferTexture(): void;
        protected createAndAttachDepthBuffer(): void;
        protected deleteRenderBuffer(): void;
        protected isRenderListEmpty(renderList: wdCb.Collection<GameObject>): boolean;
        protected initFrameBuffer(): void;
        protected renderFrameBufferTexture(renderList: wdCb.Collection<GameObject>, renderer: Renderer, camera: GameObject): void;
        protected disposeFrameBuffer(): void;
    }
}

declare module wd {
    class MirrorRenderTargetRenderer extends TwoDRenderTargetRenderer {
        static create(mirrorTexture: MirrorTexture): MirrorRenderTargetRenderer;
        texture: MirrorTexture;
        protected beforeRenderFrameBufferTexture(renderCamera: GameObject): void;
        protected getRenderList(): wdCb.Collection<GameObject>;
        protected renderRenderer(renderer: any): void;
        protected beforeRender(): void;
        protected createCamera(camera: GameObject): GameObject;
        private _setSceneSide(side);
        private _setClipPlane(vMatrix, pMatrix, plane);
        private _getClipPlaneInCameraSpace(vMatrix, plane);
    }
}

declare module wd {
    class RefractionRenderTargetRenderer extends TwoDRenderTargetRenderer {
        static create(refractionTexture: RefractionTexture): RefractionRenderTargetRenderer;
        texture: RefractionTexture;
        protected beforeRenderFrameBufferTexture(renderCamera: GameObject): void;
        protected getRenderList(): wdCb.Collection<GameObject>;
        protected renderRenderer(renderer: any): void;
        protected beforeRender(): void;
        protected isNeedCreateCamera(): boolean;
    }
}

declare module wd {
    class TwoDShadowMapRenderTargetRenderer extends TwoDRenderTargetRenderer {
        static create(shadowMap: TwoDShadowMapTexture, light: DirectionLight, layer: string): TwoDShadowMapRenderTargetRenderer;
        constructor(shadowMap: TwoDShadowMapTexture, light: DirectionLight, layer: string);
        texture: TwoDShadowMapTexture;
        private _light;
        private _layer;
        private _shadowMapRendererUtils;
        initWhenCreate(): void;
        protected beforeRenderFrameBufferTexture(renderCamera: GameObject): void;
        protected getRenderList(): wdCb.Collection<GameObject>;
        protected renderRenderer(renderer: Renderer): void;
        protected beforeRender(): void;
        protected afterRender(): void;
        protected createCamera(): GameObject;
        protected setFrameBufferTexture(): void;
        protected createAndAttachDepthBuffer(): void;
        protected deleteRenderBuffer(): void;
        private _createEmptyColorTexture();
    }
}

declare module wd {
    abstract class CubemapRenderTargetRenderer extends CommonRenderTargetRenderer {
        texture: CubemapRenderTargetTexture;
        private _frameBufferList;
        private _renderBufferList;
        private _lastCameraList;
        private _lastPosition;
        protected abstract setCamera(cubeCameraComponent: PerspectiveCamera): any;
        protected abstract getPosition(): Vector3;
        protected renderRenderer(renderer: Renderer): void;
        protected beforeRenderFrameBufferTexture(renderCamera: GameObject): void;
        protected initFrameBuffer(): void;
        protected renderFrameBufferTexture(renderList: wdCb.Hash<any>, renderer: Renderer, camera: GameObject): void;
        protected disposeFrameBuffer(): void;
        protected createCamera(index: number): GameObject;
        protected isRenderListEmpty(renderList: wdCb.Hash<any>): boolean;
        private _isEmpty(faceRenderList);
        private _convertIndexToFaceKey(index);
        private _lookAtFace(camera, position, index);
        private _isNeedCreateCamera(position);
    }
}

declare module wd {
    class CubemapShadowMapRenderTargetRenderer extends CubemapRenderTargetRenderer {
        static create(shadowMap: CubemapShadowMapTexture, light: PointLight, layer: string): CubemapShadowMapRenderTargetRenderer;
        constructor(shadowMap: CubemapShadowMapTexture, light: PointLight, layer: string);
        texture: CubemapShadowMapTexture;
        private _light;
        private _layer;
        private _shadowMapRendererUtils;
        initWhenCreate(): void;
        protected getRenderList(): wdCb.Hash<wdCb.Collection<GameObject>>;
        protected renderRenderer(renderer: any): void;
        protected beforeRender(): void;
        protected afterRender(): void;
        protected setCamera(camera: PerspectiveCamera): void;
        protected getPosition(): Vector3;
    }
}

declare module wd {
    class DynamicCubemapRenderTargetRenderer extends CubemapRenderTargetRenderer {
        static create(texture: DynamicCubemapTexture): DynamicCubemapRenderTargetRenderer;
        texture: DynamicCubemapTexture;
        protected getRenderList(): wdCb.Hash<GameObject>;
        protected setCamera(camera: PerspectiveCamera): void;
        protected getPosition(): Vector3;
        protected beforeRender(): void;
    }
}

declare module wd {
    abstract class ShadowMapRenderTargetRendererUtils {
        constructor(_light: Light, _texture: Texture);
        private _texture;
        private _light;
        initWhenCreate(): void;
        beforeRender(shaderType: EShaderTypeOfScene): void;
        afterRender(): void;
        renderRenderer(renderer: Renderer): void;
        protected abstract setWebglState(renderer: Renderer): any;
    }
}

declare module wd {
    class CubemapShadowMapRenderTargetRendererUtils extends ShadowMapRenderTargetRendererUtils {
        static create(light: PointLight, texture: CubemapShadowMapTexture): CubemapShadowMapRenderTargetRendererUtils;
        protected setWebglState(renderer: Renderer): void;
    }
}

declare module wd {
    class TwoDShadowMapRenderTargetRendererUtils extends ShadowMapRenderTargetRendererUtils {
        static create(light: DirectionLight, texture: TwoDShadowMapTexture): TwoDShadowMapRenderTargetRendererUtils;
        protected setWebglState(renderer: Renderer): void;
    }
}

declare module wd {
    abstract class Renderer {
        private _webglState;
        webglState: WebGLState;
        skyboxCommand: QuadCommand;
        abstract addCommand(command: RenderCommand): void;
        abstract hasCommand(): boolean;
        abstract render(): void;
        abstract clear(): void;
        init(): void;
    }
}

declare module wd {
    class WebGLRenderer extends Renderer {
        static create(): WebGLRenderer;
        private _commandQueue;
        private _clearOptions;
        addCommand(command: RenderCommand): void;
        hasCommand(): boolean;
        clear(): void;
        render(): void;
        init(): void;
        setClearColor(color: Color): void;
        private _renderSortedTransparentCommands(transparentCommandArr);
        private _getObjectZDistanceInCameraCoordinate(cmd);
        private _clearCommand();
        private _setClearOptions(clearOptions);
        private _buildOpaqueCommandSortId(opaqueCommand);
        private _buildShaderSortId(shader);
        private _getTargetTexture(material);
        private _getTargetBuffer(material);
        private _mapEntityIdToRenderId(entity, maxId);
        private _sortOpaqueQuadCommand(opaqueCommandArr);
    }
}

declare module wd {
    abstract class WebGLState {
        abstract setState(material: Material): void;
        protected getSide(material: Material): ESide;
    }
}

declare module wd {
    class BasicState extends WebGLState {
        static create(): BasicState;
        setState(material: Material): void;
    }
}

declare module wd {
    abstract class BuildShadowMapState extends WebGLState {
        setState(material: Material): void;
    }
}

declare module wd {
    class BuildTwoDShadowMapState extends BuildShadowMapState {
        static create(): BuildTwoDShadowMapState;
        setState(material: Material): void;
    }
}

declare module wd {
    class BuildCubemapShadowMapState extends BuildShadowMapState {
        static create(): BuildCubemapShadowMapState;
    }
}

declare module wd {
    enum EDrawMode {
        POINTS,
        LINES,
        LINE_LOOP,
        LINE_STRIP,
        TRIANGLES,
        TRIANGLE_STRIP,
        TRANGLE_FAN,
    }
}

declare module wd {
    enum EBufferType {
        BYTE,
        UNSIGNED_BYTE,
        SHORT,
        UNSIGNED_SHORT,
        INT,
        UNSIGNED_INT,
        FLOAT,
    }
}

declare module wd {
    enum EBufferDataType {
        VERTICE,
        INDICE,
        NORMAL,
        TEXCOORD,
        TANGENT,
        COLOR,
        JOINT_INDICE,
        JOINT_WEIGHT,
        CUSTOM,
    }
}

declare module wd {
    enum EBufferUsage {
        STREAM_DRAW,
        STATIC_DRAW,
        DYNAMIC_DRAW,
    }
}

declare module wd {
    abstract class Buffer extends Entity {
        buffer: any;
        abstract resetData(data: any, ...args: any[]): void;
        dispose(): void;
    }
}

declare module wd {
    class InstanceBuffer extends Buffer {
        static create(): InstanceBuffer;
        readonly float32InstanceArraySize: number;
        private _capacity;
        private _cacheMap;
        initWhenCreate(): void;
        setCapacity(bufferCapacity: number): void;
        resetData(data: Float32Array): void;
        bindBuffer(): void;
        addCache(key: string, value: any): void;
        getCache(key: string): any;
        private _createBuffer();
    }
}

declare module wd {
    abstract class CommonBuffer extends Buffer {
        type: EBufferType;
        count: number;
        usage: EBufferUsage;
        protected resetBufferData(glBufferTargetStr: string, typedData: any, offset?: number): void;
    }
}

declare module wd {
    class ElementBuffer extends CommonBuffer {
        static create(data: Array<number>, type?: EBufferType, usage?: EBufferUsage): ElementBuffer;
        readonly typeSize: number;
        data: Uint16Array | Uint32Array;
        initWhenCreate(data: Array<number>, type: EBufferType, usage: EBufferUsage): any;
        resetData(data: Array<number>, type?: EBufferType, offset?: number): this;
        private _convertToTypedArray(isNeed32Bits, data);
        private _checkIsNeed32Bits(indices, type);
        private _getType(isNeed32Bits, type);
        private _saveData(data, type, usage);
    }
}

declare module wd {
    class ArrayBuffer extends CommonBuffer {
        static create(data: Array<number>, size: number, type?: EBufferType, usage?: EBufferUsage): ArrayBuffer;
        size: number;
        data: Float32Array;
        initWhenCreate(data: Array<number>, size: number, type: EBufferType, usage: EBufferUsage): any;
        resetData(data: Array<number>, size?: number, type?: EBufferType, offset?: number): this;
        private _convertToTypedArray(data, type);
        private _saveData(data, size, type, usage);
    }
}

declare module wd {
    class BufferDataTable {
        static getGeometryDataName(type: EBufferDataType): string;
    }
}

declare module wd {
    class Program extends Entity {
        static create(): Program;
        glProgram: any;
        private _getAttribLocationCache;
        private _sender;
        use(): void;
        getAttribLocation(name: string): any;
        getUniformLocation(name: string): any;
        sendUniformData(name: string, type: EVariableType, data: any): void;
        sendAttributeBuffer(name: string, type: EVariableType, buffer: ArrayBuffer): void;
        sendStructureData(name: string, type: EVariableType, data: any): void;
        sendFloat1(name: string, data: any): void;
        sendFloat2(name: string, data: any): void;
        sendFloat3(name: string, data: any): void;
        sendFloat4(name: string, data: any): void;
        sendVector2(name: string, data: any): void;
        sendVector3(name: string, data: any): void;
        sendVector4(name: string, data: any): void;
        sendColor3(name: string, data: any): void;
        sendNum1(name: string, data: any): void;
        sendMatrix3(name: string, data: any): void;
        sendMatrix4(name: string, data: any): void;
        sendMatrix4Array(name: string, data: Float32Array): void;
        sendSampleArray(name: string, data: any): void;
        sendAllBufferData(vaoManager: VAOManager): void;
        initWithShader(shader: Shader): this;
        dispose(): void;
        private _clearAllCache();
    }
}

declare module wd {
    class GLSLDataSender {
        static create(program: Program): GLSLDataSender;
        constructor(program: Program);
        private _program;
        private _uniformCache;
        private _vertexAttribHistory;
        private _getUniformLocationCache;
        private _toSendBufferArr;
        sendFloat1(name: string, data: any): void;
        sendFloat2(name: string, data: any): void;
        sendFloat3(name: string, data: any): void;
        sendFloat4(name: string, data: any): void;
        sendVector2(name: string, data: any): void;
        sendVector3(name: string, data: any): void;
        sendVector4(name: string, data: any): void;
        sendColor3(name: string, data: Color): void;
        sendNum1(name: string, data: number): void;
        sendMatrix3(name: string, data: Matrix3): void;
        sendMatrix4(name: string, data: Matrix4): void;
        sendMatrix4Array(name: string, data: Array<number> | Float32Array): void;
        sendSampleArray(name: string, data: Array<number>): void;
        getUniformLocation(name: string): any;
        addBufferToToSendList(pos: number, buffer: ArrayBuffer): void;
        private _toSendBuffersUidStr;
        sendAllBufferData(vaoManager: VAOManager): void;
        clearBufferList(): void;
        sendBuffer(pos: number, buffer: ArrayBuffer): void;
        disableVertexAttribArray(): void;
        clearAllCache(): void;
        dispose(): void;
        private _recordUniformData(name, data);
        private _isUniformDataNotExistByLocation(pos);
    }
}

declare module wd {
    abstract class RenderCommand {
        private _webglState;
        webglState: WebGLState;
        drawMode: EDrawMode;
        blend: boolean;
        vaoManager: VAOManager;
        abstract execute(): void;
        init(): void;
        dispose(): void;
        protected drawElements(indexBuffer: ElementBuffer): void;
        protected drawArray(vertexBuffer: ArrayBuffer): void;
    }
}

declare module wd {
    abstract class QuadCommand extends RenderCommand {
        readonly program: Program;
        readonly mvpMatrix: Matrix4;
        readonly vpMatrix: Matrix4;
        mMatrix: Matrix4;
        vMatrix: Matrix4;
        pMatrix: Matrix4;
        buffers: BufferContainer;
        material: Material;
        target: GameObject;
        sortId: number;
        execute(): void;
        protected abstract draw(material: Material): void;
    }
}

declare module wd {
    class SingleDrawCommand extends QuadCommand {
        static create(): SingleDrawCommand;
        normalMatrix: Matrix3;
        protected draw(material: Material): void;
    }
}

declare module wd {
    enum EInstanceGLSLData {
        MODELMATRIX = 0,
        NORMALMATRIX_MODELMATRIX = 1,
        ONE_MANY = 2,
    }
}

declare module wd {
    abstract class InstanceCommand extends QuadCommand {
    }
}

declare module wd {
    abstract class HardwareInstanceCommand extends InstanceCommand {
        glslData: EInstanceGLSLData;
        instanceBuffer: InstanceBuffer;
    }
}

declare module wd {
    class OneToOneHardwareInstanceCommand extends HardwareInstanceCommand {
        static create(): OneToOneHardwareInstanceCommand;
        instanceList: wdCb.Collection<GameObject>;
        protected draw(material: Material): void;
        private _hasInstance();
    }
}

declare module wd {
    class OneToManyHardwareInstanceCommand extends HardwareInstanceCommand {
        static create(): OneToManyHardwareInstanceCommand;
        geometry: InstanceGeometry;
        protected draw(material: Material): void;
    }
}

declare module wd {
    class ProceduralCommand extends RenderCommand {
        static create(): ProceduralCommand;
        shader: ProceduralShader;
        indexBuffer: ElementBuffer;
        vertexBuffer: ArrayBuffer;
        init(): void;
        execute(): void;
    }
}

declare module wd {
    abstract class InstanceDrawer {
        abstract draw(...args: any[]): void;
    }
}

declare module wd {
    abstract class HardwareInstanceDrawer extends InstanceDrawer {
        protected abstract getOffsetLocationArray(...args: any[]): Array<number>;
        protected abstract setCapacity(...args: any[]): void;
        protected abstract sendGLSLData(...args: any[]): void;
        protected unBind(instanceBuffer: InstanceBuffer, offsetLocationArr: Array<number>): void;
        protected drawElementsInstancedANGLE(indexBuffer: ElementBuffer, instancesCount: number, drawMode: EDrawMode): void;
    }
}

declare module wd {
    abstract class OneToOneHardwareInstanceDrawer extends HardwareInstanceDrawer {
        draw(instanceList: wdCb.Collection<GameObject>, instanceBuffer: InstanceBuffer, program: Program, buffers: BufferContainer, drawMode: EDrawMode): void;
        private _drawArraysInstancedANGLE(vertexBuffer, instancesCount, drawMode);
    }
}

declare module wd {
    class OneToManyHardwareInstanceDrawer extends HardwareInstanceDrawer {
        static getInstance(): any;
        private constructor();
        private _geometry;
        draw(geometry: InstanceGeometry, instanceBuffer: InstanceBuffer, program: Program, buffers: BufferContainer, drawMode: EDrawMode): void;
        protected getOffsetLocationArray(program: Program, instanceBuffer: InstanceBuffer): Array<number>;
        protected setCapacity(instanceBuffer: InstanceBuffer): void;
        protected sendGLSLData(instanceBuffer: InstanceBuffer, offsetLocationArr: Array<number>): void;
        private _getStride(instanceBuffer);
    }
}

declare module wd {
    class ModelMatrixHardwareInstanceDrawer extends OneToOneHardwareInstanceDrawer {
        static getInstance(): any;
        private constructor();
        protected getOffsetLocationArray(program: Program): Array<number>;
        protected setCapacity(instanceList: wdCb.Collection<GameObject>, instanceBuffer: InstanceBuffer): void;
        protected sendGLSLData(instanceList: wdCb.Collection<GameObject>, instanceBuffer: InstanceBuffer, offsetLocationArr: Array<number>): void;
    }
}

declare module wd {
    class NormalMatrixModelMatrixHardwareInstanceDrawer extends OneToOneHardwareInstanceDrawer {
        static getInstance(): any;
        private constructor();
        protected getOffsetLocationArray(program: Program): Array<number>;
        protected setCapacity(instanceList: wdCb.Collection<GameObject>, instanceBuffer: InstanceBuffer): void;
        protected sendGLSLData(instanceList: wdCb.Collection<GameObject>, instanceBuffer: InstanceBuffer, offsetLocationArr: Array<number>): void;
    }
}

declare module wd {
    abstract class BatchInstanceCommand extends InstanceCommand {
        glslData: EInstanceGLSLData;
    }
}

declare module wd {
    class OneToOneBatchInstanceCommand extends BatchInstanceCommand {
        static create(): OneToOneBatchInstanceCommand;
        instanceList: wdCb.Collection<GameObject>;
        protected draw(material: Material): void;
        private _hasInstance();
    }
}

declare module wd {
    class OneToManyBatchInstanceCommand extends BatchInstanceCommand {
        static create(): OneToManyBatchInstanceCommand;
        geometry: InstanceGeometry;
        protected draw(material: Material): void;
    }
}

declare module wd {
    abstract class BatchInstanceDrawer extends InstanceDrawer {
        protected abstract sendGLSLData(...args: any[]): void;
    }
}

declare module wd {
    abstract class OneToOneBatchInstanceDrawer extends BatchInstanceDrawer {
        draw(instanceList: wdCb.Collection<GameObject>, program: Program, buffers: BufferContainer, drawMode: EDrawMode): void;
        protected abstract getUniformDataNameArray(program: Program): Array<string>;
    }
}

declare module wd {
    class OneToManyBatchInstanceDrawer extends BatchInstanceDrawer {
        static getInstance(): any;
        private constructor();
        private _geometry;
        draw(geometry: InstanceGeometry, program: Program, buffers: BufferContainer, drawMode: EDrawMode): void;
        protected sendGLSLData(program: Program, instanceAttributeDataList: wdCb.Collection<InstanceAttributeData>): void;
        private _getVariableType(size);
    }
}

declare module wd {
    class ModelMatrixBatchInstanceDrawer extends OneToOneBatchInstanceDrawer {
        static getInstance(): any;
        private constructor();
        protected getUniformDataNameArray(program: Program): Array<string>;
        protected sendGLSLData(program: Program, instance: GameObject, [modelMatrixUniformDataName]: [any]): void;
    }
}

declare module wd {
    class NormalMatrixModelMatrixBatchInstanceDrawer extends OneToOneBatchInstanceDrawer {
        static getInstance(): any;
        private constructor();
        protected getUniformDataNameArray(program: Program): Array<string>;
        protected sendGLSLData(program: Program, instance: GameObject, [modelMatrixUniformDataName, normalMatrixUniformDataName]: [any, any]): void;
    }
}

declare module wd {
    class GlUtils {
        static drawElements(mode: any, count: number, type: any, offset: number): void;
        static drawArrays(mode: any, first: number, count: number): void;
        static drawElementsInstancedANGLE(mode: any, count: number, type: any, offset: number, instancesCount: number): void;
        static drawArraysInstancedANGLE(mode: any, startOffset: number, count: number, instancesCount: number): void;
        private static _getGl();
    }
}

declare module wd {
    class FrameBuffer {
        static create(width: number, height: number): FrameBuffer;
        constructor(width: number, height: number);
        readonly gl: any;
        width: number;
        height: number;
        private _originScissorTest;
        private _glTarget;
        createFrameBuffer(): any;
        bindFrameBuffer(buffer: WebGLFramebuffer): void;
        setViewport(): void;
        restoreViewport(): void;
        dispose(): void;
        unBindAll(): void;
        unBindFrameBuffer(): void;
        createRenderBuffer(): any;
        attachTexture(glTarget: any, texture: WebGLTexture, attachType?: EFrameBufferAttachType): void;
        attachRenderBuffer(type: string, renderBuffer: WebGLRenderbuffer): void;
        check(): void;
    }
}

declare module wd {
    enum EFrameBufferAttachType {
        COLOR_ATTACHMENT0,
        DEPTH_ATTACHMENT,
    }
}

declare module wd {
    abstract class Shader {
        private _attributes;
        attributes: wdCb.Hash<ShaderData>;
        private _uniforms;
        uniforms: wdCb.Hash<ShaderData>;
        private _vsSource;
        vsSource: string;
        private _fsSource;
        fsSource: string;
        readonly dirty: boolean;
        readonly program: Program;
        libDirty: boolean;
        definitionDataDirty: boolean;
        mapManager: MapManager;
        protected libs: wdCb.Collection<ShaderLib>;
        protected sourceBuilder: ShaderSourceBuilder;
        private _programCache;
        private _instanceStateCache;
        abstract update(cmd: RenderCommand, material: Material): any;
        createVsShader(): any;
        createFsShader(): any;
        init(material: Material): void;
        dispose(): void;
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
        getInstanceState(): {
            isModelMatrixInstance: boolean;
            isNormalMatrixInstance: boolean;
            isHardwareInstance: boolean;
            isBatchInstance: boolean;
        };
        protected abstract createShaderSourceBuilder(): ShaderSourceBuilder;
        protected abstract buildDefinitionData(cmd: RenderCommand, material: Material): void;
        protected judgeRefreshShader(cmd: RenderCommand, material: Material): void;
        private _registerAndUpdateProgram();
        private _updateProgram();
        private _getProgramTableKey();
        private _initShader(shader, source);
        private _isNotEqual(list1, list2);
        private _clearAllCache();
    }
    type ShaderData = {
        type: EVariableType;
        value?: any;
        textureId?: string;
    };
}

declare module wd {
    class CustomShader extends Shader {
        static create(): CustomShader;
        protected sourceBuilder: CustomShaderSourceBuilder;
        protected libs: wdCb.Collection<CustomShaderLib>;
        update(cmd: QuadCommand, material: ShaderMaterial): void;
        read(definitionData: ShaderDefinitionData): void;
        getSampler2DUniformsAfterRead(): wdCb.Hash<ShaderData>;
        protected buildDefinitionData(cmd: RenderCommand, material: Material): void;
        protected createShaderSourceBuilder(): ShaderSourceBuilder;
    }
}

declare module wd {
    abstract class EngineShader extends Shader {
        protected sourceBuilder: EngineShaderSourceBuilder;
        protected libs: wdCb.Collection<EngineShaderLib>;
        protected buildDefinitionData(cmd: RenderCommand, material: Material): void;
        protected createShaderSourceBuilder(): ShaderSourceBuilder;
    }
}

declare module wd {
    class CommonShader extends EngineShader {
        static create(): CommonShader;
        update(cmd: QuadCommand, material: Material): void;
    }
}

declare module wd {
    abstract class ProceduralShader extends EngineShader {
        protected libs: wdCb.Collection<ProceduralShaderLib>;
        init(): void;
        update(cmd: ProceduralCommand): void;
    }
}

declare module wd {
    class CommonProceduralShader extends ProceduralShader {
        static create(): CommonProceduralShader;
    }
}

declare module wd {
    class CustomProceduralShader extends ProceduralShader {
        static create(texture: CustomProceduralTexture): CustomProceduralShader;
        constructor(texture: CustomProceduralTexture);
        protected libs: wdCb.Collection<CustomProceduralShaderLib>;
        private _texture;
        update(cmd: ProceduralCommand): void;
    }
}

declare module wd {
    enum EShaderGLSLData {
        MIRROR,
        DYNAMIC_CUBEMAP,
        REFRACTION,
        TWOD_SHADOWMAP,
        BUILD_CUBEMAP_SHADOWMAP,
        CUBEMAP_SHADOWMAP,
    }
}

declare module wd {
    enum EShaderTypeOfScene {
        BUILD_TWOD_SHADOWMAP,
        BUILD_CUBEMAP_SHADOWMAP,
    }
}

declare module wd {
    enum EShaderMapKeyOfScene {
        BUILD_TWOD_SHADOWMAP_INSTANCE,
        BUILD_TWOD_SHADOWMAP_NO_INSTANCE,
        BUILD_CUBEMAP_SHADOWMAP_INSTANCE,
        BUILD_CUBEMAP_SHADOWMAP_NO_INSTANCE,
    }
}

declare module wd {
    enum EShaderMapKey {
        DEFAULT,
    }
}

declare module wd {
    class MapManager {
        static create(): MapManager;
        private _material;
        material: Material;
        private _textureDirty;
        private _allMapsCache;
        private _allSingleMapsCache;
        private _shadowMapController;
        private _arrayMapController;
        private _envMapController;
        private _commonMapController;
        init(): void;
        addMap(asset: TextureAsset): any;
        addMap(asset: TextureAsset, option: MapVariableData): any;
        addMap(map: Texture): any;
        addMap(map: Texture, option: MapVariableData): any;
        addMapArray(samplerName: string, mapArray: Array<Texture>): void;
        addTwoDShadowMap(shadowMap: any): void;
        getTwoDShadowMapList(): any;
        hasTwoDShadowMap(shadowMap: any): any;
        addCubemapShadowMap(shadowMap: any): void;
        getCubemapShadowMapList(): any;
        hasCubemapShadowMap(shadowMap: any): any;
        getMapList(): wdCb.Collection<BasicTexture | ProceduralTexture>;
        hasMap(map: Texture): boolean;
        getMapCount(): number;
        getEnvMap(): CubemapTexture;
        setEnvMap(envMap: CubemapTexture): void;
        removeChild(map: Texture): void;
        removeAllChildren(): void;
        removeAllShdaowMaps(): void;
        dispose(): void;
        bindAndUpdate(): void;
        sendData(program: Program): void;
        private _sendSingleMapData(program);
        private _getAllMaps();
        private _getMaxUnitOfBindedSingleMap();
        private _getAllSingleMaps();
        private _getAllSingleMapControllerArr();
        private _getAllControllerArr();
    }
    type MapVariableData = {
        samplerVariableName?: string;
        samplerData?: any;
    };
}

declare module wd {
    abstract class MapController {
        abstract removeChild(map: Texture): void;
        abstract removeAllChildren(): void;
        abstract getAllMapArr(): Array<Texture>;
        protected hasMapHelper(source: wdCb.Collection<Texture>, target: Texture): boolean;
        protected setMapOption(map: Texture, option: MapVariableData): void;
    }
}

declare module wd {
    class ShadowMapController extends MapController {
        static create(): ShadowMapController;
        private _twoDShadowMapList;
        private _cubemapShadowMapList;
        addTwoDShadowMap(shadowMap: TwoDShadowMapTexture): void;
        addCubemapShadowMap(shadowMap: CubemapShadowMapTexture): void;
        hasTwoDShadowMap(shadowMap: TwoDShadowMapTexture): boolean;
        hasCubemapShadowMap(shadowMap: CubemapShadowMapTexture): boolean;
        getTwoDShadowMapList(): wdCb.Collection<TwoDShadowMapTexture>;
        getCubemapShadowMapList(): wdCb.Collection<CubemapShadowMapTexture>;
        getAllMapArr(): any;
        removeChild(map: Texture): void;
        removeAllChildren(): void;
    }
}

declare module wd {
    class EmptyShadowMapController {
        static create(): EmptyShadowMapController;
        addTwoDShadowMap(shadowMap: any): void;
        addCubemapShadowMap(shadowMap: any): void;
        hasTwoDShadowMap(shadowMap: any): boolean;
        hasCubemapShadowMap(shadowMap: any): boolean;
        getTwoDShadowMapList(): any;
        getCubemapShadowMapList(): any;
        getAllMapArr(): any;
        removeChild(map: Texture): void;
        removeAllChildren(): void;
    }
}

declare module wd {
    class EnvMapController extends MapController {
        static create(): EnvMapController;
        material: Material;
        private _map;
        setEnvMap(envMap: CubemapTexture): void;
        getEnvMap(): CubemapTexture;
        getAllMapArr(): CubemapTexture[];
        removeChild(map: Texture): void;
        removeAllChildren(): void;
    }
}

declare module wd {
    class MapArrayController extends MapController {
        static create(): MapArrayController;
        private _mapArrayList;
        addMapArray(samplerName: string, mapArray: Array<Texture>): void;
        sendMapData(program: Program, maxUnitOfBindedSingleMap: number): void;
        getAllMapArr(): any[];
        removeChild(map: Texture): void;
        removeAllChildren(): void;
        private _generateMapArrayUnitArray(startUnit, endUnit);
    }
    type MapArrayData = {
        samplerName: string;
        mapArray: Array<Texture>;
    };
}

declare module wd {
    class CommonMapController extends MapController {
        static create(): CommonMapController;
        material: Material;
        private _list;
        addMap(map: Texture): any;
        addMap(map: Texture, option: MapVariableData): any;
        getAllMapArr(): Texture[];
        getMapList(): wdCb.Collection<BasicTexture | ProceduralTexture>;
        hasMap(map: Texture): boolean;
        removeChild(map: Texture): void;
        removeAllChildren(): void;
    }
}

declare module wd {
    abstract class ShaderSourceBuilder {
        attributes: wdCb.Hash<ShaderData>;
        uniforms: wdCb.Hash<ShaderData>;
        vsSource: string;
        fsSource: string;
        abstract build(...args: any[]): void;
        abstract clearShaderDefinition(): void;
        dispose(): void;
        protected convertAttributesData(): void;
    }
    type SourceDefine = {
        name: string;
        value: any;
    };
}

declare module wd {
    class CustomShaderSourceBuilder extends ShaderSourceBuilder {
        static create(): CustomShaderSourceBuilder;
        read(definitionData: ShaderDefinitionData): void;
        build(): void;
        clearShaderDefinition(): void;
    }
}

declare module wd {
    class EngineShaderSourceBuilder extends ShaderSourceBuilder {
        static create(): EngineShaderSourceBuilder;
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
        vsSourceDefineList: wdCb.Collection<SourceDefine>;
        fsSourceDefineList: wdCb.Collection<SourceDefine>;
        vsSourceExtensionList: wdCb.Collection<string>;
        fsSourceExtensionList: wdCb.Collection<string>;
        build(libs: wdCb.Collection<EngineShaderLib>): void;
        clearShaderDefinition(): void;
        private _readLibSource(libs);
        private _judgeAndSetVsSource(setSourceLibs);
        private _judgeAndSetFsSource(setSourceLibs);
        private _judgeAndSetPartSource(libs);
        private _buildVsSource();
        private _buildFsSource();
        private _buildVsSourceTop();
        private _buildVsSourceDefine();
        private _buildVsSourceExtension();
        private _buildVsSourceVarDeclare();
        private _buildVsSourceFuncDeclare();
        private _buildVsSourceFuncDefine();
        private _buildVsSourceBody();
        private _buildFsSourceTop();
        private _buildFsSourceDefine();
        private _buildFsSourceExtension();
        private _buildFsSourceVarDeclare();
        private _buildFsSourceFuncDeclare();
        private _buildFsSourceFuncDefine();
        private _buildFsSourceBody();
        private _buildSourceDefine(defineList);
        private _buildSourceExtension(extensionList);
        private _getPrecisionSource();
        private _generateAttributeSource();
        private _generateUniformSource(sourceVarDeclare, sourceFuncDefine, sourceBody);
        private _isExistInSource(key, source);
    }
}

declare module wd {
    enum EVariableType {
        FLOAT_1,
        FLOAT_2,
        FLOAT_3,
        FLOAT_4,
        VECTOR_2,
        VECTOR_3,
        VECTOR_4,
        COLOR_3,
        FLOAT_MAT3,
        FLOAT_MAT4,
        BUFFER,
        SAMPLER_CUBE,
        SAMPLER_2D,
        NUMBER_1,
        STRUCTURE,
        STRUCTURES,
        SAMPLER_ARRAY,
        FLOAT_MAT4_ARRAY,
    }
}

declare module wd {
    enum EVariableSemantic {
        POSITION,
        NORMAL,
        TEXCOORD,
        TANGENT,
        COLOR,
        MODEL,
        VIEW,
        PROJECTION,
        MODEL_VIEW,
        MODEL_VIEW_PROJECTION,
        MODEL_INVERSE,
        VIEW_INVERSE,
        PROJECTION_INVERSE,
        MODEL_VIEW_INVERSE,
        MODEL_VIEW_PROJECTION_INVERSE,
        MODEL_INVERSE_TRANSPOSE,
        MODEL_VIEW_INVERSE_TRANSPOSE,
        VIEWPORT,
    }
}

declare module wd {
    enum EVariableCategory {
        ENGINE,
        CUSTOM,
    }
}

declare module wd {
    class VariableLib {
        static a_position: ShaderVariable;
        static a_positionVec2: ShaderVariable;
        static a_currentFramePosition: ShaderVariable;
        static a_nextFramePosition: ShaderVariable;
        static a_normal: ShaderVariable;
        static a_currentFrameNormal: ShaderVariable;
        static a_nextFrameNormal: ShaderVariable;
        static a_color: ShaderVariable;
        static a_texCoord: ShaderVariable;
        static a_tangent: ShaderVariable;
        static u_color: ShaderVariable;
        static u_mMatrix: ShaderVariable;
        static u_vMatrix: ShaderVariable;
        static u_pMatrix: ShaderVariable;
        static u_mvpMatrix: ShaderVariable;
        static u_vpMatrix: ShaderVariable;
        static u_normalMatrix: ShaderVariable;
        static u_samplerCube0: ShaderVariable;
        static u_sampler2D0: ShaderVariable;
        static u_sampler2D1: ShaderVariable;
        static u_lightMapSampler: ShaderVariable;
        static u_diffuseMapSampler: ShaderVariable;
        static u_diffuseMap1Sampler: ShaderVariable;
        static u_diffuseMap2Sampler: ShaderVariable;
        static u_diffuseMap3Sampler: ShaderVariable;
        static u_specularMapSampler: ShaderVariable;
        static u_emissionMapSampler: ShaderVariable;
        static u_normalMapSampler: ShaderVariable;
        static u_reflectionMapSampler: ShaderVariable;
        static u_refractionMapSampler: ShaderVariable;
        static u_cameraPos: ShaderVariable;
        static u_refractionRatio: ShaderVariable;
        static u_reflectivity: ShaderVariable;
        static u_map0SourceRegion: ShaderVariable;
        static u_map1SourceRegion: ShaderVariable;
        static u_diffuseMapSourceRegion: ShaderVariable;
        static u_map0RepeatRegion: ShaderVariable;
        static u_map1RepeatRegion: ShaderVariable;
        static u_diffuseMapRepeatRegion: ShaderVariable;
        static u_combineMode: ShaderVariable;
        static u_mixRatio: ShaderVariable;
        static u_lightMapIntensity: ShaderVariable;
        static u_diffuse: ShaderVariable;
        static u_specular: ShaderVariable;
        static u_emission: ShaderVariable;
        static u_shininess: ShaderVariable;
        static u_lightModel: ShaderVariable;
        static u_isBothSide: ShaderVariable;
        static u_opacity: ShaderVariable;
        static u_ambient: ShaderVariable;
        static u_directionLights: ShaderVariable;
        static u_pointLights: ShaderVariable;
        static u_vpMatrixFromLight: ShaderVariable;
        static u_lightPos: ShaderVariable;
        static u_farPlane: ShaderVariable;
        static u_interpolation: ShaderVariable;
        static u_tilesHeightNumber: ShaderVariable;
        static u_tilesWidthNumber: ShaderVariable;
        static u_amplitude: ShaderVariable;
        static u_jointColor: ShaderVariable;
        static u_time: ShaderVariable;
        static u_speed: ShaderVariable;
        static u_shift: ShaderVariable;
        static u_alphaThreshold: ShaderVariable;
        static u_fireColor: ShaderVariable;
        static u_layerHeightDatas: ShaderVariable;
        static u_layerSampler2Ds: ShaderVariable;
        static u_herb1Color: ShaderVariable;
        static u_herb2Color: ShaderVariable;
        static u_herb3Color: ShaderVariable;
        static u_groundColor: ShaderVariable;
        static u_ampScale: ShaderVariable;
        static u_woodColor: ShaderVariable;
        static u_roadColor: ShaderVariable;
        static u_skyColor: ShaderVariable;
        static u_cloudColor: ShaderVariable;
        static u_brickColor: ShaderVariable;
        static u_waveData: ShaderVariable;
        static u_windMatrix: ShaderVariable;
        static u_bumpMapSampler: ShaderVariable;
        static u_bumpMap1Sampler: ShaderVariable;
        static u_bumpMap2Sampler: ShaderVariable;
        static u_bumpMap3Sampler: ShaderVariable;
        static u_levelData: ShaderVariable;
        static a_mVec4_0: ShaderVariable;
        static a_mVec4_1: ShaderVariable;
        static a_mVec4_2: ShaderVariable;
        static a_mVec4_3: ShaderVariable;
        static a_normalVec4_0: ShaderVariable;
        static a_normalVec4_1: ShaderVariable;
        static a_normalVec4_2: ShaderVariable;
        static u_isRenderListEmpty: ShaderVariable;
        static u_isReflectionRenderListEmpty: ShaderVariable;
        static u_isRefractionRenderListEmpty: ShaderVariable;
        static u_bitmapSampler: ShaderVariable;
        static a_page: ShaderVariable;
        static u_pageSampler2Ds: ShaderVariable;
        static u_mixMapSampler: ShaderVariable;
        static u_diffuseMap1RepeatRegion: ShaderVariable;
        static u_diffuseMap2RepeatRegion: ShaderVariable;
        static u_diffuseMap3RepeatRegion: ShaderVariable;
        static u_grassMapDatas: ShaderVariable;
        static a_quadIndex: ShaderVariable;
        static u_grassMapSampler: ShaderVariable;
        static u_windData: ShaderVariable;
        static a_vertexIndex: ShaderVariable;
        static u_grassRangeWidth: ShaderVariable;
        static u_grassRangeHeight: ShaderVariable;
        static u_terrainRangeWidth: ShaderVariable;
        static u_terrainRangeHeight: ShaderVariable;
        static u_terrainMinHeight: ShaderVariable;
        static u_terrainMaxHeight: ShaderVariable;
        static u_terrainSubdivisions: ShaderVariable;
        static u_terrainScaleY: ShaderVariable;
        static u_terrainPositionY: ShaderVariable;
        static u_heightMapSampler: ShaderVariable;
        static u_lightColor: ShaderVariable;
        static a_jointIndice: ShaderVariable;
        static a_jointWeight: ShaderVariable;
        static u_jointMatrices: ShaderVariable;
    }
    type ShaderVariable = {
        type: EVariableType;
        value: any;
    };
}

declare module wd {
    class VariableTypeTable {
        static getVariableType(type: EVariableType): string;
    }
}

declare module wd {
    class VariableNameTable {
        static getVariableName(name: string): string;
    }
}

declare module wd {
    const POINT_LIGHT_GLSLDATA_STRUCTURE_MEMBER_NAME: {
        position: string;
        color: string;
        intensity: string;
        constant: string;
        linear: string;
        quadratic: string;
        range: string;
    }[];
    const DIRECTION_LIGHT_GLSLDATA_STRUCTURE_MEMBER_NAME: {
        position: string;
        color: string;
        intensity: string;
    }[];
}

declare module wd {
    abstract class ShaderLib {
        shader: Shader;
        sendShaderVariables(program: Program, cmd: RenderCommand, material: Material): void;
        init(): void;
        dispose(): void;
    }
}

declare module wd {
    class CustomShaderLib extends ShaderLib {
        static create(): CustomShaderLib;
        shader: CustomShader;
        sendShaderVariables(program: Program, cmd: QuadCommand, material: ShaderMaterial): void;
    }
}

declare module wd {
    abstract class EngineShaderLib extends ShaderLib {
        shader: EngineShader;
        type: string;
        attributes: wdCb.Hash<ShaderVariable>;
        uniforms: wdCb.Hash<ShaderVariable>;
        vsSourceTop: string;
        vsSourceDefine: string;
        vsSourceVarDeclare: string;
        vsSourceFuncDeclare: string;
        vsSourceFuncDefine: string;
        vsSourceBody: string;
        vsSource: string;
        fsSourceTop: string;
        fsSourceDefine: string;
        fsSourceVarDeclare: string;
        fsSourceFuncDeclare: string;
        fsSourceFuncDefine: string;
        fsSourceBody: string;
        fsSource: string;
        vsSourceDefineList: wdCb.Collection<any>;
        fsSourceDefineList: wdCb.Collection<any>;
        vsSourceExtensionList: wdCb.Collection<string>;
        fsSourceExtensionList: wdCb.Collection<string>;
        setShaderDefinition(cmd: RenderCommand, material: Material): void;
        protected sendAttributeBuffer(program: Program, name: string, data: any): void;
        protected sendUniformData(program: Program, name: string, data: any): void;
        protected getVsChunk(): any;
        protected getVsChunk(type: string): any;
        protected getFsChunk(): any;
        protected getFsChunk(type: string): any;
        protected setVsSource(vs: GLSLChunk | string, operator?: string): void;
        protected setFsSource(fs: GLSLChunk | string, operator?: string): void;
        protected addAttributeVariable(variableArr: Array<string>): void;
        protected addUniformVariable(variableArr: Array<string>): void;
        private _addVariable(target, variableArr);
        private _clearShaderDefinition();
        private _getChunk(type, sourceType);
        private _setSource(chunk, sourceType, operator);
    }
}

declare module wd {
    class CommonShaderLib extends EngineShaderLib {
        static create(): CommonShaderLib;
        type: string;
        sendShaderVariables(program: Program, cmd: QuadCommand, material: EngineMaterial): void;
        setShaderDefinition(cmd: QuadCommand, material: EngineMaterial): void;
    }
}

declare module wd {
    class EndShaderLib extends EngineShaderLib {
        static create(): EndShaderLib;
        type: string;
        sendShaderVariables(program: Program, cmd: QuadCommand, material: EngineMaterial): void;
    }
}

declare module wd {
    class VerticeCommonShaderLib extends EngineShaderLib {
        static create(): VerticeCommonShaderLib;
        type: string;
        sendShaderVariables(program: Program, cmd: QuadCommand, material: EngineMaterial): void;
        setShaderDefinition(cmd: QuadCommand, material: EngineMaterial): void;
        private _sendAttributeVariables(program, cmd);
    }
}

declare module wd {
    class NormalCommonShaderLib extends EngineShaderLib {
        static create(): NormalCommonShaderLib;
        type: string;
        sendShaderVariables(program: Program, cmd: QuadCommand, material: EngineMaterial): void;
        setShaderDefinition(cmd: QuadCommand, material: EngineMaterial): void;
        private _sendAttributeVariables(program, cmd);
    }
}

declare module wd {
    class BasicShaderLib extends EngineShaderLib {
        static create(): BasicShaderLib;
        type: string;
        sendShaderVariables(program: Program, cmd: QuadCommand, material: BasicMaterial): void;
        setShaderDefinition(cmd: QuadCommand, material: BasicMaterial): void;
    }
}

declare module wd {
    class BasicMaterialColorShaderLib extends EngineShaderLib {
        static create(): BasicMaterialColorShaderLib;
        type: string;
        sendShaderVariables(program: Program, cmd: QuadCommand, material: BasicMaterial): void;
        setShaderDefinition(cmd: QuadCommand, material: BasicMaterial): void;
    }
}

declare module wd {
    class BasicVertexColorShaderLib extends EngineShaderLib {
        static create(): BasicVertexColorShaderLib;
        type: string;
        sendShaderVariables(program: Program, cmd: QuadCommand, material: BasicMaterial): void;
        setShaderDefinition(cmd: QuadCommand, material: BasicMaterial): void;
    }
}

declare module wd {
    class EndBasicShaderLib extends EngineShaderLib {
        static create(): EndBasicShaderLib;
        type: string;
        setShaderDefinition(cmd: QuadCommand, material: StandardBasicMaterial): void;
    }
}

declare module wd {
    class CommonMorphShaderLib extends EngineShaderLib {
        static create(): CommonMorphShaderLib;
        type: string;
        sendShaderVariables(program: Program, cmd: QuadCommand, material: EngineMaterial): void;
        setShaderDefinition(cmd: QuadCommand, material: EngineMaterial): void;
    }
}

declare module wd {
    class VerticeMorphShaderLib extends EngineShaderLib {
        static create(): VerticeMorphShaderLib;
        type: string;
        sendShaderVariables(program: Program, cmd: QuadCommand, material: EngineMaterial): void;
        setShaderDefinition(cmd: QuadCommand, material: EngineMaterial): void;
    }
}

declare module wd {
    class NormalMorphShaderLib extends EngineShaderLib {
        static create(): NormalMorphShaderLib;
        type: string;
        sendShaderVariables(program: Program, cmd: QuadCommand, material: EngineMaterial): void;
        setShaderDefinition(cmd: QuadCommand, material: EngineMaterial): void;
    }
}

declare module wd {
    class VerticeSkinSkeletonShaderLib extends EngineShaderLib {
        static create(): VerticeSkinSkeletonShaderLib;
        type: string;
        sendShaderVariables(program: Program, cmd: QuadCommand, material: EngineMaterial): void;
        setShaderDefinition(cmd: QuadCommand | null, material: EngineMaterial): void;
        private _sendJointMatrices(program, cmd);
    }
}

declare module wd {
    abstract class ProceduralShaderLib extends EngineShaderLib {
        shader: ProceduralShader;
        sendShaderVariables(program: Program, cmd: ProceduralCommand): void;
        setShaderDefinition(cmd: ProceduralCommand): void;
    }
}

declare module wd {
    class CustomProceduralShaderLib extends ProceduralShaderLib {
        static create(proceduralTexture: CustomProceduralTexture): CustomProceduralShaderLib;
        constructor(proceduralTexture: CustomProceduralTexture);
        type: string;
        private _proceduralTexture;
        sendShaderVariables(program: Program, cmd: ProceduralCommand): void;
        setShaderDefinition(cmd: ProceduralCommand): void;
    }
}

declare module wd {
    class CommonProceduralShaderLib extends ProceduralShaderLib {
        static create(): CommonProceduralShaderLib;
        type: string;
        sendShaderVariables(program: Program, cmd: ProceduralCommand): void;
        setShaderDefinition(cmd: ProceduralCommand): void;
    }
}

declare module wd {
    class SkyboxShaderLib extends EngineShaderLib {
        static create(): SkyboxShaderLib;
        type: string;
        sendShaderVariables(program: Program, cmd: QuadCommand, material: EngineMaterial): void;
        setShaderDefinition(cmd: QuadCommand, material: EngineMaterial): void;
    }
}

declare module wd {
    abstract class EnvMapShaderLib extends EngineShaderLib {
        setShaderDefinition(cmd: QuadCommand, material: EngineMaterial): void;
    }
}

declare module wd {
    class CommonEnvMapShaderLib extends EnvMapShaderLib {
        static create(): CommonEnvMapShaderLib;
        type: string;
        sendShaderVariables(program: Program, cmd: QuadCommand, material: EngineMaterial): void;
        setShaderDefinition(cmd: QuadCommand, material: EngineMaterial): void;
    }
}

declare module wd {
    abstract class ForBasicEnvMapShaderLib extends EnvMapShaderLib {
        sendShaderVariables(program: Program, cmd: QuadCommand, material: EngineMaterial): void;
        setShaderDefinition(cmd: QuadCommand, material: EngineMaterial): void;
        protected setEnvMapSource(): void;
    }
}

declare module wd {
    class BasicForBasicEnvMapShaderLib extends ForBasicEnvMapShaderLib {
        static create(): BasicForBasicEnvMapShaderLib;
        type: string;
    }
}

declare module wd {
    class ReflectionForBasicEnvMapShaderLib extends ForBasicEnvMapShaderLib {
        static create(): ReflectionForBasicEnvMapShaderLib;
        type: string;
        setShaderDefinition(cmd: QuadCommand, material: EngineMaterial): void;
    }
}

declare module wd {
    class RefractionForBasicEnvMapShaderLib extends ForBasicEnvMapShaderLib {
        static create(): RefractionForBasicEnvMapShaderLib;
        type: string;
        sendShaderVariables(program: Program, cmd: QuadCommand, material: EngineMaterial): void;
        setShaderDefinition(cmd: QuadCommand, material: EngineMaterial): void;
    }
}

declare module wd {
    class FresnelForBasicEnvMapShaderLib extends ForBasicEnvMapShaderLib {
        static create(): FresnelForBasicEnvMapShaderLib;
        type: string;
        sendShaderVariables(program: Program, cmd: QuadCommand, material: EngineMaterial): void;
        setShaderDefinition(cmd: QuadCommand, material: EngineMaterial): void;
    }
}

declare module wd {
    abstract class ForLightEnvMapShaderLib extends EnvMapShaderLib {
        protected setEnvMapSource(): void;
    }
}

declare module wd {
    class BasicForLightEnvMapShaderLib extends ForLightEnvMapShaderLib {
        static create(): BasicForLightEnvMapShaderLib;
        type: string;
    }
}

declare module wd {
    class ReflectionForLightEnvMapShaderLib extends ForLightEnvMapShaderLib {
        static create(): ReflectionForLightEnvMapShaderLib;
        type: string;
        setShaderDefinition(cmd: QuadCommand, material: EngineMaterial): void;
    }
}

declare module wd {
    class RefractionForLightEnvMapShaderLib extends ForLightEnvMapShaderLib {
        static create(): RefractionForLightEnvMapShaderLib;
        type: string;
        sendShaderVariables(program: Program, cmd: QuadCommand, material: EngineMaterial): void;
        setShaderDefinition(cmd: QuadCommand, material: EngineMaterial): void;
    }
}

declare module wd {
    class FresnelForLightEnvMapShaderLib extends ForLightEnvMapShaderLib {
        static create(): FresnelForLightEnvMapShaderLib;
        type: string;
        sendShaderVariables(program: Program, cmd: QuadCommand, material: EngineMaterial): void;
        setShaderDefinition(cmd: QuadCommand, material: EngineMaterial): void;
    }
}

declare module wd {
    abstract class MapShaderLib extends EngineShaderLib {
        sendShaderVariables(program: Program, cmd: QuadCommand, material: BasicMaterial): void;
        setShaderDefinition(cmd: QuadCommand, material: BasicMaterial): void;
        protected sendMapShaderVariables(program: Program, cmd: QuadCommand, material: BasicMaterial): void;
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
        protected sendMapShaderVariables(program: Program, cmd: QuadCommand, material: BasicMaterial): void;
        setShaderDefinition(cmd: QuadCommand, material: BasicMaterial): void;
    }
}

declare module wd {
    class LightCommonShaderLib extends EngineShaderLib {
        static create(): LightCommonShaderLib;
        type: string;
        sendShaderVariables(program: Program, cmd: QuadCommand, material: LightMaterial): void;
        setShaderDefinition(cmd: QuadCommand, material: EngineMaterial): void;
    }
}

declare module wd {
    class LightSetWorldPositionShaderLib extends EngineShaderLib {
        static create(): LightSetWorldPositionShaderLib;
        type: string;
    }
}

declare module wd {
    class LightShaderLib extends EngineShaderLib {
        static create(): LightShaderLib;
        type: string;
        sendShaderVariables(program: Program, cmd: QuadCommand, material: LightMaterial): void;
        setShaderDefinition(cmd: QuadCommand, material: EngineMaterial): void;
        private _sendLightVariables(program);
        private _sendPointLightVariables(program, pointLights);
        private _sendDirectionLightVariables(program, directionLights);
        private _setLightDefinition(material);
        private _addDefine(list, direction_lights_count, point_lights_count);
        private _convertLightModelToGLSLVariable(lightModel);
    }
}

declare module wd {
    class LightEndShaderLib extends EngineShaderLib {
        static create(): LightEndShaderLib;
        type: string;
        setShaderDefinition(cmd: QuadCommand, material: LightMaterial): void;
    }
}

declare module wd {
    abstract class BaseLightMapShaderLib extends EngineShaderLib {
        sendShaderVariables(program: Program, cmd: QuadCommand, material: LightMaterial): void;
    }
}

declare module wd {
    class CommonLightMapShaderLib extends EngineShaderLib {
        static create(): CommonLightMapShaderLib;
        sendShaderVariables(program: Program, cmd: QuadCommand, material: LightMaterial): void;
        setShaderDefinition(cmd: QuadCommand, material: EngineMaterial): void;
    }
}

declare module wd {
    class LightMapShaderLib extends BaseLightMapShaderLib {
        static create(): LightMapShaderLib;
        type: string;
        sendShaderVariables(program: Program, cmd: QuadCommand, material: LightMaterial): void;
        setShaderDefinition(cmd: QuadCommand, material: EngineMaterial): void;
    }
}

declare module wd {
    class DiffuseMapShaderLib extends BaseLightMapShaderLib {
        static create(): DiffuseMapShaderLib;
        type: string;
        sendShaderVariables(program: Program, cmd: QuadCommand, material: LightMaterial): this;
        setShaderDefinition(cmd: QuadCommand, material: EngineMaterial): void;
    }
}

declare module wd {
    class SpecularMapShaderLib extends BaseLightMapShaderLib {
        static create(): SpecularMapShaderLib;
        type: string;
        setShaderDefinition(cmd: QuadCommand, material: EngineMaterial): void;
    }
}

declare module wd {
    class EmissionMapShaderLib extends BaseLightMapShaderLib {
        static create(): EmissionMapShaderLib;
        type: string;
        setShaderDefinition(cmd: QuadCommand, material: EngineMaterial): void;
    }
}

declare module wd {
    class NormalMapShaderLib extends BaseLightMapShaderLib {
        static create(): NormalMapShaderLib;
        type: string;
        sendShaderVariables(program: Program, cmd: QuadCommand, material: LightMaterial): void;
        setShaderDefinition(cmd: QuadCommand, material: EngineMaterial): void;
    }
}

declare module wd {
    class NoLightMapShaderLib extends EngineShaderLib {
        static create(): NoLightMapShaderLib;
        type: string;
        sendShaderVariables(program: Program, cmd: QuadCommand, material: LightMaterial): void;
    }
}

declare module wd {
    class NoDiffuseMapShaderLib extends EngineShaderLib {
        static create(): NoDiffuseMapShaderLib;
        type: string;
        sendShaderVariables(program: Program, cmd: QuadCommand, material: LightMaterial): void;
        setShaderDefinition(cmd: QuadCommand, material: EngineMaterial): void;
    }
}

declare module wd {
    class NoSpecularMapShaderLib extends EngineShaderLib {
        static create(): NoSpecularMapShaderLib;
        type: string;
    }
}

declare module wd {
    class NoEmissionMapShaderLib extends EngineShaderLib {
        static create(): NoEmissionMapShaderLib;
        type: string;
        sendShaderVariables(program: Program, cmd: QuadCommand, material: LightMaterial): void;
        setShaderDefinition(cmd: QuadCommand, material: EngineMaterial): void;
    }
}

declare module wd {
    class NoNormalMapShaderLib extends EngineShaderLib {
        static create(): NoNormalMapShaderLib;
        type: string;
        sendShaderVariables(program: Program, cmd: QuadCommand, material: LightMaterial): void;
        setShaderDefinition(cmd: QuadCommand, material: LightMaterial): void;
    }
}

declare module wd {
    class NoShadowMapShaderLib extends EngineShaderLib {
        static create(): NoShadowMapShaderLib;
        type: string;
        sendShaderVariables(program: Program, cmd: QuadCommand, material: LightMaterial): void;
    }
}

declare module wd {
    class CustomShaderLibUtils {
        static sendUniformData(name: string, type: EVariableType, value: any, program: Program): void;
        static sendUniformDataWithSemantic(name: string, type: EVariableType, value: any, program: Program, cmd: QuadCommand): void;
        static sendAttributeBufferWithSemantic(name: string, type: EVariableType, value: any, program: Program, cmd: QuadCommand): void;
        private static _sendStructureData(name, data, program);
        private static _sendStructureDataWithSemantic(name, data, program, cmd);
        private static _getAttributeData(data, type, cmd);
        private static _getAttributeType(type);
        private static _getUniformData(data, cmd);
    }
}

declare module wd {
    class RenderTargerRendererShaderLibUtils {
        static judgeAndSendIsRenderListEmptyVariable(program: Program, glslDataKey: EShaderGLSLData): any;
        static judgeAndSendIsRenderListEmptyVariable(program: Program, glslDataKey: EShaderGLSLData, variableName: string): any;
    }
}

declare module wd {
    abstract class InstanceShaderLib extends EngineShaderLib {
    }
}

declare module wd {
    abstract class NoInstanceShaderLib extends EngineShaderLib {
    }
}

declare module wd {
    abstract class ModelMatrixInstanceShaderLib extends InstanceShaderLib {
    }
}

declare module wd {
    abstract class NormalMatrixModelMatrixInstanceShaderLib extends InstanceShaderLib {
    }
}

declare module wd {
    class ModelMatrixHardwareInstanceShaderLib extends ModelMatrixInstanceShaderLib {
        static create(): ModelMatrixHardwareInstanceShaderLib;
        type: string;
        sendShaderVariables(program: Program, cmd: InstanceCommand, material: EngineMaterial): void;
        setShaderDefinition(cmd: InstanceCommand, material: EngineMaterial): void;
    }
}

declare module wd {
    class NormalMatrixHardwareInstanceShaderLib extends NormalMatrixModelMatrixInstanceShaderLib {
        static create(): NormalMatrixHardwareInstanceShaderLib;
        type: string;
        sendShaderVariables(program: Program, cmd: InstanceCommand, material: EngineMaterial): void;
        setShaderDefinition(cmd: InstanceCommand, material: EngineMaterial): void;
    }
}

declare module wd {
    class ModelMatrixBatchInstanceShaderLib extends ModelMatrixInstanceShaderLib {
        static create(): ModelMatrixBatchInstanceShaderLib;
        type: string;
        sendShaderVariables(program: Program, cmd: InstanceCommand, material: EngineMaterial): void;
        setShaderDefinition(cmd: InstanceCommand, material: EngineMaterial): void;
    }
}

declare module wd {
    class NormalMatrixBatchInstanceShaderLib extends NormalMatrixModelMatrixInstanceShaderLib {
        static create(): NormalMatrixBatchInstanceShaderLib;
        type: string;
        sendShaderVariables(program: Program, cmd: InstanceCommand, material: EngineMaterial): void;
        setShaderDefinition(cmd: InstanceCommand, material: EngineMaterial): void;
    }
}

declare module wd {
    class ModelMatrixNoInstanceShaderLib extends NoInstanceShaderLib {
        static create(): ModelMatrixNoInstanceShaderLib;
        type: string;
        sendShaderVariables(program: Program, cmd: SingleDrawCommand, material: EngineMaterial): void;
        setShaderDefinition(cmd: SingleDrawCommand, material: EngineMaterial): void;
    }
}

declare module wd {
    class NormalMatrixNoInstanceShaderLib extends NoInstanceShaderLib {
        static create(): NormalMatrixNoInstanceShaderLib;
        type: string;
        sendShaderVariables(program: Program, cmd: SingleDrawCommand, material: EngineMaterial): void;
        setShaderDefinition(cmd: SingleDrawCommand, material: EngineMaterial): void;
    }
}

declare module wd {
    class ShaderChunk {
        static empty: GLSLChunk;
        static NULL: number;
        static basic_materialColor_fragment: GLSLChunk;
        static basic_vertexColor_fragment: GLSLChunk;
        static basic_vertexColor_vertex: GLSLChunk;
        static end_basic_fragment: GLSLChunk;
        static common_envMap_fragment: GLSLChunk;
        static normal_morph_vertex: GLSLChunk;
        static vertice_morph_vertex: GLSLChunk;
        static vertice_skinSkeleton_vertex: GLSLChunk;
        static common_define: GLSLChunk;
        static common_fragment: GLSLChunk;
        static common_function: GLSLChunk;
        static common_vertex: GLSLChunk;
        static highp_fragment: GLSLChunk;
        static lowp_fragment: GLSLChunk;
        static mediump_fragment: GLSLChunk;
        static noNormalMap_light_fragment: GLSLChunk;
        static map_forBasic_fragment: GLSLChunk;
        static map_forBasic_vertex: GLSLChunk;
        static multi_map_forBasic_fragment: GLSLChunk;
        static multi_map_forBasic_vertex: GLSLChunk;
        static common_proceduralTexture_fragment: GLSLChunk;
        static common_proceduralTexture_vertex: GLSLChunk;
        static skybox_fragment: GLSLChunk;
        static skybox_vertex: GLSLChunk;
        static lightCommon_fragment: GLSLChunk;
        static lightCommon_vertex: GLSLChunk;
        static lightEnd_fragment: GLSLChunk;
        static light_common: GLSLChunk;
        static light_fragment: GLSLChunk;
        static light_setWorldPosition_vertex: GLSLChunk;
        static light_vertex: GLSLChunk;
        static basic_forBasic_envMap_fragment: GLSLChunk;
        static basic_forBasic_envMap_vertex: GLSLChunk;
        static forBasic_envMap_fragment: GLSLChunk;
        static forBasic_envMap_vertex: GLSLChunk;
        static fresnel_forBasic_envMap_fragment: GLSLChunk;
        static reflection_forBasic_envMap_fragment: GLSLChunk;
        static refraction_forBasic_envMap_fragment: GLSLChunk;
        static basic_forLight_envMap_fragment: GLSLChunk;
        static basic_forLight_envMap_vertex: GLSLChunk;
        static forLight_envMap_fragment: GLSLChunk;
        static forLight_envMap_vertex: GLSLChunk;
        static fresnel_forLight_envMap_fragment: GLSLChunk;
        static reflection_forLight_envMap_fragment: GLSLChunk;
        static refraction_forLight_envMap_fragment: GLSLChunk;
        static modelMatrix_batch_instance_vertex: GLSLChunk;
        static normalMatrix_batch_instance_vertex: GLSLChunk;
        static modelMatrix_hardware_instance_vertex: GLSLChunk;
        static normalMatrix_hardware_instance_vertex: GLSLChunk;
        static modelMatrix_noInstance_vertex: GLSLChunk;
        static normalMatrix_noInstance_vertex: GLSLChunk;
        static diffuseMap_fragment: GLSLChunk;
        static diffuseMap_vertex: GLSLChunk;
        static emissionMap_fragment: GLSLChunk;
        static emissionMap_vertex: GLSLChunk;
        static lightMap_fragment: GLSLChunk;
        static lightMap_vertex: GLSLChunk;
        static noDiffuseMap_fragment: GLSLChunk;
        static noEmissionMap_fragment: GLSLChunk;
        static noLightMap_fragment: GLSLChunk;
        static noNormalMap_fragment: GLSLChunk;
        static noNormalMap_vertex: GLSLChunk;
        static noSpecularMap_fragment: GLSLChunk;
        static normalMap_fragment: GLSLChunk;
        static normalMap_vertex: GLSLChunk;
        static specularMap_fragment: GLSLChunk;
        static specularMap_vertex: GLSLChunk;
        static noShadowMap_fragment: GLSLChunk;
        static multiPages_bitmapFont_fragment: GLSLChunk;
        static multiPages_bitmapFont_vertex: GLSLChunk;
        static sdf_bitmapFont_smoothStep_fallback: GLSLChunk;
        static sdf_bitmapFont_smoothStep_standardDerivatives: GLSLChunk;
        static sdf_bitmapFont_smooth_fragment: GLSLChunk;
        static common_heightMap: GLSLChunk;
        static common_light: GLSLChunk;
        static mirror_fragment: GLSLChunk;
        static mirror_vertex: GLSLChunk;
        static brick_proceduralTexture_fragment: GLSLChunk;
        static cloud_proceduralTexture_fragment: GLSLChunk;
        static water_bump_fragment: GLSLChunk;
        static water_bump_vertex: GLSLChunk;
        static water_fragment: GLSLChunk;
        static water_fresnel_fragment: GLSLChunk;
        static water_fresnel_vertex: GLSLChunk;
        static water_noBump_fragment: GLSLChunk;
        static water_noLightEffect_fragment: GLSLChunk;
        static water_reflection_fragment: GLSLChunk;
        static water_refraction_fragment: GLSLChunk;
        static water_vertex: GLSLChunk;
        static fire_proceduralTexture_fragment: GLSLChunk;
        static grass_proceduralTexture_fragment: GLSLChunk;
        static marble_proceduralTexture_fragment: GLSLChunk;
        static wood_proceduralTexture_fragment: GLSLChunk;
        static road_proceduralTexture_fragment: GLSLChunk;
        static basic_bitmapFont_fragment: GLSLChunk;
        static grass_batch_instance_vertex: GLSLChunk;
        static grass_common_instance_fragment: GLSLChunk;
        static grass_common_instance_vertex: GLSLChunk;
        static grass_hardware_instance_vertex: GLSLChunk;
        static grass_map_fragment: GLSLChunk;
        static grass_map_setWorldPosition_vertex: GLSLChunk;
        static grass_map_vertex: GLSLChunk;
        static terrain_layer_fragment: GLSLChunk;
        static terrain_layer_vertex: GLSLChunk;
        static terrain_mix_bump_cotangentFrame_fallback: GLSLChunk;
        static terrain_mix_bump_cotangentFrame_standardDerivatives: GLSLChunk;
        static terrain_mix_bump_fragment: GLSLChunk;
        static terrain_mix_bump_vertex: GLSLChunk;
        static terrain_mix_common_fragment: GLSLChunk;
        static terrain_mix_fragment: GLSLChunk;
        static terrain_mix_vertex: GLSLChunk;
        static common_bitmapFont_vertex: GLSLChunk;
        static buildCubemapShadowMap_fragment: GLSLChunk;
        static buildCubemapShadowMap_vertex: GLSLChunk;
        static buildTwoDShadowMap_depthMap_fragment: GLSLChunk;
        static buildTwoDShadowMap_fragment: GLSLChunk;
        static buildTwoDShadowMap_packDepth_fragment: GLSLChunk;
        static buildTwoDShadowMap_vertex: GLSLChunk;
        static commonBuildShadowMap_fragment: GLSLChunk;
        static cubemapShadowMap_fragment: GLSLChunk;
        static totalShadowMap_fragment: GLSLChunk;
        static twoDShadowMap_depthMap_fragment: GLSLChunk;
        static twoDShadowMap_fragment: GLSLChunk;
        static twoDShadowMap_unpackDepth_fragment: GLSLChunk;
        static twoDShadowMap_vertex: GLSLChunk;
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
        readonly program: Program;
        private _blendType;
        blendType: EBlendType;
        envMap: CubemapTexture;
        private _blendSrc;
        blendSrc: EBlendFunc;
        private _blendDst;
        blendDst: EBlendFunc;
        private _blendEquation;
        blendEquation: EBlendEquation;
        private _alphaToCoverage;
        alphaToCoverage: boolean;
        private _color;
        color: Color;
        readonly mapManager: MapManager;
        readonly shader: Shader;
        redWrite: boolean;
        greenWrite: boolean;
        blueWrite: boolean;
        alphaWrite: boolean;
        polygonOffsetMode: EPolygonOffsetMode;
        side: ESide;
        blend: boolean;
        blendFuncSeparate: Array<EBlendFunc>;
        blendEquationSeparate: Array<EBlendEquation>;
        geometry: Geometry;
        private _shaderManager;
        abstract getTextureForRenderSort(): Texture;
        clone(): this;
        initWhenCreate(): void;
        init(): void;
        dispose(): void;
        updateShader(quadCmd: QuadCommand): void;
        addShader(shaderKey: EShaderTypeOfScene, shader: Shader): void;
        hasShader(shaderKey: EShaderTypeOfScene): boolean;
        getShader(shaderKey: EShaderTypeOfScene): Shader;
        hasMap(map: Texture): boolean;
        protected abstract createShader(): Shader;
    }
}

declare module wd {
    abstract class EngineMaterial extends Material {
        refractionRatio: number;
        reflectivity: number;
        mapCombineMode: ETextureCombineMode;
        mapMixRatio: number;
        init(): void;
        protected addShaderLib(): void;
        protected addNormalShaderLib(): void;
        protected createShader(): Shader;
        private _addTopShaderLib();
        private _addShaderLibToTop(lib);
        private _addEndShaderLib();
    }
}

declare module wd {
    abstract class StandardLightMaterial extends EngineMaterial {
        private _lightMap;
        lightMap: Texture;
        private _diffuseMap;
        diffuseMap: Texture;
        private _specularMap;
        specularMap: Texture;
        private _emissionMap;
        emissionMap: Texture;
        private _normalMap;
        normalMap: ImageTexture;
        private _shininess;
        shininess: number;
        shading: EShading;
        opacity: number;
        lightModel: ELightModel;
        specularColor: Color;
        emissionColor: Color;
        lightMapIntensity: number;
        alphaTest: number;
        init(): void;
        protected addTopExtendShaderLib(): void;
        protected addExtendShaderLib(): void;
        protected addEndShaderLib(): void;
        protected addNormalRelatedShaderLib(): void;
        protected addLightSetWorldPositionShaderLib(): void;
        protected addShaderLib(): void;
        private _setLightMapShaderLib();
        private _setEnvMapShaderLib(envMap);
        private _hasTwoDShadowMap();
        private _hasCubemapShadowMap();
        private _addMap();
    }
}

declare module wd {
    abstract class StandardBasicMaterial extends EngineMaterial {
        readonly mapList: wdCb.Collection<BasicTexture | ProceduralTexture>;
        private _map;
        map: Texture | TextureAsset | Array<Texture> | Array<TextureAsset>;
        opacity: number;
        alphaTest: number;
        protected addExtendShaderLib(): void;
        protected addShaderLib(): void;
        private _setMapShaderLib();
        private _setEnvMapShaderLib(envMap);
        private _addMap();
    }
}

declare module wd {
    class LineMaterial extends StandardBasicMaterial {
        static create(): LineMaterial;
        private _lineWidth;
        lineWidth: number;
        getTextureForRenderSort(): Texture;
    }
}

declare module wd {
    class BasicMaterial extends StandardBasicMaterial {
        static create(): BasicMaterial;
        getTextureForRenderSort(): Texture;
    }
}

declare module wd {
    class SkyboxMaterial extends EngineMaterial {
        static create(): SkyboxMaterial;
        initWhenCreate(): void;
        getTextureForRenderSort(): Texture;
        protected addShaderLib(): void;
    }
}

declare module wd {
    class LightMaterial extends StandardLightMaterial {
        static create(): LightMaterial;
        getTextureForRenderSort(): Texture;
    }
}

declare module wd {
    class ShaderMaterial extends Material {
        static create(): ShaderMaterial;
        shader: CustomShader;
        definitionData: ShaderDefinitionData;
        init(): void;
        getTextureForRenderSort(): Texture;
        read(definitionDataId: string): void;
        protected createShader(): CustomShader;
    }
    type ShaderDefinitionData = {
        attributes: ShaderData;
        uniforms: ShaderData;
        vsSourceId: string;
        fsSourceId: string;
    };
}

declare module wd {
    enum EShading {
        FLAT = 0,
        SMOOTH = 1,
    }
}

declare module wd {
    class ShaderManager {
        static create(material: Material): ShaderManager;
        constructor(material: Material);
        readonly shader: Shader;
        readonly mapManager: MapManager;
        private _material;
        private _otherShaderMap;
        private _mainShader;
        setShader(shader: Shader): void;
        init(): void;
        dispose(): void;
        update(quadCmd: QuadCommand): void;
        addShader(shaderKey: EShaderTypeOfScene, shader: Shader): void;
        hasShader(shaderKey: EShaderTypeOfScene): boolean;
        getShader(shaderKey: EShaderTypeOfScene): Shader;
    }
}

declare module wd {
    enum EAssetType {
        UNKNOW = 0,
        FONT = 1,
        SCRIPT = 2,
    }
}

declare module wd {
    abstract class Loader {
        private _container;
        load(url: string, id: string, config: AssetConfigData): wdFrp.Stream;
        load(url: Array<string>, id: string, config: AssetConfigData): wdFrp.Stream;
        get(id: string): any;
        has(id: string): boolean;
        dispose(): void;
        protected abstract loadAsset(url: string, id: string, config: AssetConfigData): wdFrp.Stream;
        protected abstract loadAsset(url: Array<string>, id: string, config: AssetConfigData): wdFrp.Stream;
        private _errorHandle(path, err);
        private _errorHandle(path, err);
    }
}

declare module wd {
    class GLSLLoader extends Loader {
        static getInstance(): any;
        private constructor();
        protected loadAsset(url: string, id: string, config: AssetConfigData): wdFrp.Stream;
        protected loadAsset(url: Array<string>, id: string, config: AssetConfigData): wdFrp.Stream;
    }
}

declare module wd {
    class JsLoader extends Loader {
        static getInstance(): any;
        private constructor();
        protected loadAsset(url: string, id: string, config: AssetConfigData): wdFrp.Stream;
        protected loadAsset(url: Array<string>, id: string, config: AssetConfigData): wdFrp.Stream;
        private _createScript();
        private _appendScript(script);
    }
}

declare module wd {
    class ScriptLoader extends Loader {
        static getInstance(): any;
        private constructor();
        protected loadAsset(url: string, id: string, config: AssetConfigData): wdFrp.Stream;
        protected loadAsset(url: Array<string>, id: string, config: AssetConfigData): wdFrp.Stream;
    }
}

declare module wd {
    class JSONLoader extends Loader {
        static getInstance(): any;
        private constructor();
        protected loadAsset(url: string, id: string, config: AssetConfigData): wdFrp.Stream;
        protected loadAsset(url: Array<string>, id: string, config: AssetConfigData): wdFrp.Stream;
    }
}

declare module wd {
    class VideoLoader extends Loader {
        static getInstance(): any;
        private constructor();
        protected loadAsset(url: string, id: string, config: AssetConfigData): wdFrp.Stream;
        protected loadAsset(url: Array<string>, id: string, config: AssetConfigData): wdFrp.Stream;
    }
}

declare module wd {
    class SoundLoader extends Loader {
        static getInstance(): any;
        private constructor();
        protected loadAsset(url: string, id: string, config: AssetConfigData): wdFrp.Stream;
        protected loadAsset(url: Array<string>, id: string, config: AssetConfigData): wdFrp.Stream;
    }
}

declare module wd {
    class TextureLoader extends Loader {
        static getInstance(): any;
        private constructor();
        protected loadAsset(url: string, id: string, config: AssetConfigData): wdFrp.Stream;
        protected loadAsset(url: Array<string>, id: string, config: AssetConfigData): wdFrp.Stream;
    }
}

declare module wd {
    class AjaxLoader {
        static load(url: string, dataType: string): wdFrp.FromPromiseStream;
    }
}

declare module wd {
    class Base64Utils {
        static createImageFromBase64(base64: string): any;
    }
}

declare module wd {
    class BufferReader {
        static create(arraybuffer: any, byteOffset: number, byteLength: number): BufferReader;
        readonly arraybuffer: any;
        readonly byteLength: number;
        readonly byteOffset: number;
        private _dataView;
        private _offset;
        initWhenCreate(arraybuffer: any, byteOffset: number, byteLength: number): void;
        readInt8(): number;
        readUInt8(): number;
        readInt16(): number;
        readUInt16(): number;
        readInt32(): number;
        readUInt32(): number;
        readFloat(): number;
        seek(pos: number): void;
    }
}

declare module wd {
    class ImageLoader {
        static load(url: string, config: AssetConfigData): wdFrp.FromPromiseStream;
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
        sourceRegionMethod: ETextureSourceRegionMethod;
        format: ETextureFormat;
        source: any;
        repeatRegion: RectRegion;
        sourceRegion: RectRegion;
        sourceRegionMapping: ETextureSourceRegionMapping;
        unpackAlignment: number;
        packAlignment: number;
        flipY: boolean;
        premultiplyAlpha: boolean;
        isPremultipliedAlpha: boolean;
        colorspaceConversion: any;
        wrapS: ETextureWrapMode;
        wrapT: ETextureWrapMode;
        magFilter: ETextureFilterMode;
        minFilter: ETextureFilterMode;
        type: ETextureType;
        mipmaps: wdCb.Collection<any>;
        anisotropy: number;
        needUpdate: boolean;
    }
    interface ICubemapTextureAsset {
        generateMipmaps: boolean;
        width: number;
        height: number;
        minFilter: ETextureFilterMode;
        magFilter: ETextureFilterMode;
        wrapS: ETextureWrapMode;
        wrapT: ETextureWrapMode;
        anisotropy: number;
        unpackAlignment: number;
        packAlignment: number;
        flipY: boolean;
        premultiplyAlpha: boolean;
        isPremultipliedAlpha: boolean;
        colorspaceConversion: any;
        needUpdate: boolean;
        mode: EEnvMapMode;
    }
    interface ICubemapFaceCompressedTextureAsset {
        type: ETextureType;
        format: ETextureFormat;
        width: number;
        height: number;
        mipmaps: wdCb.Collection<CompressedTextureMipmap>;
        minFilter: ETextureFilterMode;
    }
    interface ICubemapFaceTwoDTextureAsset {
        sourceRegion: RectRegion;
        sourceRegionMethod: ETextureSourceRegionMethod;
        type: ETextureType;
        format: ETextureFormat;
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
        format: ETextureFormat;
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
        sourceRegionMethod: ETextureSourceRegionMethod;
        format: ETextureFormat;
        source: any;
        repeatRegion: RectRegion;
        sourceRegion: RectRegion;
        sourceRegionMapping: ETextureSourceRegionMapping;
        packAlignment: number;
        unpackAlignment: number;
        flipY: boolean;
        premultiplyAlpha: boolean;
        isPremultipliedAlpha: boolean;
        colorspaceConversion: any;
        wrapS: ETextureWrapMode;
        wrapT: ETextureWrapMode;
        magFilter: ETextureFilterMode;
        minFilter: ETextureFilterMode;
        type: ETextureType;
        mipmaps: wdCb.Collection<any>;
        anisotropy: number;
        needUpdate: boolean;
        abstract toTexture(): Texture;
        abstract toCubemapFaceTexture(): CubemapFaceTexture;
        abstract cloneToCubemapFaceTexture(cubemapFaceTexture: any): any;
        clone(): this;
        cloneToCubemapTexture(cubemapTexture: ICubemapTextureAsset): void;
        cloneTo(texture: BasicTexture): BasicTexture;
    }
}

declare module wd {
    class ImageTextureAsset extends TextureAsset {
        static create(source: HTMLImageElement | HTMLCanvasElement): ImageTextureAsset;
        constructor(source: HTMLImageElement | HTMLCanvasElement);
        mipmaps: wdCb.Collection<HTMLCanvasElement | HTMLImageElement | HTMLVideoElement>;
        toTexture(): ImageTexture;
        toCubemapFaceTexture(): CubemapFaceImageTexture;
        cloneToCubemapFaceTexture(cubemapFaceTexture: ICubemapFaceTwoDTextureAsset): void;
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
        cloneToCubemapFaceTexture(cubemapFaceTexture: ICubemapFaceTwoDTextureAsset): void;
    }
}

declare module wd {
    class CompressedTextureAsset extends TextureAsset {
        static create(): CompressedTextureAsset;
        mipmaps: wdCb.Collection<CompressedTextureMipmap>;
        initWhenCreate(): void;
        toTexture(): Texture;
        toCubemapFaceTexture(): CubemapFaceCompressedTexture;
        cloneToCubemapFaceTexture(cubemapFaceTexture: ICubemapFaceCompressedTextureAsset): void;
    }
}

declare module wd {
    enum ETextureFilterMode {
        NEAREST,
        NEAREST_MIPMAP_MEAREST,
        NEAREST_MIPMAP_LINEAR,
        LINEAR,
        LINEAR_MIPMAP_NEAREST,
        LINEAR_MIPMAP_LINEAR,
    }
}

declare module wd {
    enum ETextureWrapMode {
        REPEAT,
        MIRRORED_REPEAT,
        CLAMP_TO_EDGE,
    }
}

declare module wd {
    enum ETextureFormat {
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
    enum ETextureType {
        UNSIGNED_BYTE,
        UNSIGNED_SHORT_5_6_5,
        UNSIGNED_SHORT_4_4_4_4,
        UNSIGNED_SHORT_5_5_5_1,
    }
}

declare module wd {
    enum EEnvMapMode {
        BASIC = 0,
        REFLECTION = 1,
        REFRACTION = 2,
        FRESNEL = 3,
    }
}

declare module wd {
    enum ETextureCombineMode {
        MIX = 0,
        MULTIPLY = 1,
        ADD = 2,
    }
}

declare module wd {
    enum ETextureSourceRegionMapping {
        CANVAS = 0,
        UV = 1,
    }
}

declare module wd {
    enum ETextureSourceRegionMethod {
        CHANGE_TEXCOORDS_IN_GLSL = 0,
        DRAW_IN_CANVAS = 1,
    }
}

declare module wd {
    enum ETextureTarget {
        TEXTURE_2D,
        TEXTURE_CUBE_MAP,
    }
}

declare module wd {
    class LoaderManager {
        static getInstance(): any;
        private constructor();
        assetCount: number;
        currentLoadedCount: number;
        private _assetTable;
        load(url: string): wdFrp.Stream;
        load(assetArr: Array<AssetData>): wdFrp.Stream;
        load(assetArr: Array<AssetData>): wdFrp.Stream;
        reset(): void;
        dispose(): void;
        get(id: string): any;
        add(id: string, loader: Loader): void;
        private _createLoadMultiAssetStream(type, url, id, config);
        private _createLoadMultiAssetStream(type, url, id, config);
        private _createLoadSingleAssetStream(url, id, config);
        private _getLoader(type, url);
        private _getLoader(type, url);
        private _getConfig(config);
    }
    type AssetData = {
        id: string;
        url: Array<string>;
        type?: EAssetType;
        config?: AssetConfigData;
    };
    type AssetConfigData = {
        isCrossOrigin: boolean;
    };
}

declare module wd {
    class LoaderFactory {
        static create(type: EAssetType, extname: string): any;
        static createAllLoader(): wdCb.Collection<Loader>;
        private static _getLoaderByExtname(extname);
        private static _getLoader(className, extname?);
    }
}

declare module wd {
    enum EKeyFrameInterpolation {
        LINEAR,
        SWITCH,
    }
}

declare module wd {
    enum EKeyFrameAnimationTarget {
        TRANSLATION,
        ROTATION,
        SCALE,
        TEXTURE_OFFSET,
    }
}

declare module wd {
    type MorphTargetsData = wdCb.Collection<Array<number>>;
    type KeyFrameObjectAnimationData = {
        entity: IWDObjectDataAssembler;
        animationData: IWDKeyFrameAnimationAssembler;
    };
    type KeyFrameNodeAnimationData = {
        entity: IWDNodeParser;
        animationData: IWDKeyFrameAnimationAssembler;
    };
    type KeyFrameAnimationFrameData = {
        time: number;
        targets: wdCb.Collection<KeyFrameAnimationFrameTargetData>;
    };
    type KeyFrameAnimationFrameTargetData = {
        interpolationMethod: EKeyFrameInterpolation;
        target: EKeyFrameAnimationTarget;
        data: any;
        extra?: any;
    };
    type SkinSkeletonAnimationData = wdCb.Hash<wdCb.Hash<wdCb.Collection<KeyFrameAnimationFrameData>>>;
}

declare module wd {
    enum EWDTag {
        CONTAINER,
    }
}

declare module wd {
    enum EWDKeyFrameAnimationPath {
        TRANSLATION,
        ROTATION,
        SCALE,
    }
}

declare module wd {
    type AccessorId = string;
    type NodeId = string;
    type MeshId = string;
    type MaterialId = string;
    type BufferId = string;
    type SamplerId = string;
    type ImageId = string;
    type TextureId = string;
    type CameraId = string;
    type LightId = string;
    type AnimationParameterId = string;
    type AnimationSamplerId = string;
    type SkinId = string;
    type JointName = string;
    interface IWDJsonDataParser {
        asset: IWDAssetParser;
        scene: string;
        scenes: {
            [id: string]: IWDSceneParser;
        };
        nodes: {
            [id: string]: IWDNodeParser;
        };
        meshes: {
            [id: string]: IWDMeshParser;
        };
        accessors: {
            [id: string]: IWDAcccessorParser;
        };
        buffers: {
            [id: string]: IWDBufferParser;
        };
        bufferViews: {
            [id: string]: IWDBufferViewParser;
        };
        cameras?: {
            [id: string]: IWDCameraParser;
        };
        images?: {
            [id: string]: IWDImageParser;
        };
        textures?: {
            [id: string]: IWDTextureParser;
        };
        samplers: {
            [id: string]: IWDSamplerParser;
        };
        materials: {
            [id: string]: IWDMaterialParser;
        };
        animations: {
            [id: string]: IWDAnimationParser;
        };
        lights: {
            [id: string]: IWDLightParser;
        };
        skins: {
            [id: string]: IWDSkinParser;
        };
    }
    interface IWDChildRootPropertyParser {
        name?: string;
    }
    interface IWDSceneParser extends IWDChildRootPropertyParser {
        nodes: Array<NodeId>;
    }
    interface IWDNodeParser extends IWDChildRootPropertyParser {
        children: Array<string>;
        camera?: CameraId;
        skin?: SkinId;
        skeletons?: Array<NodeId>;
        jointName?: JointName;
        matrix?: Array<number>;
        mesh?: MeshId;
        rotation?: Array<number>;
        scale?: Array<number>;
        translation?: Array<number>;
        light?: LightId;
    }
    interface IWDMeshParser extends IWDChildRootPropertyParser {
        primitives: Array<IWDMeshPrimitiveParser>;
    }
    interface IWDMeshPrimitiveParser {
        name?: string;
        attributes: IWDAttributeParser;
        morphTargets?: Array<IWDMorphTargetParser>;
        indices?: AccessorId;
        material: MaterialId;
        mode: number;
    }
    interface IWDMorphTargetParser {
        name: string;
        vertices: AccessorId;
        normals?: AccessorId;
    }
    interface IWDAttributeParser {
        POSITION: AccessorId;
        NORMAL?: AccessorId;
        TEXCOORD?: AccessorId;
        COLOR?: AccessorId;
        JOINT?: AccessorId;
        WEIGH?: AccessorId;
    }
    interface IWDAcccessorParser extends IWDChildRootPropertyParser {
        bufferView: string;
        byteOffset: number;
        count: number;
        type: "SCALAR" | "VEC2" | "VEC3" | "VEC4" | "MAT2" | "MAT3" | "MAT4";
        componentType: number;
        max?: Array<number>;
        min?: Array<number>;
    }
    interface IWDBufferParser extends IWDChildRootPropertyParser {
        uri: string;
        byteLength: number;
        type: "arraybuffer" | "text";
    }
    interface IWDBufferViewParser extends IWDChildRootPropertyParser {
        buffer: BufferId;
        byteOffset: number;
        byteLength: number;
        target?: number;
    }
    interface IWDCameraParser extends IWDChildRootPropertyParser {
        type: "perspective" | "orthographic";
        perspective?: IWDCameraPerspectiveParser;
        orthographic?: IWDCameraOrthographicParser;
    }
    interface IWDCameraOrthographicParser {
        xmag: number;
        ymag: number;
        zfar: number;
        znear: number;
    }
    interface IWDCameraPerspectiveParser {
        aspectRatio?: number;
        yfov: number;
        zfar: number;
        znear: number;
    }
    interface IWDImageParser extends IWDChildRootPropertyParser {
        uri: string;
    }
    interface IWDTextureParser extends IWDChildRootPropertyParser {
        sampler: SamplerId;
        source: ImageId;
        format?: number;
        internalFormat?: number;
        target?: number;
        type?: number;
    }
    interface IWDSamplerParser extends IWDChildRootPropertyParser {
        magFilter?: number;
        minFilter?: number;
        wrapS?: number;
        wrapT?: number;
        isPremultipliedAlpha?: boolean;
        repeatRegion?: Array<number>;
    }
    interface IWDMaterialParser extends IWDChildRootPropertyParser {
        technique: "CONSTANT" | "BLINN" | "PHONG" | "LAMBERT";
        doubleSided?: boolean;
        transparent?: boolean;
        values?: IWDMaterialValueParser;
    }
    interface IWDMaterialValueParser {
        lightMap?: string;
        diffuse?: Array<number> | TextureId;
        specular?: Array<number> | TextureId;
        emission?: Array<number> | TextureId;
        shininess?: number;
        normalMap?: TextureId;
        transparency?: number;
    }
    interface IWDAnimationParser extends IWDChildRootPropertyParser {
        channels?: IWDAnimationChannelParser[];
        parameters?: {
            [id: string]: AccessorId;
        };
        samplers?: {
            [id: string]: IWDAnimationSamplerParser;
        };
    }
    interface IWDAnimationSamplerParser {
        input: AnimationParameterId;
        interpolation: "LINEAR";
        output: AnimationParameterId;
    }
    interface IWDAnimationChannelParser {
        sampler: AnimationSamplerId;
        target: IWDAnimationChannelTargetParser;
    }
    interface IWDAnimationChannelTargetParser {
        id: NodeId;
        path: "translation" | "rotation" | "scale";
    }
    interface IWDAssetParser {
        version: string;
        generator?: string;
        copyright?: string;
        premultipliedAlpha?: boolean;
        profile?: {
            api?: string;
            version?: string;
        };
    }
    interface IWDLightParser {
        type: "directional" | "point" | "spot" | "ambient";
        ambient?: {
            intensity?: number;
            color: Array<number>;
        };
        directional?: {
            intensity?: number;
            color: Array<number>;
        };
        point?: {
            intensity?: number;
            color: Array<number>;
            constantAttenuation?: number;
            linearAttenuation?: number;
            quadraticAttenuation?: number;
            range?: number;
        };
    }
    interface IWDSkinParser extends IWDChildRootPropertyParser {
        bindShapeMatrix?: Array<number>;
        inverseBindMatrices: AccessorId;
        jointNames: Array<JointName>;
    }
}

declare module wd {
    interface IWDParseDataAssembler {
        metadata: IWDMetadataAssembler;
        objects: wdCb.Collection<IWDObjectDataAssembler>;
    }
    interface IWDObjectDataAssembler {
        name?: string;
        id: string;
        isContainer: boolean;
        components: wdCb.Collection<IWDComponentAssembler>;
        children: wdCb.Collection<IWDObjectDataAssembler>;
    }
    interface IWDComponentAssembler {
    }
    interface IWDKeyFrameAnimationAssembler extends IWDComponentAssembler {
        [animName: string]: wdCb.Collection<IWDKeyFrameDataAssembler>;
    }
    interface IWDKeyFrameDataAssembler {
        time: number;
        targets: wdCb.Collection<IWDKeyFrameTargetDataAssembler>;
    }
    interface IWDKeyFrameTargetDataAssembler {
        interpolationMethod: EKeyFrameInterpolation;
        target: EKeyFrameAnimationTarget;
        data: any;
    }
    interface IWDSkinSkeletonAnimationAssembler extends IWDComponentAssembler {
        bindShapeMatrix: Matrix4 | null;
        inverseBindMatrices: Array<Matrix4>;
        jointNames: Array<string>;
        boneMatrixMap: wdCb.Hash<BoneMatrix>;
        jointTransformData: SkinSkeletonAnimationData;
    }
    interface IWDTransformAssembler extends IWDComponentAssembler {
        matrix?: Matrix4;
        position?: Vector3;
        scale?: Vector3;
        rotation?: Quaternion;
    }
    interface IWDCameraAssembler extends IWDComponentAssembler {
        camera: Camera;
    }
    interface IWDLightAssembler extends IWDComponentAssembler {
        type: string;
        color: Color;
        intensity?: number;
    }
    interface IWDAmbientLightAssembler extends IWDLightAssembler {
    }
    interface IWDDirectionLightAssembler extends IWDLightAssembler {
    }
    interface IWDPointLightAssembler extends IWDLightAssembler {
        range?: number;
        constantAttenuation: number;
        linearAttenuation: number;
        quadraticAttenuation: number;
    }
    interface IWDGeometryAssembler extends IWDComponentAssembler {
        material: IWDMaterialAssembler;
        vertices: Array<number>;
        colors?: Array<number>;
        jointIndices?: Array<number>;
        jointWeights?: Array<number>;
        texCoords?: Array<number>;
        faces: Array<Face3>;
        morphVertices: wdCb.Hash<MorphTargetsData>;
        morphNormals: wdCb.Hash<MorphTargetsData>;
        drawMode: EDrawMode;
    }
    interface IWDMaterialAssembler {
        type: string;
        doubleSided?: boolean;
    }
    interface IWDLightMaterialAssembler extends IWDMaterialAssembler {
        transparent?: boolean;
        opacity?: number;
        lightModel: ELightModel;
        diffuseColor?: Color;
        specularColor?: Color;
        emissionColor?: Color;
        lightMap?: ImageTexture;
        diffuseMap?: ImageTexture;
        specularMap?: ImageTexture;
        emissionMap?: ImageTexture;
        normalMap?: ImageTexture;
        shininess?: number;
    }
    interface IWDMetadataAssembler {
        version: string;
        generator?: string;
        copyright?: string;
        premultipliedAlpha?: boolean;
        profile?: {
            api?: string;
            version?: string;
        };
    }
}

declare module wd {
    class WDLoader extends Loader {
        static getInstance(): any;
        private constructor();
        private _arrayBufferMap;
        private _imageMap;
        protected loadAsset(url: string, id: string, config: AssetConfigData): wdFrp.Stream;
        protected loadAsset(url: Array<string>, id: string, config: AssetConfigData): wdFrp.Stream;
        private _createLoadAllAssetsStream(url, config, json);
        private _createLoadBuffersStream(filePath, json);
        private _createLoadImageAssetStream(filePath, config, json);
        private _createLoadAssetStream(filePath, json, datas, addBase64AssetFunc, loadStreamFunc);
    }
}

declare module wd {
    class WDParser {
        static create(): WDParser;
        private _data;
        private _arrayBufferMap;
        private _imageMap;
        private _json;
        private _geometryParser;
        private _keyFrameAnimationParser;
        private _skinSkeletonAnimationAnimationParser;
        private _articulatedAnimationParser;
        private _transformParser;
        private _skinSkeletonAnimationParser;
        private _cameraParser;
        private _lightParser;
        private _skinSkeletonAnimationMap;
        parse(json: IWDJsonDataParser, arrayBufferMap: wdCb.Hash<ArrayBuffer>, imageMap: wdCb.Hash<HTMLImageElement>): IWDParseDataAssembler;
        private _parseMetadata();
        private _parseObjects();
        private _isJointNode(json, node);
    }
}

declare module wd {
    abstract class WDComponentParser {
        abstract parse(...args: any[]): any;
    }
}

declare module wd {
    class WDGeometryParser extends WDComponentParser {
        static create(): WDGeometryParser;
        private _isGeneratedFromGLTF;
        private _arrayBufferMap;
        private _imageMap;
        private _json;
        private _materialParser;
        parse(json: IWDJsonDataParser, object: IWDObjectDataAssembler, mesh: IWDMeshParser, arrayBufferMap: wdCb.Hash<ArrayBuffer>, imageMap: wdCb.Hash<HTMLImageElement>): void;
        private _setChildObjectNameWithMultiPrimitives(object, primitive);
        private _parseGeometry(primitive);
        private _addAttributeData(geometryData, bufferReader, count);
        private _addWeightAttributeData(geometryData, bufferReader, count);
        private _getFaces(json, indices, normals);
        private _addNormalData(targetNormals, sourceNormals, normalIndiceArr);
        private _getThreeComponentData(sourceData, index);
        private _parseDrawMode(mode);
        private _normalizeTexCoords(texCoords);
    }
}

declare module wd {
    class WDTransformParser extends WDComponentParser {
        static create(): WDTransformParser;
        parse(matrix: Array<number>): any;
        parse(translation: Array<number>, rotation: Array<number>, scale: Array<number>): any;
    }
}

declare module wd {
    class WDCameraParser extends WDComponentParser {
        static create(): WDCameraParser;
        parse(json: IWDJsonDataParser, cameraId: string): IWDCameraAssembler;
        private _parseCameraDataByType(camera, cameraData);
    }
}

declare module wd {
    class WDLightParser extends WDComponentParser {
        static create(): WDLightParser;
        parse(json: IWDJsonDataParser, lightId: string): IWDLightAssembler;
        private _parseLightDataByType(light, lightData, type);
    }
}

declare module wd {
    class WDMaterialParser {
        static create(): WDMaterialParser;
        private _imageMap;
        private _json;
        private _glTextureMap;
        private _textureParser;
        parse(json: IWDJsonDataParser, materialId: string, imageMap: wdCb.Hash<HTMLImageElement>): IWDMaterialAssembler;
        private _getDefaultMaterialData();
        private _getMaterialType(technique);
        private _getLightModel(technique);
        private _addMaterialValues(material, values);
        private _addMaterialLightColor(material, colorName, colorData, mapName?);
        private _addMaterialLightMap(material, mapName, mapId);
    }
}

declare module wd {
    class WDTextureParser {
        static create(): WDTextureParser;
        imageMap: wdCb.Hash<HTMLImageElement>;
        json: IWDJsonDataParser;
        glTextureMap: wdCb.Hash<WebGLTexture>;
        getTexture(textureDataId: string): Texture;
        private _getGLTexture(asset, sourceId);
        private _buildGLTextureMapKey(asset, sourceId);
        private _createTextureAsset(target, imageId);
        private _getTextureType(type);
        private _getTextureFormat(format);
        private _addTextureSampler(asset, samplerId);
        private _getTextureRepeatRegion(repeatRegion);
        private _getTextureFilter(filter);
        private _getTextureWrap(wrap);
    }
}

declare module wd {
    class WDSkinSkeletonParser {
        static create(): WDSkinSkeletonParser;
        private _json;
        private _arrayBufferMap;
        parse(json: IWDJsonDataParser, skinId: string, skeletonsIdArr: Array<string>, objectName: string, arrayBufferMap: wdCb.Hash<any>): IWDSkinSkeletonAnimationAssembler;
        private _isIdentiyMatrixValues(bindShapeMatrix);
        private _getInverseBindMatrices(inverseBindMatricesAccessorId);
        private _getBoneMatrixMap(rootSkeletonId);
        private _findRootNodeIdContainRootSkeleton(rootSkeletonId);
        private _composeBoneMatrix(node);
    }
}

declare module wd {
    class WDKeyFrameAnimationParser extends WDComponentParser {
        static create(): WDKeyFrameAnimationParser;
        private _arrayBufferMap;
        private _json;
        parse(json: IWDJsonDataParser, objects: wdCb.Collection<IWDObjectDataAssembler>, arrayBufferMap: wdCb.Hash<any>): {
            nodeWithAnimationMap: wdCb.Hash<{
                entity: IWDNodeParser;
                animationData: IWDKeyFrameAnimationAssembler;
            }>;
            objectWithAnimationMap: wdCb.Hash<{
                entity: IWDObjectDataAssembler;
                animationData: IWDKeyFrameAnimationAssembler;
            }>;
        };
        private _getChannelBufferReaderArr(animation, channelList);
        private _getAnimName(animation, animId);
        private _getInputData(animation, channelList);
        private _addAnimationToNode(entityWithAnimationMap, targetId, targetEntity, animName, keyFrameDataList);
        private _getKeyFrameDataTargets(animation, channelList, channelBufferReaderArr);
        private _findNode(nodes, targetId);
        private _findObject(objects, targetId);
        private _convertSecondToMillisecond(time);
        private _convertTointerpolationMethod(jsonInterpolation);
    }
}

declare module wd {
    class WDSkinSkeletonAnimationParser extends WDComponentParser {
        static create(): WDSkinSkeletonAnimationParser;
        parse(json: IWDJsonDataParser, nodeWithAnimationMap: wdCb.Hash<KeyFrameNodeAnimationData>, jointNames: Array<string>): wdCb.Hash<wdCb.Hash<wdCb.Collection<KeyFrameAnimationFrameData>>>;
    }
}

declare module wd {
    class WDArticulatedAnimationParser extends WDComponentParser {
        static create(): WDArticulatedAnimationParser;
        parse(objectWithAnimationMap: wdCb.Hash<KeyFrameObjectAnimationData>): void;
        private _addAnimationComponent(objectWithAnimationMap);
    }
}

declare module wd {
    class WDUtils {
        static addData(target: Object, sourceName: string, sourceData: any): void;
        static isBase64(uri: string): boolean;
        static decodeArrayBuffer(base64Str: string): any;
        static createObjectData(): {
            id: any;
            isContainer: boolean;
            components: wdCb.Collection<IWDComponentAssembler>;
            children: wdCb.Collection<IWDObjectDataAssembler>;
        };
        static getColor(value: Array<number>): Color;
        static getBufferReaderFromAccessor(json: IWDJsonDataParser, accessor: IWDAcccessorParser, arrayBufferMap: wdCb.Hash<any>): {
            bufferReader: BufferReader;
            count: number;
        };
        static getAccessorTypeSize(accessor: IWDAcccessorParser): number;
        static isIWDKeyFrameAnimationAssembler(component: IWDComponentAssembler): boolean;
    }
}

declare module wd {
    class WDMorphDataParseUtils {
        static parseMorphData(json: IWDJsonDataParser, sourceMorphTargets: Array<IWDMorphTargetParser>, arrayBufferMap: wdCb.Hash<ArrayBuffer>): {
            morphVertices: wdCb.Hash<wdCb.Collection<number[]>>;
            morphNormals: wdCb.Hash<wdCb.Collection<number[]>>;
        };
        private static _getMorphDatas(json, frameDataAccessorId, arrayBufferMap);
        private static _getAnimName(frameName);
    }
}

declare module wd {
    class WDAssembler {
        static create(): WDAssembler;
        private _result;
        private _geometryAssembler;
        private _transformAssembler;
        private _lightAssembler;
        build(parseData: IWDParseDataAssembler): wdCb.Hash<any>;
        private _buildMetadata(parseData);
        private _buildModels(parseData);
        private _isModelContainer(object);
        private _addComponentsFromwd(model, components);
        private _isTransform(component);
        private _isCamera(component);
        private _isLight(component);
        private _isGeometry(component);
        private _isKeyFrameAnimation(component);
        private _isSkinSkeleton(component);
        private _createCamera(component);
        private _createKeyFrameAnimation(component, TransformArticulatedAnimation);
        private _createSkinSkeletonAnimation(component, SkinSkeletonAnimation);
    }
}

declare module wd {
    abstract class WDComponentAssembler {
        abstract createComponent(component: IWDComponentAssembler): Component;
    }
}

declare module wd {
    class WDGeometryAssembler extends WDComponentAssembler {
        static create(): WDGeometryAssembler;
        createComponent(component: IWDGeometryAssembler): ModelGeometry;
        private _createMaterial(materialData);
        private _createLightMaterial(materialData);
        private _createStandardLightMaterial<T>(material, materialData);
        private _setBasicDataOfMaterial(material, materialData);
    }
}

declare module wd {
    class WDTransformAssembler extends WDComponentAssembler {
        static create(): WDTransformAssembler;
        createComponent(component: IWDTransformAssembler): ThreeDTransform;
    }
}

declare module wd {
    class WDLightAssembler extends WDComponentAssembler {
        static create(): WDLightAssembler;
        createComponent(component: IWDLightAssembler): any;
    }
}

declare module wd {
    class FontLoader extends Loader {
        static getInstance(): any;
        private constructor();
        private _familyName;
        dispose(): void;
        protected loadAsset(url: string, id: string, config: AssetConfigData): wdFrp.Stream;
        protected loadAsset(url: Array<string>, id: string, config: AssetConfigData): wdFrp.Stream;
        private _getType(url);
        private _addStyleElement(args, familyName);
    }
}

declare module wd {
    class FntParser {
        static create(): FntParser;
        parseFnt(fntStr: string, url: string): FntData;
        private _parseStrToObj(str);
        private _parseChar(fntStr, fnt);
        private _parseKerning(fntStr, fnt);
    }
}

declare module wd {
    class FntLoader extends Loader {
        static getInstance(): any;
        private constructor();
        private _parser;
        protected loadAsset(url: string, id: string, config: AssetConfigData): wdFrp.Stream;
        protected loadAsset(url: Array<string>, id: string, config: AssetConfigData): wdFrp.Stream;
    }
    type FntData = {
        commonHeight: number;
        commonBase: number;
        scaleW: number;
        scaleH: number;
        atlasName: string;
        fontDefDictionary: {
            [charId: string]: FntCharData;
        };
        kerningArray: Array<{
            first: string;
            second: string;
            amount: number;
        }>;
        isMultiPages: boolean;
    };
    type FntCharData = {
        id: string;
        rect: {
            x: number;
            y: number;
            width: number;
            height: number;
        };
        xOffset: number;
        yOffset: number;
        xAdvance: number;
        page: number;
    };
}

declare module wd {
    class DeviceManager {
        static getInstance(): any;
        private constructor();
        private _scissorTest;
        scissorTest: boolean;
        setScissor(x: number, y: number, width: number, height: number): void;
        setViewport(x: number, y: number, width: number, height: number): void;
        getViewport(): RectRegion;
        private _depthTest;
        depthTest: boolean;
        private _depthFunc;
        depthFunc: EDepthFunction;
        private _side;
        side: ESide;
        polygonOffset: Vector2;
        private _polygonOffsetMode;
        polygonOffsetMode: EPolygonOffsetMode;
        private _depthWrite;
        depthWrite: boolean;
        private _blend;
        blend: boolean;
        private _alphaToCoverage;
        alphaToCoverage: boolean;
        view: IView;
        gl: WebGLRenderingContext;
        contextConfig: ContextConfigData;
        private _writeRed;
        private _writeGreen;
        private _writeBlue;
        private _writeAlpha;
        private _blendSrc;
        private _blendDst;
        private _blendEquation;
        private _blendFuncSeparate;
        private _blendEquationSeparate;
        private _scissorRegion;
        private _viewport;
        private _clearColor;
        private _pixelRatio;
        setBlendFunc(blendSrc: EBlendFunc, blendDst: EBlendFunc): void;
        setBlendEquation(blendEquation: EBlendEquation): void;
        setBlendFuncSeparate(blendFuncSeparate: Array<EBlendFunc>): void;
        setBlendEquationSeparate(blendEquationSeparate: Array<EBlendEquation>): void;
        setColorWrite(writeRed: any, writeGreen: any, writeBlue: any, writeAlpha: any): void;
        clear(options: any): void;
        createGL(canvasId: string, contextConfig: ContextConfigData, useDevicePixelRatio: boolean): void;
        setScreen(): void;
        setHardwareScaling(level: number): void;
        setPixelRatio(pixelRatio: number): void;
        getPixelRatio(): number;
        private _setClearColor(color);
        private _getCanvasId(canvasId);
    }
    enum EDepthFunction {
        NEVER,
        ALWAYS,
        LESS,
        LEQUAL,
        EQUAL,
        GEQUAL,
        GREATER,
        NOTEQUAL,
    }
    enum ESide {
        NONE = 0,
        BOTH = 1,
        BACK = 2,
        FRONT = 3,
    }
    enum EPolygonOffsetMode {
        NONE = 0,
        IN = 1,
        OUT = 2,
        CUSTOM = 3,
    }
    enum EBlendFunc {
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
    enum EBlendEquation {
        ADD,
        SUBTRACT,
        REVERSE_SUBTRAC,
    }
    enum EBlendType {
        NONE = 0,
        NORMAL = 1,
        ADDITIVE = 2,
        ADDITIVEALPHA = 3,
        MULTIPLICATIVE = 4,
        PREMULTIPLIED = 5,
    }
    enum ECanvasType {
        TwoDUI,
    }
    type CanvasMapData = {
        canvas: HTMLCanvasElement;
        context: CanvasRenderingContext2D;
    };
}

declare module wd {
    class GPUDetector {
        static getInstance(): any;
        private constructor();
        readonly gl: any;
        maxTextureUnit: number;
        maxTextureSize: number;
        maxCubemapTextureSize: number;
        maxAnisotropy: number;
        maxBoneCount: number;
        extensionCompressedTextureS3TC: any;
        extensionTextureFilterAnisotropic: any;
        extensionInstancedArrays: any;
        extensionUintIndices: boolean;
        extensionDepthTexture: boolean;
        extensionVAO: any;
        extensionStandardDerivatives: boolean;
        precision: number;
        private _isDetected;
        detect(): void;
        private _detectExtension();
        private _detectCapabilty();
        private _getExtension(name);
        private _getMaxBoneCount();
        private _getMaxAnisotropy();
        private _detectPrecision();
    }
    enum EGPUPrecision {
        HIGHP = 0,
        MEDIUMP = 1,
        LOWP = 2,
    }
}

declare module wd {
    enum EScreenSize {
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
        private _faceNormal;
        faceNormal: Vector3;
        aIndex: number;
        bIndex: number;
        cIndex: number;
        vertexNormals: wdCb.Collection<Vector3>;
        clone(): this;
        hasFaceNormal(): boolean;
        hasVertexNormal(): boolean;
    }
}

declare module wd {
    class RectRegion extends Vector4 {
        width: number;
        height: number;
        clone(): RectRegion;
        isNotEmpty(): boolean;
    }
}

declare module wd {
    class ViewWebGL implements IView {
        static create(view: any): ViewWebGL;
        constructor(dom: any);
        readonly offset: {
            x: any;
            y: any;
        };
        private _dom;
        readonly dom: any;
        width: number;
        height: number;
        styleWidth: string;
        styleHeight: string;
        x: number;
        y: number;
        initCanvas(): void;
        getContext(contextConfig: ContextConfigData): WebGLRenderingContext;
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
        styleWidth: string;
        styleHeight: string;
        dom: any;
        getContext(contextConfig: ContextConfigData): WebGLRenderingContext;
        initCanvas(): void;
    }
}

declare module wd {
    class Color {
        static create(colorVal?: string): Color;
        dirty: boolean;
        private _r;
        r: number;
        private _g;
        g: number;
        private _b;
        b: number;
        private _a;
        a: number;
        private _colorString;
        private _colorVec3Cache;
        private _colorVec4Cache;
        initWhenCreate(colorVal?: string): void;
        toVector3(): Vector3;
        toVector4(): any;
        toString(): string;
        clone(): Color;
        isEqual(color: Color): boolean;
        private _setColor(colorVal);
        private _getColorValue(color, index, num?);
        private _setHex(hex);
        private _clearCache();
    }
}

declare module wd {
    abstract class Texture extends Entity {
        readonly geometry: Geometry;
        name: string;
        material: Material;
        width: number;
        height: number;
        variableData: MapVariableData;
        wrapS: ETextureWrapMode;
        wrapT: ETextureWrapMode;
        magFilter: ETextureFilterMode;
        minFilter: ETextureFilterMode;
        glTexture: WebGLTexture;
        needUpdate: boolean;
        protected target: ETextureTarget;
        abstract init(): void;
        abstract getSamplerName(unit: number): string;
        abstract update(): void;
        clone(): this;
        bindToUnit(unit: number): this;
        sendData(program: Program, name: string, unit: number): void;
        dispose(): void;
        filterFallback(filter: ETextureFilterMode): ETextureFilterMode;
        protected getSamplerNameByVariableData(unit: number, type?: EVariableType): string;
        protected getSamplerType(): EVariableType;
        protected isSourcePowerOfTwo(): boolean;
        protected setTextureParameters(textureType: any, isSourcePowerOfTwo: any): void;
        private _unBindAllUnit();
    }
}

declare module wd {
    class TextureUtils {
        static isPowerOfTwo(width: number, height: number): boolean;
    }
}

declare module wd {
    class BasicTextureUtils extends TextureUtils {
        static isDrawPartOfTexture(sourceRegion: RectRegion, sourceRegionMethod: ETextureSourceRegionMethod): boolean;
        static drawPartOfTextureByCanvas(source: HTMLImageElement, canvasWidth: number, canvasHeight: number, sx: number, sy: number, sWidth: number, sHeight: number, dx: number, wd: number, dWidth: number, dHeight: number): any;
        static isSourcePowerOfTwo(sourceRegion: any, sourceRegionMethod: any, width: any, height: any): boolean;
        static needClampMaxSize(maxSize: number, width: number, height: number): boolean;
        static clampToMaxSize(source: any, maxSize: number): any;
    }
}

declare module wd {
    abstract class RenderTargetTexture extends Texture {
        private _renderRate;
        renderRate: number;
        abstract createEmptyTexture(): any;
        initWhenCreate(): void;
        init(): void;
        update(): void;
        getPosition(): Vector3;
        protected setEmptyTexture(texture: any): void;
    }
}

declare module wd {
    abstract class TwoDRenderTargetTexture extends RenderTargetTexture {
        private _renderList;
        renderList: any;
        initWhenCreate(): void;
        createEmptyTexture(): void;
        protected texImageEmpty(): void;
    }
}

declare module wd {
    class ShadowMapTextureUtils {
        static setTextureParameters(textureType: any): void;
    }
}

declare module wd {
    interface IShadowMapTexture {
        dispose(): void;
    }
}

declare module wd {
    abstract class ProceduralTexture extends TwoDRenderTargetTexture {
        readonly sourceRegionForGLSL: any;
        repeatRegion: RectRegion;
        initWhenCreate(): void;
        getSamplerName(unit: number): string;
    }
}

declare module wd {
    class CustomProceduralTexture extends ProceduralTexture {
        static create(): CustomProceduralTexture;
        mapManager: MapManager;
        uniformMap: wdCb.Hash<ShaderData>;
        fsSource: string;
        init(): this;
        read(shaderConfigId: string): void;
    }
    type CustomProceduralTextureShaderDefinitionData = {
        uniforms: wdCb.Hash<ShaderData>;
        fsSourceId: string;
        renderRate: number;
    };
}

declare module wd {
    abstract class LightEffectTexture extends TwoDRenderTargetTexture {
        private _plane;
        getSamplerName(unit: number): string;
        getPlane(): Plane;
    }
}

declare module wd {
    class MirrorTexture extends LightEffectTexture {
        static create(): MirrorTexture;
        init(): this;
    }
}

declare module wd {
    class RefractionTexture extends LightEffectTexture {
        static create(): RefractionTexture;
        init(): this;
    }
}

declare module wd {
    class TwoDShadowMapTexture extends TwoDRenderTargetTexture implements IShadowMapTexture {
        static create(): TwoDShadowMapTexture;
        getSamplerName(unit: number): string;
        protected setTextureParameters(textureType: any, isSourcePowerOfTwo: any): void;
        protected texImageEmpty(): void;
    }
}

declare module wd {
    abstract class CubemapRenderTargetTexture extends RenderTargetTexture {
        protected target: ETextureTarget;
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
        mode: EEnvMapMode;
        init(): this;
        getSamplerName(unit: number): string;
    }
}

declare module wd {
    abstract class BasicTexture extends Texture implements ITextureAsset {
        protected p_sourceRegionMethod: ETextureSourceRegionMethod;
        sourceRegionMethod: ETextureSourceRegionMethod;
        private _sourceRegion;
        sourceRegion: RectRegion;
        readonly sourceRegionForGLSL: any;
        generateMipmaps: boolean;
        format: ETextureFormat;
        source: any;
        repeatRegion: RectRegion;
        sourceRegionMapping: ETextureSourceRegionMapping;
        packAlignment: number;
        unpackAlignment: number;
        flipY: boolean;
        premultiplyAlpha: boolean;
        isPremultipliedAlpha: boolean;
        colorspaceConversion: any;
        type: ETextureType;
        mipmaps: wdCb.Collection<any>;
        anisotropy: number;
        private _sourceRegionDirty;
        private _sourceRegionForGLSLCache;
        initWhenCreate(...args: any[]): void;
        init(): void;
        dispose(): void;
        update(): this;
        getSamplerName(unit: number): string;
        protected abstract allocateSourceToTexture(isSourcePowerOfTwo: boolean): any;
        protected needClampMaxSize(): boolean;
        protected clampToMaxSize(): void;
        protected setTextureParameters(textureType: any, isSourcePowerOfTwo: any): void;
        protected isSourcePowerOfTwo(): boolean;
        private _setAnisotropy(textureType);
        private _convertSourceRegionToUV(sourceRegion);
    }
}

declare module wd {
    abstract class TwoDTexture extends BasicTexture {
        constructor(asset: TextureAsset);
        protected asset: TextureAsset;
        clone(): this;
        initWhenCreate(): void;
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
        constructor(asset: ImageTextureAsset);
        constructor(canvas: HTMLCanvasElement);
    }
}

declare module wd {
    class VideoTexture extends CommonTexture {
        static create(asset: VideoTextureAsset): VideoTexture;
        protected asset: VideoTextureAsset;
        private _video;
        private _startLoopSubscription;
        initWhenCreate(): void;
        init(): this;
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
        mode: EEnvMapMode;
        protected target: ETextureTarget;
        private _areAllCompressedAsset;
        clone(): this;
        initWhenCreate(assets: Array<CubemapData>): void;
        getSamplerName(unit: number): string;
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
        type?: ETextureType;
    };
}

declare module wd {
    abstract class CubemapFaceTexture {
        type: ETextureType;
        format: ETextureFormat;
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
        sourceRegionMethod: ETextureSourceRegionMethod;
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
        minFilter: ETextureFilterMode;
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
        sourceRegionMethod: ETextureSourceRegionMethod;
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
        format: ETextureFormat;
        type: ETextureType;
        sourceRegion: RectRegion;
        sourceRegionMethod: ETextureSourceRegionMethod;
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
        static create(config: VideoConfig): Video;
        constructor(config: VideoConfig);
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
    type VideoConfig = {
        urlArr: Array<string>;
        onLoad: (video: Video) => void;
        onError: (err: string) => void;
    };
}

declare module wd {
    class VideoManager {
        static getInstance(): any;
        private constructor();
        play(id: string): void;
    }
}

declare module wd {
    enum EAudioType {
        NONE = 0,
        WEBAUDIO = 1,
        HTML5AUDIO = 2,
    }
}

declare module wd {
    enum ESoundPlayState {
        NONE = 0,
        PLAYING = 1,
        END = 2,
    }
}

declare module wd {
    class SoundUtils {
        static getMimeStr(mimeType: string): string;
    }
}

declare module wd {
    class Sound {
        static ctx: any;
        private static _audioType;
        static create(config: SoundConfig): Sound;
        static audioDetect(): void;
        private static _html5AudioDetect();
        constructor(config: SoundConfig);
        audioObj: any;
        private _config;
        initWhenCreate(): void;
        play(): void;
        canPlay(): any;
        getPlayState(): any;
    }
    type SoundConfig = {
        urlArr: Array<string>;
        onLoad: (sound: Sound) => void;
        onError: (err: string) => void;
    };
}

declare module wd {
    abstract class BaseAudio {
        protected urlArr: Array<string>;
        protected url: string;
        abstract play(): void;
        abstract load(): wdFrp.Stream;
        abstract getPlayState(): ESoundPlayState;
        initWhenCreate(): void;
        canPlay(): boolean;
        private _getCanPlayUrl();
        private _canPlay(mimeType);
    }
}

declare module wd {
    class WebAudio extends BaseAudio {
        static create(config: SoundConfig): WebAudio;
        constructor(config: SoundConfig);
        private _buffer;
        private _onLoad;
        private _onError;
        private _config;
        private _playState;
        initWhenCreate(): void;
        load(): wdFrp.Stream;
        play(): void;
        getPlayState(): ESoundPlayState;
        private _loadBuffer(url);
        private _decodeAudioData(arraybuffer);
    }
}

declare module wd {
    class Html5Audio extends BaseAudio {
        static create(config: SoundConfig): Html5Audio;
        constructor(config: SoundConfig);
        private _audio;
        private _onLoad;
        private _onError;
        load(): wdFrp.AnonymousStream;
        play(): void;
        getPlayState(): ESoundPlayState;
        private _load();
    }
}

declare module wd {
    class SoundManager {
        static getInstance(): any;
        private constructor();
        play(id: string): void;
        private _playOnlyOneSimultaneously(audioObject);
    }
}

declare var global: any, window: Window;
declare module wd {
    var root: any, RSVP: any, expect: any;
}

declare module wd {
    enum EShadowMapSoftType {
        NONE = 0,
        PCF = 1,
    }
}

declare module wd {
    class GlobalTempMathClass {
        static Vector3_1: Vector3;
        static Vector3_Scale_1: Vector3;
        static Quaternion_1: Quaternion;
    }
}

declare module wd {
    class FireProceduralShaderLib extends ProceduralShaderLib {
        static create(proceduralTexture: FireProceduralTexture): FireProceduralShaderLib;
        constructor(proceduralTexture: FireProceduralTexture);
        type: string;
        private _proceduralTexture;
        sendShaderVariables(program: Program, cmd: ProceduralCommand): void;
        setShaderDefinition(cmd: ProceduralCommand): void;
    }
}

declare module wd {
    class FireProceduralRenderTargetRenderer extends ProceduralRenderTargetRenderer {
        static create(texture: FireProceduralTexture): FireProceduralRenderTargetRenderer;
        texture: FireProceduralTexture;
        protected createShader(): CommonProceduralShader;
    }
}

declare module wd {
    class FireProceduralTexture extends ProceduralTexture {
        static create(): FireProceduralTexture;
        private _fireColorMap;
        fireColorMap: wdCb.Hash<Color>;
        fireColorType: EFireProceduralTextureColorType;
        speed: Vector2;
        alphaThreshold: number;
        shift: number;
        time: number;
        initWhenCreate(): void;
        init(): this;
        computeTime(): void;
    }
    enum EFireProceduralTextureColorType {
        CUSTOM = 0,
        RED = 1,
        PURPLE = 2,
        GREEN = 3,
        BLUE = 4,
    }
}

declare module wd {
    class MarbleProceduralRenderTargetRenderer extends ProceduralRenderTargetRenderer {
        static create(texture: MarbleProceduralTexture): MarbleProceduralRenderTargetRenderer;
        texture: MarbleProceduralTexture;
        protected createShader(): CommonProceduralShader;
    }
}

declare module wd {
    class MarbleProceduralTexture extends ProceduralTexture {
        static create(): MarbleProceduralTexture;
        tilesHeightNumber: number;
        tilesWidthNumber: number;
        amplitude: number;
        jointColor: Color;
        init(): this;
    }
}

declare module wd {
    class MarbleProceduralShaderLib extends ProceduralShaderLib {
        static create(proceduralTexture: MarbleProceduralTexture): MarbleProceduralShaderLib;
        constructor(proceduralTexture: MarbleProceduralTexture);
        type: string;
        private _proceduralTexture;
        sendShaderVariables(program: Program, cmd: ProceduralCommand): void;
        setShaderDefinition(cmd: ProceduralCommand): void;
    }
}

declare module wd {
    class GrassProceduralRenderTargetRenderer extends ProceduralRenderTargetRenderer {
        static create(texture: GrassProceduralTexture): GrassProceduralRenderTargetRenderer;
        texture: GrassProceduralTexture;
        protected createShader(): CommonProceduralShader;
    }
}

declare module wd {
    class GrassProceduralTexture extends ProceduralTexture {
        static create(): GrassProceduralTexture;
        herb1Color: Color;
        herb2Color: Color;
        herb3Color: Color;
        groundColor: Color;
        init(): this;
    }
}

declare module wd {
    class GrassProceduralShaderLib extends ProceduralShaderLib {
        static create(proceduralTexture: GrassProceduralTexture): GrassProceduralShaderLib;
        constructor(proceduralTexture: GrassProceduralTexture);
        type: string;
        private _proceduralTexture;
        sendShaderVariables(program: Program, cmd: ProceduralCommand): void;
        setShaderDefinition(cmd: ProceduralCommand): void;
    }
}

declare module wd {
    class WoodProceduralRenderTargetRenderer extends ProceduralRenderTargetRenderer {
        static create(texture: WoodProceduralTexture): WoodProceduralRenderTargetRenderer;
        texture: WoodProceduralTexture;
        protected createShader(): CommonProceduralShader;
    }
}

declare module wd {
    class WoodProceduralTexture extends ProceduralTexture {
        static create(): WoodProceduralTexture;
        ampScale: number;
        woodColor: Color;
        init(): this;
    }
}

declare module wd {
    class WoodProceduralShaderLib extends ProceduralShaderLib {
        static create(proceduralTexture: WoodProceduralTexture): WoodProceduralShaderLib;
        constructor(proceduralTexture: WoodProceduralTexture);
        type: string;
        private _proceduralTexture;
        sendShaderVariables(program: Program, cmd: ProceduralCommand): void;
        setShaderDefinition(cmd: ProceduralCommand): void;
    }
}

declare module wd {
    class RoadProceduralRenderTargetRenderer extends ProceduralRenderTargetRenderer {
        static create(texture: RoadProceduralTexture): RoadProceduralRenderTargetRenderer;
        texture: RoadProceduralTexture;
        protected createShader(): CommonProceduralShader;
    }
}

declare module wd {
    class RoadProceduralTexture extends ProceduralTexture {
        static create(): RoadProceduralTexture;
        roadColor: Color;
        init(): this;
    }
}

declare module wd {
    class RoadProceduralShaderLib extends ProceduralShaderLib {
        static create(proceduralTexture: RoadProceduralTexture): RoadProceduralShaderLib;
        constructor(proceduralTexture: RoadProceduralTexture);
        type: string;
        private _proceduralTexture;
        sendShaderVariables(program: Program, cmd: ProceduralCommand): void;
        setShaderDefinition(cmd: ProceduralCommand): void;
    }
}

declare module wd {
    class CloudProceduralRenderTargetRenderer extends ProceduralRenderTargetRenderer {
        static create(texture: CloudProceduralTexture): CloudProceduralRenderTargetRenderer;
        texture: CloudProceduralTexture;
        protected createShader(): CommonProceduralShader;
    }
}

declare module wd {
    class CloudProceduralTexture extends ProceduralTexture {
        static create(): CloudProceduralTexture;
        skyColor: Color;
        cloudColor: Color;
        init(): this;
    }
}

declare module wd {
    class CloudProceduralShaderLib extends ProceduralShaderLib {
        static create(proceduralTexture: CloudProceduralTexture): CloudProceduralShaderLib;
        constructor(proceduralTexture: CloudProceduralTexture);
        type: string;
        private _proceduralTexture;
        sendShaderVariables(program: Program, cmd: ProceduralCommand): void;
        setShaderDefinition(cmd: ProceduralCommand): void;
    }
}

declare module wd {
    class BrickProceduralRenderTargetRenderer extends ProceduralRenderTargetRenderer {
        static create(texture: BrickProceduralTexture): BrickProceduralRenderTargetRenderer;
        texture: BrickProceduralTexture;
        protected createShader(): CommonProceduralShader;
    }
}

declare module wd {
    class BrickProceduralTexture extends ProceduralTexture {
        static create(): BrickProceduralTexture;
        tilesHeightNumber: number;
        tilesWidthNumber: number;
        brickColor: Color;
        jointColor: Color;
        init(): this;
    }
}

declare module wd {
    class BrickProceduralShaderLib extends ProceduralShaderLib {
        static create(proceduralTexture: BrickProceduralTexture): BrickProceduralShaderLib;
        constructor(proceduralTexture: BrickProceduralTexture);
        type: string;
        private _proceduralTexture;
        sendShaderVariables(program: Program, cmd: ProceduralCommand): void;
        setShaderDefinition(cmd: ProceduralCommand): void;
    }
}

declare module wd {
    class MirrorMaterial extends StandardLightMaterial {
        static create(): MirrorMaterial;
        private _reflectionMap;
        reflectionMap: Texture;
        getTextureForRenderSort(): Texture;
        protected addExtendShaderLib(): void;
    }
}

declare module wd {
    class MirrorShaderLib extends EngineShaderLib {
        static create(): MirrorShaderLib;
        type: string;
        sendShaderVariables(program: Program, cmd: QuadCommand, material: Material): void;
        setShaderDefinition(cmd: QuadCommand, material: MirrorMaterial): void;
    }
}

declare module wd {
    class TerrainMaterial extends StandardLightMaterial {
        static create(): TerrainMaterial;
        layer: TerrainLayer;
        mix: TerrainMix;
        init(): void;
        getTextureForRenderSort(): Texture;
        protected addExtendShaderLib(): void;
        protected addTopExtendShaderLib(): void;
        protected addNormalRelatedShaderLib(): void;
    }
}

declare module wd {
    class TerrainLayer {
        static create(): TerrainLayer;
        private _mapData;
        mapData: Array<TerrainLayerData>;
        readonly mapArray: (ProceduralTexture | ImageTexture)[];
        addMap(mapManager: MapManager): void;
        hasData(): boolean;
        getMapCount(): number;
        getTextureForRenderSort(): ProceduralTexture | ImageTexture;
        clone(layer: this): this;
    }
    type TerrainLayerData = {
        minHeight: number;
        maxHeight: number;
        diffuseMap: ImageTexture | ProceduralTexture;
    };
}

declare module wd {
    class TerrainLayerShaderLib extends EngineShaderLib {
        static create(): TerrainLayerShaderLib;
        type: string;
        sendShaderVariables(program: Program, cmd: QuadCommand, material: TerrainMaterial): void;
        setShaderDefinition(cmd: QuadCommand, material: TerrainMaterial): void;
    }
}

declare module wd {
    class TerrainMix {
        static create(): TerrainMix;
        private _mapData;
        mapData: TerrainMixData;
        alphaTest: number;
        addMap(mapManager: MapManager): void;
        hasData(): boolean;
        hasBumpMap(): boolean;
        getTextureForRenderSort(): ProceduralTexture | ImageTexture;
        clone(mix: this): this;
        private _setBumpMapRepeatRegion(bumpMap, diffuseMap);
        private _addBumpMap(mapManager, bumpMap, correspondDiffuseMap, samplerVariableName);
    }
    type TerrainMixData = {
        mixMap: ImageTexture | ProceduralTexture;
        diffuseMap1: ImageTexture | ProceduralTexture;
        diffuseMap2: ImageTexture | ProceduralTexture;
        diffuseMap3: ImageTexture | ProceduralTexture;
        bumpMap1: ImageTexture;
        bumpMap2: ImageTexture;
        bumpMap3: ImageTexture;
    };
}

declare module wd {
    class TerrainMixBumpShaderLib extends EngineShaderLib {
        static create(): TerrainMixBumpShaderLib;
        type: string;
        setShaderDefinition(cmd: QuadCommand, material: TerrainMaterial): void;
    }
}

declare module wd {
    class TerrainMixCommonShaderLib extends EngineShaderLib {
        static create(): TerrainMixCommonShaderLib;
        type: string;
    }
}

declare module wd {
    class TerrainMixMapShaderLib extends EngineShaderLib {
        static create(): TerrainMixMapShaderLib;
        type: string;
        sendShaderVariables(program: Program, cmd: QuadCommand, material: TerrainMaterial): void;
        setShaderDefinition(cmd: QuadCommand, material: TerrainMaterial): void;
    }
}

declare module wd {
    class GrassMapBufferContainer extends CommonBufferContainer {
        static create(entityObject: GameObject): GrassMapBufferContainer;
        geometryData: GrassMapGeometryData;
        private _quadIndexBuffer;
        createBuffersFromGeometryData(): void;
        getBufferForRenderSort(): Buffer;
        protected getCustomData(dataName: string): ArrayBuffer;
    }
}

declare module wd {
    class GrassMapGeometry extends Geometry {
        static create(): GrassMapGeometry;
        width: number;
        height: number;
        private _vertices;
        private _texCoords;
        private _indices;
        private _normals;
        private _quadIndices;
        computeData(): {
            vertices: number[];
            faces: Face3[];
            texCoords: number[];
        };
        protected createBufferContainer(): BufferContainer;
        protected createGeometryData(computedData: GeometryDataType): GeometryData;
        private _generateFirstRect();
        private _generateSecondRect();
        private _generateThirdRect();
        private _generateRect(rotationMatrix, index);
        private _generateQuadIndices();
    }
}

declare module wd {
    class GrassMapGeometryData extends GeometryData {
        static create(geometry: Geometry): GrassMapGeometryData;
        private _quadIndices;
        quadIndices: Array<number>;
    }
}

declare module wd {
    class GrassMapMaterial extends StandardLightMaterial {
        static create(): GrassMapMaterial;
        private _mapData;
        mapData: Array<GrassMapData>;
        grassMap: ImageTexture | ProceduralTexture;
        alphaTest: number;
        wind: GrassWindModel;
        initWhenCreate(): void;
        init(): void;
        getTextureForRenderSort(): Texture;
        updateShader(cmd: QuadCommand): void;
        protected addExtendShaderLib(): void;
        protected addLightSetWorldPositionShaderLib(): void;
    }
    class GrassWindModel {
        static create(): GrassWindModel;
        time: number;
        speed: number;
        direction: Vector2;
        strength: number;
        clone(): this;
        computeTime(): void;
    }
    type GrassMapData = {
        sourceRegion: RectRegion;
    };
}

declare module wd {
    class GrassMapSetWorldPositionShaderLib extends EngineShaderLib {
        static create(): GrassMapSetWorldPositionShaderLib;
        type: string;
        sendShaderVariables(program: Program, cmd: QuadCommand, material: GrassMapMaterial): void;
        setShaderDefinition(cmd: QuadCommand, material: GrassMapMaterial): void;
    }
}

declare module wd {
    class GrassMapShaderLib extends EngineShaderLib {
        static create(): GrassMapShaderLib;
        type: string;
        sendShaderVariables(program: Program, cmd: QuadCommand, material: GrassMapMaterial): void;
        setShaderDefinition(cmd: QuadCommand, material: GrassMapMaterial): void;
    }
}

declare module wd {
    class GrassInstanceGeometry extends InstanceGeometry {
        static create(): GrassInstanceGeometry;
        readonly bladeVerts: number;
        readonly bladeDivs: number;
        bladeCount: number;
        bladeSegments: number;
        bladeWidth: number;
        bladeMinHeight: number;
        bladeMaxHeight: number;
        rangeWidth: number;
        rangeHeight: number;
        vertexIndexBuffer: ArrayBuffer;
        computeData(): {
            vertices: number[];
            faces: Face3[];
            texCoords: number[];
            colors: number[];
        };
        private _generateVertexIndex();
        private _generateVerticesForCollisionCheck();
        private _generateShapes();
        private _generateOffsets();
        private _generateIndices();
    }
}

declare module wd {
    class GrassInstanceMaterial extends Material {
        static create(): GrassInstanceMaterial;
        geometry: GrassInstanceGeometry;
        map: ImageTexture | ProceduralTexture;
        time: number;
        speed: number;
        terrainGeometry: TerrainGeometry;
        init(): void;
        getTextureForRenderSort(): Texture;
        updateShader(cmd: InstanceCommand): void;
        protected createShader(): Shader;
        private _addShaderLib();
        private _computeTime();
    }
}

declare module wd {
    abstract class GrassInstanceShaderLib extends EngineShaderLib {
    }
}

declare module wd {
    class GrassBatchInstanceShaderLib extends GrassInstanceShaderLib {
        static create(): GrassBatchInstanceShaderLib;
        type: string;
    }
}

declare module wd {
    class GrassCommonInstanceShaderLib extends EngineShaderLib {
        static create(): GrassCommonInstanceShaderLib;
        type: string;
        sendShaderVariables(program: Program, cmd: InstanceCommand, material: GrassInstanceMaterial): void;
        setShaderDefinition(cmd: InstanceCommand, material: GrassInstanceMaterial): void;
        private _sendTerrainData(material, program);
        private _sendLightData(program);
    }
}

declare module wd {
    class GrassHardwareInstanceShaderLib extends GrassInstanceShaderLib {
        static create(): GrassHardwareInstanceShaderLib;
        type: string;
    }
}

declare module wd {
    class WaterBumpMapShaderLib extends EngineShaderLib {
        static create(): WaterBumpMapShaderLib;
        type: string;
        sendShaderVariables(program: Program, cmd: QuadCommand, material: WaterMaterial): void;
        setShaderDefinition(cmd: QuadCommand, material: WaterMaterial): void;
    }
}

declare module wd {
    class WaterFresnelShaderLib extends EngineShaderLib {
        static create(): WaterFresnelShaderLib;
        type: string;
        sendShaderVariables(program: Program, cmd: QuadCommand, material: WaterMaterial): void;
        setShaderDefinition(cmd: QuadCommand, material: WaterMaterial): void;
    }
}

declare module wd {
    class WaterMaterial extends StandardLightMaterial {
        static create(): WaterMaterial;
        private _bumpMap;
        bumpMap: Texture;
        private _reflectionMap;
        reflectionMap: Texture;
        private _refractionMap;
        refractionMap: Texture;
        wind: WaterWindModel;
        wave: WaterWaveModel;
        fresnelLevel: number;
        reflectionLevel: number;
        refractionLevel: number;
        updateShader(cmd: QuadCommand): void;
        getTextureForRenderSort(): Texture;
        protected addExtendShaderLib(): void;
    }
    class WaterWindModel {
        static create(): WaterWindModel;
        readonly matrix: Matrix4;
        time: number;
        direction: Vector2;
        speed: number;
        clone(model: this): this;
        computeTime(): void;
    }
    class WaterWaveModel {
        static create(): WaterWaveModel;
        height: number;
        length: number;
        clone(model: this): this;
    }
}

declare module wd {
    class WaterNoBumpMapShaderLib extends EngineShaderLib {
        static create(): WaterNoBumpMapShaderLib;
        type: string;
        sendShaderVariables(program: Program, cmd: QuadCommand, material: WaterMaterial): void;
    }
}

declare module wd {
    class WaterNoLightEffectShaderLib extends EngineShaderLib {
        static create(): WaterNoLightEffectShaderLib;
        type: string;
        sendShaderVariables(program: Program, cmd: QuadCommand, material: WaterMaterial): void;
    }
}

declare module wd {
    class WaterReflectionMapShaderLib extends EngineShaderLib {
        static create(): WaterReflectionMapShaderLib;
        type: string;
        sendShaderVariables(program: Program, cmd: QuadCommand, material: WaterMaterial): void;
        setShaderDefinition(cmd: QuadCommand, material: WaterMaterial): void;
    }
}

declare module wd {
    class WaterRefractionMapShaderLib extends EngineShaderLib {
        static create(): WaterRefractionMapShaderLib;
        type: string;
        sendShaderVariables(program: Program, cmd: QuadCommand, material: WaterMaterial): void;
        setShaderDefinition(cmd: QuadCommand, material: WaterMaterial): void;
    }
}

declare module wd {
    class WaterShaderLib extends EngineShaderLib {
        static create(): WaterShaderLib;
        type: string;
        sendShaderVariables(program: Program, cmd: QuadCommand, material: WaterMaterial): void;
        setShaderDefinition(cmd: QuadCommand, material: WaterMaterial): void;
    }
}

declare module wd {
    class BitmapFontBufferContainer extends CommonBufferContainer {
        static create(entityObject: GameObject): BitmapFontBufferContainer;
        geometryData: BitmapFontGeometryData;
        private _pageBuffer;
        createBuffersFromGeometryData(): void;
        getBufferForRenderSort(): Buffer;
        protected getCustomData(dataName: string): ArrayBuffer;
    }
}

declare module wd {
    class BitmapFontGeometry extends Geometry {
        static create(): BitmapFontGeometry;
        material: BitmapFontMaterial;
        private _pages;
        computeData(): {
            vertices: any;
            faces: Face3[];
            texCoords: any;
        };
        updateBuffers(): void;
        hasMultiPages(): boolean;
        protected createBufferContainer(): BufferContainer;
        protected createGeometryData(computedData: GeometryDataType): GeometryData;
        private _generatePages(layoutDataList);
        private _generateVertices(layoutDataList, bitmapFontWidth, bitmapFontHeight);
        private _generateTexCoords(layoutDataList, textureWidth, textureHeight, flipY);
        private _generateIndices(layoutDataList);
    }
}

declare module wd {
    class BitmapFontGeometryData extends GeometryData {
        static create(geometry: Geometry): BitmapFontGeometryData;
        private _pages;
        pages: Array<number>;
    }
}

declare module wd {
    class BitmapFontMaterial extends StandardLightMaterial {
        static create(): BitmapFontMaterial;
        geometry: BitmapFontGeometry;
        enableSdf: boolean;
        sdfType: SdfBitmapFontType;
        alphaTest: number;
        private _bitmap;
        bitmap: ImageTexture;
        private _pageMapData;
        pageMapData: Array<ImageTexture>;
        isMapFlipY(): boolean;
        initWhenCreate(): void;
        init(): void;
        getTextureForRenderSort(): Texture;
        protected addExtendShaderLib(): void;
        protected addEndShaderLib(): void;
        private _hasMultiPages();
        private _isSdfFont();
    }
}

declare module wd {
    class ThreeDBitmapFont extends ThreeDFont {
        static create(): ThreeDBitmapFont;
        private _text;
        text: string;
        private _xAlignment;
        xAlignment: EFontXAlignment;
        fntId: string;
        private _width;
        width: number;
        height: number;
        layoutDataList: wdCb.Collection<LayoutCharData>;
        private _layout;
        init(): void;
        protected reFormat(): void;
    }
}

declare module wd {
    class BasicBitmapFontShaderLib extends EngineShaderLib {
        static create(): BasicBitmapFontShaderLib;
        type: string;
    }
}

declare module wd {
    class CommonBitmapFontShaderLib extends EngineShaderLib {
        static create(): CommonBitmapFontShaderLib;
        type: string;
        setShaderDefinition(cmd: QuadCommand, material: BitmapFontMaterial): void;
    }
}

declare module wd {
    class MultiPagesBitmapFontShaderLib extends EngineShaderLib {
        static create(): MultiPagesBitmapFontShaderLib;
        type: string;
        sendShaderVariables(program: Program, cmd: QuadCommand, material: BitmapFontMaterial): void;
        setShaderDefinition(cmd: QuadCommand, material: BitmapFontMaterial): void;
    }
}

declare module wd {
    class SdfBitmapFontSmoothShaderLib extends EngineShaderLib {
        static create(): SdfBitmapFontSmoothShaderLib;
        type: string;
        setShaderDefinition(cmd: QuadCommand, material: BitmapFontMaterial): void;
    }
}

declare module wd {
    enum SdfBitmapFontType {
        SMOOTH = 0,
    }
}

declare module wd {
    abstract class BuildShadowMapShaderLib extends EngineShaderLib {
        setShaderDefinition(cmd: QuadCommand, material: EngineMaterial): void;
    }
}

declare module wd {
    class BuildTwoDShadowMapShaderLib extends BuildShadowMapShaderLib {
        static create(): BuildTwoDShadowMapShaderLib;
        type: string;
        sendShaderVariables(program: Program, cmd: QuadCommand, material: LightMaterial): void;
        setShaderDefinition(cmd: QuadCommand, material: EngineMaterial): void;
    }
}

declare module wd {
    class BuildCubemapShadowMapShaderLib extends BuildShadowMapShaderLib {
        static create(): BuildCubemapShadowMapShaderLib;
        type: string;
        sendShaderVariables(program: Program, cmd: QuadCommand, material: LightMaterial): void;
        setShaderDefinition(cmd: QuadCommand, material: EngineMaterial): void;
    }
    type BuildCubemapShadowMapShaderLibData = {
        light: Light;
    };
}

declare module wd {
    class TotalShadowMapShaderLib extends EngineShaderLib {
        static create(): TotalShadowMapShaderLib;
        type: string;
        sendShaderVariables(program: Program, cmd: QuadCommand, material: LightMaterial): void;
    }
}

declare module wd {
    abstract class ShadowMapShaderLib extends EngineShaderLib {
        private _softTypeChangeSubscription;
        init(): void;
        dispose(): void;
        setShaderDefinition(cmd: QuadCommand, material: EngineMaterial): void;
        private _setShadowMapSource();
    }
}

declare module wd {
    class TwoDShadowMapShaderLib extends ShadowMapShaderLib {
        static create(): TwoDShadowMapShaderLib;
        type: string;
        sendShaderVariables(program: Program, cmd: QuadCommand, material: LightMaterial): void;
        setShaderDefinition(cmd: QuadCommand, material: EngineMaterial): void;
    }
    type TwoDShadowMapShaderLibData = {
        camera: CameraController;
        light: Light;
        isRenderListEmpty: boolean;
    };
}

declare module wd {
    class CubemapShadowMapShaderLib extends ShadowMapShaderLib {
        static create(): CubemapShadowMapShaderLib;
        type: string;
        sendShaderVariables(program: Program, cmd: QuadCommand, material: LightMaterial): void;
    }
    type CubemapShadowMapShaderLibData = {
        light: Light;
        isRenderListEmpty: boolean;
    };
}
