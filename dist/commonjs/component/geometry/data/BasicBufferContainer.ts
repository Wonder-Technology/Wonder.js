import { registerClass } from "../../../definition/typescript/decorator/registerClass";
import { CommonBufferContainer } from "./CommonBufferContainer";
import { GameObject } from "../../../core/entityObject/gameObject/GameObject";

@registerClass("BasicBufferContainer")
export class BasicBufferContainer extends CommonBufferContainer {
    public static create(entityObject: GameObject) {
        var obj = new this(entityObject);

        return obj;
    }
}