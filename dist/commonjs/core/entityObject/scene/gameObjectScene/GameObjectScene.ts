import { registerClass } from "../../../../definition/typescript/decorator/registerClass";
import { Scene } from "../Scene";
import { GameObject } from "../../gameObject/GameObject";
import { requireSetter, assert } from "../../../../definition/typescript/decorator/contract";
import { JudgeUtils } from "../../../../utils/JudgeUtils";
import { Log } from "../../../../utils/Log";
import { Collection } from "wonder-commonlib/dist/commonjs/Collection";
import { Renderer } from "../../../../renderer/renderer/Renderer";
import { RenderUtils } from "../../../../utils/RenderUtils";
import { CameraController } from "../../../../component/camera/controller/CameraController";

@registerClass("GameObjectScene")
export class GameObjectScene extends Scene {
    public static create() {
        var obj = new this();

        return obj;
    }

    private _currentCamera: GameObject = null;
    get currentCamera(): any {
        return this._currentCamera || this._cameraList.getChild(0);
    }
    @requireSetter(function(arg: any) {
        if (JudgeUtils.isNumber(arg)) {
            let index: number = arg;

            assert(!!this._cameraList.getChild(index), Log.info.FUNC_NOT_EXIST("current camera in cameraList"));
        }
    })
    set currentCamera(arg: any) {
        if (JudgeUtils.isNumber(arg)) {
            let index: number = arg;

            this._currentCamera = this._cameraList.getChild(index);
        }
        else if (arg instanceof GameObject) {
            let currentCamera: GameObject = arg;

            this._currentCamera = currentCamera;
        }
    }

    private _cameraList: Collection<GameObject> = Collection.create<GameObject>();

    public addChild(child: GameObject): GameObject {
        var cameraList = this._getCameras(child);

        if (cameraList.getCount() > 0) {
            this._cameraList.addChildren(cameraList);
        }

        return <GameObject>super.addChild(child);
    }

    public update(elapsed: number) {
        var currentCamera = this._getCurrentCameraComponent();

        if (currentCamera) {
            currentCamera.update(elapsed);
        }

        super.update(elapsed);
    }

    public render(renderer: Renderer) {
        // this.shadowManager.setShadowRenderListForCurrentLoop();
        //
        // this.renderTargetRendererManager.render(renderer, this.currentCamera);

        super.render(renderer, this.currentCamera);
    }

    protected getRenderList() {
        return RenderUtils.getGameObjectRenderList(this.getChildren());
    }

    protected createTransform() {
        return null;
    }

    private _getCameras(gameObject: GameObject) {
        return this._find(gameObject, this._isCamera);
    }

    private _find(gameObject: GameObject, judgeFunc) {
        var self = this,
            resultArr: Collection<GameObject> = Collection.create<GameObject>();
        var find = (gameObject: GameObject) => {
            if (judgeFunc.call(self, gameObject)) {
                resultArr.addChild(gameObject);
            }

            gameObject.forEach((child: GameObject) => {
                find(child);
            });
        }

        find(gameObject);

        return resultArr;
    }

    private _isCamera(child: GameObject) {
        return child.hasComponent(CameraController);
    }

    private _getCurrentCameraComponent(): CameraController {
        if (!this.currentCamera) {
            return null;
        }

        return this.currentCamera.getComponent(CameraController);
    }
}