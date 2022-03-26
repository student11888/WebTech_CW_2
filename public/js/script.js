const nav = document.querySelector('.nav');
const menuItems = document.querySelectorAll('.nav-link');
const alert = document.querySelector('.alert-update');
const searchInput = document.querySelector('.input-search');
function docReady(fn) {
  // see if DOM is already available
  if (
    document.readyState === 'complete' ||
    document.readyState === 'interactive'
  ) {
    // call on next available tick
    setTimeout(fn, 1);
  } else {
    document.addEventListener('DOMContentLoaded', fn);
  }
}
// Test if element has a certain class
docReady(() => {
  let url = window.location.pathname;
  // Will only work if string in href matches with location
  document
    .querySelector('ul.nav a[href="' + url + '"]')
    .classList.add('active');
});

////
if (alert != undefined) {
  setTimeout(() => {
    alert.classList.remove('show');
  }, 3000);
}
/// Search
searchInput.addEventListener('submit', async (e) => {
  e.preventDefault();
  await fetch(`/all-students?search=${e.target.value}`, {
    method: 'POST',
  });
  console.log(e.target.value);
});
