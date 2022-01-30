class AddUidColumnToArticle < ActiveRecord::Migration[6.1]
  def change
    add_column :articles, :uid, :string
  end
end
