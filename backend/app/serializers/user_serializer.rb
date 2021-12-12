class UserSerializer < ActiveModel::Serializer
  attributes :id, :uid, :avatar, :profile
end
