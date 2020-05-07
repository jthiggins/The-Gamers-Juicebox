import sirv from 'sirv';
import express from 'express';
import compression from 'compression';
import * as sapper from '@sapper/server';
import { json } from 'body-parser';
import cookieParser from 'cookie-parser';
import session from 'express-session';
import { validateLogin, getUser } from './routes/_dbApi';
import passport from 'passport';
import { Strategy as LocalStrategy } from 'passport-local';

const { PORT, NODE_ENV } = process.env;
const dev = NODE_ENV === 'development';

// Authentication
passport.use(new LocalStrategy(async (username, password, done) => {
    try {
        const result = await validateLogin(username, password);
        if (result.recordset[0].success) {
			const user = (await getUser(result.recordset[0].userId)).recordset[0];
			return done(null, {
				id: user.userId,
				isAdmin: user.isAdmin,
				isModerator: user.isModerator,
				firstName: user.firstName,
				lastName: user.lastName
			});
        }
        return done(null, false, { message: result.recordset[0].message });
    } catch (err) {
        console.error(err);
        return done(err);
    }
}));

passport.serializeUser((user, done) => {
	done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
	try {
		const result = await getUser(id);
		if (result.recordset.length === 0) {
			throw new Error('User does not exist');
		}
		const user = result.recordset[0];
		done(null, {
			id: user.userId,
			isAdmin: user.isAdmin,
			isModerator: user.isModerator,
			firstName: user.firstName,
			lastName: user.lastName
		});
	} catch (err) {
		done(err);
	}
})

express() // You can also use Express
	.use(cookieParser())
	.use(json())
	.use(session({ secret: 'secret' }))
	.use(passport.initialize())
	.use(passport.session())
	.use(
		compression({ threshold: 0 }),
		sirv('static', { dev }),
		sapper.middleware({
			session: (req, res) => ({
				user: req.user
			})
		})
	)
	.listen(PORT, err => {
		if (err) console.log('error', err);
	});
