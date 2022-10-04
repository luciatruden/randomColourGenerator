//Returns array with random colour
const makeRandRGBColour = () => {
    const red = Math.floor(Math.random()*255);
    const green = Math.floor(Math.random()*255);
    const blue = Math.floor(Math.random()*255);

    return [red, green, blue];
}

//returns array with complementary colour
const getCompColour = function (rgbArray) {
    const red = rgbArray[0];
    const green = rgbArray[1];
    const blue = rgbArray[2];

    return [255 - red, 255 - green, 255 - blue];
}

//returns colour in RGB format
const getRGBColour = function (rgbArray) {
    const red = rgbArray[0];
    const green = rgbArray[1];
    const blue = rgbArray[2];
    return `rgb(${red}, ${green}, ${blue})`;
}

//returns colour in Hex format
const getHexColour = function (rgbArray) {
    const red = rgbArray[0];
    const green = rgbArray[1];
    const blue = rgbArray[2];
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
            //const randomColour = makeRandRGBColour();
            //const complementaryColour = getCompColour(randomColour);
            randomColour = makeRandRGBColour();
            complementaryColour = getCompColour(randomColour);
            

            const mainColour = document.querySelector('#randomColour');
            mainColour.style.backgroundColor = getRGBColour(randomColour);
            mainColour.style.color = getRGBColour(complementaryColour);

            const rgbHeading = document.querySelector('#rgbColour');
            rgbHeading.innerText = getRGBColour(randomColour);

            const hexHeading = document.querySelector('#hexColour');
            hexHeading.innerText = getHexColour(randomColour);

            // relatedColours
            const relColour = document.querySelector('#relatedColours');
            relColour.style.backgroundColor = getRGBColour(complementaryColour);

            const complementary = document.querySelector('#complementary');
            complementary.style.backgroundColor = getRGBColour(complementaryColour);
            complementary.style.color = getRGBColour(randomColour);
            
            const compRGB = document.querySelector('#compRGB');
            compRGB.innerText = getRGBColour(complementaryColour);

            const compHex = document.querySelector('#compHex');
            compHex.innerText = getHexColour(complementaryColour);

            return randomColour;
        
        default:
            console.log("ignored");
    }
    
}

//Function to create new div with saved colour combination
const saveColour = function () {
    console.log("in saveColour")
    //Get parent element
    const savedColoursDiv = document.querySelector('#savedColours');

    // Create new div elements for saved colour combination
    const savedCombinationDiv = document.createElement('div');
    savedCombinationDiv.classList.add('savedColourComb');
    //randomColour Div
    const newColourDiv = document.createElement('div');
    newColourDiv.style.backgroundColor = getRGBColour(randomColour);
    newColourDiv.style.color = getRGBColour(complementaryColour);
    newColourDiv.innerText = getRGBColour(randomColour);
    newColourDiv.classList.add('randomColourDiv');

    //complementaryColour Div
    const compColourDiv = document.createElement('div');
    compColourDiv.style.backgroundColor = getRGBColour(complementaryColour);
    compColourDiv.style.color = getRGBColour(randomColour);
    compColourDiv.innerText = getRGBColour(complementaryColour);
    compColourDiv.classList.add('compColourDiv');

    //Append
    savedCombinationDiv.appendChild(newColourDiv);
    savedCombinationDiv.appendChild(compColourDiv);

    savedColoursDiv.appendChild(savedCombinationDiv);
}

//change colours on key press
document.addEventListener('keypress', generateColours);

//Save colour combination
const saveForm = document.querySelector('#savedColours form');
saveForm.addEventListener('submit', function (e) {
    e.preventDefault();
    saveColour();

})
