// import { cloneAttributeAsBasicType } from "../../definition/typescript/decorator/clone";
// import { ETransformState } from "./ETransformState";
// import { Collection } from "wonder-commonlib/dist/es2015/Collection";
// import { IDisposable } from "wonder-frp/dist/es2015/Disposable/IDisposable";
// import { EventManager } from "../../event/EventManager";
// import { EEngineEvent } from "../../event/EEngineEvent";
// import { virtual } from "../../definition/typescript/decorator/virtual";
import { DataOrientedComponent } from "../DataOrientedComponent";
// import { addComponent, getParent, removeComponent, update } from "./ThreeDTransformSystem";
// import { Map } from "immutable";

//todo refactor:not import on ThreeDTransformSystem
export abstract class Transform extends DataOrientedComponent {
    public abstract parent:Transform = null;
    // public selfParent: Transform = null;
    // // protected p_parent: Transform = null;
    // // @cloneAttributeAsBasicType()
    // get parent() {
    //     // return this.p_parent;
    //     return getParent(this, ThreeDTransformData);
    // }
    // set parent(parent: Transform) {
    //     // this.setParent(parent);
    //     // return setParent(this, parent, ThreeDTransformData);
    //     //todo finish
    // }

    // get isTransform() {
    //     return this.isTranslate || this.isRotate || this.isScale;
    // }
    // set isTransform(isTransform: boolean) {
    //     if (isTransform) {
    //         this._setGlobalTransformState(true);
    //     }
    // }
    //
    // private _isTranslate: boolean = false;
    // get isTranslate() {
    //     return this._isTranslate;
    // }
    // set isTranslate(isTranslate: boolean) {
    //     this._setGlobalTransformState(ETransformState.ISTRANSLATE, isTranslate);
    // }
    //
    // private _isRotate: boolean = false;
    // get isRotate() {
    //     return this._isRotate;
    // }
    // set isRotate(isRotate: boolean) {
    //     this._setGlobalTransformState(ETransformState.ISROTATE, isRotate);
    // }
    //
    // private _isScale: boolean = false;
    // get isScale() {
    //     return this._isScale;
    // }
    // set isScale(isScale: boolean) {
    //     this._setGlobalTransformState(ETransformState.ISSCALE, isScale);
    // }
    //
    // set isLocalTranslate(isTranslate: boolean) {
    //     this._setLocalTransformState(ETransformState.ISLOCALTRANSLATE, isTranslate);
    // }
    //
    // set isLocalRotate(isRotate: boolean) {
    //     this._setLocalTransformState(ETransformState.ISLOCALROTATE, isRotate);
    // }
    //
    // set isLocalScale(isScale: boolean) {
    //     this._setLocalTransformState(ETransformState.ISLOCALSCALE, isScale);
    // }
    //
    // public dirtyLocal: boolean = true;
    //
    // protected children: Collection<Transform> = Collection.create<Transform>();
    //
    // private _endLoopSubscription: IDisposable = null;
    //
    // public init(state: Map<any, any>) {
    //     var self = this;
    //
    //     this.clearCache();
    //
    //     this._endLoopSubscription = EventManager.fromEvent(<any>EEngineEvent.ENDLOOP)
    //         .subscribe(() => {
    //             self._resetTransformFlag();
    //         });
    // }

    // public dispose() {
    //     super.dispose();
    //
    //     this._endLoopSubscription && this._endLoopSubscription.dispose();
    //     return removeComponent(this, ThreeDTransformData);
    // }
    //
    // public addChild(child: Transform) {
    //     this.children.addChild(child);
    // }
    //
    // public removeChild(child: Transform) {
    //     this.children.removeChild(child);
    // }
    //
    //
    // public setChildrenTransformState(state: boolean);
    // public setChildrenTransformState(transformState: ETransformState, state: boolean);
    //
    // public setChildrenTransformState(...args) {
    //     if (args.length === 1) {
    //         let state: boolean = args[0];
    //
    //         if (state) {
    //             this.children.forEach((child: Transform) => {
    //                 child.isTransform = true;
    //             });
    //         }
    //     }
    //     else {
    //         let transformState: ETransformState = args[0],
    //             state: boolean = args[1];
    //
    //         if (state) {
    //             this.children.forEach((child: Transform) => {
    //                 child[transformState] = true;
    //             });
    //         }
    //     }
    // }
    //
    // protected abstract clearCache(): void;
    //
    // @virtual
    // protected handleWhenSetTransformState(transformState?: ETransformState): void {
    // }
    //
    // // protected setParent(parent: Transform) {
    //     // if (this.p_parent) {
    //     //     this.p_parent.removeChild(this);
    //     // }
    //     //
    //     // if (!parent) {
    //     //     this.p_parent = null;
    //     //
    //     //     return;
    //     // }
    //     //
    //     // this.p_parent = parent;
    //     // this.p_parent.addChild(this);
    //     //
    //     // //todo can has multi parent?
    // // }
    //
    // protected getMatrix<T>(syncMethod: string, matrixAttriName: string): T {
    //     var syncList = Collection.create<Transform>(),
    //         current = this.p_parent;
    //
    //     syncList.addChild(this);
    //
    //     while (current !== null) {
    //         syncList.addChild(current);
    //         current = current.parent;
    //     }
    //
    //     syncList.reverse().forEach((transform: Transform) => {
    //         transform[syncMethod]();
    //     });
    //
    //     return this[matrixAttriName];
    // }
    //
    //
    // private _setGlobalTransformState(state: boolean);
    // private _setGlobalTransformState(transformState: ETransformState, state: boolean);
    //
    // private _setGlobalTransformState(...args) {
    //     if (args.length === 1) {
    //         let state: boolean = args[0];
    //
    //         if (!state) {
    //             return;
    //         }
    //
    //         this._isTranslate = true;
    //         this._isRotate = true;
    //         this._isScale = true;
    //
    //         this.dirtyLocal = true;
    //         this.clearCache();
    //         this.handleWhenSetTransformState();
    //
    //         this.setChildrenTransformState(state);
    //     }
    //     else {
    //         let transformState: ETransformState = args[0],
    //             state: boolean = args[1];
    //
    //         this[`_${transformState}`] = state;
    //
    //         if (state) {
    //             this.dirtyLocal = true;
    //             this.clearCache();
    //             this.handleWhenSetTransformState(transformState);
    //         }
    //
    //         if (state) {
    //             this.setChildrenTransformState(transformState, state);
    //         }
    //     }
    // }
    //
    // private _setLocalTransformState(transformState: ETransformState, state: boolean) {
    //     if (state) {
    //         this.dirtyLocal = true;
    //         this.clearCache();
    //     }
    //
    //     if (state) {
    //         this.setChildrenTransformState(transformState, state);
    //     }
    // }
    //
    // private _resetTransformFlag() {
    //     this.isTranslate = false;
    //     this.isScale = false;
    //     this.isRotate = false;
    // }
}

