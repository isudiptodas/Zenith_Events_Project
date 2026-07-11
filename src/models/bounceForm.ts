import mongoose from 'mongoose';

const playerSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    contact: {
      type: String,
      required: true,
      trim: true,
    },
  },
  { _id: false }
);

const bounceSchema = new mongoose.Schema(
  {
    teamName: {
      type: String,
      required: true,
      trim: true,
    },

    players: {
      type: [playerSchema],
      required: true,
      validate: {
        validator: (players: any[]) => players.length === 4,
        message: "Exactly 4 players are required.",
      },
    },

    captainWhatsapp: {
      type: String,
      required: true,
      trim: true,
    },

    captainEmail: {
      type: String,
      required: true,
      lowercase: true,
      trim: true,
    },

    paymentScreenshot: {
      type: String,
      required: true,
      trim: true,
    },

    type: {
      type: String,
      required: true,
      trim: true,
    },

    confirmDetails: {
      type: Boolean,
      required: true,
    },

    agreeRules: {
      type: Boolean,
      required: true,
    },

    agreeCancellation: {
      type: Boolean,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);


export const BounceForm = mongoose.models.BounceForm || mongoose.model('BounceForm', bounceSchema);