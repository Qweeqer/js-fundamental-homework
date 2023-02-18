const totalCategories = document.querySelectorAll(".item");

console.log(`Number of categories: ${totalCategories.length}`);

const categoriesAll = totalCategories.forEach(el => {
  console.log(`Category: ${el.firstElementChild.textContent}
Elements: ${el.lastElementChild.children.length}`)
});

// <-----------2----------->
// const categoriesAll = [...totalCategories]
//   .map(categories => `Category: ${categories.children[0].textContent}
// Elements: ${categories.children[1].children.length}`
//   )
//   .join("\n");
// console.log(categoriesAll);