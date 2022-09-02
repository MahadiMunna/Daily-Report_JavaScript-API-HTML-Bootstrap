fetch('https://openapi.programming-hero.com/api/news/categories')
.then(res=>res.json())
.then(data=>displayCategories(data.data.news_category))

const displayCategories = categories =>{
    console.log(categories);
    const allCategories = document.getElementById('categories');
    
    categories.forEach(category => {
        console.log(category.category_name)
        const categoryList = document.createElement('div');
        categoryList.innerHTML = `
            <p>${category.category_name}</p>
        `
        allCategories.appendChild(categoryList)
    });
}

fetch('https://openapi.programming-hero.com/api/news/category/01')
.then(res => res.json())
.then(data => displayNews(data.data))

const displayNews = allNews =>{
    console.log(allNews)
    const newsField = document.getElementById('news-container');

    allNews.forEach = news =>{
        console.log(news.category_id)
        const newsDiv = document.createElement('div');
        newsDiv.classList.add('col');
        newsDiv.innerHTML = `
        <div class="card">
          <img src="..." class="card-img-top" alt="...">
          <div class="card-body">
            <h5 class="card-title">Card title</h5>
            <p class="card-text">This is a longer card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.</p>
          </div>
        </div>
        `;
        newsField.appendChild(newsDiv);
    }
}