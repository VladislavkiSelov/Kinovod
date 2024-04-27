import React, { useRef } from 'react'
import style from './LogInModal.module.scss'
import { useForm } from 'react-hook-form';
import Button from '../Button/Button';

export default function LogInModal({setLogInStatus}) {
  const { register, handleSubmit } = useForm();
  const ref = useRef();

  const onSubmit = async (data) => {
    console.log(data);
    setLogInStatus(false);
  };

  function handleClick(e) {
    if (!ref.current.contains(e.target)) {
      setLogInStatus(false);
    }
  }

  return (
    <div onClick={handleClick} className={style.wrapper}>
      <div ref={ref} className={style.logIn}>
        <form className={style.logIn_form} onSubmit={handleSubmit(onSubmit)}>
          <h2>Вход</h2>
          <div className={style.box_input}>
            <input {...register("email")} placeholder="Электронная почта" />
            <input {...register("password")} placeholder="Пароль" />
          </div>
          <Button text="Войти" classBtn={style.btn_logIn} />
        </form>
        <h3 className={style.register_btn}>Зарегистрироваться</h3>
        <h3 className={style.recover_btn}>Я не помню пароль</h3>
      </div>
      <div className={style.background}></div>
    </div>
  );
}
