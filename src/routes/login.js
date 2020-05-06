import passport from 'passport';

export async function post(req, res, next) {
    passport.authenticate('local', { successRedirect: '/', failureRedirect: '/logIn' })(req, res, next);
}