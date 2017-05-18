import { getGL } from "../../device/DeviceManagerSystem";
import { Map } from "immutable";
import { getProgram } from "./ShaderSystem";

export var use = (state:Map<any, any>, shaderIndex: number, ShaderData: any) => {
    var gl = getGL(state);

    //todo finish optimize!
    if (JudgeUtils.isEqual(this, ProgramTable.lastUsedProgram)) {
        return;
    }

    ProgramTable.lastUsedProgram = this;

    gl.useProgram(getProgram(shaderIndex, ShaderData));

    this._sender.disableVertexAttribArray();

    BufferTable.lastBindedArrayBufferListUidStr = null;
}