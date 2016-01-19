var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
/// <reference path="../../../../../dist/wd.d.ts"/>
var sample;
(function (sample) {
    var Button = wd.Button;
    var PlainFont = wd.PlainFont;
    var ButtonObjectName = wd.ButtonObjectName;
    var LoaderManager = wd.LoaderManager;
    var Image = wd.Image;
    var ButtonScript = (function () {
        function ButtonScript(entityObject) {
            this._entityObject = null;
            this._entityObject = entityObject;
        }
        ButtonScript.prototype.init = function () {
            this._setText();
            this._setBackground();
        };
        ButtonScript.prototype.onMouseClick = function (e) {
            if (this._entityObject.getComponent(Button).isDisabled()) {
                return;
            }
            console.log("click");
        };
        ButtonScript.prototype._setText = function () {
            var font = this._entityObject.getComponent(Button).getObject(ButtonObjectName.TEXT).getComponent(PlainFont);
            font.fontSize = 30;
        };
        ButtonScript.prototype._setBackground = function () {
            var image = this._entityObject.getComponent(Button).getObject(ButtonObjectName.BACKGROUND).getComponent(Image);
            image.source = LoaderManager.getInstance().get("normal2");
        };
        ButtonScript = __decorate([
            wd.script("button")
        ], ButtonScript);
        return ButtonScript;
    })();
    sample.ButtonScript = ButtonScript;
})(sample || (sample = {}));
