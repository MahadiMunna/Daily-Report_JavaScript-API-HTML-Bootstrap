fetch('https://openapi.programming-hero.com/api/news/categories')
    .then(res => res.json())
    .then(data => displayCategories(data.data.news_category))

const displayCategories = categories => {
    console.log(categories);
    const allCategories = document.getElementById('categories');

    categories.forEach(category => {
        console.log(category.category_name)
        console.log(category.category_id)
        const categoryList = document.createElement('div');
        categoryList.innerHTML = `
            <p onclick="displayNews('${category.category_id}','${category.category_name}')">${category.category_name}</p>
        `
        
        allCategories.appendChild(categoryList)
    });
}



const displayNews = async(categoryId,categoryName) => {
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
    // totalNumNewsDiv.classList.add('')
    totalNumNewsDiv.innerHTML =`
        <p class="p-4 fw-bold">${newsLength} items found for category ${categoryName}</p>
    `
    totalNumNewsShowField.appendChild(totalNumNewsDiv);

    
    console.log(news)
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
