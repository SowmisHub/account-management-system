import bcrypt from "bcryptjs";
import { v4 as uuidv4 } from "uuid";
import { supabase } from "../config/supabaseClient.js";
import { generateToken } from "../utils/generateToken.js";

export const signup = async (req, res) => {
  const { name, email, password } = req.body;
  const hashedPassword = await bcrypt.hash(password,10);
  const { data, error } = await supabase
    .from("users")
    .insert([
      {
        id: uuidv4(),
        name,
        email,
        password: hashedPassword,
        balance: 10000,
      },
    ])
    .select();

  if (error) return res.status(400).json({ error });
  res.json({ message: "User created" });
};

export const login = async (req, res) => {
  const { email, password } = req.body;
  const { data: users } = await supabase
    .from("users")
    .select("*")
    .eq("email", email);

  const user = users[0];

  if (!user) return res.status(400).json({ message: "User not found" });

  const match = await bcrypt.compare(password, user.password);

  if (!match) return res.status(400).json({ message: "Invalid credentials" });

  res.json({
    token: generateToken(user.id),
    user: {
      id: user.id,
      name: user.name,
      email: user.email,
    },
  });
};