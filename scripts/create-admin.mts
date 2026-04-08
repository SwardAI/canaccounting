import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const MONGODB_URI = process.env.MONGODB_URI;
if (!MONGODB_URI) {
  console.error("Set MONGODB_URI environment variable");
  process.exit(1);
}

const email = process.argv[2] || "sam@unitedtax.us";
const password = process.argv[3];

if (!password) {
  console.error("Usage: npx tsx scripts/create-admin.mts <email> <password>");
  process.exit(1);
}

const userSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  name: String,
  password: String,
  provider: { type: String, default: "credentials" },
  role: { type: String, default: "client" },
}, { timestamps: true });

const User = mongoose.model("User", userSchema);

async function main() {
  await mongoose.connect(MONGODB_URI as string);
  const hash = await bcrypt.hash(password, 12);

  const existing = await User.findOne({ email });
  if (existing) {
    existing.password = hash;
    existing.role = "admin";
    await existing.save();
    console.log(`Updated existing user "${email}" to admin.`);
  } else {
    await User.create({ email, password: hash, role: "admin", name: "Sam" });
    console.log(`Created admin user "${email}".`);
  }

  await mongoose.disconnect();
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
