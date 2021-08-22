class Comment < ApplicationRecord
  validates :text, presence: true
  validates :text, length: { maximum: 10000 }

  belongs_to :user
  belongs_to :article
end
