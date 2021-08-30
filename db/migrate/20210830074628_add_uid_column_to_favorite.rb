class AddUidColumnToFavorite < ActiveRecord::Migration[6.0]
  def change
    add_column :favorites, :uid, :string
  end
end
