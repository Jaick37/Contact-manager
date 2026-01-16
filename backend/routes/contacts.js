import express from "express";
import supabase from "../db/supabase.js";
import { verifyJWT } from "../middleware/auth.js";

const router = express.Router();

/**
 * POST /api/contacts
 * Create a contact
 */
router.post("/", verifyJWT, async (req, res) => {
  const { name, phone, email, tag } = req.body;

  if (!name || name.length < 2) {
    return res.status(400).json({ message: "Name must be at least 2 characters" });
  }

  if (!phone || phone.length < 10) {
    return res.status(400).json({ message: "Phone must be valid" });
  }

  const { data, error } = await supabase
    .from("contacts")
    .insert([
      {
        user_id: req.user.id,
        name,
        phone,
        email,
        tag,
      },
    ])
    .select()
    .single();

  if (error) {
    return res.status(500).json({ message: error.message });
  }

  res.status(201).json(data);
});

/**
 * GET /api/contacts
 * List contacts (with optional search)
 */
router.get("/", verifyJWT, async (req, res) => {
  const search = req.query.search || "";

  let query = supabase
    .from("contacts")
    .select("*")
    .eq("user_id", req.user.id)
    .ilike("name", `%${search || ""}%`)
    .order("name", { ascending: true });

  if (search) {
    query = query.or(
      `name.ilike.%${search}%,phone.ilike.%${search}%,email.ilike.%${search}%`
    );
  }

  const { data, error } = await query;

  if (error) {
    return res.status(500).json({ message: error.message });
  }

  res.json(data);
});

/**
 * PUT /api/contacts/:id
 * Update contact
 */
router.put("/:id", verifyJWT, async (req, res) => {
  const { id } = req.params;
  const { name, phone, email, tag } = req.body;

  const { data, error } = await supabase
    .from("contacts")
    .update({ name, phone, email, tag, updated_at: new Date() })
    .eq("id", id)
    .eq("user_id", req.user.id)
    .select()
    .single();

  if (error || !data) {
    return res.status(404).json({ message: "Contact not found" });
  }

  res.json(data);
});

/**
 * DELETE /api/contacts/:id
 */
router.delete("/:id", verifyJWT, async (req, res) => {
  const { id } = req.params;

  const { error } = await supabase
    .from("contacts")
    .delete()
    .eq("id", id)
    .eq("user_id", req.user.id);

  if (error) {
    return res.status(404).json({ message: "Contact not found" });
  }

  res.json({ message: "Contact deleted successfully" });
});

export default router;
