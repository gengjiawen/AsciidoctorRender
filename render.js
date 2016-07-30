var AsciidoctorEditor = React.createClass({
  getInitialState: function() {
//            return {value: 'Type some *asciidoctor* here!'};
    return {value: `= Title

pls, **Hi**
[source, python]
----
import os
print("hello world")
----
`};
  },
  handleChange: function() {
    console.log("handle change")
    this.setState({value: this.refs.textarea.value});
  },
  componentDidMount: function(){
    console.log("componentDidMount")
    this.highlightCode();
  },
  componentDidUpdate: function () {
    console.log("componentDidUpdate")
    this.highlightCode();
  },
  highlightCode: function () {
    var domNode = ReactDOM.findDOMNode(this);
    var nodes = domNode.querySelectorAll('pre code');
    if (nodes.length > 0) {
      for (var i = 0; i < nodes.length; i = i + 1) {
        hljs.highlightBlock(nodes[i]);
      }
    }
  },
  rawMarkup: function() {
    var attrs = Opal.hash({'linkcss': '', 'copycss!': '', 'showtitle': true});
    var options = Opal.hash({'doctype': 'article', 'safe': 'safe', 'header_footer': false, 'attributes': attrs,});

    var doc = Opal.Asciidoctor.$load(this.state.value, options);
    doc.$set_attribute('source-highlighter', 'highlight.js');

    return { __html: doc.$convert() };
  },
  render: function() {
    return (
      <div className="container" classID="AsciidoctorEditor">
        <h3>Input</h3>
        <div className="flex-item">
          <textarea
            onChange={this.handleChange}
            ref="textarea"
            defaultValue={this.state.value}/>
        </div>

        <h3>Output</h3>
        <div
          className="content flex-item"
          dangerouslySetInnerHTML={this.rawMarkup()}
        />
      </div>
    );
  }
});

ReactDOM.render(<AsciidoctorEditor />, document.getElementById('container'));
