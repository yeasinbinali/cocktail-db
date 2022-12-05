const toggleSpinner = displayStyle => {
    document.getElementById('spinner-section').style.display = displayStyle;
}
document.getElementById('search-btn').addEventListener('click', function(){
    toggleSpinner('block');
    const inputField = document.getElementById('input-field');
    const inputFieldValue = inputField.value;
    inputField.value = '';

    const url = `https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${inputFieldValue}`
    fetch(url)
        .then(res => res.json())
        .then(data => displaySearch(data.drinks))
})

const displaySearch = drinks => {
    const mealSection = document.getElementById('meal-section');
    mealSection.textContent = '';
    drinks.map(drink => {
        const drinkDiv = document.createElement('div');
        drinkDiv.innerHTML = `
            <div class="card">
            <img src="${drink.strDrinkThumb}" class="card-img-top" alt="...">
                <div class="card-body">
                    <h5 class="card-title">${drink.strDrink}</h5>
                    <p class="card-text">${drink.strInstructions.slice(0, 120)}</p>
                    <button onclick="loadSingleDrink(${drink.idDrink})" class="detail-btn">Details</button>
                </div>
            </div>
        `
    mealSection.appendChild(drinkDiv)
    });
    toggleSpinner('none');
}

const loadSingleDrink = drinkId => {
    toggleSpinner('block');
    const url = `https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${drinkId}`
    fetch(url)
        .then(res => res.json())
        .then(data => displaySingleDrink(data.drinks))
}

const displaySingleDrink = drinks => {
    const singleDrink = document.getElementById('single-drink');
    singleDrink.textContent = '';
    drinks.map(drink => {
        const singleDiv = document.createElement('div');
        singleDiv.classList.add('single-card');
        singleDiv.innerHTML = `
            <img src="${drink.strDrinkThumb}" class="card-img-top" alt="...">
            <div class="card-body">
                <h5 class="card-title">${drink.strDrink}</h5>
                <p class="card-text">${drink.strInstructions.slice(0, 200)}</p>
                <button class="detail-btn">Youtube</button>
            </div>
        `
        singleDrink.appendChild(singleDiv);
    })
    toggleSpinner('none');
}