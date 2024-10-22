import React, { useEffect,useState } from 'react'
import NavBar  from '../NavBar/NavBar'; 
import { Outlet } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import { getUser } from '../Services/Service'; 
import { ToastContainer } from 'react-toastify';
import { UserProvider } from '../Context/UseAuth';
import { TaskProvider } from '../Context/taskAuth';


function UserRouter ()  {

  const [userName, setUserName] = useState('');

  const { idUser } = useParams();

  useEffect(() => {
    if (idUser) {
      getUserTask();
    }
  }, [idUser]);

  const getUserTask = async () => {
    setUserName('prueba');
    /*try {
      if(idUser) {
        const answer = await getUser(idUser); 
        if (answer && answer.data) {
          setUserName(answer.data || '');
        }
      }   
    } catch (error: any) {
      if (error.response) {
          console.error("Error en el servidor: ", error.response.data);
          alert(error.response.data);
      } else if (error.request) {
          console.error("No se recibió respuesta del servidor", error.request);
          alert( error.request);
      } else {
          console.error("Error desconocido: ", error.message);
          alert( error.message);
      }
  }*/
  };
  

  return (
    <>
      <NavBar username={userName} idUser={ idUser }/>
      <Outlet context={{ idUser }} />
    </>
  )
}

export default UserRouter