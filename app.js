//initialize global variables
let randomColour = [0,0,0];
let complementaryColour = [255,255,255];

//Color Class constructor
class Color {
    constructor(r, g, b) {
        this.red = r;
        this.green = g;
        this.blue = b;
        
    }
}

//returns complementary Color object
Color.prototype.getComplementaryColour = function () {
    return new Color(255 - this.red, 255 - this.green, 255 - this.blue)
}

//returns string RGB colour
Color.prototype.rgbString = function () {
    return `rgb(${this.red}, ${this.green}, ${this.blue})`;
}

//return string with hex colour
Color.prototype.hexString = function (color) {
    return `#${this.red.toString(16)}${this.green.toString(16)}${this.blue.toString(16)}`
}


//Returns random Color object
const getRandomColour = () => {
    const red = Math.floor(Math.random()*255);
    const green = Math.floor(Math.random()*255);
    const blue = Math.floor(Math.random()*255);

    return new Color(red, green, blue)
}



//change background colour of doc element
const changeBackgroundColor = function(color, cssID) {
    const element = document.querySelector(cssID);
    element.style.backgroundColor = color.rgbString();
} 

//change background colour of doc element
const changeTextColor = function(color, cssID) {
    const element = document.querySelector(cssID);
    element.style.color = color.rgbString();
}

//Change inner text of doc element
const changeInnerText = function(color, cssID) {

    const element = document.querySelector(cssID);
    element.innerText = color.rgbString();
}

//Function to generate new colour scheme on pressing of Space key
const generateColours = function (evt) {
    // console.log(evt.code);

    switch (evt.code){
        case 'Space': 
            
            randomColour = getRandomColour();
            complementaryColour = randomColour.getComplementaryColour();
            
            //Main colour (random)
            changeBackgroundColor(randomColour, '#randomColour');
            changeTextColor(complementaryColour, '#randomColour');
            changeInnerText(randomColour, '#rgbColour');
            changeInnerText(randomColour, '#hexColour');

            // relatedColours div
            changeBackgroundColor(complementaryColour, '#relatedColours');
            
            // complementary colour
            changeBackgroundColor(complementaryColour, '#complementary');
            changeTextColor(randomColour, '#complementary');            
            changeInnerText(complementaryColour, '#compRGB')
            changeInnerText(complementaryColour, '#compHex')
        
        default:
            console.log("ignored");
    }
    
}

//Create div for saved colour of 
const newSavedColourDiv = function (color, cssClass) {
    const newColourDiv = document.createElement('div');
    newColourDiv.style.backgroundColor = color.rgbString();
    newColourDiv.style.color = color.getComplementaryColour().rgbString();
    newColourDiv.innerText = color.rgbString();
    newColourDiv.classList.add(cssClass);

    return newColourDiv
}


//Function to create new div with saved colour combination
const saveColour = function () {
    
    //Get parent element
    const savedColoursDiv = document.querySelector('#savedColours');

    // Create new div elements for saved colour combination
    const savedCombinationDiv = document.createElement('div');
    savedCombinationDiv.classList.add('savedColourComb');

    //randomColour Div
    const newColourDiv = newSavedColourDiv(randomColour, 'randomColourDiv')

    //complementaryColour Div
    const compColourDiv = newSavedColourDiv(complementaryColour, 'compColourDiv')

    //Append
    savedCombinationDiv.appendChild(newColourDiv);
    savedCombinationDiv.appendChild(compColourDiv);

    savedColoursDiv.appendChild(savedCombinationDiv);
}

//change colours on key press
document.addEventListener('keypress', generateColours);

//Save colour combination
const saveForm = document.querySelector('form');
saveForm.addEventListener('submit', function (e) {
    
    e.preventDefault();
    saveColour();
})

const saveDiv = document.querySelector('#savedColours');

saveDiv.addEventListener('click', function(e){
    
    //Only remove the individual colour combination (not its container)
    if(/randomColourDiv|compColourDiv/.test(e.target.className)){
        e.target.parentElement.remove();
    }
})
