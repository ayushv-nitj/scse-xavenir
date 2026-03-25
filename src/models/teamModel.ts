import mongoose, { Schema } from "mongoose";

const TeamSchema = new Schema({
  teamName:  { type: String, required: true },
  teamCode:  { type: String, unique: true },
  eventName: { type: String, required: true },
  eventId:   { type: Schema.Types.ObjectId, ref: "Event" },
  members: [
    {
      userID:   { type: String, required: true },
      fullName: { type: String },
      email:    { type: String },
      role:     { type: String, enum: ["leader", "member"], default: "member" },
    },
  ],
  leaderId: { type: String, required: true },
  maxSize:  { type: Number, default: 4 },
  status:   { type: String, enum: ["forming", "complete", "competing"], default: "forming" },
  createdAt: { type: Date, default: Date.now },
});

const Team = mongoose.models.Team || mongoose.model("Team", TeamSchema);
export default Team;