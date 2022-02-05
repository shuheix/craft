class Article < ApplicationRecord
  mount_uploader :image, ImageUploader

  validates :title, presence: true
  validates :title, length: { maximum: 30 }
  validates :text, presence: true
  validates :text, length: { maximum: 1000 }
  validates :user_id, presence: true
  validates :uid, presence: true
  validates :is_answerd, inclusion: {in: [false,true] }

  scope :recent, -> { order(created_at: :desc) }

  belongs_to :user
  has_many :favorites
  has_many :comments
  has_many :tagmaps, dependent: :destroy
  has_many :tags, through: :tagmaps
end
