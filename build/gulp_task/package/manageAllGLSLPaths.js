var fs = require("fs-extra");

var GLSLPath = {
        CORE:"core",

        EXTENSION_SHADOW:"extension_shadow",
        EXTENSION_MATERIAL_BITMAPFONT:"extension_material_bitmapFont",
        EXTENSION_MATERIAL_COMMON:"extension_material_common",
        EXTENSION_MATERIAL_GRASS:"extension_material_grass",
        EXTENSION_MATERIAL_MIRROR:"extension_material_mirror",
        EXTENSION_MATERIAL_TERRAIN:"extension_material_terrain",
        EXTENSION_MATERIAL_WATER:"extension_material_water",
        EXTENSION_PROCEDURALTEXTURE:"extension_proceduralTexture"
};

function getAllGLSLPaths() {
    return {
        core:"src/renderer/shader/chunk/glsl/**/*.glsl",

        extension_shadow:"extension/shadow/**/*.glsl",
        extension_material_bitmapFont:"extension/material/bitmapFont/**/*.glsl",
        extension_material_common:"extension/material/common/**/*.glsl",
        extension_material_grass:"extension/material/grass/**/*.glsl",
        extension_material_mirror:"extension/material/mirror/**/*.glsl",
        extension_material_terrain:"extension/material/terrain/**/*.glsl",
        extension_material_water:"extension/material/water/**/*.glsl",
        extension_proceduralTexture:"extension/procedural_texture/**/*.glsl"
    }
}


function filterGLSLPaths(excludeModuleData) {
    var excludeGLSLPathArr = excludeModuleData.glslPathArr,
        glslPathArr = [];

    var allGLSLPaths = getAllGLSLPaths();

    for(var name in allGLSLPaths){
        if(allGLSLPaths.hasOwnProperty(name)){
            var glslPath = allGLSLPaths[name];

            if(excludeGLSLPathArr.indexOf(name) === -1){
                glslPathArr.push(glslPath);
            }
        }
    }

    return glslPathArr;
}


module.exports = {
    GLSLPath: GLSLPath,

    filterGLSLPaths: filterGLSLPaths
};

