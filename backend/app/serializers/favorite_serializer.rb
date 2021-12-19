class FavoriteSerializer < ActiveModel::Serializer
  attributes :id, :user_id, :article_id, :uid
end
