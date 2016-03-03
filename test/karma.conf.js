module.exports = function(config) {
  config.set({

    // base path that will be used to resolve all patterns (eg. files, exclude)
    basePath: '../',

    // frameworks to use
    // available frameworks: https://npmjs.org/browse/keyword/karma-adapter
    frameworks: ['jasmine'],


    // list of files / patterns to load in the browser
    files: [
        //'src/math/*.js',
        'dist/wd.innerLib.js',
        'dist/wd.debug.js',

        'lib/outer/cannon/cannon.js',

        'test/helper/jquery.js',
        'test/helper/yTool.js',

        'test/helper/jsExtend.js',
        'test/helper/jasmine/**',
        'test/helper/sinonJs/*.js',
        'test/helper/yoop/yOOP.js',
        'test/unit/**/*Tool.js',
        'test/unit/*Tool.js',

        //'test/unit/**',

        'test/unit/texture/**',

        //'test/unit/**/*MaterialSpec.js',
        //'test/unit/**/MaterialSpec.js',
        //
        //'test/unit/**/MapManager*',

        //'test/unit/renderer/**',
        //'test/unit/renderer/renderTargetRenderer/**',

        //'test/unit/**/*ProceduralShaderLib*',

        //'test/unit/**/*ShaderSpec*',

        //'test/unit/**/renderWebGL*',
        //'test/unit/**/*CommandSpec*',

        //'test/unit/renderer/**/DiffuseMapShaderLib*',
        //
        //'test/unit/renderer/**/LightMapShaderLib*',
        //
        //

        //'test/unit/**/lod/*',

        //'test/unit/**/lod/*',

        //'test/unit/**/CameraController*',


        //'test/unit/**/GeometryData*',
        //'test/unit/**/BufferContainer*',

        //'test/unit/**/Shader*',
        //'test/unit/**/shaderLibSpec*',
        //'test/unit/**/*Shader*',

        //'test/unit/**/*animation*',
        //'test/unit/component/**/*Animation*.js',
        //'test/unit/component/**/morphAnimation*.js',

        //'test/unit/**/GLTFParserSpec*',
        //'test/unit/**/GLTFAssemblerSpec*',

        //'test/unit/**/Debug*',

        //'test/unit/**/EntityObjectSpec*',

        //'test/unit/component/physics/**/eventSpec*',

        //'test/unit/**/OctreeSpec*',
        //'test/unit/**/CollisionDetectorSpec*',
        //'test/unit/**/BoundingRegionUtilsSpec*',

        //'test/unit/**/SourceLightSpec*',

        //'test/unit/**/RigidBodySpec*',

        //'test/unit/**/MirrorRender*',


        //'test/unit/**/ColorSpec*',

        //'test/unit/**/interactionUISpec*',
        //'test/unit/**/TransitionSpec*',
        //'test/unit/**/SpriteTransitionSpec*',
        //'test/unit/**/TransitionManagerSpec*',


        //'test/unit/**/MainSpec*',

        //'test/unit/component/event/eventSpec*',

        //'test/unit/**/ui/**',
        //'test/unit/**/UIObjectSpec*',
        //
        //
        //'test/unit/**/ButtonSpec*',
        //'test/unit/**/UIStateMachineSpec*',
        //
        //'test/unit/**/FontSpec*',
        //'test/unit/**/PlainFontSpec*',
        //'test/unit/**/UIRendererSpec*',
        //'test/unit/**/BitmapFontSpec*',
        //
        //'test/unit/**/DirectorSpec*',
        //
        //'test/unit/**/ProgressBarSpec*',
        //
        //'test/unit/**/ImageSpec*',
        //
        //'test/unit/**/ThreeDTransformSpec.js',
        //'test/unit/**/RectTransformSpec*',
        //'test/unit/**/TransformSpec*',
        //'test/unit/**/component/**',
        //'test/unit/**/PanelSpec*',
        //
        //
        //'test/unit/**/LightShaderLibSpec*',
        //
        //'test/unit/**/SceneDispatcherSpec*',
        //'test/unit/**/GameObjectSceneSpec*',
        //
        //'test/unit/**/MathUtils*',
        //'test/unit/**/rayPicking*',
        //'test/unit/**/AABBShapeSpec*',
        //'test/unit/**/SphereShapeSpec*',
        //'test/unit/**/ActionManagerSpec*',
        //'test/unit/**/TwoDShadow*Spec.js',
        //'test/unit/**/ProgramSpec.js',
        //'test/unit/**/*CustomGeo*.js',
        //'test/unit/**/SphereColliderSpec.js',
        //'test/unit/**/*ColliderSpec.js',
        //'test/unit/**/colliderSpec.js',
        //'test/unit/**/collider/optimizeSpec.js',
        //'test/unit/**/collider/*',
        //'test/unit/**/physics/*.js',
        //'test/unit/**/physics/**',
        //'test/unit/**/physics/physicsSpec*',
        //'test/unit/**/physics/dispose*',
        //'test/unit/**/physics/**/event*',
        //'test/unit/**/physics/optimize*',
        //'test/unit/**/physics/**/impulseSpec*',
        //'test/unit/**/physics/**/damping*',
        //'test/unit/**/physics/**/collision*',
        //'test/unit/**/physics/**/bodyType*',
        //'test/unit/**/physics/**/bounce*',
        //'test/unit/**/physics/**/constraint*',
        //'test/unit/**/physics/**/compound*',
        //'test/unit/**/GameObjectSpec.js',
        //'test/unit/**/*Shape*.js',
        //'test/unit/**/Arcball*',
        //'test/unit/**/FlyCameraController*',
      //  'test/unit/**/scriptSpec.js',
      //
      //  'test/unit/**/*ControllerSpec.js',
      //'test/unit/renderer/shadowMapSpec.js',
      //'test/unit/core/Tran*.js',
      //  'test/unit/asset/*.js',
      //  'test/unit/asset/obj/*.js',
      //  'test/unit/asset/obj/OBJParserSpec.js',
      //  'test/unit/asset/loaderSpec.js',
        //'test/unit/asset/wd/WDParserSpec.js',
        //'test/unit/asset/wd/WDBuilderSpec.js',
        //'test/unit/math/*.js',
        //'test/unit/component/**/GeometrySpec.js',
        //'test/unit/component/**/TerrainGeometrySpec.js',
        //'test/unit/component/**/ModelGeometrySpec.js',
        //'test/unit/**/CommonBufferContainerSpec.js',
        //'test/unit/**/MorphBufferContainerSpec.js',
        //'test/unit/core/*.js',
        //'test/unit/device/*.js',
        //'test/unit/event/**',
        //'test/unit/event/mouseEv*.js',
        //'test/unit/event/customEv*.js',
        //'test/unit/event/keyboardEv*.js',
        //'test/unit/event/domEv*.js',
        //'test/unit/utils/**',
        //'test/unit/video/**',

        //{pattern: 'src/**/*.js.map', watched: false, included: false, served: true},
        //{pattern: 'src/**/*.ts', watched: false, included: false, served: true}
        {pattern: 'test/res/*', watched: false, included: false, served: true},
    {pattern: 'test/res/**', watched: false, included: false, served: true}
    ],


    // list of files to exclude
    exclude: [
        '**/temp/*'
    ],


    // preprocess matching files before serving them to the browser
    // available preprocessors: https://npmjs.org/browse/keyword/karma-preprocessor
    preprocessors: {
    },


    // test results reporter to use
    // possible values: 'dots', 'progress'
    // available reporters: https://npmjs.org/browse/keyword/karma-reporter
    reporters: ['progress'],


    // web server port
    port: 9876,


    // enable / disable colors in the output (reporters and logs)
    colors: true,


    // level of logging
    // possible values: config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
    logLevel: config.LOG_INFO,


    // enable / disable watching file and executing tests whenever any file changes
    autoWatch: true,


    // start these browsers
    // available browser launchers: https://npmjs.org/browse/keyword/karma-launcher
    browsers: ['Chrome'],


    // Continuous Integration mode
    // if true, Karma captures browsers, runs the tests and exits
    singleRun: false
  });
};
