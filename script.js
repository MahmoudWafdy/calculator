const toggleThem = document.querySelector(".themes__toggle ");
const toggleDarkThem = () => toggleThem.classList.toggle("themes__toggle--isActive");

toggleThem.addEventListener("keydown",(event)=> event.key==="Enter"&& toggleDarkThem())
toggleThem.addEventListener("click",toggleDarkThem)

const buttonElement = document.querySelectorAll("[data-type]");
const screenResult = document.querySelector(".calc__result");

let currentNumber = "";
let storedNumber = "";
let operation = "";

const updateScreen = (value) => screenResult.textContent = !value ? "0" : value ;

const numberButtonHandler = (value) =>{
    if(value === "." && currentNumber.includes(".")) return;
    if(value === "0" && !currentNumber) return;
    currentNumber += value;
    updateScreen(currentNumber);
}
 const clearButton = () => {
    currentNumber = "";
    storedNumber = "";
    operation = "";
    updateScreen(currentNumber);
 }
 const deleteButton = () =>{
    // if(!currentNumber || currentNumber === "0" )return;
    // if(currentNumber.length === 1){
    //     currentNumber = "";
    // }else {
    //     currentNumber = currentNumber.slice(0,-1);
    // }        
    // updateScreen(currentNumber);
    if(currentNumber){
        currentNumber = currentNumber.slice(0,-1);
        updateScreen(currentNumber)
    }
 }
 const equalButton = () => {
    if(currentNumber && storedNumber && operation) {
        switch (operation){
            case "-": 
                storedNumber = parseFloat(storedNumber) - parseFloat(currentNumber);
                break;
            case "/": 
                storedNumber = parseFloat(storedNumber) / parseFloat(currentNumber);
                break;
            case "*": 
                storedNumber = parseFloat(storedNumber) * parseFloat(currentNumber); 
                break;
            case "+": 
                storedNumber = parseFloat(storedNumber) + parseFloat(currentNumber); 
                break;
        }
        currentNumber="";
        updateScreen(storedNumber);
    }
 }
 const operationButtonCalculate = (value)=>{
    if(!currentNumber && !storedNumber) return;
    if(currentNumber && !storedNumber){
        storedNumber = currentNumber;
        currentNumber = "";
        operation = value;
    }else if (storedNumber){
        operation = value;
    }
    if(currentNumber) equalButton(value);
}
buttonElement.forEach((element) => {
    element.addEventListener("click",()=>{
        const value = element.dataset.value;
        const type = element.dataset.type;
        if(type === "number"){
            numberButtonHandler(value);
        }else if(type === "operation"){
            switch(value){
                case "c":            clearButton(); break;
                case "Backspace" :   deleteButton(); break;
                case "Enter" :       equalButton(); break;
                default :            operationButtonCalculate(value);
            }
        }
    })
})

/* accesability */
const availableNumber = ["1","2","3","4","5","6","7","8","9","."];
const availableOperation = ["*","/","-","+"]
const availableKeys = [...availableNumber,...availableOperation,"c","Backspace","Enter"]

window,addEventListener("keydown",(event)=>{
    keyesyWithHover(event.key);
})

const keyesyWithHover = (key)=>{
    if(availableKeys.includes(key)){
        const clicked_key = document.querySelector(`[data-value = "${key}"]`);
        clicked_key.classList.add("hover");
        clicked_key.click();
        setTimeout(() => clicked_key.classList.remove("hover"), 300);
    }
}
// const keyeyWithoutHover = ()=>{
//     const key = event.key;
//     if(availableNumber.includes(key)){
//         numberButtonHandler(key)
//     }else if(availableOperation.includes(key)){
//         operationButtonCalculate(key);
//     }
//     else if(key === "c") clearButton();
//     else if(key === "Backspace") deleteButton();
//     else if(key ==="Enter") equalButton();
// }





