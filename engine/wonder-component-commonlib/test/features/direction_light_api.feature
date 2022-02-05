Feature: DirectionLight API
    As a DirectionLight API
    I want to provide directionLight related api
    So that I can use it to operate directionLight

    Rule: getDirection

        Background: prepare
            Given prepare register
            And register transform data
            And register directionLight data
            And create and set all component states
            And create a gameObject
            And create a transform
            And add the transform to the gameObject
            And set the transform's local euler angles to <X1>, <Y1>, <Z1>
            And create a directionLight
            And add the directionLight to the gameObject
            When get the directionLight's direction as d1

        Scenario Outline: direction shouldn't affected by scale if scale is always postive
            When set the transform's local scale to <X2>, <Y2>, <Z2>
            And get the directionLight's direction as d2
            Then d1 should equal d2

            Examples:
                | X1   | Y1   | Z1   | X2   | Y2   | Z2   |
                | 45.0 | 22.0 | 66.0 | 0.45 | 0.45 | 0.45 |

        Scenario Outline: direction should be affected by scale if scale change to negative from positive
            When set the transform's local scale to <X2>, <Y2>, <Z2>
            And get the directionLight's direction as d2
            Then d1 should not equal d2

            Examples:
                | X1   | Y1   | Z1   | X2    | Y2   | Z2   |
                | 45.0 | 22.0 | 66.0 | -0.45 | 0.45 | 0.45 |

