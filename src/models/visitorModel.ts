import mongoose, { Schema, Document } from "mongoose";

interface Visitor extends Document {
  count: number;
}

const VisitorSchema = new Schema<Visitor>({
  count: {
    type: Number,
    required: true,
    default: 0,
  },
});

export default mongoose.models.Visitor ||
  mongoose.model<Visitor>("Visitor", VisitorSchema);
