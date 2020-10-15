const form = document.querySelector('.form');
const show = document.querySelector('[name="button-show"]');
const table = document.querySelector('table');
const main = document.querySelector('#faculties');
const pos = document.querySelector('#programs');

const programs = {
  theology:['bechelor theology','magister of theology'],
  nursing:['bachelor nursing','proffession'],
  agriculture:['agriculture'],
  computer_science:['system information','information of technology'],
  economic:['accounting','management','international program'],
  secretary:['secretary'],
  education:['religious education','english education','economic education','non-formal education']
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

form.addEventListener('submit',(e)=>{
  e.preventDefault();
  const id = document.querySelector('input[name="id"]').value;
  const fname = document.querySelector('input[name="fullname"]').value;
  const email = document.querySelector('input[name="email"]').value;
  const gender = [document.querySelector('.male'),document.querySelector('.female')];

  let gd = gender.map(itm=>{
    if (itm.checked) {
      return itm.value;
    }
  });

  const rows = document.createElement('tr');
  const tdId = document.createElement('td');
  const tdFname = document.createElement('td');
  const tdGender = document.createElement('td');
  const tdFac = document.createElement('td');
  const tdProg = document.createElement('td');
  const btnDel = document.createElement('button');

  const i = document.createElement('i');
  i.className = 'fas fa-user-minus';
  btnDel.appendChild(i);
  btnDel.classList.add('delete');

  tdId.textContent = id;
  tdFname.textContent = fname;
  tdGender.textContent = gd;
  tdFac.textContent = main.value;
  tdProg.textContent = pos.value;

  //add the student's datas to rows
  rows.appendChild(tdId);
  rows.appendChild(tdFname);
  rows.appendChild(tdGender);
  rows.appendChild(tdFac);
  rows.appendChild(tdProg);
  rows.appendChild(btnDel);

  //insert all rows created by clicking add button into the table
  table.appendChild(rows);

  //delete button to delete chosen row
  btnDel.addEventListener('click',deleteRow);
});

//deleting rows logic
function deleteRow(e){
  e.stopPropagation();
  const rows = e.target;
  if(rows.classList[0]==="delete"){
    rows.parentElement.remove();
  }
}
