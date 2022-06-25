import got from "got";

async function getToken() {
  return got.post("https://dev-re4d6x8g.us.auth0.com/oauth/token", {
    headers: { "content-type": "application/json" },
    json: {
      grant_type: "client_credentials",
      client_id: process.env.AUTH0_CLIENT_ID,
      client_secret: process.env.AUTH0_CLIENT_SECRET,
      audience: "https://dev-re4d6x8g.us.auth0.com/api/v2/",
    },
    responseType: "json",
  });
}
async function getUser(access_token, user_id) {
  return got.get(`https://dev-re4d6x8g.us.auth0.com/api/v2/users/${user_id}`, {
    headers: {
      Authorization: `Bearer ${access_token}`,
    },
    responseType: "json",
  });
}
async function updateUser(access_token, user_data, user_id) {
  return got.patch(
    `https://dev-re4d6x8g.us.auth0.com/api/v2/users/${user_id}`,
    {
      json: { ...user_data },
      headers: {
        Authorization: `Bearer ${access_token}`,
      },
      responseType: "json",
    }
  );
}
async function deleteUser(access_token, user_id) {
  return got.delete(
    `https://dev-re4d6x8g.us.auth0.com/api/v2/users/${user_id}`,
    {
      headers: {
        Authorization: `Bearer ${access_token}`,
      },
      responseType: "json",
    }
  );
}
async function validateUser(access_token, user_id) {
  return got.post(
    `https://dev-re4d6x8g.us.auth0.com/api/v2/jobs/verification-email`,
    {
      headers: {
        Authorization: `Bearer ${access_token}`,
        "content-type": "application/json",
      },
      json: {
        user_id,
        client_id: process.env.AUTH0_CLIENT_ID,
      },
      responseType: "json",
    }
  );
}
export { getToken, getUser, updateUser, deleteUser, validateUser };
