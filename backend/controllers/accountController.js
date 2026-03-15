import { supabase } from "../config/supabaseClient.js";
import { v4 as uuidv4 } from "uuid";

export const getBalance = async (req, res) => {
  const { data } = await supabase
    .from("users")
    .select("balance")
    .eq("id", req.userId)
    .single();

  res.json(data);
};

export const getUsers = async (req, res) => {
  const { data } = await supabase.from("users").select("id,name,email");

  res.json(data);
};

export const getStatement = async (req, res) => {

  try {

    const userId = req.userId;

    const { data } = await supabase
      .from("transactions")
      .select("*")
      .or(`sender_id.eq.${userId},receiver_id.eq.${userId}`)
      .order("created_at", { ascending: false });

    const formatted = data.map((t) => {

      if (t.sender_id === userId) {
        return { ...t, transaction_type: "debit" };
      }

      return { ...t, transaction_type: "credit" };

    });

    res.json(formatted);

  } catch {

    res.status(500).json({ message: "Failed to fetch statement" });

  }

};

export const transferMoney = async (req, res) => {
  try {

    const { receiverId, amount } = req.body;
    const senderId = req.userId;

    if (!receiverId || !amount) {
      return res.status(400).json({ message: "Invalid data" });
    }

    if (senderId === receiverId) {
      return res.status(400).json({ message: "Cannot send money to yourself" });
    }

    const { data: sender } = await supabase
      .from("users")
      .select("*")
      .eq("id", senderId)
      .single();

    if (!sender || sender.balance < amount) {
      return res.status(400).json({ message: "Insufficient balance" });
    }

    const { data: receiver } = await supabase
      .from("users")
      .select("*")
      .eq("id", receiverId)
      .single();

    if (!receiver) {
      return res.status(404).json({ message: "Receiver not found" });
    }

    const newSenderBalance = sender.balance - amount;
    const newReceiverBalance = receiver.balance + amount;

    await supabase
      .from("users")
      .update({ balance: newSenderBalance })
      .eq("id", senderId);

    await supabase
      .from("users")
      .update({ balance: newReceiverBalance })
      .eq("id", receiverId);

    // STORE ONLY ONE TRANSACTION
    await supabase
      .from("transactions")
      .insert([
        {
          id: crypto.randomUUID(),
          sender_id: senderId,
          receiver_id: receiverId,
          amount
        }
      ]);

    res.json({ message: "Transfer successful" });

  } catch (error) {

    res.status(500).json({ message: "Transfer failed" });

  }
};