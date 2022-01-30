class UserSerializer < ActiveModel::Serializer
  attributes :id, :uid, :avatar, :profile, :name

  has_many :articles, serializer: ArticleSerializer
  has_many :favorite_articles, through: :favorites, source: :article
  has_many :comments
end
