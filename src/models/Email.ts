import mongoose, { Schema, type InferSchemaType } from "mongoose";

const emailSchema = new Schema(
  {
    direction: {
      type: String,
      enum: ["sent", "received"],
      default: "sent",
    },
    to: { type: String, required: true },
    from: { type: String },
    fromName: { type: String, default: "Sam" },
    subject: { type: String, required: true },
    body: { type: String, default: "" },
    htmlBody: { type: String, default: "" },
    resendId: { type: String },
    status: {
      type: String,
      enum: ["sent", "failed", "delivered"],
      default: "sent",
    },
    read: { type: Boolean, default: false },
    error: { type: String },
  },
  { timestamps: true }
);

emailSchema.index({ read: 1, createdAt: -1 });

export type IEmail = InferSchemaType<typeof emailSchema> & {
  _id: mongoose.Types.ObjectId;
};

export const Email =
  mongoose.models.Email || mongoose.model("Email", emailSchema);
