const searchBtn = document.querySelector(".btn-search");
const input = document.getElementById("search-input");
const cardWrapper = document.querySelector(".card-wrapper");

const res = document.querySelector(".res");
const searchResult = document.getElementById("search-result");
const recipeDetails = document.getElementById("recipe-details");
const darkBtn = document.querySelector(".fa-solid");
const btns = document.querySelectorAll(".btn");
const loader = document.getElementById("loader");

const url = "https://www.themealdb.com/api/json/v1/1/search.php?";
let isLoading = true;



// fetch api -------------------------------->

const getRecipeData = (api) => {
  cardWrapper.innerHTML = "";
  hideSection(recipeDetails,searchResult);
  isLoading = true;
  loader.style.display = "block";

  fetch(api)
    .then((res) => res.json())
    .then((data) => {
      // console.log(data);
      isLoading = false;
      loader.style.display = "none";
      // console.log(isLoading);
      const dataMeals = data.meals;
      dataMeals.map((element) => {
        const { strMeal, strMealThumb, strArea, idMeal } = element;
        const title =
          strMeal.length >= 15 ? `${strMeal.slice(0, 14)}....` : strMeal;
        cardWrapper.innerHTML += `
          <div class="card" id=${idMeal}>
            <img src=${strMealThumb} alt="meal img" width="300" height="300"/>
            <h1 class="card-title">${title}</h1>
            <div class="card-btns">
            <button class="btn-country">${strArea}</button>
            <button class="btn-recipe" onclick="showRecipe(event)">Show Recipe</button>
          </div>
          </div>
        `;
      });
    })
    .catch((err) => {
      console.log(err);
    });
};

getRecipeData(`${url}s= `);

// click search btn and fetch the api------------------->

searchBtn.addEventListener("click", () => {
  getRecipeData(`${url}s=${input.value}`);
  input.value = "";
});

function hideSection(inp1, inp2) {
  inp1.style.display = "none";
  inp2.style.display = "block";
}

// api fetch using id --------------------------------->

function showRecipe(event) {
  const mealId = event.target.parentElement.parentElement.id;
  const apiId = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealId}`;

  hideSection(searchResult,recipeDetails);

  isLoading = true;
  hideSection(recipeDetails,loader);


  fetch(apiId)
    .then((res) => res.json())
    .then((data) => {
      // console.log(data.meals[0].strMeal);
      isLoading = false;
      hideSection(loader,recipeDetails);

      
      const {
        strMeal,
        strInstructions,
        strMealThumb,
        strIngredient1,
        strIngredient2,
        strIngredient3,
        strIngredient4,
        strIngredient5,
        strIngredient6,
        strIngredient7,
        strIngredient8,
        strIngredient9,
        strYoutube
      } = data.meals[0];
      
      res.innerHTML = `
      
    <div class="res-left">
        <img src=${strMealThumb} alt="img"/>
    </div>

    <div class="res-right">
      <h1 class="card-title">${strMeal}</h1>
      <h2 class="sub-title">Ingridients: </h2>
      <div class="box-wrapper">
        <div class="box">${strIngredient1}</div>
        <div class="box">${strIngredient2}</div>
        <div class="box">${strIngredient3}</div>
        <div class="box">${strIngredient4}</div>
        <div class="box">${strIngredient5}</div>
        <div class="box">${strIngredient6}</div>
        <div class="box">${strIngredient7}</div>
        <div class="box">${strIngredient8}</div>
        <div class="box">${strIngredient9}</div>
      </div>
      <p class="recipe-text">${strInstructions}</p>
      <div class = "recipe-btns">
      <button class="btn-back" onclick="hideSection(recipeDetails,searchResult)" >go back</button>
      <button class="btn-view"> <a href=${strYoutube} target="_blank">watch Video</a> </button>
      </div>
    </div>
    
      `;
    })
    .catch((err) => {
      console.log(err);
    });
}

// click button get the text and search---------------------->

btns.forEach((element) => {
  // console.log(element);
  element.addEventListener("click", () => {
    input.value = element.innerText;
    getRecipeData(`${url}s=${input.value}`);
  });
});

// dark button toggle------------------------->
let isDark = false;

darkBtn.addEventListener("click", () => {
  document.querySelector("body").classList.toggle("dark");
  if (isDark === false) {
    darkBtn.classList = "fa-sharp fa-solid fa-sun";
    isDark = true;
    darkBtn.style.color = "#27ae60";
  } else {
    darkBtn.classList = "fa-solid fa-moon";
    darkBtn.style.color = "#192a56";
    isDark = false;
  }
});
