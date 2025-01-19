const accessKey = "kNnVy6As1kyTQ2_nitADJUeo15lLrnyDXbjHhtuj4n4"

const searchForm = document.getElementById("search-form");
const searchBox= document.getElementById("search-box");
const searchResult = document.getElementById("search-result");
const showBtn = document.getElementById("show-btn");

let keyWord = '';
let page = 1;

async function searchImages() {
  keyWord = searchBox.value;
  const url = `https://api.unsplash.com/search/photos?page=${page}&query=${keyWord}&client_id=${accessKey}&per_page=12`;

  const response = await fetch(url);
  const data = await response.json();

  const results = data.results;
  
  if(page === 1) {
    results.innerHTML = '';
  }

  results.map((result) => {
    const image = document.createElement("img");
    image.src = result.urls.small;

    const imageLink = document.createElement("a");
    imageLink.href = result.links.html;
    imageLink.target = "_blank";

    imageLink.appendChild(image);
    searchResult.appendChild(imageLink)
  });
  if(results.length > 0) {
    showBtn.style.display = 'block';
  }else{
     showBtn.style.display = 'none';
  }
}
searchForm.addEventListener('submit', (e) => {
  e.preventDefault();
  page = 1;
  searchImages();
  
});

showBtn.addEventListener('click', () => {
  page++;
  searchImages();
})