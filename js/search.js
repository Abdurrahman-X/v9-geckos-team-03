const recipes = document.querySelector('.recipesApi');
const recipe = document.querySelectorAll('.recipe');
const search = document.querySelector('input[type="search"]');
const searchBtn = document.querySelector('button[type="search"]');
const loader = document.querySelector('#animated-gif');
const resultsFor = document.querySelector('.resultsFor')
const modal = document.querySelector('.modal')
const close = document.querySelector('.close');
const modalTitle = document.querySelector('.title-details');
const prgDetails = document.querySelector('.prg-details');
const footer = document.querySelector('footer')
const arrowBack = document.querySelector('.back')
const displaySomeRecipes = document.querySelector('#displaySomeRecipes')

function displayRecipes() {

    loader.style.display = 'block';
    footer.style.display = 'none';
    arrowBack.style.display = 'none';
    var urlParams = new URLSearchParams(location.search);
    let value = urlParams.get('search');
    let result = `Results For '${value}'`;
    resultsFor.innerHTML = result;
    if (value !== '') {
        fetch(
                `https://api.edamam.com/search?q=${value}&app_id=80010e5d&app_key=a840721c6ce80a1b19aa39f1984cb906`
            )
            .then(res => res.json())
            .then(({
                hits
            }) => {
                loader.style.display = 'none';
                footer.style.display = 'flex';
                arrowBack.style.display = 'block';
                let output = '';
                hits.forEach(({
                    recipe
                }) => {
                    output += `
        <ul class='recipe' >
        <img onclick="openModal('${
            recipe.label
          }','${recipe.ingredientLines}')" class="recipe-img" src='${recipe.image}' />
        <li onclick="openModal('${
            recipe.label
          }','${recipe.ingredientLines}')" class='recipe-title'>${recipe.label}</li> <span>Health Labels:</span> 
         <li class='healthLabels'>${recipe.healthLabels}</li>
        </ul>
        `;
                });
                recipe.forEach(rec => rec.style.display = 'flex')
                recipes.innerHTML = output;
            });
    } else(recipes.innerHTML = 'Please search for a recipe');
}
displayRecipes();


function openModal(title, ingredients) {
    console.log(title, ingredients)
    modalTitle.innerHTML = title;
    prgDetails.innerHTML = ingredients;
    fetch(
            `https://api.edamam.com/search?q=pizza&app_id=80010e5d&app_key=a840721c6ce80a1b19aa39f1984cb906&label=${title}`
        )
        .then(resp => resp.json())
        .then(hits => {
            console.log(hits);
        })
    modal.style.display = 'flex';
}
window.onclick = function (event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
}
close.addEventListener('click', () => {
    modal.style.display = "none";
})