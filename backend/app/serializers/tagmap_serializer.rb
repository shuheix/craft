class TagmapSerializer < ActiveModel::Serializer
  attributes :id,:tag_id, :article_id, :tag_count

  # belongs_to :article
  belongs_to :tag

  def tag_count
    Tagmap.group(:tag_id).count(:tag_id).
  end
end
