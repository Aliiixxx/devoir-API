require('dotenv').config();
const request = require('supertest');
const app = require('../server.js');
const jwt = require('jsonwebtoken');

const generateAuthToken = (userId) => {
  return jwt.sign({ userId }, process.env.JWT_SECRET, { expiresIn: '111h' });
};

describe('Tests de l API', () => {
  let token;

  before(() => {
    token = generateAuthToken('65d29dd9888e10bf18e19b6b');
  });

  // Etape 1: Créer un utilisateur
  it('Devrait créer un utilisateur', (done) => {
    request(app)
      .post('/api/auth/register')
      .send({ name: 'userTest', email: 'mailTest@hotmail.fr', password: 'passwordTest' })
      .expect(201)
      .end((err, res) => {
        if (err) return done(err);
        done();
      });
  });

  // Etape 2: Modifier un utilisateur
  it('Devrait modifier un utilisateur', (done) => {
    request(app)
      .put('/api/auth/users/65d4b3d0e6ae0f772c54f2c2')
      .set('Authorization', `Bearer ${token}`)
      .send({ name: 'userTestModified', email: 'modifiedMailTest@hotmail.fr', password: 'modifiedPasswordTest' })
      .expect(200)
      .end((err, res) => {
        if (err) return done(err);
        done();
      });
  });

  // Etape 3: Supprimer un utilisateur
  it('Devrait supprimer un utilisateur', (done) => {
    request(app)
      .delete('/api/auth/users/65d4d9854aa5efee2df0ce02')
      .set('Authorization', `Bearer ${token}`)
      .expect(200)
      .end((err, res) => {
        if (err) return done(err);
        done();
      });
  });

  // Etape 4: Créer un catway
  it('Devrait créer un catway', (done) => {
    request(app)
      .post('/api/catways/')
      .set('Authorization', `Bearer ${token}`)
      .send({ catwayNumber: 12, type: 'long', catwayState: 'clean' })
      .expect(201)
      .end((err, res) => {
        if (err) return done(err);
        done();
      });
  });

  // Etape 5: Modifier la description d'un catway
  it('Devrait modifier la description d un catway', (done) => {
    request(app)
      .put('/api/catways/65d4b77569c4ff7b8dc2ecec')
      .set('Authorization', `Bearer ${token}`)
      .send({ catwayState: 'testClean' })
      .expect(200)
      .end((err, res) => {
        if (err) return done(err);
        done();
      });
  });

  // Etape 6: Supprimer un catway
  it('Devrait supprimer un catway', (done) => {
    request(app)
      .delete('/api/catways/65d4d9dd4aa5efee2df0ce04')
      .set('Authorization', `Bearer ${token}`)
      .expect(200)
      .end((err, res) => {
        if (err) return done(err);
        done();
      });
  });

  // Etape 7: Afficher les détails d'un catway
  it('Devrait afficher les détails d un catway', (done) => {
    request(app)
      .get('/api/catways/65d4b77569c4ff7b8dc2ecec')
      .set('Authorization', `Bearer ${token}`)
      .expect(200)
      .end((err, res) => {
        if (err) return done(err);
        done();
      });
  });

  // Etape 8: Enregistrer une réservation
  it('Devrait enregistrer une réservation', (done) => {
    request(app)
      .post('/api/reservations/catways/65d2ba279e814a0d2c02570c/reservations')
      .set('Authorization', `Bearer ${token}`)
      .send({ clientName: 'alix', boatName: 'boatTest', checkIn: '2024-02-20', checkOut: '2024-02-25' })
      .expect(201)
      .end((err, res) => {
        if (err) return done(err);
        done();
      });
  });
  

  // Etape 9: Afficher les détails d'une réservation
  it('Devrait afficher les détails d une réservation', (done) => {
    request(app)
      .get('/api/reservations/65d4b8e569c4ff7b8dc2ecf4')
      .set('Authorization', `Bearer ${token}`)
      .expect(200)
      .end((err, res) => {
        if (err) return done(err);
        done();
      });
  });

  // Etape 10: Supprimer une réservation
  it('Devrait supprimer une réservation', (done) => {
    request(app)
      .delete('/api/reservations/65d4da2a4aa5efee2df0ce08')
      .set('Authorization', `Bearer ${token}`)
      .expect(200)
      .end((err, res) => {
        if (err) return done(err);
        done();
      });
  });
});
