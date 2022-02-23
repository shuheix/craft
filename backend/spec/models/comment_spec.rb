require 'rails_helper'

RSpec.describe Comment, type: :model do
  describe "commentの投稿機能" do
    context "textとuser_idとarticle_idがある場合、有効な状態である" do
      it "textとuser_idとarticle_idがある場合" do

      end
    end
    context "textとuser_idとarticle_idがない場合、無効な状態である" do
      it "textがない場合" do

      end
      it "user_idがない場合" do

      end
      it "article_idがない場合" do

      end
    end

    context "textが1文字以上、400文字以内の場合有効な状態である" do
      it "textが1文字の場合" do

      end
      it "textが400文字の場合" do

      end
    end
    context "textが401文字以上の場合、無効な状態である"
      it "textが401文字の場合" do

      end
  end
end
