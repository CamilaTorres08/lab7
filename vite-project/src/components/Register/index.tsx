import React, { useState } from 'react'
import styles from './Register.module.css'
import  register from '../../assets/Register.png'
import  {useNavigate}  from 'react-router-dom';
import * as LoginService from '../Services/LoginService';
import { useAuth } from '../Context/UseAuth';

function Register() {
    const [emailUser, setImail] = useState('');
    const [password, setPassword] = useState('');
    const [userName, setUserName] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const { registerUser } = useAuth();

    const handleImailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setImail(e.target.value);
    }

    const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setPassword(e.target.value);
    }

    const handleUserNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setUserName(e.target.value);
    }
    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    const history = useNavigate();

    const handleClick = () => {
        history('/');  
    };

    const handleFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault(); 
        console.log("Form submitted");
        registerUser(emailUser,userName, password);
    };


    /*const startRegister = async () => {
        /*const newUser = { 
            username: userName,
            email: emailUser,
            passwd: password
        }
        try {
            const data1 = await LoginService.RegisterNewUser(userName, emailUser, password);
            if(data1){
                console.log(data1.data.token);
                
            }
            
            //handleClick();
        } catch (error: any) {
            if (error.response) {
                console.error("Error en el servidor: ", error.response.data);
                alert(error.response.data);
                throw new Error(error.response.data);  // Lanzamos el mensaje de error del backend
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

    }*/

    return (
        <div className={styles['main-container']}>
            <div className={styles['form-login']}>
                <h1 className="title-login">Register</h1>
                <form className={styles['form-container']} onSubmit={handleFormSubmit}>
                    <div className={styles['form-group']}>
                        <label htmlFor="name" className="label-name"><i className="fas fa-user"></i>Username</label>
                        <input id="name" type="text" className="input" value={userName} onChange={handleUserNameChange} required/>
                    </div>
                    <div className={styles['form-group']}>
                        <label htmlFor="email" className="label-email"><i className="fas fa-envelope"></i>Email</label>
                        <input type="email" id="email" className="input" value={emailUser} onChange={handleImailChange} required/>
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
                    <button className={styles['button']}  type='submit'>
                    Let's Gooo!
                </button>
                </form>
            </div>
            <div className={styles['picture-login']}>
                <img className={styles['img']} src={register} alt="Task Manager"/>
                <h2 className={styles["title-image"]}>Task Manager</h2>
                <p className={styles["paragraph-title"]}>Start to manage your tasks!</p>
            </div>
        </div>
    )
}

export default Register;
