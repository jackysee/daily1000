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
        getInitialState: function(){
            return {text:''};
        },
        handleChange: function(){
            this.setState({
                text: this.refs.text.getDOMNode().value
            });
        },
        getWordCount: function(){
            return WordCounter.count(this.state.text);
        },
        render: function() {
            return (
                <div>
                    <textarea ref="text" className="form-control" onChange={this.handleChange}></textarea>
                    <div className="word-count">{this.getWordCount()} words written</div>
                </div>
            );
        }
    });

    var Main = React.createClass({
        render: function(){
            return (
                <div className="container">
                    <WritePad />
                </div>
            );
        }
    });

    React.renderComponent(<Main />, document.getElementById("app"));

})();
