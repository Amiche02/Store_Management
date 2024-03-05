import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

function SignUp() {
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSignUp = async (event) => {
    event.preventDefault();
    const form = event.target;
    const email = form.email.value;
    const password = form.password.value;
    const firstName = form.firstName.value;
    const lastName = form.lastName.value;
    const username = form.username.value;
    const dateOfBirth = form.dateOfBirth.value;
    const gender = form.gender.value;
    const location = form.location.value;

    // Validation des champs obligatoires
    if (!email || !password || !firstName || !lastName || !username || !dateOfBirth || !gender || !location) {
      setError("All fields are required.");
      return;
    }

    // Envoyer les données au serveur
    try {
      const response = await fetch("http://localhost:5000/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email,
          password,
          firstName,
          lastName,
          username,
          dateOfBirth,
          gender,
          location
        })
      });

      if (!response.ok) {
        throw new Error('Failed to register user');
      }

      // Réinitialiser le formulaire et afficher un message de succès
      form.reset();
      setError("");
      alert("User registered successfully!");

      navigate("/connexion")
    } catch (error) {
      setError(error.message);
    }
  }

  return (
    <div className="min-h-screen bg-gray-100 py-6 flex flex-col justify-center sm:py-12">
      <div className="relative py-3 sm:max-w-xl sm:mx-auto">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-300 to-blue-600 shadow-lg transform -skew-y-6 sm:skew-y-0 sm:-rotate-6 sm:rounded-3xl"></div>
        <div className="relative px-4 py-10 bg-white shadow-lg sm:rounded-3xl sm:p-20">
          <div className="max-w-md mx-auto">
            <div>
              <h1 className="text-2xl font-semibold">Sign Up</h1>
            </div>
            <div className="divide-y divide-gray-200">
              <form onSubmit={handleSignUp} className="py-8 text-base leading-6 space-y-4 text-gray-700 sm:text-lg sm:leading-7">
                <div className="relative">
                  <input id="email" name="email" type="text" className="peer h-10 w-full border-b-2 border-gray-300 text-gray-900 focus:outline-none focus:border-rose-600" placeholder="Email address" />
                </div>
                <div className="relative">
                  <input id="password" name="password" type="password" className="peer h-10 w-full border-b-2 border-gray-300 text-gray-900 focus:outline-none focus:border-rose-600" placeholder="Password" />
                </div>
                <div className="relative">
                  <input id="firstName" name="firstName" type="text" className="peer h-10 w-full border-b-2 border-gray-300 text-gray-900 focus:outline-none focus:border-rose-600" placeholder="First Name" />
                </div>
                <div className="relative">
                  <input id="lastName" name="lastName" type="text" className="peer h-10 w-full border-b-2 border-gray-300 text-gray-900 focus:outline-none focus:border-rose-600" placeholder="Last Name" />
                </div>
                <div className="relative">
                  <input id="username" name="username" type="text" className="peer h-10 w-full border-b-2 border-gray-300 text-gray-900 focus:outline-none focus:border-rose-600" placeholder="Username" />
                </div>
                <div className="relative">
                  <input id="dateOfBirth" name="dateOfBirth" type="date" className="peer h-10 w-full border-b-2 border-gray-300 text-gray-900 focus:outline-none focus:border-rose-600" placeholder="Date of Birth" />
                </div>
                <div className="relative">
                  <select id="gender" name="gender" className="peer h-10 w-full border-b-2 border-gray-300 text-gray-900 focus:outline-none focus:border-rose-600">
                    <option value="" disabled defaultValue>Select your gender</option>
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                    <option value="other">Other</option>
                  </select>

                </div>
                <div className="relative">
                  <input id="location" name="location" type="text" className="peer h-10 w-full border-b-2 border-gray-300 text-gray-900 focus:outline-none focus:border-rose-600" placeholder="Location" />
                </div>
                {error && <p className="text-red-500">{error}</p>}
                <p>If you have an account please <Link to="/connexion" className='text-blue-600'>Login Here</Link></p>
                <div className="relative">
                  <button className="bg-blue-500 text-white rounded-md px-6 py-2">Sign Up</button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SignUp;
