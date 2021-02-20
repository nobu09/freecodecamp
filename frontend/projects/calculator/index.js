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
  const [display, setDisplay] = React.useState('0');
  const [nowNumber, setNowNumber] = React.useState('');
  const [nowOperator, setNowOperator] = React.useState('');
  
  function handleClearClick() {
    setResult(0);
    setDisplay(0);
    setNums([0]);
    setNowNumber('');
    setOperators([]);
    setNowOperator('');
  }
  
  function handleNumsClick(num) {
    // 数字を配列に格納
    const resultNumString = (nowNumber.startsWith('0') && num == 0 && !nowNumber.includes('.')) ? nowNumber : nowNumber.concat(String(num));
    const resultNum = Number(resultNumString);
    const resultNums = [...nums];
    resultNums.splice(resultNums.length - 1, 1, resultNum);
    
    setNums(resultNums);
    setNowNumber(resultNumString);
    setDisplay(resultNumString);
    setNowOperator('');
  }
  
  function handleOperation(ope) {
    console.log(ope);
    if (ope == '-' && nowOperator.length == 1) {
      setNowNumber(ope);
      return
    }
    setNowNumber('');
    
    // 計算する
    if (nums.length > 1) {
      setResult(calculate(nums, result, operators[operators.length - 1]));
    }
    setNums([...nums, 0]);
    
    // 演算子を配列に格納
    const resultOpes = [...operators];
    resultOpes.push(ope);
    
    setNowOperator(ope);
    setOperators(resultOpes);
    setDisplay(ope);
  }
  
  function handleEqual() {
    // 計算
    const resultCalculate = calculate(nums, result, operators[operators.length - 1]);
    setDisplay(resultCalculate);
    setNums([resultCalculate]);
    setNowNumber(String(resultCalculate));
    setOperators([]);
    setNowOperator('');
  }
  
  function calculate(nums, result, operator) {
    console.log(`nums: ${nums}`)
    const num1 = nums.length <= 2 ? nums[0] : result;
    const num2 = nums[nums.length - 1];
    console.log(`num1: ${num1}, num2: ${num2}, operator: ${operator}, nowNumber: ${nowNumber}`)
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
  
  function handleDecimal() {
    if (!nowNumber.includes('.')) {
      const nowNum = nowNumber.concat('.');
      
      const resultNums = [...nums];
      resultNums.splice(resultNums.length - 1, 1, Number(nowNum));
      
      setNums(resultNums);
      setDisplay(nowNum);
      setNowNumber(nowNum);
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
      <button id="decimal" onClick={handleDecimal}>.</button>
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

