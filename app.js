const randomButton = document.querySelector('button');

randomButton.addEventListener('click', ()=> {
    const red = Math.floor(Math.random()*255);
    const green = Math.floor(Math.random()*255);
    const blue = Math.floor(Math.random()*255);

    const compRed = 255 - red;
    const compGreen = 255 - green;
    const compBlue = 255 - blue;

    const redHex = red.toString(16);
    const greenHex = green.toString(16);
    const blueHex = blue.toString(16);

    const mainColour = document.querySelector('#randomColour');
    mainColour.style.backgroundColor = `rgb(${red}, ${green}, ${blue})`;

    const rgbHeading = document.querySelector('h1');
    rgbHeading.innerText = `rgb(${red}, ${green}, ${blue})`;

    const hexHeading = document.querySelector('h2');
    hexHeading.innerText = `#${redHex}${greenHex}${blueHex}`;
})
