const images = [
  {
    url: 'https://images.pexels.com/photos/140134/pexels-photo-140134.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260',
    alt: 'White and Black Long Fur Cat',
  },
  {
    url: 'https://images.pexels.com/photos/213399/pexels-photo-213399.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260',
    alt: 'Orange and White Koi Fish Near Yellow Koi Fish',
  },
  {
    url: 'https://images.pexels.com/photos/219943/pexels-photo-219943.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260',
    alt: 'Group of Horses Running',
  },
];
const galleryList = document.querySelector(".gallery");
galleryList.style.display = "flex";
galleryList.style.flexWrap = "wrap";
galleryList.style.gap = "15px"
galleryList.style.listStyle = "none";

const galleryMarkup = images.map((image) => {
  return `<li class="gallery__item"><img class="gallery__img" src="${image.url}" alt="${image.alt}" width = 400 height = 300></li>`;
}
);
console.log(galleryList.children);
galleryList.insertAdjacentHTML("afterbegin", galleryMarkup.join(""));
const imgList = document.querySelectorAll("img")
console.log(imgList);
imgList.forEach(img => {
  img.style.objectFit = "cover";
  console.log(img);
});