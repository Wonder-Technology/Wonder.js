import { RenderCommand } from "./RenderCommand";
import { Matrix4 } from "../../math/Matrix4";
import { BufferContainer } from "../../component/geometry/data/BufferContainer";
import { Material } from "../../material/Material";
import { GameObject } from "../../core/entityObject/gameObject/GameObject";
import { Program } from "../program/Program";
export declare abstract class QuadCommand extends RenderCommand {
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
