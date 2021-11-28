class Tag < ApplicationRecord
  validates :name, presence: true
  validates :name, length: {maximum: 10}

  has_many :tagmaps
  has_many :articles, through: :tagmaps
end
