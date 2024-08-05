import uuid from "uuid";
import md5 from "md5";
import { connectDB } from "./connect-db";

const authenticationTokens = [];

async function assembleUserState(user) {
  let db = await connectDB();

  let tasks = await db.collection("tasks").find({ owner: user.id }).toArray();

  let groups = await db.collection("groups").find({ owner: user.id }).toArray();

  let users = [
    await db.collection(`users`).findOne({id:user.id}),
    
];

  return {
    tasks,
    groups,
    users,
    session: {
      authenticated: "AUTHENTICATED",
      id: user.id,
    },
  };
}
export const authenticationRoute = (app) => {
  app.post("/authenticate", async (req, res) => {
    try {
      const { username, password } = req.body;

      const db = await connectDB();

      const userCollection = db.collection("users");

      const user = await userCollection.findOne({ name: username });

      if (!user) return res.status(404).send("User Not Found!");

      const hash = md5(password);

      const passwordCorrect = hash === user.passwordHash;

      if (!passwordCorrect) return res.status(401).send("Password Incorrect");

      const token = uuid();

      authenticationTokens.push({
        token: token,
        userId: user.id,
      });

      const state = await assembleUserState(user);

      res.send({ token, state });
    } catch (error) {
      console.error("Error during authentication:", error);
      res.status(500).send("Internal Server Error");
    }
  });
};
