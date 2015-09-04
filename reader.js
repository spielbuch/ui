
Reader = {};
Reader.init = function () {
    if (!Spielebuch) {
        Spielebuch.error(500, 'Please install package spielebuch:core by typing \'meteor add spielebuch:core\' into your console.');
        Session.set('readerText', '');
        return false;
    }
    Reader.autoupdate();
    return true;
};

Reader.autoupdate = function () {
    Tracker.autorun(function () {
        if(Session.get('spielebuchReady')){
            var text = Reader.parseKeywordText(Session.get('spielebuchText'));
            console.log(text);
            Session.set('readerText', text);
        }
    });
};

Reader.parseKeywordText = function (textarray) {
    var re = /[^[\]]+(?=])/, _id, gameobject, text = '';
    if (Array.isArray(textarray)) {
        _.map(textarray, function (textitem) {
            var foundObject = re.exec(textitem);
            if (foundObject !== null) {
                _id = foundObject[0];
                gameobject = Spielebuch.Gameobjects.findOne(_id);
                if (!gameobject) {
                    Spielebuch.error('404', 'Could not find Gameobject (' + _id + ') in database.');
                }else {
                    textitem = textitem.replace(new RegExp('\\[' + _id + '\\]', 'g'),
                        '<a href=\"#\" class=\"keyword hover\" ' +
                        'data-_id=\"' + _id + '\">' + gameobject.name +
                        '</a>'
                    );
                }
            }
            text += textitem + ' ';
        });
        return text;
    }
    Spielebuch.error(500, 'Spielebuch.getText() should return an array, but instead returned a ' + typeof textarray + '.');
    return '';
};