import mongoose, { Schema, Document } from "mongoose";

export interface Existing extends Document {
    regNumber: string;
}

const existingSchema:Schema<Existing> = new Schema({
  regNumber: {
    type: String,
    unique: true,
    required: true
  }
}, { timestamps: true });
export default mongoose.models.Existing || mongoose.model<Existing>("Existing", existingSchema);