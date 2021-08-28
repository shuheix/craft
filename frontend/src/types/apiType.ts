import { ArticleType } from "./articleType";
import { CommentType } from "./commentType";
import { UserType } from "./userType";

export type ArticleApiType = {
  articles: ArticleType & { user: UserType } & { favorites: number[] } & {
    comments: CommentType[];
  };
};
