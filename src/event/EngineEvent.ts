module wd{
    export enum EngineEvent{
        /*! global event should add "dy_" prefix */
        STARTLOOP = <any>"dy_startLoop",
        ENDLOOP = <any>"dy_endLoop",
        BEFORE_GAMEOBJECT_INIT = <any>"dy_beforeGameObjectInit",
        AFTER_GAMEOBJECT_INIT = <any>"dy_afterGameObjectInit",
        AFTER_GAMEOBJECT_INIT_RIGIDBODY_ADD_CONSTRAINT = <any>"dy_afterGameObjectInit_rigidBody_addConstraint",

        MOUSE_CLICK = <any>"dy_mouseclick",
        MOUSE_DOWN = <any>"dy_mousedown",
        MOUSE_UP = <any>"dy_mouseup",
        MOUSE_MOVE = <any>"dy_mousemove",
        MOUSE_OVER = <any>"dy_mouseover",
        MOUSE_OUT = <any>"dy_mouseout",
        MOUSE_WHEEL = <any>"dy_mousewheel",
        MOUSE_DRAG = <any>"dy_mousedrag",

        MATERIAL_CHANGE = <any>"dy_material_change",

        UI_WIDTH_CHANGE = <any>"dy_ui_width_change",
        UI_HEIGHT_CHANGE = <any>"dy_ui_height_change",

        TRANSFORM_TRANSLATE = <any>"dy_transform_translate",
        TRANSFORM_ROTATE = <any>"dy_transform_rotate",
        TRANSFORM_SCALE = <any>"dy_transform_scale"
    }
}
