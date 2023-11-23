import { FC, FormEvent, useState } from 'react';
import { Link } from 'react-router-dom';
import { UserCredentialsI } from '@/interfaces';
import { authService } from '@/services/auth.service';

interface AuthPageProps {
  isLoginPage?: boolean;
}

const AuthPage: FC<AuthPageProps> = ({ isLoginPage }) => {
  const [credentials, setCredentials] = useState<UserCredentialsI>({
    email: '',
    password: '',
  });

  const [errors, setErrors] = useState({
    show: false,
    message: '',
  });

  const PAGE_NAME = isLoginPage ? 'Login' : 'Register';
  const REDIRECT = isLoginPage ? '/register' : '/login';
  const REDIRECT_TEXT = isLoginPage ? 'Register' : 'Login';

  const handleLogin = async (e: FormEvent) => {
    e.preventDefault();

    const { email: username, password } = credentials;

    if (!username.trim() || !password.trim()) {
      setErrors({
        show: true,
        message: 'Email & password is required',
      });

      return;
    }

    const [error, data] = await authService(credentials, isLoginPage);

    if (!error && data) {
      location.reload();
      return;
    }

    setErrors({
      show: true,
      message: (error as string) ?? 'Something went wrong',
    });
  };

  return (
    <div className='grid min-h-screen place-items-center'>
      <form
        onSubmit={handleLogin}
        className='bg-[#fff1] w-full flex flex-col gap-4 max-w-md p-8 rounded-md'
      >
        <h1 className='text-4xl font-semibold'>{PAGE_NAME}</h1>

        <label>
          <span className='block font-medium mb-3'>Email</span>

          <input
            type='email'
            className='w-full outline-none py-2 px-4 text-gray-600 rounded-md focus:ring-2'
            placeholder='jhondoe@mail.com'
            onChange={({ target }) =>
              setCredentials({
                ...credentials,
                email: target.value,
              })
            }
          />
        </label>

        <label>
          <span className='block font-medium mb-3'>Password</span>

          <input
            type='password'
            className='w-full outline-none py-2 px-4 text-gray-600 rounded-md focus:ring-2'
            placeholder='*********'
            onChange={({ target }) =>
              setCredentials({
                ...credentials,
                password: target.value,
              })
            }
          />
        </label>

        <div>
          <em>
            Don't have an account? <Link to={REDIRECT}>{REDIRECT_TEXT}</Link>
          </em>
        </div>

        {errors && (
          <span className='text-red-500 font-bold'>{errors.message}</span>
        )}

        <button
          type='submit'
          className='py-3 bg-blue-700 rounded-lg font-semibold hover:opacity-80 transition-all ease-in active:ring-2'
        >
          {PAGE_NAME}
        </button>
      </form>
    </div>
  );
};

export default AuthPage;
