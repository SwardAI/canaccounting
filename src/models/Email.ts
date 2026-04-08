import mongoose, { Schema, type InferSchemaType } from "mongoose";

const emailSchema = new Schema(
  {
    to: { type: String, required: true },
    fromName: { type: String, default: "Sam" },
    subject: { type: String, required: true },
    body: { type: String, required: true },
    htmlBody: { type: String, required: true },
    resendId: { type: String },
    status: {
      type: String,
      enum: ["sent", "failed"],
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
