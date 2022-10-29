// pages/api/auth/[...auth0].js
import { handleAuth, handleLogout } from '@auth0/nextjs-auth0';

export default handleAuth({
    async logout(req, res) {
      await handleLogout(req, res, {
        returnTo: "/login",
      });
    },
  });