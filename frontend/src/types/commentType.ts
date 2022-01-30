import { UserType } from "./userType";

export type CommentType = {
  id?: number;
  user_id?: number;
  article_id?: number;
  text: string;
  user: UserType;
  created_at?: string;
  updated_at?: string;
};
