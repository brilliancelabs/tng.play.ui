describe("PLAY setup process", function () {
    var app;

    beforeEach(function () {
        app = angular.module('TnG', []);
    });

    describe("continuePlaySetup service", function () {
        it("should begin with the chooser view");
        it("should render choose_clubset view as the next step");
        it("should render choose_course view as the next step");
        it("should render choose_course_starting_hole view as the next step");
        it("should load the TRACK process as the next step");
    });

    describe("trackPlay service", function () {
        it("should begin with track_club view");
        it("> track_club view should have the current shot");
        it("should render track_mood view as the next step");
        it("should render track_whats_next view as the next step");
    });

    describe("editTracking service", function () {
        it("should not be offered as an option if there is no tracked-hole data");
        it("should render choose_course_starting_hole view if tracked-hole data is empty")
        it("should render which_shot view as the next step if there is more than one shot");
        it("should NOT render which_shot view as the next step if there is only one shot");
    });
});