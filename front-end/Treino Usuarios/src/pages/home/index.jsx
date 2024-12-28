import { useEffect, useState, useRef } from 'react'
import './style.css'
import Xizinho from '../../assets/X.png'
import api from '../../services/api'
import { useLayoutEffect } from 'react'

function Home() {

  const [users, setUsers] = useState([])


  const inputName = useRef()
  const inputAge = useRef()
  const inputEmail = useRef()



  async function getUsers(){
    const usersFromApi = await api.get('/usuarios')

    setUsers(usersFromApi.data)
    console.log(users)
  }

  async function createUsers(){
      await api.post('/usuarios', {
        name: inputName.current.value,
        age: inputAge.current.value,
        email: inputEmail.current.value
      })
      getUsers()
  }

  async function deleteUsers(id){
    await api.delete(`/usuarios/${id}`)
    console.log('deletei')
    getUsers()

  }



  useEffect(()=> {
    getUsers()
  },[])
  

  return (

    <div className='container'>
      <form>
        <h1>Cadastro de usuario</h1>
        <input placeholder="nome" name='name' type='text' ref={inputName}/>
        <input placeholder="idade" name='idade' type='number' ref={inputAge} />
        <input placeholder="email" name='email' type='email' ref={inputEmail} />
        <button type='button' onClick={createUsers}>Cadastrar</button>
      </form>
      {
        users.map(user => (
          <div key={user.id} className='card'>
            <div>
              <p>Nome: <span>{user.name}</span> </p>
              <p>Idade: <spa>{user.age}</spa></p>
              <p>Email: <spa>{user.email}</spa></p>
            </div>
            <button onClick={ ()=> deleteUsers(user.id)}>
              <img src={Xizinho} />
            </button>
          </div>
        ))
      }


    </div>

  )
}

export default Home
