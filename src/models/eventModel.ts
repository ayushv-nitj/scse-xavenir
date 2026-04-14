import mongoose, { Schema, Document } from "mongoose";

export interface Event extends Document {
  name: string;
  description: string;
  logo: string;
  prizepool: number;
  regFees: number;
  more: string;
  rules: string;
  minPart: number;
  maxPart: number;
  eventDate: Date;
  registerThroughForm: boolean;
  linkToRegister: string;
  isTechEvent: boolean;
}

const EventSchema: Schema<Event> = new Schema(
  {
    name: {
      type: String,
      required: [true, "Event name is required"],
    },
    description: {
      type: String,
      required: [true, "Event description is required"],
    },
    logo: {
      type: String,
      required: [true, "Event logo is required"],
    },
    prizepool: {
      type: Number,
      required: [true, "Prize pool is required"],
      default: 0,
    },
    regFees: {
      type: Number,
      required: [true, "Registration fees are required"],
      default: 100,
    },
    more: {
      type: String,
      required: false,
      default: "",
    },
    rules: {
      type: String,
      required: false,
      default: "",
    },
    minPart: {
      type: Number,
      required: true,
      default: 1,
    },
    maxPart: {
      type: Number,
      required: true,
      default: 1,
    },
    eventDate: {
      type: Date,
      required: true,
      default: new Date(),
    },
    registerThroughForm: {
      type: Boolean,
      required: false,
      default: false,
    },
    linkToRegister: {
      type: String,
      required: false,
      default: "",
    },
    isTechEvent: {
      type: Boolean,
      required: false,
      default: true,
    },
  },
  { timestamps: true }
);

const EventModel =
  (mongoose.models.Event as mongoose.Model<Event>) ||
  mongoose.model<Event>("Event", EventSchema);

export default EventModel;
