
    var form = document.querySelector('#search-form');
    var searchField = document.querySelector('#search-keyword');
    var searchedForText;
    var responseContainer = document.querySelector('#response-container');

    form.addEventListener('submit', function (e) {
        e.preventDefault();
        responseContainer.innerHTML = '';
        searchedForText = searchField.value;
        var unsplashRequest = new XMLHttpRequest();
        unsplashRequest.open('GET', 'https://api.unsplash.com/search/photos/?page=1&query=${'+searchedForText+'}');

        unsplashRequest.onload = addImage;
        unsplashRequest.setRequestHeader('Authorization', 'Client-ID e2958a6a697d9890e0940ab221d4874c78681b465bf5a009e02e6d35e9fd5f17');
        unsplashRequest.send();

        var articleRequest = new XMLHttpRequest();
        articleRequest.onload = addArticles;
        articleRequest.open('GET', `http://api.nytimes.com/svc/search/v2/articlesearch.json?q=${searchedForText}&api-key=9UACGFBRJAsAGfs8gZOsWAXhg3HvAa0j`);
        articleRequest.send();
    });


function addImage(){
    if(this.status === 200){
        var data = JSON.parse(this.responseText); 
        var firstImage = data.results[0];

        var htmlContent = `<figure>
            <img src="${firstImage.urls.small}" alt="${searchedForText}">
            <figcaption>${searchedForText} by ${firstImage.user.name}</figcaption>
        </figure>`;

        responseContainer.insertAdjacentHTML('afterbegin',htmlContent);
    }
}

function addArticles () {
    if(this.status === 200){
        var htmlContent;
        var data = JSON.parse(this.responseText); 

        if(data.response && data.response.docs && data.response.docs.length > 1){
            htmlContent = '<ul>' + data.response.docs.map(article => `<li class="article"> 
                    <h2><a href="${article.web_url}">${article.headline.main}</a></h2>
                    <p>${article.snippet}</p>
                </li>`
            ).join('') + '</ul>';
        }
        else{
            htmlContent = 'Unfortunately, no image was returned for your search.'
        }
         

        responseContainer.insertAdjacentHTML('beforeend',htmlContent);
    }
}

