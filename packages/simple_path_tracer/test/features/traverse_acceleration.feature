Feature: Traverse Acceleration
    As a Traverse Acceleration
    I want to traverse acceleration
    So that I can get intersect result

    # Rule: build by middle

    Rule: build by lbvh

        Background: prepare
            Given prepare sandbox
            And create instances and their aabbs
            And build bvh with minCount=1
            And build acceleartion with bvh

        Scenario: not intersect case1
            When traverse acceleartion that point is outside aabb
            Then should not intersect

        Scenario: not intersect case2
            When traverse acceleartion that point not intersect with instances
            Then should not intersect

        Scenario: intersect case1
            When traverse acceleartion
            Then should intersect

        Scenario: intersect case2
            When traverse acceleartion
            Then should intersect

    Rule: find closest hit

        Scenario: find closest hit
            Given prepare sandbox
            And create instances and their aabbs that are overlap
            And build bvh with minCount=1
            And build acceleartion with bvh
            When traverse acceleartion
            Then should intersect with the closet hit