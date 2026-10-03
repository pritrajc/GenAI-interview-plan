import {useState} from 'react'
import {useNavigate, Link} from 'react-router'
import {useAuth} from '../hooks/useAuth'
const Register = () =>{

  const navigate = useNavigate();

  const [username, setUsername] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  const {handleRegister} = useAuth()
  const handleSubmit =async (e) =>{
    e.preventDefault();
    try {
      await handleRegister({username, email, password})
      navigate('/')
    } catch (err) {
      console.log(err)
    }
    
  }

  return(
    <main>
    <div className="form-container">
      <h1>Login</h1>

      <form onSubmit={handleSubmit}>

        <div className="input-group">
          <label htmlFor="username">Username</label>
          <input 
          onChange={(e) => {setUsername(e.target.value)}}
          type="text" id="username" name="username" placeholder="Entre Username" />
        </div>

        <div className="input-group">
          <label htmlFor="email">Email</label>
          <input 
          onChange={(e) => {setEmail(e.target.value)}}
          type="email" id="email" name="email" placeholder="Entre email address" />
        </div>

        <div className="input-group">
          <label htmlFor="password">Password</label>
          <input 
          onChange={(e) => {setPassword(e.target.value)}}
          type="password" id="password" name="password" placeholder="Entre Password" />
        </div>

        <button className="button primary-button">Register</button>

      </form>

      <p>Already have an account? <Link to={'/login'}>Login</Link></p>

    </div>
   </main>
  )
}

export default Register;
