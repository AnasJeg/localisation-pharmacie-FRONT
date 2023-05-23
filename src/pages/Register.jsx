import * as React from 'react';
import { Button } from 'primereact/button';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { Link, useNavigate } from 'react-router-dom';
import { classNames } from 'primereact/utils';
import { Password } from 'primereact/password';
import { InputText } from 'primereact/inputtext';
import { useState } from 'react';
import { Toast } from 'primereact/toast';
import { useRef } from 'react';
import { accountService } from '../service/account.service';

const Register = () => {
  const navigate = useNavigate()
  const toast = useRef(null);
  const [password, setPassword] = useState('');
  const [password2, setPassword2] = useState('');
  const [email, setEmail] = useState('')
  const [nom, setNom] = useState('');
  const [prenom, setPrenom] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();
    let d = {
      prenom: prenom,
      nom: nom,
      email: email,
      password: password,
      role: 'USER'
    }
    if (!prenom || !nom || !email || !password || !password2) {
      alert("Champ vide !");
    } else if (password !== password2)
      toast.current.show({ severity: 'error', summary: 'Error', detail: 'pass diff !', life: 3000 });
    else {
      console.log(d)
      await accountService.register(d)
        .then(() => {
          navigate('/', { replace: true })
        });

    }
  };

  const containerClassName = classNames('surface-ground flex align-items-center justify-content-center min-h-screen min-w-screen overflow-hidden');

  return (
    <div className={containerClassName}>
      <Toast ref={toast} />
      <div className="flex flex-column align-items-center justify-content-center">
        <div style={{ borderRadius: '56px', padding: '0.3rem', background: 'linear-gradient(180deg, var(--primary-color) 10%, rgba(33, 150, 243, 0) 30%)' }}>
          <div className="w-full surface-card py-8 px-5 sm:px-8" style={{ borderRadius: '53px' }}>
            <div className="text-center mb-5">
              <LockOutlinedIcon />
              <div className="text-900 text-3xl font-medium mb-3">Welcome</div>
            </div>
            <div>
              <div className="card flex flex-column md:flex-row gap-3">
                <div className="p-inputgroup flex-1">
                  <span className="p-inputgroup-addon">
                    <i className="pi pi-user"></i>
                  </span>
                  <InputText placeholder="Nom" value={nom} onChange={(e) => setNom(e.target.value)} />
                </div>
                <div className="p-inputgroup flex-1">
                  <span className="p-inputgroup-addon">
                    <i className="pi pi-user"></i>
                  </span>
                  <InputText placeholder="Prenom" value={prenom} onChange={(e) => setPrenom(e.target.value)} />
                </div>
              </div>
              <div className="p-inputgroup mt-3 flex-1">
                <span className="p-inputgroup-addon">
                  <i className="pi pi-at"></i>
                </span>
                <InputText id="Email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} className="w-full p-3 md:w-30rem" />
              </div>
              <div className="p-inputgroup mt-3 flex-1">
                <span className="p-inputgroup-addon">
                  <i className="pi pi-lock"></i>
                </span>
                <Password id="Password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} toggleMask inputClassName="w-full p-3 md:w-30rem" />
              </div>
              <div className="p-inputgroup mt-3 flex-1">
                <span className="p-inputgroup-addon">
                  <i className="pi pi-lock"></i>
                </span>
                <Password id="Password2" placeholder="Password again" value={password2} onChange={(e) => setPassword2(e.target.value)} toggleMask inputClassName="w-full p-3 md:w-30rem" />
              </div>
              <div className="p-inputgroup mt-3 flex-1">
                <Button label="Register" className="w-full p-3 text-xl" onClick={handleSubmit}></Button>
              </div>
            </div>
            <div style={{ marginLeft: '150px', marginTop: '15px' }}>
              <Link to="/Login" className="font-medium no-underline text-right cursor-pointer" style={{ color: 'var(--primary-color)' }}>Vous avez déjà un compte ? Connectez-vous</Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
Register.getLayout = function getLayout(page) {
  return (
    <React.Fragment>
      {page}
    </React.Fragment>
  );
};
export default Register;