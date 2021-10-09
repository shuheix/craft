class User < ApplicationRecord
  validates :name, presence: true
  validates :uid, presence: true

  has_many :articles
  has_many :favorites
  has_many :comments
  has_many :favorite_articles, through: :favorites, source: :article
end
