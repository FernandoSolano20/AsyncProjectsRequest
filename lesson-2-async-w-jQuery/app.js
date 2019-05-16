/* eslint-env jquery */

var form = document.querySelector('#search-form');
var searchField = document.querySelector('#search-keyword');
var searchedForText;
var responseContainer = document.querySelector('#response-container');

form.addEventListener('submit', function (e) {
    e.preventDefault();
    responseContainer.innerHTML = '';
    searchedForText = searchField.value;
    $.ajax({
        url: `https://api.unsplash.com/search/photos?page=1&query=${searchedForText}`,
        headers: {
            "Authorization": 'Client-ID e2958a6a697d9890e0940ab221d4874c78681b465bf5a009e02e6d35e9fd5f17 '
        }
    }).done(addImage);

    $.ajax({
        url: `http://api.nytimes.com/svc/search/v2/articlesearch.json?q=${searchedForText}&api-key=9UACGFBRJAsAGfs8gZOsWAXhg3HvAa0j`,
    }).done(addArticles);
});

function addImage(images) {
    var firstImage = images.results[0];

    responseContainer.insertAdjacentHTML('afterbegin', `<figure>
            <img src="${firstImage.urls.small}" alt="${searchedForText}">
            <figcaption>${searchedForText} by ${firstImage.user.name}</figcaption>
        </figure>`

    );
}

function addArticles(data) {
    var htmlContent;

    if (data.response && data.response.docs && data.response.docs.length > 1) {
        htmlContent = '<ul>' + data.response.docs.map(article => `<li class="article"> 
                    <h2><a href="${article.web_url}">${article.headline.main}</a></h2>
                    <p>${article.snippet}</p>
                </li>`
        ).join('') + '</ul>';
    }
    else {
        htmlContent = 'Unfortunately, no image was returned for your search.'
    }


    responseContainer.insertAdjacentHTML('beforeend', htmlContent);
}

