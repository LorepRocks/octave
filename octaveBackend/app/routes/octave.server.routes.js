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
};
