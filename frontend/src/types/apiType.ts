import { ArticleType } from "./articleType";
import { CommentType } from "./commentType";
import { FavoriteType } from "./favoriteType";
import { TagType } from "./tagType";
import { UserType } from "./userType";

export type ArticleApiType = ArticleType & { user: UserType } & {
  favorites: FavoriteType[];
} & {
  comments: CommentType[];
} & { tags: TagType[] } & { total_pages: number };
