const uri = `\
https://discord.com/oauth2/authorize\
?response_type=code\
&client_id=${process.env.NEXT_PUBLIC_APP_ID}\
&scope=${process.env.NEXT_PUBLIC_APP_SCOPE}\
&redirect_uri=${process.env.NEXT_PUBLIC_APP_CALLBACK}\
&prompt=none
`





export default uri