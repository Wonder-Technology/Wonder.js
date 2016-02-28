module wd{
    export class VariableLib{
        //todo group?(common,cubemap...)

        public static a_position:ShaderVariable = {
            type:EVariableType.FLOAT_3,
            value:EVariableCategory.ENGINE
        };

        public static a_currentFramePosition:ShaderVariable = {
            type:EVariableType.FLOAT_3,
            value:EVariableCategory.ENGINE
        };

        public static a_nextFramePosition:ShaderVariable = {
            type:EVariableType.FLOAT_3,
            value:EVariableCategory.ENGINE
        };

        public static a_normal:ShaderVariable = {
            type:EVariableType.FLOAT_3,
            value:EVariableCategory.ENGINE
        };

        public static a_currentFrameNormal:ShaderVariable = {
            type:EVariableType.FLOAT_3,
            value:EVariableCategory.ENGINE
        };

        public static a_nextFrameNormal:ShaderVariable = {
            type:EVariableType.FLOAT_3,
            value:EVariableCategory.ENGINE
        };

        public static a_color:ShaderVariable = {
            type:EVariableType.FLOAT_3,
            value:EVariableCategory.ENGINE
        };

        public static a_texCoord:ShaderVariable = {
            type:EVariableType.FLOAT_2,
            value:EVariableCategory.ENGINE
        };

        public static a_tangent:ShaderVariable = {
            type:EVariableType.FLOAT_3,
            value:EVariableCategory.ENGINE
        };

        public static u_mMatrix:ShaderVariable = {
            type:EVariableType.FLOAT_MAT4,
            value:EVariableCategory.ENGINE
        };

        public static u_vMatrix:ShaderVariable = {
            type:EVariableType.FLOAT_MAT4,
            value:EVariableCategory.ENGINE
        };

        public static u_pMatrix:ShaderVariable = {
            type:EVariableType.FLOAT_MAT4,
            value:EVariableCategory.ENGINE
        };

        public static u_normalMatrix:ShaderVariable = {
            type:EVariableType.FLOAT_MAT3,
            value:EVariableCategory.ENGINE
        };

        public static u_samplerCube0:ShaderVariable = {
            type:EVariableType.SAMPLER_CUBE,
            value:EVariableCategory.ENGINE
        };

        public static u_sampler2D0:ShaderVariable = {
            type:EVariableType.SAMPLER_2D,
            value:EVariableCategory.ENGINE
        };

        public static u_sampler2D1:ShaderVariable = {
            type:EVariableType.SAMPLER_2D,
            value:EVariableCategory.ENGINE
        };

        public static u_lightMapSampler:ShaderVariable = {
            type:EVariableType.SAMPLER_2D,
            value:EVariableCategory.ENGINE
        };

        public static u_diffuseMapSampler:ShaderVariable = {
            type:EVariableType.SAMPLER_2D,
            value:EVariableCategory.ENGINE
        };

        public static u_specularMapSampler:ShaderVariable = {
            type:EVariableType.SAMPLER_2D,
            value:EVariableCategory.ENGINE
        };

        public static u_emissionMapSampler:ShaderVariable = {
            type:EVariableType.SAMPLER_2D,
            value:EVariableCategory.ENGINE
        };

        public static u_normalMapSampler:ShaderVariable = {
            type:EVariableType.SAMPLER_2D,
            value:EVariableCategory.ENGINE
        };

        public static u_mirrorSampler:ShaderVariable = {
            type:EVariableType.SAMPLER_2D,
            value:EVariableCategory.ENGINE
        };

        public static u_cameraPos:ShaderVariable = {
            type:EVariableType.FLOAT_3,
            value:EVariableCategory.ENGINE
        };

        public static u_refractionRatio:ShaderVariable = {
            type:EVariableType.FLOAT_1,
            value:EVariableCategory.ENGINE
        };

        public static u_reflectivity:ShaderVariable = {
            type:EVariableType.FLOAT_1,
            value:EVariableCategory.ENGINE
        };

        public static u_sourceRegion:ShaderVariable = {
            type:EVariableType.FLOAT_4,
            value:EVariableCategory.ENGINE
        };

        public static u_diffuseSourceRegion:ShaderVariable = {
            type:EVariableType.FLOAT_4,
            value:EVariableCategory.ENGINE
        };

        public static u_repeatRegion:ShaderVariable = {
            type:EVariableType.FLOAT_4,
            value:EVariableCategory.ENGINE
        };

        public static u_diffuseRepeatRegion:ShaderVariable = {
            type:EVariableType.FLOAT_4,
            value:EVariableCategory.ENGINE
        };

        public static u_combineMode:ShaderVariable = {
            type:EVariableType.NUMBER_1,
            value:EVariableCategory.ENGINE
        };

        public static u_mixRatio:ShaderVariable = {
            type:EVariableType.FLOAT_1,
            value:EVariableCategory.ENGINE
        };

        public static u_lightMapIntensity:ShaderVariable = {
            type:EVariableType.FLOAT_1,
            value:EVariableCategory.ENGINE
        };

        public static u_diffuse:ShaderVariable = {
            type:EVariableType.FLOAT_3,
            value:EVariableCategory.ENGINE
        };

        public static u_specular:ShaderVariable = {
            type:EVariableType.FLOAT_3,
            value:EVariableCategory.ENGINE
        };

        public static u_emission:ShaderVariable = {
            type:EVariableType.FLOAT_3,
            value:EVariableCategory.ENGINE
        };

        public static u_shininess:ShaderVariable = {
            type:EVariableType.FLOAT_1,
            value:EVariableCategory.ENGINE
        };

        public static u_lightModel:ShaderVariable = {
            type:EVariableType.NUMBER_1,
            value:EVariableCategory.ENGINE
        };

        public static u_isBothSide:ShaderVariable = {
            type:EVariableType.NUMBER_1,
            value:EVariableCategory.ENGINE
        };

        public static u_opacity:ShaderVariable = {
            type:EVariableType.FLOAT_1,
            value:EVariableCategory.ENGINE
        };

        public static u_ambient:ShaderVariable = {
            type:EVariableType.FLOAT_3,
            value:EVariableCategory.ENGINE
        };

        public static u_directionLights:ShaderVariable = {
            type:EVariableType.STRUCTURES,
            value:EVariableCategory.ENGINE
        };

        public static u_pointLights:ShaderVariable = {
            type:EVariableType.STRUCTURES,
            value:EVariableCategory.ENGINE
        };

        public static u_vpMatrixFromLight:ShaderVariable = {
            type:EVariableType.FLOAT_MAT4,
            value:EVariableCategory.ENGINE
        };

        public static u_lightPos:ShaderVariable = {
            type:EVariableType.FLOAT_3,
            value:EVariableCategory.ENGINE
        };

        public static u_farPlane:ShaderVariable = {
            type:EVariableType.FLOAT_1,
            value:EVariableCategory.ENGINE
        };

        public static u_interpolation:ShaderVariable = {
            type:EVariableType.FLOAT_1,
            value:EVariableCategory.ENGINE
        };
    }

    export type ShaderVariable = {
        type:EVariableType;
        value:any
    }
}

