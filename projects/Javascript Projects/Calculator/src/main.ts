let currentInput:string = '';
let previousInput:string = '';
let selectedOp:string = '';
let result:number = 0;

let newEntryFlag:boolean = false;

const buttonsDiv = document.getElementById('buttons');
const displayInput = document.getElementById("display");
(displayInput as HTMLInputElement).value = '0';
const historyDiv = document.getElementById("history");


buttonsDiv?.addEventListener("click", (e) =>{
  
  const buttonHandlers:Record<string, (button:Element) => void> = {

    number: (button) => {
      (historyDiv as HTMLElement).innerHTML = '';
      if (newEntryFlag === true){
        currentInput = '';
        newEntryFlag = false;
      }

      currentInput += (button.innerHTML);
      (displayInput as HTMLInputElement).value = currentInput;

      if (previousInput !== ''){
        (historyDiv as HTMLElement).innerHTML = `${previousInput} ${selectedOp}`;
        (displayInput as HTMLInputElement).value = `${currentInput}`;
      } 
      console.log(currentInput);      
    },

    decimal: (_button) => {
      if (currentInput === '0' || currentInput === ''){
        currentInput = '0.';
        (displayInput as HTMLInputElement).value = currentInput;
        return
      }

      if (newEntryFlag === true){
        currentInput = '0.';
        (displayInput as HTMLInputElement).value = currentInput;
        newEntryFlag = false;
        return
      }

      if (currentInput.includes('.')){
        console.log('entry already includes a decimal point');
        return
      }
      
      currentInput += '.';
      (displayInput as HTMLInputElement).value = currentInput;
      console.log(currentInput);
    },
    
    operator: (button) => {
      if (currentInput === ''){
        return
      }

      selectedOp = button.innerHTML;
      newEntryFlag = true;
      previousInput = currentInput;
      
      (historyDiv as HTMLElement).innerHTML = '';

      switch (selectedOp){
        case 'x^' :
            result = parseFloat(currentInput) * parseFloat(currentInput);
            (historyDiv as HTMLElement).innerHTML = `square(${previousInput})`;
            (displayInput as HTMLInputElement).value = `${result}`;
            previousInput = String(result);
            console.log(currentInput);
            return 
      }
      
      previousInput = currentInput;
      
      (historyDiv as HTMLElement).innerHTML = `${previousInput} ${selectedOp}`;
      (displayInput as HTMLInputElement).value = `${previousInput}`;
      console.log(currentInput);
    },

    equals: (_button) => {
      if (currentInput && previousInput && selectedOp){
        switch (selectedOp){
          case '+':
            result = parseFloat(previousInput) + parseFloat(currentInput);
            break
          case '-':
            result = parseFloat(previousInput) - parseFloat(currentInput);
            break
          case '/':
            if (currentInput === '0'){
              (displayInput as HTMLInputElement).value = `Cannot divide by zero`;
              currentInput = '';
              previousInput = '';
              return
            }
            result = parseFloat(previousInput) / parseFloat(currentInput);
            break
          case 'x':
            result = parseFloat(previousInput) * parseFloat(currentInput);
            break  
        }
        
        (historyDiv as HTMLElement).innerHTML = `${previousInput} ${selectedOp} ${currentInput} = `;
        (displayInput as HTMLInputElement).value = `${String(result)}`;

        currentInput =  String(result);
        previousInput = '';
        selectedOp = '';
        newEntryFlag = true;
      }
      
      
    },
    
    clear: (_button) => {
      currentInput = '';
      previousInput = '';
      selectedOp = '';
      (historyDiv as HTMLElement).innerHTML = '';
      (displayInput as HTMLInputElement).value = '0';
    },

    clearEntry: (_button) =>{
      currentInput = '';
      (displayInput as HTMLInputElement).value = '0';
    },
  }  

  
  const button = e.target as HTMLElement;
  
  if (buttonHandlers[button.className]){
    buttonHandlers[button.className](button);
  };
  
});