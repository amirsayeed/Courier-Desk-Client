import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router';
import SocialLogin from '../SocialLogin/SocialLogin';
import { useForm } from 'react-hook-form';
import useAuth from '../../../hooks/useAuth';
import { toast } from 'react-toastify';


const Login = () => {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const { signIn, setUser } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  const onSubmit = (data) => {
    signIn(data.email, data.password)
        .then(result => {
            console.log(result.user);
            setUser(result.user);

            toast.success('Login successful');
            navigate(`${location?.state ? location.state : '/'}`);
        })
        .catch(error => {
            console.log(error)
            toast.error(error.message);
        })
  };

  return (
    <div className='my-20 max-w-md mx-auto px-2'>
      <div className="p-7 rounded-lg shadow-lg bg-base-100 text-base-content border-2 border-primary">
        <h1 className="mb-4 text-3xl font-bold text-center">Login</h1>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <label className="text-sm font-medium">Email address</label>
            <input
              type="email"
              {...register('email', { required: true })}
              placeholder="example@email.com"
              className="w-full mt-1 px-3 py-2 input input-bordered"
            />
            {errors.email && <p className="text-sm text-red-500 mt-1">Email is required</p>}
          </div>

          <div>
            <label className="text-sm font-medium">Password</label>
            <input
              type="password"
              {...register('password', {
                required: true,
                minLength: 6
              })}
              placeholder="********"
              className="w-full mt-1 px-3 py-2 input input-bordered"
            />
            {errors.password?.type === 'required' && <p className="text-sm text-red-500 mt-1">Password is required</p>}
            {errors.password?.type === 'minLength' && <p className="text-sm text-red-500 mt-1">Password must be at least 6 characters</p>}
          </div>

          <div className="text-right text-sm">
            <Link className="hover:underline text-secondary">Forgot password?</Link>
          </div>

          <button type="submit" className="btn btn-primary w-full">Log in</button>
        </form>

        <div className="mt-6 space-y-2">
          <SocialLogin />
          <p className="text-sm text-center">
            Don't have an account?
            <Link to="/register" className="ml-1 hover:underline text-primary">Sign up</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
