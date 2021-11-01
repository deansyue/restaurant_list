// monitor for click delete button to pop out of certain window

// search all delete button  
const deleteButtons = document.querySelectorAll('.delete-button')

// monitor all delete button when button is clicked
deleteButtons.forEach(deleteButton => {
  deleteButton.addEventListener('click', function deleteData(event) {
    const id = deleteButton.dataset.id
    console.log(id)

    // adk user that do you delete this data. if user response yes, after server router delete url, redirect home page 
    if (confirm('確認刪除此筆資料?')) {
      alert('資料已刪除!')
      return axios.post(`/restaurants/${id}?_method=DELETE`)
        .then(() => window.location.href = '/')
        .catch(error => console.log(error))
    }
  })
})