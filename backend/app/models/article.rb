class Article < ApplicationRecord
  validates :title, presence: true
  validates :text, presence: true
  validates :user_id, presence: true

  scope :recent, -> { order(created_at: :desc) }

  belongs_to :user
  has_many :favorites
  has_many :comments
end
