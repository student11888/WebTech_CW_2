const nav = document.querySelector('.nav');
const menuItems = document.querySelectorAll('.nav-link');

nav.addEventListener('click', (e) => {
  const btn = e.target.closest('.nav-link');
  for (let item in menuItems) {
    item.classList.remove('active');
  }
  btn.classList.add('active');
  console.log(btn);
});
