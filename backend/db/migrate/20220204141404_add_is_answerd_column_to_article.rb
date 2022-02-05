class AddIsAnswerdColumnToArticle < ActiveRecord::Migration[6.1]
  def change
    add_column :articles, :is_answerd, :boolean, default: false, null: false
  end
end
