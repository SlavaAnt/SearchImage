const body = document.querySelector('body');
const theme = document.querySelector('.js-theme');
const spanTheme = document.querySelector('.theme-title');

theme.addEventListener('input', onChangeTheme);

function onChangeTheme(evt) {
  const inputCheked = evt.target.checked;
  console.dir(inputCheked);
  if (!inputCheked) {
    body.classList.add('body__dark');
    spanTheme.textContent = 'Dark';
  } else {
    body.classList.remove('body__dark');
    spanTheme.textContent = 'Ligth';
  }
}
