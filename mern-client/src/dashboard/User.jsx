import React, { useState } from 'react';

function User() {
  // Récupération des données utilisateur depuis le stockage local
  const userDataFromStorage = localStorage.getItem('userData');
  const userData = userDataFromStorage ? JSON.parse(userDataFromStorage) : {};
  const { email, username, firstName, lastName, dateOfBirth, gender, location } = userData;

  // Initialisation des détails de l'utilisateur avec les données récupérées
  const [userDetails, setUserDetails] = useState({
    email,
    username,
    firstName,
    lastName,
    dateOfBirth,
    gender,
    location
  });

  // Gestion des modifications dans les champs du formulaire
  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserDetails(prevDetails => ({ ...prevDetails, [name]: value }));
  };

// Gérer l'envoi du formulaire
const handleSubmit = async (e) => {
  e.preventDefault();
  try {
    // Effectuer une requête PATCH à votre backend pour mettre à jour les informations utilisateur
    const response = await fetch(`http://localhost:5000/update-user/${userData.username}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(userDetails),
    });

    // Vérifier si la requête a réussi
    if (response.ok) {
      console.log('User details updated successfully');
      alert('User details updated successfully');
    } else {
      // Si la requête a échoué, afficher un message d'erreur
      console.error('Failed to update user data');
      alert('Failed to update user data');
    }
  } catch (error) {
    // En cas d'erreur, afficher l'erreur dans la console
    console.error('Error updating user data:', error);
    alert('Error updating user data');
  }
};


  return (
    <div className='my-12 px-4'>
      <h1 className='mb-8 text-3xl font-bold'>User Profile</h1>
      <form onSubmit={handleSubmit} className='space-y-4'>
        <div>
          <label htmlFor="username" className='block text-sm font-medium text-gray-700'>Username</label>
          <input type="text" id="username" name="username" value={userDetails.username} onChange={handleChange} disabled className='mt-1 block w-full border border-gray-300 bg-gray-100 rounded-md shadow-sm' />
        </div>
        <div>
          <label htmlFor="email" className='block text-sm font-medium text-gray-700'>Email</label>
          <input type="email" id="email" name="email" value={userDetails.email} onChange={handleChange} disabled className='mt-1 block w-full border border-gray-300 bg-gray-100 rounded-md shadow-sm' />
        </div>
        <div>
          <label htmlFor="firstName" className='block text-sm font-medium text-gray-700'>First Name</label>
          <input type="text" id="firstName" name="firstName" value={userDetails.firstName} onChange={handleChange} className='mt-1 block w-full border border-gray-300 rounded-md shadow-sm' />
        </div>
        <div>
          <label htmlFor="lastName" className='block text-sm font-medium text-gray-700'>Last Name</label>
          <input type="text" id="lastName" name="lastName" value={userDetails.lastName} onChange={handleChange} className='mt-1 block w-full border border-gray-300 rounded-md shadow-sm' />
        </div>
        <div>
          <label htmlFor="dateOfBirth" className='block text-sm font-medium text-gray-700'>Date of Birth</label>
          <input type="date" id="dateOfBirth" name="dateOfBirth" value={userDetails.dateOfBirth} onChange={handleChange} className='mt-1 block w-full border border-gray-300 rounded-md shadow-sm' />
        </div>
        <div>
          <label htmlFor="gender" className='block text-sm font-medium text-gray-700'>Gender</label>
          <select id="gender" name="gender" value={userDetails.gender} onChange={handleChange} className='mt-1 block w-full border border-gray-300 rounded-md shadow-sm'>
            <option value="male">Male</option>
            <option value="female">Female</option>
            <option value="other">Other</option>
          </select>
        </div>
        <div>
          <label htmlFor="location" className='block text-sm font-medium text-gray-700'>Location</label>
          <input type="text" id="location" name="location" value={userDetails.location} onChange={handleChange} className='mt-1 block w-full border border-gray-300 rounded-md shadow-sm' />
        </div>
        <div className='flex justify-end mt-6'>
          <button type="submit" className='px-6 py-2 border border-transparent text-base font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700'>Save Changes</button>
        </div>
      </form>
    </div>
  );
}

export default User;
