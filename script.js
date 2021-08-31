// Modal related 
const modal = document.getElementById('modal');
const closemodalbtn = document.getElementById('close-modal');
const showmodalbtn = document.getElementById('show-modal');
const bookmarkform = document.getElementById('bookmark-form');
const websiteinputElt = document.getElementById('website-name');
const websiteurlElt = document.getElementById('website-url');
// bookmark related
const bookmarkcontainer = document.getElementById('bookmarks-container');
const splash = document.getElementById('splash');
const splashtext = document.getElementById('splashtext');

//array to store values
let bookmarkarr = [];

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

// validate form
function validate(websitename , websiteurl)
{
  const expression= /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/g;
  const regex = new RegExp(expression);
  if (!websitename || !websiteurl)
  {
    alert('oops! Enter your website name first');
    return false;
  }
  
  if(!websiteurl.match(regex))
  {
    alert('Please Enter a Valid URL');
    return false;
  }
  return true;
}



function deletebookmark(link)
{
 allbookmarks.forEach((element , i)=> {
   if(element.url === link)
   {
     allbookmarks.splice(i,1);
   }
 });
 localStorage.setItem("allbookmarks", JSON.stringify(allbookmarks));
 showbookmarks(); 
}

function bookmarkbuilder()
{
  bookmarkcontainer.textContent='';
  allbookmarks.forEach(element => {
    const { name, url } = element;
    //console.log(name,url);
    const item = document.createElement("div");
    item.classList.add("items");
    //bookmark name
    const bookmarkname = document.createElement('div');
    bookmarkname.classList.add('name');
    //favicon
    const favicon = document.createElement('img')
    favicon.setAttribute(
      "src",
      `https://s2.googleusercontent.com/s2/favicons?domain=${url}`
    );
    favicon.setAttribute('alt' , 'Favicon icon')
    //link
    const link = document.createElement('a');
    link.setAttribute('href' , `${url}`)
    link.setAttribute('target' , '_blank');
    link.textContent = name;
    // deleting bookmark
    const deleteicon = document.createElement("i");
    deleteicon.classList.add("fas", "fa-times-circle" , "delete-icon");
    deleteicon.setAttribute("title", "Delete Bookmark");
    deleteicon.setAttribute("onclick", `deletebookmark('${url}')`);

    //creating whole item
    bookmarkname.append(favicon , link , deleteicon);
    item.append(bookmarkname);
    bookmarkcontainer.appendChild(item);

  });
}


function showbookmarks()
{
  if(localStorage.getItem('allbookmarks'))
  {
    allbookmarks = JSON.parse(localStorage.getItem("allbookmarks"));
  }
  else{
    allbookmarks = [
      {
        name: "Connect me on Linkedin",
        url: "https://www.linkedin.com/in/devanshuruhela/",
      },
    ];
    localStorage.setItem("allbookmarks", JSON.stringify(allbookmarks));
  }
  bookmarkbuilder();
}
function getbookmarkdata(event) {
  event.preventDefault();
  const websitename = websiteinputElt.value;
  let websiteurl = websiteurlElt.value;
  if (!websiteurl.includes("https://") && !websiteurl.includes("http://")) {
    websiteurl = `https://${websiteurl}`;
  }
  if (!validate(websitename, websiteurl)) {
    return false;
  }
  const bookmarkobj = {
    name: websitename,
    url: websiteurl,
  };
  allbookmarks.push(bookmarkobj);
  //console.log(bookmarkarr.length)

  localStorage.setItem("allbookmarks", JSON.stringify(allbookmarks));
  showbookmarks();
  bookmarkform.reset();
  websiteinputElt.focus();
  modal.classList.remove("show-modal");
}
// modal events
window.addEventListener('click' , hidemodal);
showmodalbtn.addEventListener('click' , showmodal);
closemodalbtn.addEventListener("click", hidemodal);

// form events
bookmarkform.addEventListener('submit' , getbookmarkdata)
showbookmarks();
//splash
splash.classList.add('splash');
splashtext.textContent = "AnchorUp";
setTimeout(() => {
  splashtext.textContent = '';
  splash.classList.remove('splash');
},1200);

