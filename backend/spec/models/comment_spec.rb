require 'rails_helper'

RSpec.describe Comment, type: :model do
  describe "commentの投稿機能" do
    let(:comment){ FactoryBot.build(:comment) }
    context "textとuser_idとarticle_idがある場合、有効な状態である" do
      it "textとuser_idとarticle_idがある場合" do
        expect(comment).to be_valid
      end
    end
    context "textがない場合、無効な状態である" do
      it "textがない場合" do
        comment.text = ""
        comment.valid?
        expect(comment.errors[:text]).to include('を入力してください')
      end
    end

    context "textが1文字以上、400文字以内の場合有効な状態である" do
      it "textが1文字の場合" do
        comment.text = "a"
        expect(comment).to be_valid
      end
      it "textが400文字の場合" do
        comment.text = "a" * 400
        expect(comment).to be_valid
      end
    end
    context "textが401文字以上の場合、無効な状態である"
      it "textが401文字の場合" do
        comment.text = "a" * 401
        comment.valid?
        expect(comment.errors[:text]).to include('は400文字以内で入力してください')
      end
  end
end
