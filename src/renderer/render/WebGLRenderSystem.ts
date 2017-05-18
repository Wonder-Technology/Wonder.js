import { Map } from "immutable";
import { getRenderList } from "../../component/renderComponent/renderer/MeshRendererSystem";
import { MeshRendererData } from "../../component/renderComponent/renderer/MeshRendererData";
import { compose } from "../../utils/functionalUtils";
import { createRenderCommands } from "../command/RenderCommandSystem";
import { sortRenderCommands } from "../sort/SortRenderCommandSystem";
import { draw } from "../draw/DrawRenderCommandSystem";
import { init as initMaterial } from "../../component/renderComponent/material/MaterialSystem";
import { MaterialData } from "../../component/renderComponent/material/MaterialData";
import { GameObjectData } from "../../core/entityObject/gameObject/GameObjectData";
import { ShaderData } from "../shader/ShaderData";

// var _sortCommands = () => {
//
// }

// var _getRenderList = () => {
//
// }
//
// var _getVisibleRenderList = () => {
//
// }

export var init = (state: Map<any, any>) => {
    // add shader lib
    //
    // init shader
    // compile:
    // build shader source(vs, fs)
    // compile shader source
    //
    //
    //
    // store all attribute, uniform position


    initMaterial(MaterialData);
}

export var clear = (state: Map<any, any>) => {

}

export var render = (state: Map<any, any>) => {
    compose(
        draw(state, ShaderData),
        sortRenderCommands(state),
        createRenderCommands(state, GameObjectData, MaterialData),
        getRenderList(state)
    )(MeshRendererData)
}
