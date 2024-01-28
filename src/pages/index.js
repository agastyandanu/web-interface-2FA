import React, { useState } from 'react';
import { useRouter } from 'next/router';
import axios from 'axios'; // Import library Axios

const Login = () => {
  const router = useRouter();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleUsernameChange = (e) => {
    setUsername(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleSubmit = async () => {
    if (username && password) {
      const res = await axios.post((process.env.NEXT_PUBLIC_API + '/login'), {
        username,
        password,
      });
      if (res.data.status === 200) {
        router.push(`/verify?username=${username}`);
      } else {
        setErrorMessage(res.data?.message)
      }
    } else {
      setErrorMessage('Error! Please enter both username and password.');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="max-w-md w-full p-6 bg-white rounded-md shadow-md">
        <h1 className="text-2xl font-semibold mb-4">Login Page</h1>
        <form>
          <div className="mb-4">
            <label htmlFor="username" className="block text-gray-700">
              Username:
            </label>
            <input
              type="text"
              id="username"
              value={username}
              onChange={handleUsernameChange}
              className="mt-1 p-2 border rounded-md w-full"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="password" className="block text-gray-700">
              Password:
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={handlePasswordChange}
              className="mt-1 p-2 border rounded-md w-full"
            />
          </div>
          <button
            type="button"
            onClick={handleSubmit}
            className="bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600"
          >
            Submit
          </button>

          {errorMessage && (
            <div className="mt-4 text-red-600">{errorMessage}</div>
          )}

        </form>
      </div>
    </div>
  );
};

export default Login;
