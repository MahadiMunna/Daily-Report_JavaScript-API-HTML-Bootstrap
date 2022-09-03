fetch('https://openapi.programming-hero.com/api/news/categories')
    .then(res => res.json())
    .then(data => displayCategories(data.data.news_category))

const displayCategories = categories => {
    console.log(categories);
    const allCategories = document.getElementById('categories');

    categories.forEach(category => {
        const categoryList = document.createElement('div');
        categoryList.innerHTML = `
            <p onclick="displayNews('${category.category_id}','${category.category_name}')">${category.category_name}</p>
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
    totalNumNewsDiv.innerHTML = `
        <p class="p-4 fw-bold">${newsLength} items found for category ${categoryName}</p>
    `
    totalNumNewsShowField.appendChild(totalNumNewsDiv);


    console.log(news)
    const newsField = document.getElementById('news-container');
    newsField.innerText = '';
    const sortedNewsByView = news.sort((x,y)=>y.total_view - x.total_view);
    
    sortedNewsByView.forEach(singleNews => {

        const newsDiv = document.createElement('div');
        newsDiv.classList.add('row');
        newsDiv.classList.add('align-items-center');
        newsDiv.classList.add('mb-3');
        newsDiv.classList.add('bg-white');
        newsDiv.classList.add('p-2');
        newsDiv.classList.add('rounded');
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
                                    <img class="img-fluid rounded-circle w-25 me-3" style="size:25%;" src="${singleNews.author.img?singleNews.author.img:"Author image not found"}" class="card-img-top" alt="...">
                                    <div class="ms-2>
                                    <span class="d-block text-sm fw-semibold">${singleNews.author.name?singleNews.author.name:"Author name not found"}</span><span class="d-block">${singleNews.author.published_date?singleNews.author.published_date:"Published date not found"}</span>
                                    </div>
                                </div>

                                <div ><i class="fa-regular fa-eye"></i>${singleNews.total_view?singleNews.total_view:"Not found"}</div>

                                <div ><button class="btn border-0 text-primary data-bs-toggle="modal" data-bs-target="#newsDetailModal""><i class="fa-solid fa-arrow-right"></i></button></div>
                            </div>
                        </div>
                    </div>
                </div>
        `;
        newsField.appendChild(newsDiv);
    })
    toggleSpinner(false);
}
