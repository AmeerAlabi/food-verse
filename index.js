const searchForm = document.querySelector('form');
const searchInput = document.querySelector('#search');
const resultsList = document.querySelector('#results');

searchForm.addEventListener('submit', (e) => {
    e.preventDefault();
    searchRecipe();
});

async function searchRecipe() {
    const searchValue = searchInput.value.trim();
    try {
        const response = await fetch(`https://api.edamam.com/search?q=${searchValue}&app_id=10acbed6&app_key=bd49a33dcfb707596dd957c28a82b87d`);
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data = await response.json();
        displayRecipes(data.hits);
    } catch (error) {
        console.error('Error fetching data:', error);
        // You may want to handle errors in a user-friendly way here
    }
}

function displayRecipes(recipes) {
    let html = '';
    recipes.forEach((recipe) => {
        html += `
        <div>
            <img src="${recipe.recipe.image}" alt="${recipe.recipe.label}">
            <h3>${recipe.recipe.label}</h3>
            <ul>
                ${recipe.recipe.ingredientLines.map(ingredient => `<li>${ingredient}</li>`).join('')}
            </ul>
            <a href="${recipe.recipe.url}" target="_blank">View Recipe</a>
        </div>`
    })
    resultsList.innerHTML = html;
}
