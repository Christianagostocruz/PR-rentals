import * as auth from "../../../lib/auth";

export default async function updateUser(req, res) {
  const { userId, userData } = req.body;
  
  try {
    const {
      body: { access_token },
    } = await auth.getToken();
    const { body: updateBody } = await auth.updateUser(
      access_token,
      {
        ...userData,
      },
      userId
      );
    res.statusCode = 200;
    res.json(JSON.stringify(updateBody));
  } catch (err) {
    res.statusCode = 500;
    res.json({ msg: "Something went wrong" });
  }
}
