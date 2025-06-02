import { useForm } from 'react-hook-form';
import {z} from "zod"
import { zodResolver } from '@hookform/resolvers/zod/src/zod.js';
import { getUser, login } from '../../services/userServices';
const schema = z.object({
    email: z.string().email({message: "please enter valid email address."}).min(3),
    password: z.string().min(8)
})
import './LoginPage.css'
import { useState } from 'react';
import { Navigate } from 'react-router-dom';
import { User } from 'lucide-react';
function LoginPage() {
    const [error, setError] = useState("");
    const {
         register, 
         handleSubmit,
        formState:{ errors},
        reset,
     } = useForm({resolver: zodResolver(schema)})
    const onSubmit  = async(formData) => {
        try{
            await login(formData);
            window.location="/";
        }
        catch (err){
            if(err.response && err.response.status === 400) {
                setError(err.response.data.message);
            }
        }
        reset()}

        // if(getUser){
        //     return <Navigate to="/"/>
        // }
  return (
   <section className='align_center loginform_page'>
    <form action="" className='loginauthentication_form' onSubmit={handleSubmit(onSubmit)}>
        <div style={{display: 'flex', alignItems: 'center', gap: '8px'}}>
            <span ><User style={{marginBottom: '20px'}}/></span> <h2>Login Form</h2>
        </div>
        <div className='loginform_inputs'>
            <div>
                <label htmlFor="email">Email</label>
                <input type="email" id='email' className='loginform_text_input' {...register("email")} placeholder='Enter your email address' />
                {errors.email && <em className="form_error">{errors.email.message}</em>}
            </div>
            <div>
                <label htmlFor="password">Password</label>
                <input type="password" id='password' className='form_text_input' {...register("password")} placeholder='Enter your password' />
                {errors.password && <em className="form_error">{errors.password.message}</em>}
            </div>
            {
                error && <em className='form_control'>{error}</em>
            }
            <button type='submit' className='search_button form_submit'>Submit</button>
        </div>
    </form>
   </section>
  )
}

export default LoginPage