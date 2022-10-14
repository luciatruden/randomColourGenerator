//Color Class constructor
class Color {
    constructor(r, g, b) {
        this.red = r;
        this.green = g;
        this.blue = b;

        //this.complementary = getComplementaryColour(this)
    }

    const getComplementaryColour = function (color) {

        return new Color(255 - color.red, 255 - color.green, 255 - color.blue)
    }
}


//Returns random Color object
const getRandomColour = () => {
    const red = Math.floor(Math.random()*255);
    const green = Math.floor(Math.random()*255);
    const blue = Math.floor(Math.random()*255);

    return new Color(red, green, blue)
}

//returns complementary Color object
// const getComplementaryColour = function (color) {

//     return new Color(255 - color.red, 255 - color.green, 255 - color.blue)
// }

//returns string RGB colour
const rgbString = function (color) {

    return `rgb(${color.red}, ${color.green}, ${color.blue})`;
}

//returns string with Hex colour
const hexString = function (color) {
    
    return `#${color.red.toString(16)}${color.green.toString(16)}${color.blue.toString(16)}`
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
            complementaryColour = getComplementaryColour(randomColour);
            

            const mainColour = document.querySelector('#randomColour');
            mainColour.style.backgroundColor = rgbString(randomColour);
            mainColour.style.color = rgbString(complementaryColour);

            const rgbHeading = document.querySelector('#rgbColour');
            rgbHeading.innerText = rgbString(randomColour);

            const hexHeading = document.querySelector('#hexColour');
            hexHeading.innerText = hexString(randomColour);

            // relatedColours
            const relColour = document.querySelector('#relatedColours');
            relColour.style.backgroundColor = rgbString(complementaryColour);

            const complementary = document.querySelector('#complementary');
            complementary.style.backgroundColor = rgbString(complementaryColour);
            complementary.style.color = rgbString(randomColour);
            
            const compRGB = document.querySelector('#compRGB');
            compRGB.innerText = rgbString(complementaryColour);

            const compHex = document.querySelector('#compHex');
            compHex.innerText = hexString(complementaryColour);

            // return randomColour;
        
        default:
            console.log("ignored");
    }
    
}

//Create div for saved colour of 
const newSavedColourDiv = function (color, cssClass) {
    const newColourDiv = document.createElement('div');
    newColourDiv.style.backgroundColor = rgbString(color);
    newColourDiv.style.color = rgbString(color.complementary);
    newColourDiv.innerText = rgbString(color);
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

    // const newColourDiv = document.createElement('div');
    // newColourDiv.style.backgroundColor = rgbString(randomColour);
    // newColourDiv.style.color = rgbString(complementaryColour);
    // newColourDiv.innerText = rgbString(randomColour);
    // newColourDiv.classList.add('randomColourDiv');

    //complementaryColour Div
    const compColourDiv = newSavedColourDiv(randomColour, 'compColourDiv')

    // const compColourDiv = document.createElement('div');
    // compColourDiv.style.backgroundColor = rgbString(complementaryColour);
    // compColourDiv.style.color = rgbString(randomColour);
    // compColourDiv.innerText = rgbString(complementaryColour);
    // compColourDiv.classList.add('compColourDiv');

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
