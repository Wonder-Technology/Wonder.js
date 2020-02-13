# Wonder.js
Wonder.js is a Functional, High performance 3D WebGL Engine.


[![build](https://travis-ci.org/Wonder-Technology/Wonder.js.png)](https://travis-ci.org/Wonder-Technology/Wonder.js?branch%3Dmaster) [![Maintainability](https://api.codeclimate.com/v1/badges/7bc4aab721bd3aaa07b8/maintainability)](https://codeclimate.com/github/Wonder-Technology/Wonder.js/maintainability) [![Test Coverage](https://api.codeclimate.com/v1/badges/7bc4aab721bd3aaa07b8/test_coverage)](https://codeclimate.com/github/Wonder-Technology/Wonder.js/test_coverage) [![commit](https://img.shields.io/badge/commitizen-friendly-brightgreen.svg)](http://commitizen.github.io/cz-cli/) [![downloads-npm](https://img.shields.io/npm/dw/wonder.js.svg)](https://www.npmjs.com/package/wonder.js) [![GitHub release](https://img.shields.io/github/release/Wonder-Technology/Wonder.js.svg)](https://github.com/Wonder-Technology/Wonder.js/releases) [![GitHub Release Date](https://img.shields.io/github/release-date/Wonder-Technology/Wonder.js.svg)](https://github.com/Wonder-Technology/Wonder.js/releases) [![npm](https://img.shields.io/npm/l/wonder.js.svg)](https://github.com/Wonder-Technology/Wonder.js)







# Showcases

[![showcase1](https://www.wonder-3d.com/docs/showcase1/showcase1.png) ](https://www.wonder-3d.com/docs/showcase1/publish/showcase_publish_noWorker/index.html) 

# Design

- Functional Programming
- Functional Reactive Programming
- Microservice
- Job Pipeline
- Multi-Thread
- Data Oriented Design
- Data Driven
- ECS

# Feature

- GameObject And Component
- Multi-thread Render
- Texture
- Direction,Point Light
- Model and Scene
- Stream Load
- IMGUI
- Event
- Instance


# Document

- [Document](https://www.wonder-3d.com/docs/docs/doc1-1/)



# Getting Help

- [Official Site](https://www.wonder-3d.com/)
- [Forum](https://forum.wonder-3d.com/)




## Support Environment

### PC

- Chrome

- Firefox

- 360 browser(v10.0)

- qq browser(v10.4)

# Usage


- [Online Editor](https://editor.wonder-3d.com/)


Here show a cube example(more is in examples/ folder):

```html
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <title>cube</title>
</head>

<body>
    <script src="https://wonder-technology.github.io/wonder-demo.github.io/examples/wd.js"></script>

    <script>
        window.onload = function () {
            return wd.loadConfig(["https://wonder-technology.github.io/wonder-demo.github.io/examples/config/setting.json", "https://wonder-technology.github.io/wonder-demo.github.io/examples/config/"]).forEach(function (state) {
                return initSample(wd.unsafeGetState());
            })

            function _createBox(state) {
                var [state, material] = wd.createLightMaterial(state);

                var state = wd.setLightMaterialDiffuseColor(material, [0.0, 0.5, 0.2], state);
                var state = wd.setLightMaterialSpecularColor(material, [0.3, 0.1, 0.6], state);

                var [state, meshRenderer] = wd.createMeshRenderer(state);

                var [state, gameObject] = wd.createGameObject(state);

                var state = wd.addGameObjectLightMaterialComponent(gameObject, material, state);
                var state = wd.addGameObjectMeshRendererComponent(gameObject, meshRenderer, state);


                var [state, geometry] = wd.createBoxGeometry(state);


                var state = wd.addGameObjectGeometryComponent(gameObject, geometry, state);

                return [state, gameObject];
            };

            function _createCamera(state) {
                var [state, basicCameraView] = wd.createBasicCameraView(state);


                var state =
                    wd.activeBasicCameraView(
                        basicCameraView, state
                    );


                var [state, perspectiveCameraProjection] = wd.createPerspectiveCameraProjection(state);


                var state = wd.setPerspectiveCameraProjectionNear(perspectiveCameraProjection, 0.1, state);
                var state = wd.setPerspectiveCameraProjectionFar(perspectiveCameraProjection, 2000, state);
                var state = wd.setPerspectiveCameraProjectionFovy(perspectiveCameraProjection, 60, state);


                var [state, gameObject] = wd.createGameObject(state);

                var state = wd.addGameObjectBasicCameraViewComponent(gameObject, basicCameraView, state);


                var state = wd.addGameObjectPerspectiveCameraProjectionComponent(gameObject, perspectiveCameraProjection, state);

                var transform = wd.unsafeGetGameObjectTransformComponent(gameObject, state);

                var state = wd.setTransformLocalPosition(transform, [0, 10, 50], state);

                return [state, gameObject];
            };


            function _createDirectionLight(state) {
                var [state, light] = wd.createDirectionLight(state);

                var state = wd.setDirectionLightColor(light, [1.0, 0.0, 0.0], state);


                var [state, gameObject] = wd.createGameObject(state);


                var transform = wd.unsafeGetGameObjectTransformComponent(gameObject, state);

                var state = wd.setTransformLocalEulerAngles(transform, [0, 180, 0], state);


                var state = wd.addGameObjectDirectionLightComponent(gameObject, light, state);

                return [state, gameObject];
            };

            function initSample(state) {
                var [state, box] = _createBox(state);


                var state = wd.setAmbientLightColor([0.2, 0.2, 0.2], state);


                var [state, directionLightGameObject] = _createDirectionLight(state);


                var [state, cameraGameObject] = _createCamera(state);


                wd.startDirector(state);
            }
        };
    </script>
</body>
</html>
```


# How to build


```js
sudo yarn install //execute in project root dir
```

## for Chinese users

```js
npm install -g cyarn --registry=https://registry.npm.taobao.org

npm config set puppeteer_download_host=https://npm.taobao.org/mirrors

cyarn install //execute in project root dir
```


- [Reason的介绍和搭建Reason开发环境](https://www.cnblogs.com/chaogex/p/10528737.html)


# License
MIT Licence

# Donate

You are welcome to donate for Wonder.js project! Thanks very much!

微信支付：
![下载.png-6.5kB](./donate/杨元超微信支付二维码.png)

## Donors

[![liuxin2322](./donate/liuxin2322.jpg)](https://github.com/liuxin2322)
