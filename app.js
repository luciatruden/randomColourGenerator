const randomButton = document.querySelector('button');

randomButton.addEventListener('click', ()=> {
    const red = Math.floor(Math.random()*255);
    const green = Math.floor(Math.random()*255);
    const blue = Math.floor(Math.random()*255);

    // const body = document.querySelector('body');
    document.body.style.backgroundColor = `rgb(${red}, ${green}, ${blue})`;

    const heading = document.querySelector('h1');
    heading.innerText = `rgb(${red}, ${green}, ${blue})`;
})
