quotes = [
  {
    text: "It’s not the years in your life that count. It’s the life in your years.",
    author: "Abraham Lincoln"
  },
  {
    text: "The question isn’t who is going to let me; it’s who is going to stop me.",
    author: "Ayn Rand"
  },
  {
    text: "People often say that motivation doesn’t last. Well, neither does bathing. That’s why we recommend it daily.",
    author: "Zig Ziglar"
  },
  {
    text: "Eighty percent of success is showing up.",
    author: "Woody Allen"
  },
  {
    text: "If you’re offered a seat on a rocket ship, don’t ask what seat! Just get on.",
    author: "Sheryl Sandberg"
  }
]

class QuoteMachine extends React.Component {
  constructor(props) {
    super(props);
    this.handleNewQuote = this.handleNewQuote.bind(this);
    this.state = {
      number: Math.floor(Math.random() * 4),
    }
  }

  handleNewQuote() {
    this.setState({
      number: Math.floor(Math.random() * 4)
    })
  }

  render() {
    const link = `https://twitter.com/intent/tweet?text=${quotes[this.state.number].text}`;

    return (
      <div class="container">
        <div id="quote-box" class="jumbotron">
          <div id="text">{quotes[this.state.number].text}</div>
          <div id="author">- {quotes[this.state.number].author}</div>
          <a id="tweet-quote" class="btn btn-secondary pull-left" href={link} target="_top">
            <i class="fab fa-twitter"></i>
          </a>
          <button id="new-quote" class="btn btn-secondary" onClick={this.handleNewQuote}>New quote</button>

        </div>
      </div>
    );
  }
}

class App extends React.Component {
  render() {
    return (
      <QuoteMachine />
    )
  }
}

ReactDOM.render(
  <App />,
  document.getElementById("root")
);
