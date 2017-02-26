/// <reference types="wonder-commonlib" />
import { Scene } from "../Scene";
import { GameObject } from "../../gameObject/GameObject";
import { Collection } from "wonder-commonlib/dist/es2015/Collection";
import { Renderer } from "../../../../renderer/renderer/Renderer";
export declare class GameObjectScene extends Scene {
    static create(): GameObjectScene;
    private _currentCamera;
    currentCamera: any;
    private _cameraList;
    addChild(child: GameObject): GameObject;
    update(elapsed: number): void;
    render(renderer: Renderer): void;
    protected getRenderList(): Collection<GameObject>;
    protected createTransform(): any;
    private _getCameras(gameObject);
    private _find(gameObject, judgeFunc);
    private _isCamera(child);
    private _getCurrentCameraComponent();
}
