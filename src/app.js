const form = document.querySelector('.form');
const gender = document.querySelectorAll('input[type="radio"]');
const show = document.querySelector('[name="button-show"]');
const table = document.querySelector('table');
const main = document.querySelector('#faculties');
const pos = document.querySelector('#programs');

const programs = {
  theology:['bechelor theology','magister of theology'],
  nursing:['bachelor nursing','proffession'],
  agriculture:['agriculture'],
  comp:['system information','information of technology'],
  feb:['accounting','management','internatinal program'],
  sec:['secretary'],
  edu:['religious education','english education','economic education','non-formal education']
}


//set form display to none
form.style.display = 'none';

//header fixed when window scrolled
window.addEventListener('scroll',function(){
  let head = document.querySelector('header');
  head.classList.toggle('fixed',window.scrollY > 0);
})


//hide-show button for information form
show.addEventListener('click',function(e){
  e.stopPropagation();
  if (form.style.display == "none") {
    form.style.display = 'block';
    this.textContent = 'Hide Form';
  } else {
    form.style.display = 'none';
    this.textContent = 'Show Form'
  }
});

form.addEventListener('submit',(e)=>{
  e.preventDefault();
  const id = document.querySelector('input[name="id"]').value;
  const fname = document.querySelector('input[name="fullname"]').value;
  const email = document.querySelector('input[name="email"]').value;
  const th = document.querySelectorAll('th');
  console.log(id);
  console.log(fname);
  console.log(email);
  gender.forEach((itm,idx,arr)=>{
    if (arr[idx].checked) {
      console.log(arr[idx].value);
    }
  });

  const rows = document.createElement('tr');
  const tdId = document.createElement('td');
  const tdFname = document.createElement('td');
  const tdGender = document.createElement('td');

  tdId.textContent = id;
  tdFname.textContent = fname;
  tdGender.textContent = gender;

  rows.appendChild(tdId);
  rows.appendChild(tdFname);
  rows.appendChild(tdGender);
  
  table.appendChild(rows);
});

main.addEventListener('change',function(e){
  const selected = programs[this.value];

  while (pos.options.length>0) {
    pos.options.remove(0);
  }

  Array.from(selected).forEach(el=>{
    const option = new Option(el,el);
    pos.appendChild(option);
  })
});
