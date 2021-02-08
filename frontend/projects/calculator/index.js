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
  const [number, setNumber] = React.useState(0);
  const [preNumber, setPreNumber] = React.useState(0);
  const [operation, setOperation] = React.useState('');
  const [display, setDisplay] = React.useState(0);
  
  function handleClearClick() {
    clear();
    setDisplay(0);
  }
  
  function handleNumsClick(num) {
    let resultNum = Number(String(number).concat(String(num)));
    setNumber(resultNum);
    setDisplay(resultNum);
  }
  
  function handleOperation(symbol) {
    setResult(calculate(preNumber, number, symbol, result));
    console.log(`result: ${result} preNumber: ${preNumber} number: ${number}`)
    setOperation(symbol);
    setPreNumber(result);
    setNumber(0);
    setDisplay(symbol);
    console.log(`result: ${result} preNumber: ${preNumber} number: ${number}`)
  }
  
  function handleEqual() {
    setDisplay(result);
    clear();
  }
  
  function clear() {
    setNumber(0);
    setPreNumber(0);
    setResult(0);
  }
  
  function calculate(preNum, num, operator, result) {
    switch(operator) {
      case '+':
        return preNum + num;
        break;
      case '-':
        return preNum - num;
        break;
      case 'x':
        return preNum * num;
        break;
      case '/':
        return preNum / num;
        break;
    }
  }
  
  return (
    <div id="calcuator">
      <div id="display">{display}</div>
      <button id="clear" onClick={handleClearClick}>AC</button>
      <br />
      {
        operations.map(operation =>
          <Operation key={operation.name} name={operation.name} symbol={operation.symbol} handleOperation={handleOperation} />
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
      <button id="equals" onClick={handleEqual} >=</button>
    </div>
  );
}

function Num(props) {
  return (
    <button id={props.name} className="number" onClick={() => props.handleClick(props.value)}>{props.value}</button>
  );
}

function Operation(props) {
  return (
    <button id={props.name} className="operation" onClick={() => props.handleOperation(props.symbol)} >{props.symbol}</button>
  );
}

ReactDOM.render(
  <Calculator />,
  document.getElementById("root")
);
