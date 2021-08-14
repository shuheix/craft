class AddIndexArticlesCreatedAt < ActiveRecord::Migration[6.0]
  def change
    add_index :articles, :created_at, order: {created_at: :desc}
  end
end
