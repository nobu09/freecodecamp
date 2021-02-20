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
  const [display, setDisplay] = React.useState('0');
  const [result, setResult] = React.useState(0);

  // 数字と演算子を入れた配列
  const [nums, setNums] = React.useState([0]);
  const [operators, setOperators] = React.useState(['']);

  // 現在の数字と演算子を入れた変数
  const [nowNum, setNowNum] = React.useState('0');
  const [nowOperator, setNowOperator] = React.useState('');

  function handleClearClick() {
    setDisplay('0');
    setResult(0);
    setNums([0]);
    setOperators(['']);
    setNowNum('0');
    setNowOperator('');
  }

  function handleNumsClick(num) {
    const nowNumber = nowNum != '0' ? nowNum.concat(String(num)) : String(num);
    setNowNum(nowNumber);

    // 次の数字を入力しはじめたらその時点の演算子を演算子配列にいれる
    if (nowOperator != '') {
      newOperators = [...operators];
      newOperators.splice(newOperators.length - 1, 1, nowOperator);
      setOperators([...newOperators, '']);
      setNowOperator('');
    }

    setDisplay(nowNumber);
  }

  function handleOperation(ope) {
    if (nowOperator != '') {
      switch(ope) {
        case '-':
          setNowNum('-');
          setDisplay(ope);
          return;
        case '+':
        case 'x':
        case '/':
          setNowNum('0');
          setNowOperator(ope);
          setDisplay(ope);
          return;
      }
    }

    setNowOperator(ope);

    // 次の演算子を入力しはじめたらその時点の数字を数字配列にいれて次を0にする
    let newNums = [...nums];
    newNums.splice(newNums.length - 1, 1, Number(nowNum));

    setNums([...newNums, 0]);
    setNowNum('0');

    setDisplay(ope);
  }

  function handleEqual() {
    let newNums = [...nums];
    newNums.splice(newNums.length - 1, 1, Number(nowNum));

    // 計算
    let calculateResult = newNums.reduce((result, val, index, numsArray) => {
      if (index == 0) {
        return val;
      }
      result = calculate(result, numsArray[index], operators[index-1]);

      return result;
    }, 0)

    setResult(calculateResult);
    setDisplay(calculateResult);
  }

  function calculate(num1, num2, operator) {
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
    if (!nowNum.includes('.')) {
      const nowNumber = nowNum.concat('.');
      const resultNums = [...nums];
      resultNums.splice(resultNums.length - 1, 1, Number(nowNumber));

      setNums(resultNums);
      setDisplay(nowNumber);
      setNowNum(nowNumber);
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
