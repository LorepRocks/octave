var octave = require('../controllers/octave.server.controller.js');
var pdf = require('../controllers/pdf.server.controller.js');
var user = require('../controllers/user.server.controller.js');

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

    app.route("/api/getActionPdf")
    .post(octave.getActionPdf);

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

    app.route("/api/getConcernAreasPDF")
    .get(octave.getConcernAreasPDF);

    app.route("/api/getConsequences")
    .post(octave.getConsequences);

    app.route("/api/getConsequencesPDF")
    .post(octave.getConsequencesPDF);

    app.route("/api/updateConcernArea")
    .post(octave.updateConcernArea);

    app.route("/api/deleteConcernArea")
    .post(octave.deleteConcernArea);

    app.route("/api/generatePdfRiskCriteria")
    .post(pdf.generatePdfRiskCriteria);

    app.route("/api/generatePdfCriticalActive")
    .post(pdf.generatePdfCriticalActive);

    app.route("/api/generatePdfAreaDocument")
    .post(pdf.generatePdfAreaDocument);

    app.route("/api/generatePDFRelative")
    .post(pdf.generatePDFRelative);

    app.route("/api/generatePdfAction")
    .post(pdf.generatePdfAction);

    app.route("/api/getUser")
    .post(user.getUser);

    app.route("/api/getUsers")
    .get(user.getUsers);

    app.route("/api/saveUser")
    .post(user.saveUser);

    app.route("/api/updateUser")
    .post(user.updateUser);

    app.route("/api/updatePasswordUser")
    .post(user.updatePasswordUser);

    app.route("/api/deleteUser")
    .post(user.deleteUser);

    app.route("/api/sessionActive")
    .post(user.sessionActive);

    app.route("/api/getSessionActive")
    .get(user.getSessionActive);

    app.route("/api/logout")
    .post(user.logout);

    app.route("/api/sendMailNewUser")
    .post(user.sendMailNewUser);

    app.route("/api/sendMailResetPassword")
    .post(user.sendMailResetPassword);

    app.route("/api/getSuggestedControls")
    .get(octave.getSuggestedControls);
};
