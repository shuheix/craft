class UserSerializer < ActiveModel::Serializer
  attributes :id, :uid, :avatar, :profile, :name
end
