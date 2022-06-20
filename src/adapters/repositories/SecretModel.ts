import { Document, Schema, model } from 'mongoose';

export interface ISecretSchema extends Document {
  urlId: string;
  secret: string;
}

const SecretSchema = new Schema({
  urlId: String,
  secret: String,
});

export const SecretModel = model<ISecretSchema>('Secrets', SecretSchema);
