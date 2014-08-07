/** @jsx React.DOM */

var Main = React.createClass({
    render: function(){
        return (
            <div class="container">
                <h1>Daily Journal</h1>
                <textarea></textarea>
            </div>
        );
    }
});

React.renderComponent(<Main />, document.body);
