import React, { useState } from 'react'
import styles from './Login.module.css'
import LoginImg from '../../assets/LoginImg.png'
import { Link } from 'react-router-dom';
import * as LoginService from '../Services/LoginService';
import  {useNavigate}  from 'react-router-dom';
import { jwtDecode } from "jwt-decode";
import { useAuth } from '../Context/UseAuth';
type Props = {}

function Login(props: Props) {
    const [username, setUsername] = useState('');
    const [password,setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const { userLogin } = useAuth();

    const handleUsernameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setUsername(e.target.value);
    }

    const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setPassword(e.target.value);
    }
    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    const history = useNavigate();

    const handleFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault(); 
        console.log("Form submitted");
        userLogin(username, password);
    };

    /*const startLogin = () =>{
        
        /*try {
            const answer = await LoginService.LoginUser(username, password);
            console.log(jwtDecode(answer.data['token']));
            console.log(answer.data['userId']);
            //handleClick(answer.data['userId']);
        } catch (error: any) {
            if (error.response) {
                console.error("Error en el servidor: ", error.response.data);
                alert(error.response.data);
                throw new Error(error.response.data);  
            } else if (error.request) {
                console.error("No se recibió respuesta del servidor", error.request);
                alert( error.request);
                throw new Error('No se recibió respuesta del servidor');
            } else {
                console.error("Error desconocido: ", error.message);
                alert( error.message);
                throw new Error('Ocurrió un error al procesar la solicitud');
            }
        }
        userLogin(username, password);
    }*/

  return (
    <div className={styles['main-container']}>
        <div className={styles['form-login']}>
            <h1 className="title-login">Welcome!</h1>
            <form className={styles['form-container']} onSubmit={handleFormSubmit}>
                <div className={styles['form-group']}>
                    <label htmlFor="username" className="label-email"><i className="fas fa-envelope"></i>Username</label>
                    <input id="name" type="text" className="input"
                    value={username}
                    onChange={handleUsernameChange}
                    required
                    />
                </div>
                <div className={styles['form-group']}>
                    <label htmlFor="password" className="label-password"><i className="fas fa-lock"></i>Password</label>
                    <div className={styles['password-container']}>
                        <input
                            id="password"
                            type={showPassword ? 'text' : 'password'}
                            className={styles['password-input']}
                            value={password}
                            onChange={handlePasswordChange}
                            required
                        />
                        <button type="button" onClick={togglePasswordVisibility} className={styles['password-button']}>
                            {showPassword ? <i className="fas fa-eye-slash" style={{ color: '#15505d' }}></i> : <i className="fas fa-eye" style={{ color: '#15505d' }}></i>}
                        </button>
                    </div>
                </div>
                <button className={styles['button']}
                type = 'submit'
                >Sign In</button>
            </form>
                <p className={styles['create-count']}>Don't Have Account? 
                    <Link to='/Register' className={styles['a-create-count']}>Create Account</Link></p>
        </div>
        <div className={styles['picture-login']}>
            <img className={styles['img']} src={LoginImg}/>
            <h2 className={styles["title-image"]}>Task Manager</h2>
            <p className={styles["paragraph-title"]}>Manage your task in One Place with Ease!</p>
        </div>
    </div>
  )
}

export default Login