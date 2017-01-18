import wdFrp = require("wonder-frp");
import ModelLoaderUtils = require("../../common/ModelLoaderUtils");
import ObjectsConverter = require("./MD2ObjectsConverter");
import contract = require("../../../ts/definition/typescript/decorator/contract");
import chai = require("chai");
import {SingleModelConverter} from "../../common/SingleModelConverter";

var describe = contract.describe,
    it = contract.it,
    requireInNodejs = contract.requireInNodejs,
    requireGetter = contract.requireGetter,
    requireSetter = contract.requireSetter,
    requireGetterAndSetter = contract.requireGetterAndSetter,
    ensure = contract.ensure,
    ensureGetter = contract.ensureGetter,
    ensureSetter = contract.ensureSetter,
    ensureGetterAndSetter = contract.ensureGetterAndSetter,
    invariant = contract.invariant;

var expect = chai.expect;

export class MD2ToWD extends SingleModelConverter{
    public static create(version:string) {
        var obj = null;

        obj = new this(version);

        return obj;
    }

    public name:string = "WonderJsMD2ToWDConverter";

    private _objectsConverter:any = ObjectsConverter.create();

    @ensure(function(stream:wdFrp.Stream){
        it("should return stream", () => {
            expect(stream).instanceOf(wdFrp.Stream);
        });
    })
    public convert(fileBuffer:Buffer, filePath:string):wdFrp.Stream {
        var resultJson:any = {},
            nodeName = ModelLoaderUtils.getNameByPath(filePath);

        this.convertSceneData(resultJson, nodeName);

        resultJson.asset = this.convertAssetData();

        this._convertObjects(resultJson, fileBuffer, nodeName);

        return wdFrp.just([resultJson]);
    }

    private _convertObjects(resultJson:any, fileBuffer:Buffer, filePath:string) {
        return this._objectsConverter.convert(resultJson, fileBuffer, filePath);
    }
}
