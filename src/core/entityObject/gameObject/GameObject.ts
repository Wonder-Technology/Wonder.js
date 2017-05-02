import { registerClass } from "../../../definition/typescript/decorator/registerClass";
import { EntityObject } from "../EntityObject";
import { ThreeDTransform } from "../../../component/transform/ThreeDTransform";
// import { cloneAttributeAsBasicType } from "../../../definition/typescript/decorator/clone";
import { Collection } from "wonder-commonlib/dist/es2015/Collection";
// import { RenderUtils } from "../../../utils/RenderUtils";

@registerClass("GameObject")
export class GameObject extends EntityObject {
    public static create() {
        var obj = new this();

        obj.initWhenCreate();

        return obj;
    }

    public transform: ThreeDTransform;
    public parent: GameObject;

    // @cloneAttributeAsBasicType()
    // public renderGroup: number = 0;
    // @cloneAttributeAsBasicType()
    // public renderPriority: number = 0;
    // @cloneAttributeAsBasicType()
    // public isVisible: boolean = true;

    protected children: Collection<GameObject>;

    public initWhenCreate() {
        super.initWhenCreate();

        this.name = `gameObject${String(this.uid)}`;
    }

    protected createTransform() {
        return ThreeDTransform.create();
    }

    // protected getRenderList() {
    //     return RenderUtils.getGameObjectRenderList(this.getChildren());
    // }
}