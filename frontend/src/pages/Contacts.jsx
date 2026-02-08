import { useEffect, useState } from "react";
import { supabase } from "../supabaseClient.js";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./Contacts.css";


export default function Contacts() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [contacts, setContacts] = useState([]);

  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [tag, setTag] = useState("");
  const [editingId, setEditingId] = useState(null);
  const [search, setSearch] = useState("");



  const fetchContacts = async (token, searchTerm = "") => {
  const res = await axios.get("http://localhost:5000/api/contacts", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
    params: searchTerm ? { search: searchTerm } : {},
  });

  setContacts(res.data);
};
const handleLogout = async () => {
  await supabase.auth.signOut();
  navigate("/login");
};

  useEffect(() => {
    const init = async () => {
      const {
        data: { session },
      } = await supabase.auth.getSession();

      if (!session) {
        navigate("/login");
        return;
      }

      setUser(session.user);
      fetchContacts(session.access_token);
    };

    init();
  }, []);

  const handleSaveContact = async (e) => {
  e.preventDefault();

  if (name.length < 2 || phone.length < 10) {
    alert("Invalid name or phone");
    return;
  }

  const {
    data: { session },
  } = await supabase.auth.getSession();

  if (editingId) {
    await axios.put(
      `http://localhost:5000/api/contacts/${editingId}`,
      { name, phone, email, tag },
      {
        headers: {
          Authorization: `Bearer ${session.access_token}`,
        },
      }
    );
  } else {
    await axios.post(
      "http://localhost:5000/api/contacts",
      { name, phone, email, tag },
      {
        headers: {
          Authorization: `Bearer ${session.access_token}`,
        },
      }
    );
  }

  setName("");
  setPhone("");
  setEmail("");
  setAge("")
  setTag("");
  setEditingId(null);

  fetchContacts(session.access_token);
};
  const handleDelete = async (id) => {
  const confirmDelete = window.confirm("Are you sure you want to delete this contact?");
  if (!confirmDelete) return;

  const {
    data: { session },
  } = await supabase.auth.getSession();

  await axios.delete(`http://localhost:5000/api/contacts/${id}`, {
    headers: {
      Authorization: `Bearer ${session.access_token}`,
    },
  });

  fetchContacts(session.access_token);
};


 return (
  <div className="app-container">
    <div className="header" style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
 <div style={{ textAlign: "center", flex: 1 }}>
  <h2>Contact Manager</h2>
  <p className="subtext">Logged in as {user?.email}</p>
  <p>Total contacts: {contacts.length}</p>
</div>



  <button className="link" onClick={handleLogout}>
    Logout
  </button>
</div>


    <div className="row">
      <input
        placeholder="Search contacts"
        value={search}
        onChange={async (e) => {
          const value = e.target.value;
          setSearch(value);

          const {
            data: { session },
          } = await supabase.auth.getSession();

          fetchContacts(session.access_token, value);
        }}
      />
    </div>

    <form onSubmit={handleSaveContact}>
      <div className="row">
        <input placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} />
        <input placeholder="Phone" value={phone} onChange={(e) => setPhone(e.target.value)} />
      </div>

      <div className="row">
        <input placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
        <input placeholder="Tag" value={tag} onChange={(e) => setTag(e.target.value)} />
      </div>

      <button className="primary">
        {editingId ? "Update Contact" : "Add Contact"}
      </button>
    </form>

    <div>
      {contacts.map((c) => (
        <div key={c.id} className="contact">
          <div>
            <strong>{c.name}</strong>
            <div className="subtext">
              {c.phone} {c.email && `• ${c.email}`} {c.tag && `• ${c.tag}`}
            </div>
          </div>

          <div>
            <button
              className="link"
              onClick={() => {
                setEditingId(c.id);
                setName(c.name);
                setPhone(c.phone);
                setEmail(c.email || "");
                setTag(c.tag || "");
              }}
            >
              Edit
            </button>

            <button
              className="link danger"
              onClick={() => handleDelete(c.id)}
            >
              Delete
            </button>
          </div>
        </div>
      ))}
    </div>
  </div>
);


}
