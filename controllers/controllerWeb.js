function controladorGetForm(req,res) {
    res.status(500)
    res.sendFile(__dirname + '/index.html');
}

exports.controladorGetForm = controladorGetForm;