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