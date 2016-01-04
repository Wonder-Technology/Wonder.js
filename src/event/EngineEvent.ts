module wd{
    export enum EngineEvent{
        /*! global event should add "dy_" prefix */
        STARTLOOP = <any>"dy_startLoop",
        ENDLOOP = <any>"dy_endLoop",
        BEFORE_INIT = <any>"dy_beforeInit",
        AFTER_INIT = <any>"dy_afterInit",
        AFTER_INIT_RIGIDBODY_ADD_CONSTRAINT = <any>"dy_afterInit_rigidBody_addConstraint",


        MATERIAL_CHANGE = <any>"dy_material_change",
        UI_WIDTH_CHANGE = <any>"dy_ui_width_change",
        UI_HEIGHT_CHANGE = <any>"dy_ui_height_change"
    }
}
