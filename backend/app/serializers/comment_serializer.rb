class CommentSerializer < ActiveModel::Serializer
  attributes :id, :user_id, :article_id, :text
end
