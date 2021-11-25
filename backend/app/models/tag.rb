class Tag < ApplicationRecord
  has_many :tagmaps
  has_many :articles, through: :tagmaps
end
