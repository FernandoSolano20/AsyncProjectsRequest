
    var form = document.querySelector('#search-form');
    var searchField = document.querySelector('#search-keyword');
    var searchedForText;
    var responseContainer = document.querySelector('#response-container');

    form.addEventListener('submit', function (e) {
        e.preventDefault();
        responseContainer.innerHTML = '';
        searchedForText = searchField.value;
        var unsplashRequest = new XMLHttpRequest();
        unsplashRequest.open('GET', 'https://api.unsplash.com/photos/?page=1&query=${'+searchedForText+'}');

        unsplashRequest.onload = addImage;
        unsplashRequest.setRequestHeader('Authorization', 'Client-ID e2958a6a697d9890e0940ab221d4874c78681b465bf5a009e02e6d35e9fd5f17');
        unsplashRequest.send();
    });


function addImage(){
    if(this.status === 200){
        var data = JSON.parse(this.responseText); 
        var firstImage = data[0];

        htmlContent = `<figure>
            <img src="${firstImage.urls.regular}" alt="${searchedForText}">
            <figcaption>${searchedForText} by ${firstImage.user.name}</figcaption>
        </figure>`;

        responseContainer.insertAdjacentHTML('afterbegin',htmlContent);
    }
}

