//Color Class constructor
class Color {
    constructor(r, g, b) {
        this.red = r;
        this.green = g;
        this.blue = b;

        //returns complementary Color object
        this.getComplementaryColour = function () {

            return new Color(255 - this.red, 255 - this.green, 255 - this.blue)
        }

        //returns string RGB colour
        this.rgbString = function () {
            return `rgb(${this.red}, ${this.green}, ${this.blue})`;
        }

        //return string with hex colour
        this.hexString = function (color) {
    
            return `#${this.red.toString(16)}${this.green.toString(16)}${this.blue.toString(16)}`
        }
    }
}


//Returns random Color object
const getRandomColour = () => {
    const red = Math.floor(Math.random()*255);
    const green = Math.floor(Math.random()*255);
    const blue = Math.floor(Math.random()*255);

    return new Color(red, green, blue)
}

//initialize global variables
let randomColour = [0,0,0];
let complementaryColour = [255,255,255];

//Function to generate new colour scheme on pressing of Space key
const generateColours = function (evt) {
    // console.log(evt.code);

    switch (evt.code){
        case 'Space': 
            
            randomColour = getRandomColour();
            complementaryColour = randomColour.getComplementaryColour();
            

            const mainColour = document.querySelector('#randomColour');
            mainColour.style.backgroundColor = randomColour.rgbString();
            mainColour.style.color = complementaryColour.rgbString();

            const rgbHeading = document.querySelector('#rgbColour');
            rgbHeading.innerText = randomColour.rgbString();

            const hexHeading = document.querySelector('#hexColour');
            hexHeading.innerText = randomColour.hexString();

            // relatedColours
            const relColour = document.querySelector('#relatedColours');
            relColour.style.backgroundColor = complementaryColour.rgbString();

            const complementary = document.querySelector('#complementary');
            complementary.style.backgroundColor = complementaryColour.rgbString();
            complementary.style.color = randomColour.rgbString();
            
            const compRGB = document.querySelector('#compRGB');
            compRGB.innerText = complementaryColour.rgbString();

            const compHex = document.querySelector('#compHex');
            compHex.innerText = complementaryColour.hexString();
        
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
