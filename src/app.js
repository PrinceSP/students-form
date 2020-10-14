
let head = document.querySelector('header');
window.addEventListener('scroll',function(){
    console.log(true);
    head.classList.toggle('fixed',window.scrollY > 0);
})
