import { withApiAuthRequired } from "@auth0/nextjs-auth0";
import * as auth from "../../../lib/auth";

export default withApiAuthRequired(async function formInputs(req, res) {
  const { email, email_verified, sub } = JSON.parse(req.body);
  if (req.method == "POST" && email_verified == false) {
    try {
      const {
        body: { access_token },
      } = await auth.getToken();
      const { body } = await auth.validateUser(access_token, sub);
      res.statusCode = 200;
      res.json(JSON.stringify(body));
    } catch (err) {
      res.statusCode = 500;
      res.json({ msg: "Something went wrong" });
    }
  }
});
