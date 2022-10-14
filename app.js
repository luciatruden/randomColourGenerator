//Color Class constructor
function Color(r, g, b) {
    this.red = r;
    this.green = g;
    this.blue = b;
}


//Returns array with random colour
const makeRandRGBColour = () => {
    const red = Math.floor(Math.random()*255);
    const green = Math.floor(Math.random()*255);
    const blue = Math.floor(Math.random()*255);

    // return [red, green, blue];
    return new Color(red, green, blue)
}

//returns array with complementary colour
const getCompColour = function (color) {
    const red = color.red;
    const green = color.green;
    const blue = color.blue;

    //return [255 - red, 255 - green, 255 - blue];
    return new Color(255 - red, 255 - green, 255 - blue)
}

//returns colour in RGB format
const getRGBColourString = function (color) {
    const red = color.red;
    const green = color.green;
    const blue = color.blue;
    return `rgb(${red}, ${green}, ${blue})`;
}

//returns colour in Hex format
const getHexColourString = function (color) {
    const red = color.red;
    const green = color.green;
    const blue = color.blue;
    return `#${red.toString(16)}${green.toString(16)}${blue.toString(16)}`
}

//initialize global variables
let randomColour = [0,0,0];
let complementaryColour = [255,255,255];

//Function to generate new colour scheme on pressing of Space key
const generateColours = function (evt) {
    // console.log(evt.code);

    switch (evt.code){
        case 'Space': 
            
            randomColour = makeRandRGBColour();
            complementaryColour = getCompColour(randomColour);
            

            const mainColour = document.querySelector('#randomColour');
            mainColour.style.backgroundColor = getRGBColourString(randomColour);
            mainColour.style.color = getRGBColourString(complementaryColour);

            const rgbHeading = document.querySelector('#rgbColour');
            rgbHeading.innerText = getRGBColourString(randomColour);

            const hexHeading = document.querySelector('#hexColour');
            hexHeading.innerText = getHexColourString(randomColour);

            // relatedColours
            const relColour = document.querySelector('#relatedColours');
            relColour.style.backgroundColor = getRGBColourString(complementaryColour);

            const complementary = document.querySelector('#complementary');
            complementary.style.backgroundColor = getRGBColourString(complementaryColour);
            complementary.style.color = getRGBColourString(randomColour);
            
            const compRGB = document.querySelector('#compRGB');
            compRGB.innerText = getRGBColourString(complementaryColour);

            const compHex = document.querySelector('#compHex');
            compHex.innerText = getHexColourString(complementaryColour);

            return randomColour;
        
        default:
            console.log("ignored");
    }
    
}

//Function to create new div with saved colour combination
const saveColour = function () {
    
    //Get parent element
    const savedColoursDiv = document.querySelector('#savedColours');

    // Create new div elements for saved colour combination
    const savedCombinationDiv = document.createElement('div');
    savedCombinationDiv.classList.add('savedColourComb');

    //randomColour Div
    const newColourDiv = document.createElement('div');
    newColourDiv.style.backgroundColor = getRGBColourString(randomColour);
    newColourDiv.style.color = getRGBColourString(complementaryColour);
    newColourDiv.innerText = getRGBColourString(randomColour);
    newColourDiv.classList.add('randomColourDiv');

    //complementaryColour Div
    const compColourDiv = document.createElement('div');
    compColourDiv.style.backgroundColor = getRGBColourString(complementaryColour);
    compColourDiv.style.color = getRGBColourString(randomColour);
    compColourDiv.innerText = getRGBColourString(complementaryColour);
    compColourDiv.classList.add('compColourDiv');

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
