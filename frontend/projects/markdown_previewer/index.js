let defaultText =
`# My Markdown Previewer

## How to write
Please look to [freecodecamp](https://www.freecodecamp.com/)

### inline code
\`this is code\`

### block code
\`\`\`
This is block code.
\`\`\`

### list item
- first item
  - second item
  - third item

### image
![markdown](https://cdn-ak.f.st-hatena.com/images/fotolife/n/nobu09/20210102/20210102182541.jpg)

### blockquote
> this is blockquote

**Have Fun!!!**
`

marked.setOptions({
  breaks: true
});

class MarkdownPreviewer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      text: defaultText,
      markdown: ''
    };
  }

  componentDidMount() {
    this.setState((state, _props) => ({
      markdown: marked(state.text)
    }));
  }

  updateMarkdown(e) {
    this.setState({
      text: e.target.value,
      markdown: marked(e.target.value)
    });
  }

  render() {
    return (
      <>
        <h3 className="title">Editor</h3>
        <textarea id="editor" value={this.state.text} onChange={(e) => this.updateMarkdown(e)} rows="15" cols="80" />
        <h3 className="title">Preview</h3>
        <div id="preview" dangerouslySetInnerHTML={{ __html: this.state.markdown }} />
      </>
    );
  }
}

class App extends React.Component {
  render() {
    return (
      <MarkdownPreviewer />
    )
  }
}

ReactDOM.render(
  <App />,
  document.getElementById("root")
);
