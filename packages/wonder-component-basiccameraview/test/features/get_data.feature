Feature: Get Data
    As a Get Data
    I want to get basicCameraView data
    So that I can register it

    Scenario: componentName
        When I get data
        Then componentName should be "BasicCameraView"

    Scenario: set config
        When I get data
        And create a state with config
        Then the config is setted

    Scenario: create a basicCameraView
        When I get data
        And create a state
        Then createComponentFunc should create a basicCameraView

    Scenario: add a basicCameraView to a gameObject
        Given create a gameObject
        When I get data
        And create a state
        And create a basicCameraView
        And add the basicCameraView to the gameObject
        Then get the gameObject's basicCameraView should be the added one

    Scenario: add a basicCameraView to a gameObject which alreay has one
        Given create a gameObject
        When I get data
        And create a state
        And create two basicCameraViews
        And add the first basicCameraView to the gameObject
        And add the second basicCameraView to the gameObject
        Then get the gameObject's basicCameraView should be the second one

    Scenario: get all basicCameraViews
        Given create two gameObjects
        When I get data
        And create a state
        And create two basicCameraViews
        And add them to the gameObjects one by one
        Then getAllComponentsFunc should get the two basicCameraViews

    Scenario: judge whether a gameObject has a basicCameraView
        Given create a gameObject
        When I get data
        And create a state
        And create a basicCameraView
        And add the basicCameraView to the gameObject
        Then hasComponentFunc should return true

    Scenario: get a basicCameraView's gameObject
        Given create a gameObject
        When I get data
        And create a state
        And create a basicCameraView
        And add the basicCameraView to the gameObject
        Then getGameObjectsFunc should return [gameObject]

    Scenario: basicCameraView not be added to a gameObject
        Given create a gameObject
        When I get data
        And create a state
        And create a basicCameraView
        Then getGameObjectsFunc should return empty

    Scenario: get unknown data
        When I get data
        And create a state
        And create a basicCameraView
        Then get basicCameraView's unknown data should error: "unknown dataName"

    Scenario: set unknown data
        When I get data
        And create a state
        And create a basicCameraView
        Then set basicCameraView's unknown data should error: "unknown dataName"

    Rule: active

        Background: prepare data
            When I get data
            And create a state

        Scenario: is active
            When create a basicCameraView
            And set basicCameraView's active to false
            Then get basicCameraView's active should return false

        Scenario: should only has one active basicCameraView
            When create three basicCameraViews as cameraView1, cameraView2, cameraView3
            And set cameraView1's active to true
            And set cameraView2's active to true
            And set cameraView3's active to true
            Then get cameraView1's active should return false
            Then get cameraView2's active should return false
            Then get cameraView3's active should return true

        Scenario: unactive one should not affect other ones
            When create two basicCameraViews as cameraView1, cameraView2
            And set cameraView1's active to true
            And set cameraView2's active to false
            Then get cameraView1's active should return true
            Then get cameraView2's active should return false
