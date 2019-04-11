import React from 'react';
import ReactDOM from 'react-dom';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import Calculator from './Calculator';
import Sinon from 'sinon';

Enzyme.configure({ adapter: new Adapter() });


it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<Calculator />, div);
  ReactDOM.unmountComponentAtNode(div);
});


describe("When testing with Enzyme", () => {
  let wrapper;

  const spy = Sinon.spy(Calculator.prototype, 'doCalculations');
  beforeAll(()=>{
    wrapper = shallow(<Calculator />);    
  });  
  
  it("checks header", () => {     
      expect(wrapper.find("header").length).toBe(1);      
  });

  it("checks number of buttons", () => {    
    expect(wrapper.find("button").length).toBe(20);    
  });

  it("renders a textbox ", () => {    
    expect(wrapper.find("input").length).toBe(1);    
  });

  it("renders a result label", () => {    
    expect(wrapper.find("label").length).toBe(1);    
  });

  it("renders a first button", () => {    
    expect(wrapper.find('button').first().length).toBe(1);    
  });

  /* Test for Addition Starts */
  it("simulates button click (", () => {    
    wrapper.find('button').first().simulate('click', {target: { name: "(" } } );   
    expect(spy.called).toBe(true); 
    expect(wrapper.find("input").props().value).toEqual('(');
  });

  it("input text box value on button click 1", () => {    
    wrapper.find('button').at(4).simulate('click', {target: { name: "1" } } ); 
    expect(wrapper.find("input").props().value).toEqual('(1');
  });

  it("input text box value on button click +", () => {    
    wrapper.find('button').at(7).simulate('click', {target: { name: "+" } } ); 
    expect(wrapper.find("input").props().value).toEqual('(1+');
  });

  it("input text box value on button click 2", () => {    
    wrapper.find('button').at(5).simulate('click', {target: { name: "2" } } ); 
    expect(wrapper.find("input").props().value).toEqual('(1+2');
  });

  it("input text box value on button click )", () => {    
    wrapper.find('button').at(2).simulate('click', {target: { name: ")" } } ); 
    expect(wrapper.find("input").props().value).toEqual('(1+2)');
  });
 
  it("checks the output in result label when = button is clicked - 3", () => {    
    wrapper.find('button').at(18).simulate('click', {target: { name: "=" } } );   
    expect(spy.called).toBe(true); 
    expect(wrapper.find("label").text()).toEqual('3'); 
  });
 /* Test for Addition Ends */

 it("clears text box value on button click c should be empty", () => {    
  wrapper.find('button').at(1).simulate('click', {target: { name: "c" } } ); 
  expect(wrapper.find("input").props().value).toEqual('');
});

  /* Test for Subtraction Starts */ 
  it("input text box value on button click 8", () => {    
    wrapper.find('button').at(13).simulate('click', {target: { name: "8" } } ); 
    expect(wrapper.find("input").props().value).toEqual('8');
  });

  it("input text box value on button click -", () => {    
    wrapper.find('button').at(7).simulate('click', {target: { name: "-" } } ); 
    expect(wrapper.find("input").props().value).toEqual('8-');
  });

  it("input text box value on button click 3", () => {    
    wrapper.find('button').at(6).simulate('click', {target: { name: "3" } } ); 
    expect(wrapper.find("input").props().value).toEqual('8-3');
  });
 
  it("checks the output in result label when = button is clicked - 5", () => {    
    wrapper.find('button').at(18).simulate('click', {target: { name: "=" } } );   
    expect(spy.called).toBe(true); 
    expect(wrapper.find("label").text()).toEqual('5'); 
  });
 /* Test for Subtraction Ends */

 it("clears text box value on button click c should be empty", () => {    
  wrapper.find('button').at(1).simulate('click', {target: { name: "c" } } ); 
  expect(wrapper.find("input").props().value).toEqual('');
});

 /* Test for Multiplication Starts */ 
 it("input text box value on button click 6", () => {    
  wrapper.find('button').at(10).simulate('click', {target: { name: "6" } } ); 
  expect(wrapper.find("input").props().value).toEqual('6');
});

it("input text box value on button click *", () => {    
  wrapper.find('button').at(15).simulate('click', {target: { name: "*" } } ); 
  expect(wrapper.find("input").props().value).toEqual('6*');
});

it("input text box value on button click 1", () => {    
  wrapper.find('button').at(4).simulate('click', {target: { name: "1" } } ); 
  expect(wrapper.find("input").props().value).toEqual('6*1');
});

it("input text box value on button click 0", () => {    
  wrapper.find('button').at(17).simulate('click', {target: { name: "0" } } ); 
  expect(wrapper.find("input").props().value).toEqual('6*10');
});

it("checks the output in result label when = button is clicked - 60", () => {    
  wrapper.find('button').at(18).simulate('click', {target: { name: "=" } } );   
  expect(spy.called).toBe(true); 
  expect(wrapper.find("label").text()).toEqual('60'); 
});
/* Test for Multiplication Ends */

it("checks text box value on button click c should be empty", () => {    
  wrapper.find('button').at(1).simulate('click', {target: { name: "c" } } ); 
  expect(wrapper.find("input").props().value).toEqual('');
});

 /* Test for Division Starts */ 
 it("input text box value on button click 1", () => {    
  wrapper.find('button').at(4).simulate('click', {target: { name: "1" } } ); 
  expect(wrapper.find("input").props().value).toEqual('1');
});
 it("input text box value on button click 6", () => {    
  wrapper.find('button').at(10).simulate('click', {target: { name: "6" } } ); 
  expect(wrapper.find("input").props().value).toEqual('16');
});

it("input text box value on button click /", () => {    
  wrapper.find('button').at(19).simulate('click', {target: { name: "/" } } ); 
  expect(wrapper.find("input").props().value).toEqual('16/');
});

it("input text box value on button click 4", () => {    
  wrapper.find('button').at(8).simulate('click', {target: { name: "4" } } ); 
  expect(wrapper.find("input").props().value).toEqual('16/4');
});

it("checks the result label when = button is clicked - 4", () => {    
  wrapper.find('button').at(18).simulate('click', {target: { name: "=" } } );   
  expect(spy.called).toBe(true); 
  expect(wrapper.find("label").text()).toEqual('4'); 
});
/* Test for Division Ends */

it("checks text box value on button click c should be empty", () => {    
  wrapper.find('button').at(1).simulate('click', {target: { name: "c" } } ); 
  expect(wrapper.find("input").props().value).toEqual('');
});

/* Test for backspace 'ce' starts */
it("input text box value on button click 1", () => {    
  wrapper.find('button').at(4).simulate('click', {target: { name: "1" } } ); 
  expect(wrapper.find("input").props().value).toEqual('1');
});
 it("input text box value on button click 6", () => {    
  wrapper.find('button').at(10).simulate('click', {target: { name: "6" } } ); 
  expect(wrapper.find("input").props().value).toEqual('16');
});

it("input text box value on button click /", () => {    
  wrapper.find('button').at(19).simulate('click', {target: { name: "/" } } ); 
  expect(wrapper.find("input").props().value).toEqual('16/');
});

it("checks text box value on button click ce should delete the last entered value - 16", () => {    
  wrapper.find('button').at(3).simulate('click', {target: { name: "ce" } } ); 
  expect(wrapper.find("input").props().value).toEqual('16');
});
/* Test for backspace 'ce' ends */

it("checks text box value on button click c should be empty", () => {    
  wrapper.find('button').at(1).simulate('click', {target: { name: "c" } } ); 
  expect(wrapper.find("input").props().value).toEqual('');
});

/* Test for Decimal number starts */


it("input text box value on button click 6", () => {    
  wrapper.find('button').at(10).simulate('click', {target: { name: "6" } } ); 
  expect(wrapper.find("input").props().value).toEqual('6');
});

it("input text box value on button click decimal .", () => {    
  wrapper.find('button').at(16).simulate('click', {target: { name: "." } } ); 
  expect(wrapper.find("input").props().value).toEqual('6.');
});

it("input text box value on button click 1", () => {    
  wrapper.find('button').at(4).simulate('click', {target: { name: "1" } } ); 
  expect(wrapper.find("input").props().value).toEqual('6.1');
});

it("input text box value on button click +", () => {    
  wrapper.find('button').at(7).simulate('click', {target: { name: "+" } } ); 
  expect(wrapper.find("input").props().value).toEqual('6.1+');
});

it("input text box value on button click decimal 4", () => {    
  wrapper.find('button').at(8).simulate('click', {target: { name: "4" } } ); 
  expect(wrapper.find("input").props().value).toEqual('6.1+4');
});

it("input text box value on button click decimal .", () => {    
  wrapper.find('button').at(16).simulate('click', {target: { name: "." } } ); 
  expect(wrapper.find("input").props().value).toEqual('6.1+4.');
});

it("input text box value on button click 1", () => {    
  wrapper.find('button').at(4).simulate('click', {target: { name: "1" } } ); 
  expect(wrapper.find("input").props().value).toEqual('6.1+4.1');
});

it("checks display label value - 10.2", () => {    
  wrapper.find('button').at(18).simulate('click', {target: { name: "=" } } );   
  expect(spy.called).toBe(true); 
  expect(wrapper.find("label").text()).toEqual('10.2'); 
});
/* Test for Decimal number ends */

});