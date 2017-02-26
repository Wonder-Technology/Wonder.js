import { registerClass } from "../../definition/typescript/decorator/registerClass";
import { RendererComponent } from "./RendererComponent";
import { GameObject } from "../../core/entityObject/gameObject/GameObject";
import { Renderer } from "../../renderer/renderer/Renderer";
import { requireCheck, it } from "../../definition/typescript/decorator/contract";
import { Geometry } from "../geometry/Geometry";
import { CameraController } from "../camera/controller/CameraController";
import expect from "wonder-expect.js";
import { QuadCommand } from "../../renderer/command/QuadCommand";
import { Material } from "../../material/Material";
import { SingleDrawCommand } from "../../renderer/command/SingleDrawCommand";

@registerClass("MeshRenderer")
export class MeshRenderer extends RendererComponent {
    public static create() {
        var obj = new this();

        return obj;
    }

    public entityObject: GameObject;

    public render(renderer: Renderer, target: GameObject, camera: GameObject) {
        var geometry = target.getGeometry();

        if (!geometry) {
            return;
        }

        renderer.addCommand(this.createDrawCommand(target, geometry, camera));
    }

    @requireCheck(function(target: GameObject, geometry: Geometry, camera: GameObject) {
        var controller = camera.getComponent<CameraController>(CameraController);

        it("camera must add Camera Component", () => {
            expect(!!controller && !!controller.camera).true;
        });
        it("Mesh must add geometry component", () => {
            expect(!!geometry).true;
        });
    })
    protected createDrawCommand(target: GameObject, geometry: Geometry, camera: GameObject) {
        var cmd: QuadCommand = null,
            cameraComponent = camera.getComponent<CameraController>(CameraController),
            material: Material = geometry.material;

        cmd = this._createCommand(target, material);

        cmd.target = target;

        cmd.buffers = geometry.buffers;

        // cmd.vaoManager = geometry.vaoManager;

        cmd.drawMode = geometry.drawMode;

        cmd.mMatrix = target.transform.localToWorldMatrix;


        if (target.data && target.data.vMatrix) {
            cmd.vMatrix = target.data.vMatrix;
        }
        else {
            cmd.vMatrix = cameraComponent.worldToCameraMatrix;
        }

        if (target.data && target.data.pMatrix) {
            cmd.pMatrix = target.data.pMatrix;
        }
        else {
            cmd.pMatrix = cameraComponent.pMatrix;
        }

        cmd.material = material;


        // cmd.blend = material.blend;

        return cmd;
    }

    private _createCommand(target: GameObject, material: Material) {
        var cmd: any = null;

        // if(isHardwareInstance){
        //     if(isOneToManyInstance){
        //         cmd = this._createOneToManyHardwareInstanceCommand(target, material, glslData);
        //     }
        //     else{
        //         cmd = this._createOneToOneHardwareInstanceCommand(target, material, glslData);
        //     }
        // }
        // else if(isBatchInstance){
        //     if(isOneToManyInstance){
        //         cmd = this._createOneToManyBatchInstanceCommand(target, material, glslData);
        //     }
        //     else{
        //         cmd = this._createOneToOneBatchInstanceCommand(target, material, glslData);
        //     }
        // }
        // else{
        cmd = SingleDrawCommand.create();

        cmd.normalMatrix = this.entityObject.transform.normalMatrix;
        // }

        return cmd;
    }
}