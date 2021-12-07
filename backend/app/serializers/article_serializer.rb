class ArticleSerializer < ActiveModel::Serializer
  attributes :id, :title, :text, :created_at, :updated_at

  belongs_to :user, serializer: UserSerializer
  has_many :favorites, serializer: FavoriteSerializer
  has_many :comments, serializer: CommentSerializer
  has_many :tags, through: :tagmaps, serializer: TagSerializer
end
