// Add click event listener to each gallery item  
const galleryItems = document.querySelectorAll(".gallery-item");  
galleryItems.forEach(item => {  
  item.addEventListener("click", function () {  
    const src = item.querySelector("img").getAttribute("src");  
    document.querySelector(".modal-img").src = src;  
    const myModal = new bootstrap.Modal(document.getElementById("gallery-modal"), {  
      backdrop: 'static',  
      keyboard: false  
    });  
    myModal.show();  
  });  
});  
  
// Randomize photo angles  
galleryItems.forEach(item => {  
  const randomAngle = Math.floor(Math.random() * 41) - 20; // Random angle between -20 and 20 degrees  
  item.style.transform = `rotateZ(${randomAngle}deg)`;  
});  
