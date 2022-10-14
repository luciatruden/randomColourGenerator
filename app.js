//initialize global variables
let randomColour = [0,0,0];
let complementaryColour = [255,255,255];

//Color Class constructor
class Color {
    constructor(r, g, b) {
        this.r = r;
        this.g = g;
        this.b = b; 
        this.calcHSL();
    }

    getComplementaryColour () {
        const {r, g, b} = this;
        return new Color(255 - r, 255 - g, 255 - b);
    }

    // complementary () {
    //     const {h, s, l} = this;
    //     const newHue = (h + 180) % 360;
    //     console.log(`opposite: hsl(${newHue}, ${s}%, ${l}%)`);
    //     return `hsl(${newHue}, ${s}%, ${l}%)`;
    // }

    // fullSaturation () {
    //     const {h, l} = this;
    //     return `hsl(${h}, 100%, ${l}%)`;
    // }

    innerRgb () {
        const {r, g, b} = this;
        return `${r}, ${g}, ${b}`;
    }

    rgb () {
        return `rgb(${this.innerRgb()})`;
    }

    rgba (alpha=1.0) {
        return `rgb(${this.innerRgb()}, ${alpha}`;
    }

    hex () {
        const {r, g, b} = this;
        return `#${r.toString(16)}${g.toString(16)}${b.toString(16)}`;
    }

    hsl () {
        const {h, s, l} = this;
        return `hsl(${h}, ${s}%, ${l}%)`;
    }

    calcHSL() {
		let { r, g, b } = this;
		// Make r, g, and b fractions of 1

        r /= 255;
		g /= 255;
		b /= 255;

		// Find greatest and smallest channel values
        let cmin = Math.min(r, g, b)
		let cmax = Math.max(r, g, b),
			delta = cmax - cmin,
			h = 0,
			s = 0,
			l = 0;
            
		if (delta == 0) h = 0;
		else if (cmax == r)
			// Red is max
			h = ((g - b) / delta) % 6;
		else if (cmax == g)
			// Green is max
			h = (b - r) / delta + 2;
		else
			// Blue is max
			h = (r - g) / delta + 4;

		h = Math.round(h * 60);
        
		// Make negative hues positive behind 360°
		if (h < 0) h += 360;
		// Calculate lightness
		l = (cmax + cmin) / 2;
        
		// Calculate saturation
		s = delta == 0 ? 0 : delta / (1 - Math.abs(2 * l - 1));
        
		// Multiply l and s by 100
		s = +(s * 100).toFixed(1);
		l = +(l * 100).toFixed(1);
        
		this.h = h;
		this.s = s;
		this.l = l;
	}
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
    element.style.backgroundColor = color.rgb();
} 

//change background colour of doc element
const changeTextColor = function(color, cssID) {
    const element = document.querySelector(cssID);
    element.style.color = color.rgb();
}

//Change inner text of doc element
const changeInnerText = function(color, cssID) {
    const element = document.querySelector(cssID);
    element.innerText = color.rgb();
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
    newColourDiv.style.backgroundColor = color.rgb();
    newColourDiv.style.color = color.getComplementaryColour().rgb();
    newColourDiv.innerText = color.rgb();
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
