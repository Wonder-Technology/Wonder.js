Feature: Get Data
    As a Get Data
    I want to get arcballCameraController data
    So that I can register it

    Scenario: componentName
        When I get data
        Then componentName should be "ArcballCameraController"

    Scenario: set config
        When I get data
        And create a state with config
        Then the config is setted

    Scenario: create a arcballCameraController
        When I get data
        And create a state
        Then createComponentFunc should create a arcballCameraController
        And mark the arcballCameraController dirty
        And set the arcballCameraController's all data to default data

    Scenario: add a arcballCameraController to a gameObject
        Given create a gameObject
        When I get data
        And create a state
        And create a arcballCameraController
        And add the arcballCameraController to the gameObject
        Then get the gameObject's arcballCameraController should be the added one

    Scenario: add a arcballCameraController to a gameObject which alreay has one
        Given create a gameObject
        When I get data
        And create a state
        And create two arcballCameraControllers
        And add the first arcballCameraController to the gameObject
        And add the second arcballCameraController to the gameObject
        Then get the gameObject's arcballCameraController should be the second one

    Scenario: get all arcballCameraControllers
        Given create two gameObjects
        When I get data
        And create a state
        And create two arcballCameraControllers
        And add them to the gameObjects one by one
        Then getAllComponentsFunc should get the two arcballCameraControllers

    Scenario: get all dirty arcballCameraControllers
        Given create two gameObjects
        When I get data
        And create a state
        And create two arcballCameraControllers
        And mark the first arcballCameraController not dirty
        And add them to the gameObjects one by one
        Then get all dirty arcballCameraControllers should get [the second arcballCameraController]

    Scenario: clear all dirty arcballCameraControllers
        Given create two gameObjects
        When I get data
        And create a state
        And create two arcballCameraControllers
        And mark the first arcballCameraController not dirty
        And add them to the gameObjects one by one
        And clear all dirty arcballCameraControllers
        Then get all dirty arcballCameraControllers should get empty

    Scenario: judge whether a gameObject has a arcballCameraController
        Given create a gameObject
        When I get data
        And create a state
        And create a arcballCameraController
        And add the arcballCameraController to the gameObject
        Then hasComponentFunc should return true

    Scenario: get a arcballCameraController's gameObject
        Given create a gameObject
        When I get data
        And create a state
        And create a arcballCameraController
        And add the arcballCameraController to the gameObject
        Then getGameObjectsFunc should return [gameObject]

    Scenario: arcballCameraController not be added to a gameObject
        Given create a gameObject
        When I get data
        And create a state
        And create a arcballCameraController
        Then getGameObjectsFunc should return empty

    Scenario: get unknown data
        When I get data
        And create a state
        And create a arcballCameraController
        Then get arcballCameraController's unknown data should error: "unknown dataName"

    Scenario: set unknown data
        When I get data
        And create a state
        And create a arcballCameraController
        Then set arcballCameraController's unknown data should error: "unknown dataName"

    Rule: get arcballCameraController's default data

        Background: prepare data
            When I get data
            And create a state
            And create a arcballCameraController

        Scenario: get default distance
            Then get arcballCameraController's distance should return default data


    Rule: operate distance

        Background: prepare data
            When I get data
            And create a state
            And create a arcballCameraController

        Scenario: set distance
            When set arcballCameraController's distance to 20
            Then get arcballCameraController's distance should return 20

        Scenario: constrain distance
            When set arcballCameraController's min disntance to 2
            And set arcballCameraController's distance to 1
            Then get arcballCameraController's distance should return 2

    Rule: operate arcballCameraController data

        Background: prepare data
            When I get data
            And create a state
            And create a arcballCameraController

        Scenario: operate min distance
            When set arcballCameraController's min distance
            Then get arcballCameraController's min distance should return the setted data

        Scenario: operate wheel speed
            When set arcballCameraController's wheel speed
            Then get arcballCameraController's wheel speed should return the setted data

        Scenario: operate move speedX
            When set arcballCameraController's move speedX
            Then get arcballCameraController's move speedX should return the setted data

        Scenario: operate move speedY
            When set arcballCameraController's move speedY
            Then get arcballCameraController's move speedY should return the setted data

        Scenario: operate rotate speed
            When set arcballCameraController's rotate speed
            Then get arcballCameraController's rotate speed should return the setted data

        Scenario: operate phi
            When set arcballCameraController's phi
            Then get arcballCameraController's phi should return the setted data

        Scenario: operate target
            When set arcballCameraController's target
            Then get arcballCameraController's target should return the setted data

    Rule: operate theta

        Background: prepare data
            When I get data
            And create a state
            And create a arcballCameraController

        Scenario: set theta
            When set arcballCameraController's theta to 1
            Then get arcballCameraController's theta should return 1

        Scenario: constrain theta
            When set arcballCameraController's theta margin to 1
            When set arcballCameraController's theta to 3
            Then get arcballCameraController's theta should return pi - 1

    Rule: operate theta margin

        Background: prepare data
            When I get data
            And create a state
            And create a arcballCameraController

        Scenario: set theta margin
            When set arcballCameraController's theta margin to 1
            Then get arcballCameraController's theta margin should return 1

        Scenario: set theta margin should constrain theta
            When set arcballCameraController's theta to 3
            And set arcballCameraController's theta margin to 1
            Then get arcballCameraController's theta should return pi - 1