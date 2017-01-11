var arrayUtils = require("../common/arrayUtils");

var wdCb = require("wdcb");


var GLSLPath = require("./manageAllGLSLPaths").GLSLPath;
var ExcludeLib = require("./manageExcludeLibData").ExcludeLib;


var ExcludeModule = {
    ACTION: "action",
    BILLBOARD: "billboard",
    LOD: "lod",
    PHYSICS: "physics",
    SPACE_PARTITION: "spacePartition",
    UI: "ui",
    ANIMATION: "animation",



    EXTENSION_MATERIAL_BITMAPFONT: "extension_material_bitmapFont",
    EXTENSION_MATERIAL_GRASS: "extension_material_grass",
    EXTENSION_MATERIAL_MIRROR: "extension_material_mirror",
    EXTENSION_MATERIAL_TERRAIN: "extension_material_terrain",
    EXTENSION_MATERIAL_WATER: "extension_material_water",

    EXTENSION_PROCEDURALTEXTURE: "extension_proceduralTexture",


    SOUND: "sound",
    VIDEO: "video",
    SHADOW: "shadow",

    DEBUG: "debug"
};



var MODULE_TABLE = {
    action: {
        removeFunc: function (filePath) {
            return filePath.indexOf("action/") > -1
                || filePath.indexOf("ActionComponentContainer") > -1;
        }
    },
    billboard: {
        removeFunc: function (filePath) {
            return filePath.indexOf("billboard/") > -1
                || filePath.indexOf("BillboardComponentContainer") > -1;
        }
    },
    lod: {
        removeFunc: function (filePath) {
            return filePath.indexOf("lod/") > -1
                || filePath.indexOf("LODComponentContainer") > -1;
        }
    },
    physics: {
        removeLibs: [ExcludeLib.CANNON],

        removeFunc: function (filePath) {
            return filePath.indexOf("physics/") > -1
                || filePath.indexOf("PhysicsComponentContainer") > -1
                || filePath.indexOf("rigidBody") > -1;
        }
    },
    spacePartition: {
        removeFunc: function (filePath) {
            return filePath.indexOf("space_partition/") > -1
                || filePath.indexOf("SpacePartitionComponentContainer") > -1;
        }
    },
    ui: {
        removeModules: [ExcludeModule.EXTENSION_MATERIAL_BITMAPFONT, ExcludeModule.DEBUG],

        removeFunc: function (filePath) {
            return filePath.indexOf("ui/") > -1
                || filePath.indexOf("UIComponentContainer") > -1
                || filePath.indexOf("UIObject") > -1
                || filePath.indexOf("UIObjectScene") > -1
                || filePath.indexOf("UIRenderer") > -1
                || filePath.indexOf("RectTransform") > -1
                || filePath.indexOf("UIEventTriggerDetector") > -1;
        }
    },
    animation: {
        remainFunc: function (filePath) {
            return filePath.indexOf("BoneMatrix")  > -1;
        },
        removeFunc: function (filePath) {
            return filePath.indexOf("component/animation/") > -1
                || filePath.indexOf("AnimationComponentContainer") > -1
                || filePath.indexOf("component/geometry/data/Morph") > -1
                || filePath.indexOf("component/geometry/data/Skin") > -1
                || filePath.indexOf("MorphShaderLib") > -1
                || filePath.indexOf("SkinSkeletonShaderLib") > -1;
        }
    },


    extension_material_bitmapFont: {
        glslPath: GLSLPath.EXTENSION_MATERIAL_BITMAPFONT,

        removeFunc: function (filePath) {
            return filePath.indexOf("extension/material/bitmapFont/") > -1;
        }
    },
    extension_material_grass: {
        glslPath: GLSLPath.EXTENSION_MATERIAL_GRASS,

        removeFunc: function (filePath) {
            return filePath.indexOf("extension/material/grass/") > -1;
        }
    },
    extension_material_mirror: {
        glslPath: GLSLPath.EXTENSION_MATERIAL_MIRROR,

        removeFunc: function (filePath) {
            return filePath.indexOf("extension/material/mirror/") > -1;
        }
    },
    extension_material_terrain: {
        glslPath: GLSLPath.EXTENSION_MATERIAL_TERRAIN,

        removeFunc: function (filePath) {
            return filePath.indexOf("extension/material/terrain/") > -1;
        }
    },
    extension_material_water: {
        glslPath: GLSLPath.EXTENSION_MATERIAL_WATER,

        removeFunc: function (filePath) {
            return filePath.indexOf("extension/material/water/") > -1;
        }
    },



    extension_proceduralTexture: {
        glslPath: GLSLPath.EXTENSION_PROCEDURALTEXTURE,

        removeFunc: function (filePath) {
            return filePath.indexOf("extension/procedural_texture/") > -1;
        }
    },


    sound: {
        removeFunc: function (filePath) {
            return filePath.indexOf("sound/") > -1
                || filePath.indexOf("SoundLoader") > -1;
        }
    },
    video: {
        removeFunc: function (filePath) {
            return filePath.indexOf("video/") > -1
                || filePath.indexOf("VideoLoader") > -1
                || filePath.indexOf("VideoTextureAsset") > -1
                || filePath.indexOf("VideoTexture") > -1;
        }
    },
    shadow: {
        glslPath: GLSLPath.EXTENSION_SHADOW,

        remainFunc: function (filePath) {
            return filePath.indexOf("ShadowMapSoftType")  > -1
                || filePath.indexOf("NoShadowMapShaderLib") > -1
                || filePath.indexOf("EmptyShadowManager") > -1
                || filePath.indexOf("EmptyShadowMapController") > -1;
        },
        removeFunc: function (filePath) {
            return filePath.indexOf("component/shadow/") > -1
                || filePath.indexOf("Shadow") > -1;
        }
    },


    debug: {
        remainFunc: function (filePath) {
            return filePath.indexOf("DebugConfig")  > -1;
        },
        removeFunc: function (filePath) {
            return filePath.indexOf("Debug") > -1;
        }
    }
};




function getExcludeModuleData(excludeModuleData) {
    var excludeModulesArr = null,
        relatedRemoveModuleArr = [];

    if(wdCb.JudgeUtils.isString(excludeModuleData)){
        if(excludeModuleData === ""){
            return {
                glslPathArr: [],
                remainFuncArr: [],
                removeFuncArr: [],
                removeLibArr: []
            };
        }

        excludeModulesArr = excludeModuleData.split(',').map(function(excludeModule){
            return excludeModule.trim();
        });
    }
    else{
        if(excludeModuleData.length === 0){
            return {
                glslPathArr: [],
                remainFuncArr: [],
                removeFuncArr: [],
                removeLibArr: []
            };
        }

        excludeModulesArr = excludeModuleData;
    }

    excludeModulesArr.forEach(function(excludeModule){
        var data = MODULE_TABLE[excludeModule];

        if(!data){
            throw new Error("error excludeModule: ", excludeModule);
            return;
        }

        if(!!data.removeModules){
            relatedRemoveModuleArr = relatedRemoveModuleArr.concat(data.removeModules);
        }
    });

    excludeModulesArr = excludeModulesArr.concat(relatedRemoveModuleArr);

    excludeModulesArr = arrayUtils.removeRepeatItems(excludeModulesArr);



    var glslPathArr = [],
        remainFuncArr = [],
        removeFuncArr = [],
        removeLibArr = [];


    excludeModulesArr.forEach(function(excludeModule){
        var data = MODULE_TABLE[excludeModule];

        if(!!data.removeLibs){
            removeLibArr = removeLibArr.concat(data.removeLibs);
        }

        if(!!data.glslPath){
            glslPathArr.push(data.glslPath);
        }

        if(!!data.remainFunc){
            remainFuncArr.push(data.remainFunc);
        }

        if(!!data.removeFunc){
            removeFuncArr.push(data.removeFunc);
        }
    });

    return {
        glslPathArr: arrayUtils.removeRepeatItems(glslPathArr),
        remainFuncArr: remainFuncArr,
        removeFuncArr: removeFuncArr,
        removeLibArr: arrayUtils.removeRepeatItems(removeLibArr)
    };
}


function filterFilesGlob(sourceFilesGlobs, excludeModuleData) {
    var remainFuncArr = excludeModuleData.remainFuncArr,
        removeFuncArr = excludeModuleData.removeFuncArr;

    return sourceFilesGlobs.filter(function (filePath) {
        for (var i = 0, len = remainFuncArr.length; i < len; i++) {
            var remainFunc = remainFuncArr[i];

            if (remainFunc(filePath)) {
                return true;
            }
        }


        for (var j = 0, len = removeFuncArr.length; j < len; j++) {
            var removeFunc = removeFuncArr[j];

            if (removeFunc(filePath)) {
                return false;
            }
        }

        return true;
    });
}


module.exports = {
    ExcludeModule: ExcludeModule,

    getExcludeModuleData: getExcludeModuleData,
    filterFilesGlob: filterFilesGlob
};
