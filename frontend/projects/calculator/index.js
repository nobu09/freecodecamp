const numbers = [
  {
    name: 'zero',
    value: 0
  },
  {
    name: 'one',
    value: 1
  },
  {
    name: 'two',
    value: 2
  },
  {
    name: 'three',
    value: 3
  },
  {
    name: 'four',
    value: 4
  },
  {
    name: 'five',
    value: 5
  },
  {
    name: 'six',
    value: 6
  },
  {
    name: 'seven',
    value: 7
  },
  {
    name: 'eight',
    value: 8
  },
  {
    name: 'nine',
    value: 9
  }
]

const operations = [
  {
    name: 'add',
    symbol: '+',
  },
  {
    name: 'subtract',
    symbol: '-',
  },
  {
    name: 'multiply',
    symbol: 'x',
  },
  {
    name: 'divide',
    symbol: '/'
  }
]

function Calculator(props) {
  const [result, setResult] = React.useState(0);

  function handleClick() {
     setResult(0);
  }

  function handleNumsClick(number) {
    let displayNumber = String(result).concat(String(number));
    setResult(Number(displayNumber));
  }

  return (
    <div id="calcuator">
      <div id="display">{result}</div>
      <button id="clear" onClick={handleClick}>AC</button>
      <br />
      {
        operations.map(operation =>
          <Operation key={operation.name} name={operation.name} symbol={operation.symbol} />
        )
      }
      <br />
      {
        numbers.map(num => {
          return <Num key={num.name} name={num.name} value={num.value} handleClick={handleNumsClick} />;
        })
      }
      <br />
      <button id="decimal">.</button>
      <br />
      <button id="equals">=</button>
    </div>
  );
}

function Num(props) {
  function handleClick() {
    props.handleClick(props.value);
  }

  return (
    <button id={props.name} className="number" onClick={handleClick}>{props.value}</button>
  );
}

function Operation(props) {
  return (
    <button id={props.name} className="operation">{props.symbol}</button>
  );
}

ReactDOM.render(
  <Calculator />,
  document.getElementById("root")
);
