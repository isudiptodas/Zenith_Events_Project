export interface Player {
  name: string;
  contact: string;
}

export interface BounceForm {
  _id: string;

  teamName: string;

  players: Player[];

  captainWhatsapp: string;
  captainEmail: string;

  paymentScreenshot: string;

  type: string;

  confirmDetails: boolean;
  agreeRules: boolean;
  agreeCancellation: boolean;

  createdAt: string;
  updatedAt: string;
}