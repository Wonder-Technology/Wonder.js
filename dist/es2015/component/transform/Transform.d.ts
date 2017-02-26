/// <reference types="wonder-commonlib" />
import { Component } from "../../core/Component";
import { ETransformState } from "./ETransformState";
import { Collection } from "wonder-commonlib/dist/es2015/Collection";
export declare abstract class Transform extends Component {
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
    protected children: Collection<Transform>;
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
