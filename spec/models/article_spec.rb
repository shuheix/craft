require 'rails_helper'

RSpec.describe Article, type: :model do
  describe "article登録機能" do
    context "titleとtextとuser_idがあればは有効な状態である" do
      it "titleとtextとuser_idがある場合" do
        valid_article = FactoryBot.build(:article)
        expect(valid_article).to be_valid
      end
    end

    context "titleとtextとuser_idがない場合は無効な状態である" do
      it "titleがない場合" do
        invalid_article = FactoryBot.build(:article, title: nil)
        invalid_article.valid?
        expect(invalid_article.errors[:title]).to include("を入力してください")
      end

      it "textがない場合" do
        invalid_article = FactoryBot.build(:article, text: nil)
        invalid_article.valid?
        expect(invalid_article.errors[:text]).to include("を入力してください")
      end
      it "user_idがない場合" do
        invalid_article = FactoryBot.build(:article, user_id: nil)
        invalid_article.valid?
        expect(invalid_article.errors[:user_id]).to include("を入力してください")
      end
    end
  end
end
