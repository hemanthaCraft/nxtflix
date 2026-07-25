const signIn = async (email, password) => {
  const url = "https://serverless-api-teal.vercel.app/api/auth/signin";

  const options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      email,
      password,
    }),
  };

  const response = await fetch(url, options);
  const data = await response.json();

  return data;
};

export default signIn;