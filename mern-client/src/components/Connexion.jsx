import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

function Connexion() {
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleLogin = async (event) => {
    event.preventDefault();
    const form = event.target;
    const email = form.email.value;
    const password = form.password.value;

    try {
      const response = await fetch("http://localhost:5000/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password })
      });

      if (!response.ok) {
        throw new Error('Failed to log in');
      }

      const userData = await response.json(); // Récupérer les données de l'utilisateur depuis la réponse

      // Stocker les informations de l'utilisateur dans le state local ou dans le contexte d'authentification
      // Dans cet exemple, nous allons les stocker dans le state local
      localStorage.setItem('userData', JSON.stringify(userData));

      form.reset();
      setError("");
      navigate('/admin/dashboard');
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 py-6 flex flex-col justify-center sm:py-12">
      <div className="relative py-3 sm:max-w-xl sm:mx-auto">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-300 to-blue-600 shadow-lg transform -skew-y-6 sm:skew-y-0 sm:-rotate-6 sm:rounded-3xl"></div>
        <div className="relative px-4 py-10 bg-white shadow-lg sm:rounded-3xl sm:p-20">
          <div className="max-w-md mx-auto">
            <div>
              <h1 className="text-2xl font-semibold">LogIn</h1>
            </div>
            <div className="divide-y divide-gray-200">
              <div className="py-8 text-base leading-6 space-y-4 text-gray-700 sm:text-lg sm:leading-7">
                <form onSubmit={handleLogin} className="space-y-4">
                  <div className="relative">
                    <input autoComplete="off" id="email" name="email" type="text" className="peer h-10 w-full border-b-2 border-gray-300 text-gray-900 focus:outline-none focus:border-rose-600" placeholder="Email address" />
                  </div>
                  <div className="relative">
                    <input autoComplete="off" id="password" name="password" type="password" className="peer h-10 w-full border-b-2 border-gray-300 text-gray-900 focus:outline-none focus:border-rose-600" placeholder="Password" />
                  </div>
                  {error && <p className="text-red-500">{error}</p>}
                  <p>If you don't have an account please <Link to="/sign-up" className='text-blue-600'>SignUp Here</Link></p>
                  <div className="relative">
                    <button className="bg-blue-500 text-white rounded-md px-2 py-1">LogIn</button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Connexion;
