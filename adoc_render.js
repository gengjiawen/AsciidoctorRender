var AsciidoctorEditor = React.createClass({
  getInitialState: function() {
//            return {value: 'Type some *asciidoctor* here!'};
    return {value: `
= Title
:toc:
:sectnums:
:sectnumlevels: 2

== Python

pls, **Hi**
[source, python]
----
import os
print("hello world")
----

== Gradle
[source, gradle]
----
task wrapper(type: Wrapper) {
    group "wrapper"
    gradleVersion = '3.0'
    distributionUrl = distributionUrl.replace("bin", "all")
}
----
`};
  },
  handleChange: function() {
    console.log("handle change")
    this.setState({value: this.refs.textarea.value});
  },
  componentDidMount: function(){
    console.log("componentDidMount");
    this.highlightCode();
  },
  componentDidUpdate: function () {
    console.log("componentDidUpdate");
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
    var containerStyle = {
      display: 'flex',
      flexFlow : 'row',
      justifyContent : 'space-around',
    } ;

    var flexItemStyle = {
      display: 'flex',
      flexFlow : 'column',
      width : '100%',
    };

    var inputStyle = {
      flex: 1,
      width: '98%',
      fontSize: 14,
    };

    return (
      <div className="container" classID="AsciidoctorEditor" style={containerStyle}>
        <div className="flex-item" style={flexItemStyle}>
          <a href="http://asciidoctor.org/docs/user-manual/" target="_blank">Asciidoctor User Manual</a>
          <h3>Input</h3>
          <textarea
            className="input"
            style={inputStyle}
            onChange={this.handleChange}
            ref="textarea"
            defaultValue={this.state.value}/>
        </div>

        <div className="flex-item" style={flexItemStyle}>
          <h3>Output</h3>
          <div
            ref="content"
            classID="content" dangerouslySetInnerHTML={this.rawMarkup()}>
          </div>
        </div>
      </div>
    );
  },


});

ReactDOM.render(<AsciidoctorEditor />, document.getElementById('container'));
