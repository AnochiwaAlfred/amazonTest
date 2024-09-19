

const xhr = new XMLHttpRequest();

xhr.addEventListener("load", () => {
    const response = xhr.response;
    console.log(response);  
})

xhr.open('GET', "https://supersimplebackend.dev/images/apple.jpg");
xhr.send();


// const alfred = new XMLHttpRequest();

// alfred.addEventListener("load", () => {
//     const response = alfred.response;
//     console.log(response);  
// })

// alfred.open('GET', "https://anochiwaalfred-portfolio.vercel.app/");
// alfred.send();

