module wd{
    export enum EEngineEvent{
        STARTLOOP = <any>"wd_startLoop",
        ENDLOOP = <any>"wd_endLoop",

        POINT_TAP = <any>"wd_pointtap",
        POINT_DOWN = <any>"wd_pointdown",
        POINT_UP = <any>"wd_pointup",
        POINT_MOVE = <any>"wd_pointmove",
        POINT_OVER = <any>"wd_pointover",
        POINT_OUT = <any>"wd_pointout",
        POINT_SCALE = <any>"wd_pointscale",
        POINT_DRAG = <any>"wd_pointdrag",

        MATERIAL_CHANGE = <any>"wd_material_change",

        UI_WIDTH_CHANGE = <any>"wd_ui_width_change",
        UI_HEIGHT_CHANGE = <any>"wd_ui_height_change",

        TRANSFORM_TRANSLATE = <any>"wd_transform_translate",
        TRANSFORM_ROTATE = <any>"wd_transform_rotate",
        TRANSFORM_SCALE = <any>"wd_transform_scale",

        SHADOWMAP_SOFTTYPE_CHANGE = <any>"wd_shadowMap_softType_change",

        SHADOWMAP_LAYER_CHANGE = <any>"wd_shadowMap_layer_change",

        COMPONENT_CHANGE = <any>"wd_component_change",

        AFTER_SCENEGRAPH_BUILD = <any>"wd_after_sceneGraph_build",

        ANIMATION_STOP = <any>"wd_animation_stop",


        EXIT = <any>"wd_exit",
        ENTER = <any>"wd_enter"
    }
}
