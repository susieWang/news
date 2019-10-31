function HtmlReplace(options) {
    options= options || {};
    this.startFlag = options.startFlag || '<!--webpack-replace-start-->';
    this.endFlag = options.endFlag || '<!--webpack-replace-end-->';
    this.content = options.content || '';
    this.replaceStr = options.replaceStr;
    this.isDevMode = options.isDevMode || false;
}

HtmlReplace.prototype.apply = function(compiler) {
    var self = this;
    compiler.plugin('compilation', function(compilation) {
        compilation.plugin('html-webpack-plugin-before-html-processing', function(htmlPluginData, callback) {
            //替换处理
            if (!self.isDevMode) {
                htmlPluginData.html = htmlPluginData.html.replace(new RegExp(self.startFlag + '([\\s\\S]*)' + self.endFlag), self.content);
            }
            if(self.replaceStr){
                for(var key in self.replaceStr) {
                    htmlPluginData.html = htmlPluginData.html.replace(key, self.replaceStr[key]);
                }
            }
            callback(null, htmlPluginData);
        });
    });

};

module.exports = HtmlReplace;