const form = document.querySelector('.form');
const form2 = document.querySelector('#form2');
const show = document.querySelector('[name="button-show"]');
const table = document.querySelector('table');
const main = document.querySelector('#faculties');
const pos = document.querySelector('#programs');
const input = document.querySelector('[name="searchbar"]');
const filter = [document.querySelector('.fil-faculty'),document.querySelector('.fil-programs')];
const programs = {
  theology:['theology bachelors','magister of theology'],
  nursing:['bachelor nursing','proffession'],
  agriculture:['agriculture'],
  computer_science:['system information','information of technology'],
  economic:['accounting','management','international program'],
  secretary:['secretary'],
  education:['religious education','english education','economic education','non-formal education']
}

document.addEventListener('DOMContentLoaded',getItemsFromLocalStorage);

form.style.display = 'none';

window.addEventListener('scroll',function(){
  let head = document.querySelector('header');
  head.classList.toggle('fixed',window.scrollY > 0);
})

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
  const id = document.querySelector('input[name="id"]');
  const fname = document.querySelector('input[name="fullname"]');
  const email = document.querySelector('input[name="email"]');
  const gender = [document.querySelector('.male'),document.querySelector('.female')];

  let gd = gender.reduce(itm=>{
    if (itm.checked) {
      return itm.value;
    }
  });

  let l = localStorage.getItem("tr");
  addItemsFromLocalStorage(l,l,id,fname,gd,main,pos);

  let locals = [id.value,fname.value,gd,main.value,pos.value];
  saveLocalStorage(locals[0],locals[1],locals[2],locals[3],locals[4]);

  id.value = ''
  fname.value = ''
  email.value = ''
  gender.forEach(i=>i.checked = false);
  main.selectedIndex = 0;
  pos.textContent = '';

});


input.addEventListener('keyup',function(){
  const trList = table.querySelectorAll('.data-lists');
  const val = this.value.toUpperCase();
  console.log(val);
  trList.forEach((itm,idx,arr)=>{
    let a = itm.getElementsByTagName('td')[1];
    if (a.textContent.toUpperCase().includes(val)>0) {
      arr[idx].style.display = ""
    } else{
      arr[idx].style.display = "none"
    }
  })
});

filter[0].addEventListener('change',function(e){
  const values = [0,3];
  filtersList(e,values[0],values[1]);
});
filter[1].addEventListener('change',function(e){
  const values = [1,4];
  filtersList(e,values[0],values[1]);
});

function deleteRow(e){
  e.stopPropagation();
  let cf = confirm('are you sure want to delete this?');
  const rows = e.target;

  if (cf === true) {
    const parents = rows.parentElement;
    const textName = parents.getElementsByTagName('td')[1].textContent;
    if(rows.classList[0]==="del-btn"){
      rows.parentElement.remove();
      deleteFromLocal(textName);
    }
  } else {
    alert('delete canceled');
  }
}

function filtersList(e,vals,row){
  e.preventDefault();
  const list = filter[vals].childNodes;
  const trList = table.querySelectorAll('.data-lists');
  const val = e.target.value.toUpperCase();
  console.log(val);
  trList.forEach((itm,idx,arr)=>{
    let a = itm.getElementsByTagName('td')[row];
    if (a.textContent.toUpperCase().includes(val)>0) {
      arr[idx].style.display = ""
    } else{
      arr[idx].style.display = "none"
    }
  })
}

function saveLocalStorage(id,name,gender,faculties,programs){

  let tr = {
    ids: id,
    names:name,
    genders:gender,
    fac:faculties,
    prog:programs
  }

  let rows;

  if (localStorage.getItem('tr')===null) {
    rows = []
  } else{
    localStorage.getItem('tr')
    rows = JSON.parse(localStorage.getItem('tr'))
  }
  rows.push(tr)
  localStorage.setItem('tr',JSON.stringify(rows));

}

function getItemsFromLocalStorage(){
  let rows;
  if (localStorage.getItem('tr')===null) {
    rows = []
  } else{
    localStorage.getItem('tr')
    rows = JSON.parse(localStorage.getItem('tr'))
  }
  rows.map(items=>{
    addItemsFromLocalStorage(items);
  })
}

function deleteFromLocal(items){
  let rows;
  if (localStorage.getItem('tr')===null) {
    rows = []
  } else{
    localStorage.getItem('tr')
    rows = JSON.parse(localStorage.getItem('tr'))
  }
  rows.map((item,idx)=>{
    let itemToDelete = rows[indexOf();
    if (itemToDelete == items) {
      rows.splice(itemToDelete,1);
      localStorage.setItem('tr',JSON.stringify(rows));
    }
  })
}

function addItemsFromLocalStorage(items,r,id,nm,gds,facs,progs){
  const rows = document.createElement('tr');
  const tdId = document.createElement('td');
  const tdFname = document.createElement('td');
  const tdGender = document.createElement('td');
  const tdFac = document.createElement('td');
  const tdProg = document.createElement('td');
  const btnDel = document.createElement('button');

  rows.className = 'data-lists';
  tdFname.className = 'username';

  const i = document.createElement('i');
  i.className = 'fas fa-user-minus';
  btnDel.appendChild(i);
  btnDel.classList.add('del-btn');

  if (r!==undefined && r!==0 && r!==null && r!==false && r!=='') {
    tdId.textContent = id.value;
    tdFname.textContent = nm.value;
    tdGender.textContent = gds;
    tdFac.textContent = facs.value;
    tdProg.textContent = progs.value;

  } else if (r===null) {
    tdId.textContent = id.value;
    tdFname.textContent = nm.value;
    tdGender.textContent = gds;
    tdFac.textContent = facs.value;
    tdProg.textContent = progs.value;
  }
  else {
    tdId.textContent = items.ids;
    tdFname.textContent = items.names;
    tdGender.textContent = items.genders;
    tdFac.textContent = items.fac;
    tdProg.textContent = items.prog;
  }

  rows.appendChild(tdId);
  rows.appendChild(tdFname);
  rows.appendChild(tdGender);
  rows.appendChild(tdFac);
  rows.appendChild(tdProg);
  rows.appendChild(btnDel);

  table.appendChild(rows);

  btnDel.addEventListener('click',deleteRow);
}
