import React, { useState } from 'react'
import { useForm } from 'react-hook-form';
import {z} from "zod"
import { zodResolver } from '@hookform/resolvers/zod';
import './SignUpPage.css'
import user from '../../assets/user.jpg'
import { getUser, signup } from '../../services/userServices';
import { Navigate } from 'react-router-dom';


const schema = z.object({
    email: z.string().email({message: "please enter valid email."}).min(3),
    name: z.string().min(3,{message: "Name shouid be at least 3 characters."}),
    password: z.string().min(8,{message: "Password must be at least 8 characters"}),
    confirmPassword: z.string(),
    deliveryAddress: z.string().min(15, {message: "Delivery Address Must at least 15 charcters"})
}).refine(data=>data.password===data.confirmPassword, {
    message: "Confirm Password does not match Password",
    path : ["confirmPassword"]
})
function SignUpPage() {
    const [profile,setProfile] = useState(null);
    const [error,setError] = useState("");
     const {
             register, 
             handleSubmit,
            formState:{ errors},
            reset,
         } = useForm({resolver: zodResolver(schema)})
          const onSubmit = async(formData) => {
           try{
             await signup(formData,profile);
                window.location ="/";
             reset();
           } catch (err){
                if(err.response && err.response.status === 400) {
                    setError(err.response.data.message);
                }
           }
          };
        //   if(getUser){
        //     return <Navigate to="/"/>
        //   }
  return (
    <section className='align_center form_page'>
        <form action="" className='authentication_form signup_form' onSubmit={handleSubmit(onSubmit)}>
            <h2>SignUp Form</h2>
            <div className='image_input_section'>
                <div className='image_preview'>
                    <img src={profile ? URL.createObjectURL(profile): user} alt="" className='image_profile' id='file-ip-1-preview'/>
                </div>
                <label htmlFor='file-ip-1' className='image_label'>
                    Upload Image
                </label>
                <input type='file' id='file-ip-1'onChange={e=>setProfile(e.target.files[0])} className='image_input'/>
            </div>
            <div className='form_inputs signup_form_input'>
               <div className='inputs_row'>
                 <div>
                    <label htmlFor="name">Name</label>
                    <input type="text" id='name'className='form_text_input' placeholder='Enter your Name'{...register("name")} />
                    {errors.name && <em className='form_error'>{errors.name.message}</em>}
                </div>
                
                <div>
                    <label htmlFor="email">Email</label>
                    <input type="email" id='email' className='form_text_input' placeholder='Enter your email address' {...register("email")} />
                    {errors.email && <em className='form_error'>{errors.email.message}</em>}
                </div>
               </div>
               <div className='inputs_row'>
                <div>
                    <label htmlFor="password">Password</label>
                    <input type="password" id='password' className='form_text_input' placeholder='Enter your password' {...register("password")} />
                    {errors.password && <em className='form_error'>{errors.password.message}</em>}
                </div>
                <div>
                    <label htmlFor="cpassword">Confirm Password</label>
                    <input type="password" id='cpassword' className='form_text_input' placeholder='Enter your confirm password'{...register("confirmPassword")} />
                    {errors.confirmPassword && <em className='form_error'>{errors.confirmPassword.message}</em>}
                </div>
               </div>
                <div className='signup_textares_section'>
                    <label htmlFor="daddress">Delivery Address</label>
                    <input type="address" id='daddress' className='input_textarea' placeholder='Enter delivery address'{...register("deliveryAddress")} />
                    {errors.deliveryAddress && <em className='form_error'>{errors.deliveryAddress.message}</em>}
                </div>
            </div>
            {
                error &&  <em className='form_error'>{{error}}</em>
            }
            <button className='search_button form_submit' type='submit'>Submit</button>
        </form>
    </section>
  )
}

export default SignUpPage