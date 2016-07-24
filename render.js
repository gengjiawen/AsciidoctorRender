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
    this.setState({value: this.refs.textarea.value});
  },
  componentDidMount: function(){
    hljs.initHighlighting();
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
      <div className="AsciidoctorEditor">
      <h3>Input</h3>
      <textarea
    onChange={this.handleChange}
    ref="textarea"
    defaultValue={this.state.value} />
    <h3>Output</h3>
    <div
    className="content"
    dangerouslySetInnerHTML={this.rawMarkup()}
    />
    </div>
    );
  }
});

ReactDOM.render(<AsciidoctorEditor />, document.getElementById('asciidoctor'));
