const sortSelection = document.querySelector('#sort-selection')

const searchSubmit = document.querySelector('#search-button')

sortSelection.addEventListener('input', function indexSort(event) {
  if (event.target.value === 'not-Change') return 
  searchSubmit.click()
})