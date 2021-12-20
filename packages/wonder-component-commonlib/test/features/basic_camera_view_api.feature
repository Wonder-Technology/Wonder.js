Feature: BasicCameraView API
    As a BasicCameraView API
    I want to provide basicCameraView related api
    So that I can use it to operate basicCameraView

    Background: prepare data
        Given prepare register
        And register basicCameraView data

    Scenario Outline: getViewWorldToCameraMatrix
        Given register transform data
        And create and set all component states
        And create a gameObject
        And create a transform
        And add the transform to the gameObject
        And set the transform's local position to <X1>, <Y1>, <Z1>
        And set the transform's local rotation to <X2>, <Y2>, <Z2>, <W2>
        And update the transform
        And create a basicCameraView
        And add the basicCameraView to the gameObject
        When get the basicCameraView's viewWorldToCameraMatrix
        Then it should be the invert of the transform's localToWorldMatrix

        Examples:
            | X1  | Y1  | Z1  | X2  | Y2  | Z2  | W2  |
            | 1.0 | 2.0 | 3.0 | 1.0 | 2.0 | 3.0 | 2.5 |


    Rule: getActiveCameraView

        Background: prepare data
            Given create and set all component states
            And create two gameObjects
            And create two basicCameraViews as cameraView1, cameraView2
            And add them to the gameObjects one by one

        Scenario: test has none
            And set cameraView1's active to false
            And set cameraView2's active to false
            When get active basicCameraView
            Then it should return null

        Scenario: test has one
            And set cameraView1's active to true
            And set cameraView2's active to false
            When get active basicCameraView
            Then it should return cameraView1

        # Scenario: if has >= 2, contract error
        #     Given open debug
        #     And set cameraView1's active to true
        #     And set cameraView2's active to true
        #     When get active basicCameraView
        #     Then should contract error: "expect only has one active cameraView at most"
