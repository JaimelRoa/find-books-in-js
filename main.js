let content = document.querySelector(".container");
let form = document.querySelector(".search-form");
let input = document.getElementById("input-search");

async function getData(e){
    e.preventDefault()
    let loadData = await fetch(`https://www.googleapis.com/books/v1/volumes?q=${input.value}`)
    let data = await loadData.json();
    let books = data.items
    let contentBooks = document.createElement("div")
    console.log(books);
    if(content.children.length==1){
        content.replaceChild(contentBooks,content.children[0])
    }else{
        content.appendChild(contentBooks)
    }
    for(let i of books){
        contentBooks.innerHTML += `
        <div class='book'>
        <a href='${i.volumeInfo.canonicalVolumeLink}' target='_blank'>
        <img src='${i.volumeInfo.imageLinks.smallThumbnail}'>
       </a>
       <div class='book-description'>
       <h2>${i.volumeInfo.title}</h2>
       <h4>Autor: <cite>${i.volumeInfo.authors[0]}</cite></h4>
       <br>
       <h4>Languaje: ${i.volumeInfo.language}</h4>
       <p>${i.searchInfo.textSnippet}</p>
       <b>${i.volumeInfo.categories[0]}</b>
       </div>
       </div> 
       `
    }
}
form.addEventListener("submit",getData)