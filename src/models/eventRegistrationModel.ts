import mongoose, { Schema, Document } from "mongoose";

export interface EventRegistration extends Document {
  eventName: string;
  members: string[];
  isAllPrime: boolean;
  razorpay_order_id: string;
  razorpay_payment_id: string;
  razorpay_signature: string;
  teamName: string;
}

const EventRegistrationSchema: Schema<EventRegistration> = new Schema(
  {
    eventName: {
      type: String,
      required: [true, "Event name is required for registration"],
    },
    members: {
      type: [String],
      required: [true, "At least one member is required"],
      default: [],
    },
    isAllPrime: {
      type: Boolean,
      default: false,
    },
    razorpay_order_id: {
      type: String,
      required: [true, "Razorpay order ID is required"],
    },
    razorpay_payment_id: {
      type: String,
      required: [true, "Razorpay payment ID is required"],
    },
    razorpay_signature: {
      type: String,
      required: [true, "Razorpay signature is required"],
    },
    teamName: {
      type: String,
      required: [true, "Team name is required"],
    },
  },
  { timestamps: true }
);

const EventRegistrationModel =
  (mongoose.models.EventRegistration as mongoose.Model<EventRegistration>) ||
  mongoose.model<EventRegistration>(
    "EventRegistration",
    EventRegistrationSchema
  );

export default EventRegistrationModel;

