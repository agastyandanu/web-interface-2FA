import React, { useState } from 'react';
import { useRouter } from 'next/router';
import axios from 'axios';

const Verify = () => {
  const router = useRouter();
  const { username } = router.query;
  const [verificationCode, setVerificationCode] = useState('');
  const [verificationMessage, setVerificationMessage] = useState('');

  const handleVerificationCodeChange = (e) => {
    setVerificationCode(Number(e.target.value));
  };

  const handleSubmit = async () => {
    if (username && verificationCode) {
      const res = await axios.post((process.env.NEXT_PUBLIC_API + '/verify-otp'), {
        otp: verificationCode,
        username: username
      });
      setVerificationMessage(res.data?.message);
    } else {
      setVerificationMessage('Error! Please enter verifycation code with numeric values');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 text-black">
      <div className="max-w-md w-full p-6 bg-white rounded-md shadow-md">
        <h1 className="text-2xl font-semibold mb-4">Verification Page</h1>
        <p className="mb-4">
          An OTP has been sent to your email. Please enter the verification code.
        </p>
        <div className="mb-4">
          <label htmlFor="verificationCode" className="block text-gray-700">
            Verification Code:
          </label>
          <input
            type="number"
            id="verificationCode"
            value={verificationCode}
            onChange={handleVerificationCodeChange}
            className="mt-1 p-2 border rounded-md w-full"
          />
        </div>
        <button
          type="button"
          onClick={handleSubmit}
          className="bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600"
        >
          Verify
        </button>

        {verificationMessage && (
          <div className={`mt-4 ${verificationMessage.includes('verified') ? 'text-green-600' : 'text-red-600'}`}>
            {verificationMessage}
          </div>
        )}
      </div>
    </div>
  );
};

export default Verify;
