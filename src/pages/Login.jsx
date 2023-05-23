import React, { useRef, useState } from 'react';
import { Checkbox } from 'primereact/checkbox';
import { Button } from 'primereact/button';
import { Password } from 'primereact/password';
import { InputText } from 'primereact/inputtext';
import { classNames } from 'primereact/utils';
import { Link, useNavigate } from 'react-router-dom';
import { Toast } from 'primereact/toast';
import { accountService } from '../service/account.service';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';

const Login = () => {
  const toast = useRef(null);
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('')
  const [checked, setChecked] = useState(false);

  const navigate = useNavigate();
  const containerClassName = classNames('surface-ground flex align-items-center justify-content-center min-h-screen min-w-screen overflow-hidden');

  const onSubmit = async (e) => {
    e.preventDefault()
    if (email && password) {
      try {
        const res = await accountService.login(email, password)
        accountService.saveToken(res.data.access_token)
        accountService.saveRole(res.data.role)
        console.log(accountService.getRole())
        navigate('/app', { replace: true })
      } catch (error) {
        toast.current.show({
          severity: 'error',
          summary: 'Error',
          detail: ' Email or password Invalid!',
          life: 3000
        });
      }
    } else {
      toast.current.show({ severity: 'error', summary: 'Error', detail: 'champ vide !', life: 3000 });
    }
  }

  return (
    <div className={containerClassName}>
      <Toast ref={toast} />
      <div className="flex flex-column align-items-center justify-content-center">
        <div style={{ borderRadius: '56px', padding: '0.3rem', background: 'linear-gradient(180deg, var(--primary-color) 10%, rgba(33, 150, 243, 0) 30%)' }}>
          <div className="w-full surface-card py-8 px-5 sm:px-8" style={{ borderRadius: '53px' }}>
            <div className="text-center mb-5">
              <LockOutlinedIcon />
              <div className="text-900 text-3xl font-medium mb-3">Welcome</div>
              <span className="text-600 font-medium">Sign in to continue</span>
            </div>

            <div>
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
              <div className="flex align-items-center justify-content-between mb-5 mt-5 gap-5">
                <div className="flex align-items-center">
                  <Checkbox inputid="rememberme1" checked={checked} onChange={(e) => setChecked(e.checked)} className="mr-2"></Checkbox>
                  <label htmlFor="rememberme1">Remember me</label>
                </div>
                <a className="font-medium no-underline ml-2 text-right cursor-pointer" style={{ color: 'var(--primary-color)' }}>
                  Forgot password?
                </a>
              </div>
              <Button label="Sign In" className="w-full p-3 text-xl" onClick={onSubmit}></Button>
            </div>
            <div style={{ marginLeft: '150px', marginTop: '15px' }}>
              <Link className="font-medium no-underline text-right cursor-pointer" style={{ color: 'var(--primary-color)' }} to="/Register">Vous n'avez pas de compte? Inscrivez-vous</Link>
            </div>


          </div>
        </div>
      </div>
    </div>
  );
};

Login.getLayout = function getLayout(page) {
  return (
    <React.Fragment>
      {page}
    </React.Fragment>
  );
};
export default Login;
