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

//Function to generate new colour scheme
const generateColours = function (evt) {

    console.log(evt);

    const randomColour = makeRandRGBColour();
    
    const complementaryColour = getCompColour(randomColour);
      

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
}

//change colours on button press
const randomButton = document.querySelector('button');
randomButton.addEventListener('click', generateColours);

//change colours on key press
document.addEventListener('keypress', generateColours);
