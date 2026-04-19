/**
 * Data Catalog Project Starter Code - SEA Stage 2
 *
 * This file is where you should be doing most of your work. You should
 * also make changes to the HTML and CSS files, but we want you to prioritize
 * demonstrating your understanding of data structures, and you'll do that
 * with the JavaScript code you write in this file.
 *
 * The comments in this file are only to help you learn how the starter code
 * works. The instructions for the project are in the README. That said, here
 * are the three things you should do first to learn about the starter code:
 * - 1 - Change something small in index.html or style.css, then reload your
 *    browser and make sure you can see that change.
 * - 2 - On your browser, right click anywhere on the page and select
 *    "Inspect" to open the browser developer tools. Then, go to the "console"
 *    tab in the new window that opened up. This console is where you will see
 *    JavaScript errors and logs, which is extremely helpful for debugging.
 *    (These instructions assume you're using Chrome, opening developer tools
 *    may be different on other browsers. We suggest using Chrome.)
 * - 3 - Add another string to the titles array a few lines down. Reload your
 *    browser and observe what happens. You should see a fourth "card" appear
 *    with the string you added to the array, but a broken image.
 *
 */

// === !! perhaps i can combine the two classes into one ^ !! ===
function BadmintonItem(category, brand, name, price, imageURL) {
  this.category = category;
  this.brand = brand;
  this.name = name;
  this.price = price;
  this.imageURL = imageURL;
}

function BadmintonPlayer(name, age, skill, inventory, numOfBirdies) {
  this.name = name;
  this.age = age;
  this.skill = skill;
  this.inventory = inventory; // this is an array of rackets and birdies
  this.numOfBirdies = numOfBirdies;

}

// my personal racket inventory
const myFirstRacket = new BadmintonItem(
  "Racket",
  "Yonex",
  "ArcSaber 11 Pro",
  285,
  "https://joybadminton.com/cdn/shop/files/Yonex-Arcsaber-11-Pro-Grayish-Pearl.png?v=1752274374"
);

const myFavoriteRacket = new BadmintonItem(
  "Racket",
  "Yonex",
  "Astrox 100 ZZ",
  295,
  "https://joybadminton.com/cdn/shop/files/Yonex_Astrox_100_ZZ_Kurenai.png?v=1752275038"
);

const myWantedRacket = new BadmintonItem(
  "Racket",
  "Yonex",
  "Nanoflare 1000 Z",
  285,
  "https://joybadminton.com/cdn/shop/files/Yonex_Nanoflare_1000_Z_Lightning_Yellow.png?v=1752277886"
);

const birdiesOftenUsed = new BadmintonItem(
  "Birdies",
  "LingMei",
  "90 Pro",
  36.99,
  "https://joybadminton.com/cdn/shop/files/LingMei90proShuttlecock_21b32c9d-bce8-4525-9a0e-fcfd148448ce.png?v=1768003502"
);

const myFirstShoe = new BadmintonItem(
  "Shoes",
  "Yonex",
  "Power Cushion 65 Z4",
  135,
  "https://joybadminton.com/cdn/shop/files/Yonex_Power_Cushion_65_Z4_Men_s_Shoe_White.png?v=1752713399"
)

const mySecondShoe = new BadmintonItem(
  "Shoes",
  "Yonex",
  "Aerus Z2 Wide",
  109,
  "https://joybadminton.com/cdn/shop/files/YonexAerusZ2Wide_LightBlue_carzysale.png?v=1757095445"
)

// this part is kinda exciting, I use an array to display my racket inventory on the webpage
const myRacketInventory = [
  myFirstRacket, 
  myFavoriteRacket, 
  myWantedRacket, 
  birdiesOftenUsed, 
  myFirstShoe, 
  mySecondShoe,
  new BadmintonItem("Bag", "Yonex", "42123 Red", 52, "https://joybadminton.com/cdn/shop/files/Yonex-42123-_Red_-3pk-Team-Badminton-Tennis-Racket-Bag_-43430334.jpg?v=1719011639"),
  new BadmintonItem("Bag", "Victor", "BR6617-M White", 60, "https://joybadminton.com/cdn/shop/files/Victor-Bag-BR6617-M-_White_-192383781.png?v=1722456944"),
  new BadmintonItem("Strings", "Yonex", "BG65 Titanium", 12, "https://joybadminton.com/cdn/shop/files/YonexBG65Ti10mBadmintonString_5Colors.png?v=1728432586"),
  new BadmintonItem("Strings", "Yonex", "BG80 Power", 14, "https://joybadminton.com/cdn/shop/files/YonexBG80Power10mBadmintonString_2Colors.png?v=1728432702")

];

// push and pop into array of what the user wants
const myShoppingCart = [];

// !! ==== THE UI LOGIC FILTERS!!! ==== !!
// buttons!
const filterButtons = document.querySelectorAll(".category-button")
console.log(filterButtons)
let selectedCategory = "all";

filterButtons.forEach(button => {
  button.addEventListener("click", function() {
    selectedCategory = this.dataset.cat;
    // console.log(selectedCategory);
    showCards();
  })
})

// budget ranges!
const minBudgetInput = document.getElementById("min");
const maxBudgetInput = document.getElementById("max");
const budgetFilter = document.getElementById("budget-filter");

budgetFilter.addEventListener("click", function() {
  // console.log(minBudgetInput.value);
  showCards();
})

// search filter!
const searchFilter = document.getElementById("search-filter");
const searchInput = document.getElementById("search")

searchFilter.addEventListener("click", function() {
  console.log(searchInput.value)
})


// leave alone!!!!!!!! for now
// This function adds cards the page to display the data in the array
function showCards() {
  const cardContainer = document.getElementById("card-container");
  cardContainer.innerHTML = "";
  const templateCard = document.querySelector(".card");

  let displayedItems = myRacketInventory;
  
  // filter before loop
  // ============== categories
  if (selectedCategory !== "all") {
    displayedItems = displayedItems.filter(item => {
      return item.category == selectedCategory;
    })
  }

  // ============= budget 
  // super clever way to default value til user gives input using strict equality and boolean
  let min = minBudgetInput.value === "" ? 0 : Number(minBudgetInput.value)
  let max = maxBudgetInput.value === "" ? 99999 : Number(maxBudgetInput.vaue)

  // budget filter - this is what i kinda meant to do!
  displayedItems = displayedItems.filter(item => {
    return item.price >= min && item.price <= max
  })

  // ============= search

  

  for (let i = 0; i < displayedItems.length; i++) {
    let title = displayedItems[i].brand + " " + displayedItems[i].name;

    // This part of the code doesn't scale very well! After you add your
    // own data, you'll need to do something totally different here.
    let imageURL = displayedItems[i].imageURL;


    // ill commit first, then try to display price!
    // here i want to display the price of the racket on bullet point 1
    const price = displayedItems[i].price;


    const nextCard = templateCard.cloneNode(true); // Copy the template card
    editCardContent(nextCard, title, imageURL, price); // Edit title and image
    cardContainer.appendChild(nextCard); // Add new card to the container
  }
}

function editCardContent(card, newTitle, newImageURL, newPrice) {
  card.style.display = "block";

  const cardHeader = card.querySelector("h2");
  cardHeader.textContent = newTitle;

  const cardImage = card.querySelector("img");
  cardImage.src = newImageURL;
  cardImage.alt = newTitle + " Poster";

  // this is how i display price on bullet point 1
  const price = card.querySelector("li");
  price.textContent = "Price: $" + newPrice;
  

  // You can use console.log to help you debug!
  // View the output by right clicking on your website,
  // select "Inspect", then click on the "Console" tab
  console.log("new card:", newTitle, "- html: ", card);
}

// This calls the addCards() function when the page is first loaded
document.addEventListener("DOMContentLoaded", showCards);

function quoteAlert() {
  console.log("Button Clicked!");
  alert(
    "I guess I can kiss heaven goodbye, because it got to be a sin to look this good!",
  );
}

function removeLastCard() {
  titles.pop(); // Remove last item in titles array
  showCards(); // Call showCards again to refresh
}
