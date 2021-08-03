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
      before do
        article = FactoryBot.build(:article)
      end

      it "titleがない場合" do

      end

      it "textがない場合" do

      end
      it "user_idがない場合" do

      end
    end

    context do

    end
  end
end
