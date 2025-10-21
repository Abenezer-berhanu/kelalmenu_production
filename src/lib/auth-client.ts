import { nextCookies } from "better-auth/next-js";
import { createAuthClient } from "better-auth/react"; // make sure to import from better-auth/react

export const authClient = createAuthClient({
  plugins: [nextCookies()], // make sure to include nextCookies plugin only at the end of array of plugins
});
