
// ##5) Test accounts — injecter rapidement 3 comptes de test (admin/mod/user)

//! filepath: run once in console or a seed script

localStorage.setItem('users', JSON.stringify([
  { id: 1, email: 'admin@laplateforme.io', password: 'pass', role: 'admin', nom: 'Admin', prenom: 'Root' },
  { id: 2, email: 'mod@laplateforme.io', password: 'pass', role: 'moderator', nom: 'Mod', prenom: 'User' },
  { id: 3, email: 'user@laplateforme.io', password: 'pass', role: 'user', nom: 'Simple', prenom: 'User' }
]));