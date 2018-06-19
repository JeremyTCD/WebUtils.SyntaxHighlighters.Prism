﻿var Prism = require('prismjs');
var PrismLanguageLoader = require('prismjs/components/index.js');
var components = require('prismjs/components.js');
var languageNames = Object.keys(components.languages).filter(languageName => languageName !== 'meta');

// Webpack must include all languages
PrismLanguageLoader(languageNames);

module.exports = {
    highlight: function (callback, code, languageAlias) {
        var result = Prism.highlight(code, Prism.languages[languageAlias], languageAlias);

        callback(null /* errors */, result);
    },
    getAliases: function (callback) {
        var result = [];

        for (var languageName of languageNames) {
            result.push(languageName);

            var aliases = components.languages[languageName].alias;
            if (!aliases) {
                continue;
            }
            if (typeof aliases === 'string') {
                result.push(aliases);
            } else if (Array.isArray(aliases)) {
                for (var alias of aliases) {
                    result.push(alias);
                }
            }
        }

        callback(null /* errors */, result);
    }
};