class Tagmap < ApplicationRecord
  belongs_to :article
  belongs_to :tag

  validates :article_id, uniqueness: {scope: :tag_id}
  validates :tag_id, uniqueness: {scope: :article_id}
end
