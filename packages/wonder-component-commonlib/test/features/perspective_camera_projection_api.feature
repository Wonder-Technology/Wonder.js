Feature: PerspectiveCameraProjection API
    As a PerspectiveCameraProjection API
    I want to provide perspectiveCameraProjection related api
    So that I can use it to operate perspectiveCameraProjection

    Rule: updatePerspectiveCameraProjection

        Background: prepare
            Given open debug
            And prepare register
            And register perspectiveCameraProjection data
            And create and set all component states
            And create a perspectiveCameraProjection
            And set the perspectiveCameraProjection's near to <Near>
            And set the perspectiveCameraProjection's far to <Far>
            And set the perspectiveCameraProjection's fovy to <Fovy>

        Scenario Outline: set aspect
            Given set the perspectiveCameraProjection's aspect to <Aspect>
            When update the perspectiveCameraProjection
            Then the perspectiveCameraProjection's pMatrix should be builded

            Examples:
                | Near | Far    | Fovy | Aspect |
                | 0.2  | 1000.0 | 60.0 | 1.0    |

        Scenario Outline: set canvas size instead of aspect
            When update the perspectiveCameraProjection with canvas size: <Width>, <Height>
            Then the perspectiveCameraProjection's pMatrix should be builded

            Examples:
                | Near | Far    | Fovy | Width | Height |
                | 0.2  | 1000.0 | 60.0 | 50    | 50     |