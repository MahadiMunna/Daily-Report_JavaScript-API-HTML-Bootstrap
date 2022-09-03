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

const toggleSpinner = loading =>{
    const spinner =  document.getElementById('spinner');
    if(loading == true){
        spinner.classList.remove('d-none');
    }
    else{
        spinner.classList.add('d-none');
    }
}

const displayNews = async(categoryId,categoryName) => {
    toggleSpinner(true);
    const url = `https://openapi.programming-hero.com/api/news/category/${categoryId}`
    const res = await fetch(url)
    const data = await res.json()
    showNews(data.data,categoryName);
}

const showNews = (news,categoryName)=>{
    const newsLength = news.length;
    const totalNumNewsShowField = document.getElementById('total-num-news-show');
    totalNumNewsShowField.innerText = '';
    const totalNumNewsDiv = document.createElement('div');
    totalNumNewsDiv.innerHTML =`
        <p class="p-4 fw-bold">${newsLength} items found for category ${categoryName}</p>
    `
    totalNumNewsShowField.appendChild(totalNumNewsDiv);


    console.log(news)
    const newsField = document.getElementById('news-container');
    newsField.innerText='';
    news.forEach(singleNews =>{
        console.log(singleNews.author.name)
        const newsDiv = document.createElement('div');
        newsDiv.classList.add('col');
        newsDiv.innerHTML = `
        <div class="card border-0 shadow p-3 mb-5 bg-body rounded">
          <img class="p-3" src="${singleNews.thumbnail_url}" class="card-img-top" alt="...">
          <div class="card-body">
            <h5 class="card-title">${singleNews.title}</h5>
            <p class="card-text elipsis">${singleNews.details}</p>
          </div>
          <div class="row row-cols-3 g-4 mx-5">
            <div class="col">
                <div><img class="img-fluid" src="${singleNews.author.img}" class="card-img-top" alt="..."></div>
                <div><p>${singleNews.author.name}<br>${singleNews.author.published_date}</p>
            </div>
            <div class="col">${singleNews.total_view}</div>
            <div class="col"><p class="text-primary"><i class="fa-solid fa-arrow-right"></i></p></div>
          </div>
        </div>
        `;
        newsField.appendChild(newsDiv);
    })
    toggleSpinner(false);
}
