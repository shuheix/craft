require 'rails_helper'

RSpec.describe Article, type: :model do
  describe 'article登録機能' do
    context 'titleとtextとuser_idがあればは有効な状態である' do
      it 'titleとtextとuser_idがある場合' do
        valid_article = FactoryBot.create(:article)
        expect(valid_article).to be_valid
      end
    end

    context 'titleとtextとuser_idがない場合は無効な状態である' do
      it 'titleがない場合' do
        invalid_article = FactoryBot.build(:article, title: nil)
        invalid_article.valid?
        expect(invalid_article.errors[:title]).to include('を入力してください')
      end

      it 'textがない場合' do
        invalid_article = FactoryBot.build(:article, text: nil)
        invalid_article.valid?
        expect(invalid_article.errors[:text]).to include('を入力してください')
      end
      it 'user_idがない場合' do
        invalid_article = FactoryBot.build(:article, user_id: nil)
        invalid_article.valid?
        expect(invalid_article.errors[:user_id]).to include('を入力してください')
      end
    end

    context 'titleが30文字以内、textが1000文字以内であれば有効な状態である' do
      it 'titleが30文字、textが1000文字の場合' do
        valid_article = FactoryBot.create(:article, title: 'a'* 30, text: 'a'* 1000)
        expect(valid_article).to be_valid
      end
    end

    context 'titleが31文字以上、又は、textが1001文字以上であれば無効な状態である' do
      it 'titleが31文字の場合' do
        invalid_article = FactoryBot.build(:article, title: 'a'*31 )
        invalid_article.valid?
        expect(invalid_article.errors[:title]).to include('は30文字以内で入力してください')
      end
      it 'textが1001文字の場合' do
        invalid_article = FactoryBot.build(:article, text: 'a'*100_1 )
        invalid_article.valid?
        expect(invalid_article.errors[:text]).to include('は1000文字以内で入力してください')
      end
    end
  end
end
