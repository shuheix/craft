class User < ApplicationRecord
  mount_uploader :avatar, AvatarUploader

  validates :name, presence: true
  validates :uid, presence: true
  validates :profile, length: { maximum: 500 }

  has_many :articles
  has_many :favorites
  has_many :comments
  has_many :favorite_articles, through: :favorites, source: :article
end
