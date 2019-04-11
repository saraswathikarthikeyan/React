import React, { Component } from 'react';
import './Calculator.css';

//Calculator component
class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
        expression:'',
        answer: '' ,
        lastClicked:''     
    };
    
    //method called when any button clicked on calculator
    this.doCalculations = this.doCalculations.bind(this);

    //method called when any button is pressed inside textbox
    this.isNumber = this.isNumber.bind(this);    
  }

  //method to add value to the input textbox
  inputChangedHandler = (event) => {
     event.target.value = this.state.expression;   
  }
  
  //method called on button click on keypad 
  doCalculations(btnClicked) {
    switch(btnClicked) {
      case '=':
        try { 
         //calcultes the expression when equals button is clicked. 
          let calcAnswer = eval(this.state.expression);         
          let precision = getPrecision(calcAnswer);
         
          if ( +precision >= 7 ) {
            // truncates the digits after decimal point to 6 digits.
            calcAnswer = +calcAnswer.toFixed(6);
          } 
          this.setState({ lastClicked: 'equal', answer: calcAnswer, expression: calcAnswer });    
        }
        catch(err) {     
          this.setState({  answer: 'err', expression:'err' });  
        }
        break;
      case 'c':
        //clears the result textbox and label to empty
        this.setState({  expression: '', answer:'' });
        break;
      case 'ce':
          let slicedVal = String(this.state.expression).slice(0, -1);
          //delete the last entered digit acts like backspace
          this.setState({  expression: slicedVal });       
        break;
      default:
        if(this.state.lastClicked === "equal")  { 
          //checks the last operation and clears the result in textbox for new expression.
          this.setState({ lastClicked: '', expression: btnClicked });   
        }
        else { 
          //concatinates the entered value to form expression.
          let question = this.state.expression + btnClicked; 
          this.setState({ lastClicked: '', expression: question });   
        } 
    } 
  }

  //method called when any button is pressed inside textbox
  isNumber(evt){  
    var iKeyCode = (evt.which) ? evt.which : evt.keyCode;
    if (iKeyCode === 13) {
      //calls the doCalculations method when enter button is pressed.
      this.doCalculations("=");    
    }
    else if (iKeyCode !== 46 && iKeyCode !== 43 && iKeyCode !== 45 && iKeyCode !== 42 && iKeyCode !== 47
      && iKeyCode > 31 && (iKeyCode < 48 || iKeyCode > 57))  {  
      //prevents the alphabets being entered.    
      evt.preventDefault(); 
    }
    else { 
      //concatinates the entered value to form expression  
      let question = this.state.expression + evt.key; 
      this.setState({ lastClicked: '', expression: question });
    }   

    if(this.state.lastClicked === "equal") { 
       //checks the last operation and clears the result in textbox for new expression.
      this.setState({ lastClicked:'', expression: '' });
    }    
  }

  //renders calculator component 
  render() {
    return (
      <div className="App">
        <header className="App-header">
          Calculator
        </header>
        <div className="container">
        <div className="wrapper">
          <div className="box item1">    
            <label id="lblresult" className="lblresult">{ this.state.answer }</label>   
          <div className="box item2">      
            <input type="text"  id="txtresult" className="txtresult" value = { this.state.expression } 
            onChange={(e)=>this.inputChangedHandler(e) }
            onKeyPress =  { e => this.isNumber(e) }   ></input>  
          </div>
          </div>
          <div className="keypad">
          <div className="box"> <button name="(" onClick= { e => this.doCalculations(e.target.name )  } >(</button></div>
          <div className="box"> <button name="c" onClick= { e => this.doCalculations(e.target.name ) } >C</button></div>
          <div className="box"> <button name=")" onClick= { e => this.doCalculations(e.target.name )  } >)</button></div>
          <div className="box"> <button name="ce" onClick= { e => this.doCalculations(e.target.name )  } >CE</button></div>
          <div className="box"> <button name="1" onClick= { e => this.doCalculations(e.target.name )  } >1</button></div>
          <div className="box"> <button name="2" onClick= { e => this.doCalculations(e.target.name )  } >2</button></div>
          <div className="box"> <button name="3" onClick= { e => this.doCalculations(e.target.name )  } >3</button></div>
          <div className="box"> <button name="+" onClick= { e => this.doCalculations(e.target.name , this.state)  } >+</button></div>
          <div className="box"> <button name="4" onClick= { e => this.doCalculations(e.target.name , this.state)  } >4</button></div>
          <div className="box"> <button name="5" onClick= { e => this.doCalculations(e.target.name , this.state)  } >5</button></div>
          <div className="box"> <button name="6" onClick= { e => this.doCalculations(e.target.name , this.state)  } >6</button></div>
          <div className="box"> <button name="-" onClick= { e => this.doCalculations(e.target.name , this.state)  } >-</button></div>
          <div className="box"> <button name="7" onClick= { e => this.doCalculations(e.target.name , this.state)  } >7</button></div>
          <div className="box"> <button name="8" onClick= { e => this.doCalculations(e.target.name , this.state)  } >8</button></div>
          <div className="box"> <button name="9" onClick= { e => this.doCalculations(e.target.name , this.state)  } >9</button></div>
          <div className="box"> <button name="*" onClick= { e => this.doCalculations(e.target.name , this.state)  } >*</button></div>
          <div className="box"> <button name="." onClick= { e => this.doCalculations(e.target.name , this.state)  } >.</button></div>
          <div className="box"> <button name="0" onClick= { e => this.doCalculations(e.target.name , this.state)  } >0</button></div>
          <div className="box"> <button name="=" onClick= { e => this.doCalculations(e.target.name , this.state)  } >=</button></div>
          <div className="box"> <button name="/" onClick= { e => this.doCalculations(e.target.name , this.state)  } >/</button></div>
        </div>
      </div>
    </div>  
      </div>
    );
  }
}

 //method checks decimal result and returns the number of digits after decimal.
function getPrecision (num) {  
  var precision =0;
  if(String(num).indexOf(".") !== -1 ) { 
    var numAsStr = String(num).split(".");  
    precision = numAsStr[1].length; 
  }
  return precision;  
}

export default App;