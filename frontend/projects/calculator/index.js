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
  const [nums, setNums] = React.useState([0]);
  const [operators, setOperators] = React.useState([]);
  const [display, setDisplay] = React.useState(0);
  
  function handleClearClick() {
    clear();
    setDisplay(0);
  }
  
  function handleNumsClick(num) {
    let resultNum = Number(String(nums).concat(String(num)));
    console.log(num);
    console.log(resultNum);
    console.log([...nums]);  
    console.log(...nums.splice(0, 1, resultNum));
    setNums([...nums].splice(nums.length - 1, 1, resultNum));
    setDisplay();
  }
  
  function handleOperation(symbol) {
    setResult(calculate(nums[nums.length - 2], nums[nums.length - 1], symbol, result));
    setOperators(operators.concat(symbol));
    // setNums();
    setDisplay(symbol);
  }
  
  function handleEqual() {
    setDisplay(result);
    clear();
  }
  
  function clear() {
    setNums([0]);
    setOperators([]);
    setResult(0);
  }
  
  function calculate(num1, num2, operator, result) {
    switch(operator) {
      case '+':
        return num1 + num2;
        break;
      case '-':
        return num1 - num2;
        break;
      case 'x':
        return num1 * num2;
        break;
      case '/':
        return num1 / num2;
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

