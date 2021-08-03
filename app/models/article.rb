class Article < ApplicationRecord
  validates :title, presence: true
  validates :text, presence: true
  validates :user_id, presence: true

  belongs_to :user
  has_many :favorites
end
