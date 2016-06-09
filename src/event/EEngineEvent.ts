module wd{
    export enum EEngineEvent{
        STARTLOOP = <any>"wd_startLoop",
        ENDLOOP = <any>"wd_endLoop",
        AFTER_GAMEOBJECT_INIT = <any>"wd_afterGameObjectInit",
        AFTER_GAMEOBJECT_INIT_RIGIDBODY_ADD_CONSTRAINT = <any>"wd_afterGameObjectInit_rigidBody_addConstraint",

        MOUSE_CLICK = <any>"wd_mouseclick",
        MOUSE_DOWN = <any>"wd_mousedown",
        MOUSE_UP = <any>"wd_mouseup",
        MOUSE_MOVE = <any>"wd_mousemove",
        MOUSE_OVER = <any>"wd_mouseover",
        MOUSE_OUT = <any>"wd_mouseout",
        MOUSE_WHEEL = <any>"wd_mousewheel",
        MOUSE_DRAG = <any>"wd_mousedrag",

        MATERIAL_CHANGE = <any>"wd_material_change",
        MATERIAL_COLOR_CHANGE = <any>"wd_material_color_change",

        UI_WIDTH_CHANGE = <any>"wd_ui_width_change",
        UI_HEIGHT_CHANGE = <any>"wd_ui_height_change",

        TRANSFORM_TRANSLATE = <any>"wd_transform_translate",
        TRANSFORM_ROTATE = <any>"wd_transform_rotate",
        TRANSFORM_SCALE = <any>"wd_transform_scale",

        SHADOWMAP_SOFTTYPE_CHANGE = <any>"wd_shadowMap_softType_change",

        SHADOWMAP_LAYER_CHANGE = <any>"wd_shadowMap_layer_change",

        COMPONENT_CHANGE = <any>"wd_component_change",

        UNUSE_SCENE_SHADER = <any>"wd_unUse_scene_shader",

        EXIT = <any>"wd_exit",
        ENTER = <any>"wd_enter"
    }
}
