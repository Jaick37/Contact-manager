import { jwtVerify, createRemoteJWKSet } from "jose";

const SUPABASE_JWKS_URL = `${process.env.SUPABASE_URL}/auth/v1/.well-known/jwks.json`;

const jwks = createRemoteJWKSet(new URL(SUPABASE_JWKS_URL));

export const verifyJWT = async (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ message: "Missing token" });
  }

  const token = authHeader.split(" ")[1];

  try {
    const { payload } = await jwtVerify(token, jwks, {
      issuer: `${process.env.SUPABASE_URL}/auth/v1`,
    });

    req.user = {
      id: payload.sub,
      email: payload.email,
    };

    next();
  } catch (err) {
    return res.status(401).json({ message: "Invalid or expired token" });
  }
};
