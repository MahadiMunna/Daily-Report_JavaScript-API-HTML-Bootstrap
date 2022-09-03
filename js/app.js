fetch('https://openapi.programming-hero.com/api/news/categories')
    .then(res => res.json())
    .then(data => displayCategories(data.data.news_category))
    .catch(error => console.log(error))

const displayCategories = categories => {
    console.log(categories);
    const allCategories = document.getElementById('categories');

    categories.forEach(category => {
        const categoryList = document.createElement('div');
        categoryList.innerHTML = `
            <p class="category" onclick="displayNews('${category.category_id}','${category.category_name}')">${category.category_name}</p>
        `

        allCategories.appendChild(categoryList)
    });

}

const toggleSpinner = loading => {
    const spinner = document.getElementById('spinner');
    if (loading == true) {
        spinner.classList.remove('d-none');
    }
    else {
        spinner.classList.add('d-none');
    }
}

const displayNews = async (categoryId, categoryName) => {
    toggleSpinner(true);
    const url = `https://openapi.programming-hero.com/api/news/category/${categoryId}`
    const res = await fetch(url)
    const data = await res.json()
    showNews(data.data, categoryName);
}

const showNews = (news, categoryName) => {
    const newsLength = news.length;
    const totalNumNewsShowField = document.getElementById('total-num-news-show');
    totalNumNewsShowField.innerText = '';
    const totalNumNewsDiv = document.createElement('div');
    totalNumNewsDiv.classList.add('shadow')
    totalNumNewsDiv.innerHTML = `
        <p class="p-4 fw-bold">${newsLength} news found for category ${categoryName}</p>
    `
    totalNumNewsShowField.appendChild(totalNumNewsDiv);


    console.log(news)
    const newsField = document.getElementById('news-container');
    newsField.innerText = '';
    const sortedNewsByView = news.sort((x,y)=>y.total_view - x.total_view);
    
    sortedNewsByView.forEach(singleNews => {

        const newsDiv = document.createElement('div');
        newsDiv.classList.add('row','align-items-center','bg-white','rounded','shadow','p-2','mb-4');
        newsDiv.innerHTML = `
                <div class="card mb-3 border-0">
                    <div class="row align-items-center g-0">
                        <div class="col-md-4">
                            <img class="p-3 img-fluid rounded" src="${singleNews.thumbnail_url}" alt="...">
                        </div>
                        <div class="col-md-8">
                            <div class="card-body">
                                <h5 class="card-title">${singleNews.title}</h5>
                                <p class="card-text text-truncate">${singleNews.details}</p>
                            </div>
                            <div class="d-lg-flex justify-content-between align-items-center">
                                <div class="d-lg-flex align-items-center w-50">
                                    <img class="img-fluid rounded-circle w-25 me-3" src="${singleNews.author.img?singleNews.author.img:"Author image not found"}" class="card-img-top" alt="...">
                                    <div class="ms-2>
                                        <span class="d-block text-sm"><b>${singleNews.author.name?singleNews.author.name:"Author name not found"}</b></span>
                                        <span class="d-block text-sm text-secondary">${singleNews.author.published_date?singleNews.author.published_date:"Published date not found"}</span>
                                    </div>
                                </div>
                                <div class="fw-bold"><i class="fa-regular fa-eye me-1"></i>${singleNews.total_view?singleNews.total_view:"Not found"}</div>
                                <div class="text-primary"><button class="btn border-0" data-bs-toggle="modal" data-bs-target="#newsDetailsModal" onclick="loadNewsDetails('${singleNews._id}')"><i class="fa-solid fa-arrow-right"></i></button></div>
                            </div>
                        </div>
                    </div>
                </div>
        `;
        newsField.appendChild(newsDiv);
    })
    toggleSpinner(false);
}

const loadNewsDetails = newsId => {
    fetch(`https://openapi.programming-hero.com/api/news/${newsId}`)
        .then(res => res.json())
        .then(data => displayNewsOnModal(data.data[0]))
        .catch(error => console.log(error))
}

const displayNewsOnModal = news => {
    const modalCard = document.getElementById('modal-card')
    modalCard.innerHTML = `
    <img src="${news.image_url}" class="card-img-top" alt="...">
    <div class="card-body">
        <h6 class="card-text fw-semibold">${news.title}</h6>
        <p class="card-text text-secondary">${news.details}</p>
        <div class ="w-50">
             <img src="${news.author.img ? news.author.img : 'Author image not found'}" class="img-fluid rounded-circle m-2" alt="...">
            <div class="mb-3">
                 <span class="category-font-size d-block">${news.author.name ? news.author.name : "Author name not found"}</span>
                <span class="text-secondary">${news.author.published_date ? news.author.published_date : "Published date not found"}</span>
             </div>
         </div>
         <div>
            <i class="fa-solid fa-eye"></i> <span class="text-secondary">${news.total_view ? news.total_view : "0"}</span>
         </div>
         <div>
             <span class="text-secondary">${news.rating.number}</span>
             <span class="text-secondary">${news.rating.badge}</span>
        </div>
    </div>
    `
}
