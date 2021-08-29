// Modal related 
const modal = document.getElementById('modal');
const closemodalbtn = document.getElementById('close-modal');
const showmodalbtn = document.getElementById('show-modal');
const bookmarkform = document.getElementById('bookmark-form');
const websiteinputElt = document.getElementById('website-name');
const websiteurlElt = document.getElementById('website-url');
// bookmark related
const bookmarkcontainer = document.getElementById('bookmarks-container');

function showmodal()
{
  modal.classList.add('show-modal');
  websiteinputElt.focus();
}
function hidemodal(e){
  if(e.target === modal || e.target===closemodalbtn)
  {
    modal.classList.remove("show-modal");
  }
}

window.addEventListener('click' , hidemodal);
showmodalbtn.addEventListener('click' , showmodal);
closemodalbtn.addEventListener("click", hidemodal);




// if (!urlValue.includes("https://") && !urlValue.includes("http://")) {
//   urlValue = `https://${urlValue}`;
// }