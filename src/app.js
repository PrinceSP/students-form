const form = document.querySelector('.form');
const gender = document.querySelectorAll('input[type="radio"]');
const id = document.querySelector('input[name="id"]').value;
const fname = document.querySelector('input[name="fullname"]').value;
const email = document.querySelector('input[name="email"]').value;
const fac = document.querySelector('[name="fil-faculty"]');
const prog = document.querySelector('[name="fil-programs"]');
const show = document.querySelector('[name="button-show"]');

//set form display to none
form.style.display = 'none';


window.addEventListener('scroll',function(){
  let head = document.querySelector('header');
  head.classList.toggle('fixed',window.scrollY > 0);
})

//hide-show button for information form
show.addEventListener('click',function(e){
  e.stopPropagation();
  if (form.style.display === "none") {
    form.style.display = 'block';
    this.textContent = 'Hide Form';
  } else {
    form.style.display = 'none';
    this.textContent = 'Show Form'
  }
});

form.addEventListener('submit',(e)=>{
  e.preventDefault();

  //get ID
  console.log(id);
  //get fullname
  console.log(fname);

  //get email
  console.log(email);

  //get gender value
  gender.forEach((itm,idx,arr)=>{
    if (arr[idx].checked) {
      console.log(arr[idx].value);
    }
  })
});

fac.addEventListener('click',(e)=>{
  e.preventDefault();
  const facList = fac.childNodes;
  facList.forEach(item=>{
    switch (e.target.value) {
      case 'all':
        break;
      case 'theology':
        console.log('theology');
        break;
      case 'nursing':
        console.log('nursing');
        break;
      case 'agriculture':
        console.log('agriculture');
        break;
      case 'comp':
        console.log('computer science');
        break;
    }
  })
});
