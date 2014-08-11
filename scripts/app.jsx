/** @jsx React.DOM */

(function(){

    var WordCounter = {
        trim: function(s){
          return s.replace(/^\s+|\s+$/g, '');
        },
        replaceSymbols: function(s){
          return s.replace(/['";:,.?¿\-!¡]+/g, '');
        },
        replaceChinese: function(s){
          return s.replace(/[\u4e00-\u9a05]/g, '');
        },
        chineseCount: function(word) {
          return word.split(/[\u4e00-\u9a05]/).length -1;
        },
        count: function(text) {
            if(!text) return 0;
            return this.chineseCount(text) + this.trim(this.replaceSymbols(this.replaceChinese(text))).split(/\s+/).length;
        }
    };

    var WritePad = React.createClass({
        handleChange: function(){
            this.props.onChange(this.refs.text.getDOMNode().value);
        },
        getWordCount: function(){
            return WordCounter.count(this.props.text);
        },
        render: function() {
            return (
                <div>
                    <textarea ref="text" className="form-control" onChange={this.handleChange} value={this.props.text}></textarea>
                    <div className="word-count">{this.getWordCount()} words written</div>
                </div>
            );
        }
    });

    var Store = {
        getEmpty: function () {
            return {currentText: ''};
        },
        get: function () {
            var defer = Q.defer();
            if(!localStorage.app){
                localStorage.app = JSON.stringify({currentText: ''});
            }
            defer.resolve(JSON.parse(localStorage.app));
            return defer.promise;
        },
        saveText: function(text){
            var defer = Q.defer();
            var appState = JSON.parse(localStorage.app);
            appState.currentText = text;
            localStorage.app = JSON.stringify(appState);
            defer.resolve(appState);
            return defer.promise;
        }
    };

    var Main = React.createClass({
        getInitialState: function() {
            return Store.getEmpty();
        },
        componentDidMount: function() {
            Store.get().then(function(s){
                this.setState(s);
            }.bind(this));
        },
        updateCurrentText: function(text){
            this.setState({currentText:text});
            Store.saveText(text);
        },
        render: function(){
            return (
                <div className="container">
                    <WritePad text={this.state.currentText} onChange={this.updateCurrentText}  />
                </div>
            );
        }
    });

    React.renderComponent(<Main />, document.getElementById("app"));

})();
