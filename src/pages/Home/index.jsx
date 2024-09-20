import { useEffect, useState } from "react";
import Trash from "../../assets/trash.svg";
import api from "../../services/api";

import "./style.css";

function Home() {
  const [users, setUsers] = useState([])

  async function getUsers(){
    const data = await api.get('/usuarios')
    //console.log(data.data, 12);
    
    setUsers(data.data)
  }
  console.log(users);
  
  useEffect(()=>{
    getUsers()
  },[])

  async function postUsers(event){

    event.preventDefault()

    const newUser = {
      name: event.target.nome.value,
      email: event.target.email.value,
      age: event.target.age.value,
    }
    //console.log(newUser);

    const newUserApi = await api.post('/usuarios', newUser)
    console.log(newUserApi.data);
    getUsers()
  }

  async function deleteUser(id){
   
    
     await api.delete(`/usuarios/${id}`)
    
    getUsers()
    
  }

  return (
    <div className="container">
      <form onSubmit={postUsers}>
        <h1>Cadastro de Usuários</h1>
        <input placeholder="nome" name="nome" type="text" />
        <input placeholder="idade" name="age" type="number" />
        <input placeholder="email" name="email" type="email" />
        <button type="submit">Cadastrar</button>
      </form>

      {users.map((user) => (
        <div key={user.id} className="card">
          <div>
            <p>Nome: <span>{user.name}</span></p>
            <p>Idade: <span>{user.age}</span></p>
            <p>Email: <span>{user.email}</span></p>
          </div>
          <button onClick={()=>deleteUser(user.id)}>
            <img src={Trash} alt="trash" />
          </button>
        </div>
      ))}
    </div>
  );
}

export default Home;
