const CreateCity = document.querySelector('.CreateCity')
CreateCity.addEventListener('submit', (e) => {
  e.preventDefault()
  const name = CreateCity.querySelector('.name').value
  const postal = CreateCity.querySelector('.postal').value
  const provinceId = CreateCity.querySelector('.provinceId').value
  post('/createCity', { name, postal, provinceId })
})

const Login = document.querySelector('.Login')
Login.addEventListener('submit', (e) => {
  e.preventDefault()
  const username = Login.querySelector('.username').value
  const password = Login.querySelector('.password').value
  post('/login', { username, password })
    .then(({ status }) => {
      if (status === 200) alert('login success')
      else alert('login failed')
    })
})

function post (path, data) {
  return window.fetch(path, {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  })
}
