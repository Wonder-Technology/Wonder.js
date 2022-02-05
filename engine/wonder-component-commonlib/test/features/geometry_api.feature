Feature: Geometry API
    As a Geometry API
    I want to provide geometry related api
    So that I can use it to operate geometry

    Background: prepare
        Given prepare register
        And register geometry data
        And create and set all component states

    Scenario Outline: createSphereGeometry
        When create a sphere geometry with <Radius>, <Bands>
        Then its vertex data should be correct

        Examples:
            | Radius | Bands |
            | 0.5    | 2     |

    Scenario Outline: createPlaneGeometry
        When create a plane geometry with <Width>, <Height>, <WidthSegments>, <HeightSegments>
        Then its vertex data should be correct

        Examples:
            | Width | Height | WidthSegments | HeightSegments |
            | 10.0  | 5.0    | 2             | 2              |

    Scenario: createTriangleGeometry
        When create a triangle geometry
        Then its vertex data should be correct

    Scenario Outline: computeTangents
        When create a sphere geometry with <Radius>, <Bands>
        And compute the geometry's tangents
        Then it shouldn't has NaN

        Examples:
            | Radius | Bands |
            | 2.0    | 2     |
