Reader = {};

Reader.update = function () {
    if (!Spielebuch) {
        console.error(500, 'Please install package spielebuch:core by typing \'meteor add spielebuch:core\' into your console.');
        return false;
    }
    Session.set('text', Reader.parseKeywordText(Spielebuch.getText()));
    return Reader.parseKeywordText(Spielebuch.getText());
};

Reader.parseKeywordText = function (textarray) {
    var re = /[^[\]]+(?=])/, _ids = [];
    if (Array.isArray(textarray)) {
        _.map(textarray, function (text) {
            _ids = re.exec(text);
            console.log(text);
            console.log(_ids);
            _.forEach(_ids, function (_id) {
                var gameobject = Spielebuch.Gameobjects.findOne(_id);
                if (!gameobject) {
                    console.error('404', 'Could not find Gameobject ('+_id+') in database.');
                    return;
                }
                text = text.replace(new RegExp('\\[' + _id + '\\]', 'g'),
                    '<a href=\"#\" class=\"keyword hover\" ' +
                    'data-_id=\"' + _id + '\">' + gameobject.name +
                    '</a>'
                );
            });
            return text + ' ';
        });
        return textarray;
    }
    console.error(500, 'Spielebuch.getText() should return an array, but instead returned a ' + typeof textarray + '.');
    return [];
};