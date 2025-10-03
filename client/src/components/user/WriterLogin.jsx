import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAppContext } from '../../contexts/AppContext'
import toast from 'react-hot-toast'
import { signInWithPopup } from 'firebase/auth'
import { auth, googleProvider } from '../../configs/firebase'

const WriterLogin = () => {
  const { axios, setToken } = useAppContext();
  const [isLoading, setIsLoading] = useState(false)
  const navigate = useNavigate()

  const handleGoogleLogin = async () => {
    if (!auth || !googleProvider) {
      toast.error('Firebase not configured.');
      return;
    }
    setIsLoading(true)
    try {
      const result = await signInWithPopup(auth, googleProvider);
      const user = result.user;
      const idToken = await user.getIdToken();
      const { data } = await axios.post('/api/auth/firebase-user-login', { idToken });
      if (data.success) {
        setToken(data.token);
        localStorage.setItem('userToken', data.token);
        axios.defaults.headers.common['Authorization'] = `Bearer ${data.token}`;
        toast.success(`Welcome, ${data.user.name || data.user.email}!`);
        navigate('/writer');
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error('Google sign-in failed.');
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-amber-50 p-4">
      <div className="relative bg-white p-8 rounded-2xl shadow-2xl w-full max-w-md border-4 border-black">
        <h1 className="text-2xl font-black text-center mb-6 text-black">Writer Login</h1>
        <button
          onClick={handleGoogleLogin}
          disabled={isLoading}
          className="w-full bg-white border-2 border-black text-black py-3 px-4 rounded-xl hover:bg-amber-100 hover:border-black focus:outline-none focus:ring-2 focus:ring-black transition-all duration-200 font-bold uppercase tracking-wide shadow-lg hover:shadow-xl disabled:opacity-50"
        >
          {isLoading ? 'Signing in...' : 'Continue with Google'}
        </button>
      </div>
    </div>
  )
}

export default WriterLogin


