var octave = require('../controllers/octave.server.controller.js');

module.exports = function(app) {

    app.route("/api/activeRegistry/")
        .post(octave.activeRegistry);

    app.route("/api/getRiskCriteria")
        .get(octave.getRiskCriteria);

    app.route("/api/getimpactArea")
        .get(octave.getimpactArea);

    app.route("/api/saveImpactArea")
        .post(octave.saveImpactArea);

    app.route("/api/saveRiskCriteria/")
        .post(octave.saveRiskCriteria);

    app.route("/api/getActives/")
        .get(octave.getActives);

    app.route("/api/saveCriticalActive")
        .post(octave.saveCriticalActive);

    app.route("/api/saveContainer")
        .post(octave.saveContainer);

    app.route("/api/getContainerByType")
       .post(octave.getContainerByType);

    app.route("/api/saveActiveContainer")
      .post(octave.saveActiveContainer);

    app.route("/api/getActivesExcludeContainer")
    .post(octave.getActivesExcludeContainer);

    app.route("/api/updateIndiceImpactArea")
    .post(octave.updateIndiceImpactArea);

    app.route("/api/getCriticalActive")
    .get(octave.getCriticalActive);

    app.route("/api/saveConcernArea")
    .post(octave.saveConcernArea);

    app.route("/api/getRelativeRisk")
    .get(octave.getRelativeRisk);

    app.route("/api/getAction")
    .get(octave.getAction);

    app.route("/api/getControls")
    .post(octave.getControls);

    app.route("/api/saveControl")
    .post(octave.saveControl);

    app.route("/api/updateControl")
    .post(octave.updateControl);

    app.route("/api/deleteControl")
    .post(octave.deleteControl);

    app.route("/api/updateActive")
    .post(octave.updateActive);

    app.route("/api/deleteActive")
    .post(octave.deleteActive);

    app.route("/api/updateCriticalActive")
    .post(octave.updateCriticalActive);

    app.route("/api/deleteCriticalActive")
    .post(octave.deleteCriticalActive);

    app.route("/api/updateRiskCriteria")
    .post(octave.updateRiskCriteria);

    app.route("/api/deleteRiskCriteria")
    .post(octave.deleteRiskCriteria);

    app.route("/api/getContainers")
    .get(octave.getContainers);

    app.route("/api/updateContainer")
    .post(octave.updateContainer);

    app.route("/api/deleteContainer")
    .post(octave.deleteContainer);

    app.route("/api/getActivesInContainer")
    .post(octave.getActivesInContainer);

    app.route("/api/getConcernAreas")
    .get(octave.getConcernAreas);
};
