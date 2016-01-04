/// <reference path="../../../filePath.d.ts"/>
module wd {
    //todo
    export class CharFont {
    //export class CharFont extends Font {
    //    public static create() {
    //        var obj = new this();
    //
    //        return obj;
    //    }
    //
    //    get x(){
    //        return this.gameObject.transform.position.x;
    //    }
    //    set x(x:number){
    //        var position = this.gameObject.transform.position;
    //
    //        //this.gameObject.transform.position = Vector3.create(x, position.y, position.z);
    //        this.gameObject.transform.position = Vector2.create(x, position.y);
    //    }
    //
    //    get y(){
    //        return this.gameObject.transform.position.y;
    //    }
    //
    //    get dirty(){
    //        var transform = null;
    //
    //        if(this.p_dirty){
    //            return true;
    //        }
    //
    //        transform = this.gameObject.transform;
    //
    //        return transform.isTranslate || transform.isRotate || transform.isScale;
    //    }
    //
    //    private _char:string = null;
    //    get char(){
    //        return this._char;
    //    }
    //    set char(char:string){
    //        if(char !== this._char){
    //            this._char = char;
    //            this.p_dirty = true;
    //        }
    //    }
    //
    //    public startPosX:number = null;
    //    public xAdvance:number = null;
    //    public image:HTMLImageElement = null;
    //    public rectRegion:RectRegion = null;
    //    public width:number = 0;
    //    public height:number = 0;
    //    public isNewLine:boolean = false;
    //    public isFullLine:boolean = false;
    //
    //    public init(){
    //        this.context = this.getContext();
    //    }
    //
    //    public dispose(){
    //    }
    //
    //    @require(function(elapsedTime:number){
    //        assert(this.context !== null, Log.info.FUNC_SHOULD("set context"));
    //    })
    //    public update(elapsedTime:number){
    //        var transform:RectTransform = null,
    //            position:Vector2 = null,
    //            scale:Vector3 = null,
    //            dx = null,
    //            dy = null,
    //            dw = null,
    //            dh = null;
    //
    //        super.update(elapsedTime);
    //
    //        if(this.rectRegion === null || (this.width === 0 && this.height === 0)){
    //            return;
    //        }
    //
    //        transform = this.gameObject.transform;
    //        //position = CoordinateUtils.convertWebGLPositionToCanvasPosition(transform.position);
    //        position = transform.position;
    //        scale = transform.scale;
    //
    //        dx = position.x;
    //        dy = position.y;
    //        dw = this.width * scale.x;
    //        dh = this.height * scale.y;
    //
    //
    //        this.context.save();
    //
    //        if(transform.isRotate){
    //            this._rotateAroundImageCenter(dx, dy, dw, dh);
    //        }
    //
    //        this.context.drawImage(this.image,
    //            this.rectRegion.x, this.rectRegion.y, this.rectRegion.width, this.rectRegion.height,
    //            dx, dy, dw, dh);
    //
    //
    //        this.context.restore();
    //    }
    //
    //    protected updateWhenDirty(){
    //    }
    //
    //    private _rotateAroundImageCenter(dx:number, dy:number, dw:number, dh:number){
    //        var values = this.gameObject.transform.localToWorldMatrix.values;
    //
    //        this.context.translate(dx + dw / 2, dy + dh / 2);
    //        this.context.transform(
    //            values[0], values[4], values[1], values[5], 0, 0
    //        );
    //        this.context.translate(- (dx + dw / 2), -(dy + dh / 2));
    //    }
    //}
}
}

