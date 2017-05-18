import forEach from "wonder-lodash/forEach";
import curry from "wonder-lodash/curry";
import { RenderCommand } from "../command/RenderCommand";
import { Map } from "immutable";
import { use } from "../shader/ProgramSystem";
import { sendAttributeData, sendUniformData } from "../shader/ShaderSystem";
import { getBuffer as getIndexBuffer } from "../buffer/IndexBufferSystem";
import { getBuffer as getVertexBuffer } from "../buffer/VertexBufferSystem";

var _drawElements = () => {

}

var _drawArray = () => {

}

export var draw = curry((state:Map<any, any>, ShaderData:any, renderCommandArray:Array<RenderCommand>) => {
    forEach(renderCommandArray, (renderCommand:RenderCommand) => {
        var shaderIndex = renderCommand.shaderIndex;

        use(state, shaderIndex, ShaderData);

        //todo set state

        sendAttributeData();
        sendUniformData();

        let indexBuffer = getIndexBuffer();

        if (indexBuffer) {
            _drawElements(indexBuffer);
        }
        else {
            _drawArray(getVertexBuffer());
        }
    })
    // for each command:
    //     get shader index
    //
    //
    //     use program
    //
    //     set state
    //
    //
    //     get all send data from shader
    //
    //     get or create attribute buffer
    //
    //     bind attribute buffer
    //
    //     send attribute buffer data:
    //         send by compile data
    //
    //
    //
    //     send uniform data:
    //         get all send data from shader
    //         send by compile data
    //
    //
    //
    //     get or create index buffer
    //
    //     bind index buffer
    //
    //     // send index buffer data
    //
    //     draw element
})
