module wd{
    export enum EngineEvent{
        /*! global event should add "dy_" prefix */
        STARTLOOP = <any>"dy_startLoop",
        ENDLOOP = <any>"dy_endLoop",
        BEFORE_INIT = <any>"dy_beforeInit",
        AFTER_INIT = <any>"dy_afterInit",


        MATERIAL_CHANGE = <any>"dy_material_change"
    }
}
