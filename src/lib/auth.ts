import Credentials from "next-auth/providers/credentials";
import NextAuth from "next-auth";

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    Credentials({
      credentials: {
        id: {},
        primary_phone: {},
        email: {},
        home_name: {},
        home_logo: {},
        country: {},
        main_address: {},
      },
      authorize: async ({
        email,
        id,
        primary_phone,
        home_name,
        home_logo,
        country,
        main_address,
      }) => {
        try {
          const hotel = {
            id: id as string,
            email: email as string,
            primary_phone: primary_phone as string,
            home_name: home_name as string,
            country: country as string,
            home_logo: home_logo as string,
            main_address: main_address as string,
          };

          // let hotel = null;

          return hotel;
        } catch (error) {
          console.log(error);
          throw new Error("Something went wrong.");
        }
      },
    }),
  ],

  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.home_name = user.home_name;
        token.email = user.email;
        token.home_logo = user.home_logo;
        token.primary_phone = user.primary_phone;
        token.country = user.country;
        token.main_address = user.main_address;
      }
      return token;
    },
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    async session({ session, token }: { session: any; token: any }) {
      // session.user will only have name
      session.user = {
        home_name: token.home_name,
        id: token.id,
        email: token.email,
        home_logo: token.home_logo,
        primary_phone: token.primary_phone,
        country: token.country,
        main_address: token.main_address,
      };

      return session;
    },
  },
});
