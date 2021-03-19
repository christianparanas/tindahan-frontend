import NextAuth from 'next-auth'
import Providers from 'next-auth/providers'

export default NextAuth({
  // Configure one or more authentication providers
  providers: [
    Providers.Google({
      clientId: process.env.GOOGLE_ID,
      clientSecret: process.env.GOOGLE_SECRET,
      authorizationUrl: 'https://accounts.google.com/o/oauth2/v2/auth?prompt=consent&access_type=offline&response_type=code',
    
    }),
    // ...add more providers here
  ],

  // A database is optional, but required to persist accounts in a database
  // database: 'mysql://sql5400010:G2LmlUw2kF@sql5.freemysqlhosting.net:3306/sql5400010',
})