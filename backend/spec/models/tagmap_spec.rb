require 'rails_helper'

RSpec.describe Tagmap, type: :model do
  describe 'タグ登録機能' do
    context 'tag_idとarticle_idの組み合わせが一意であれば有効である' do
      it 'tag_idとarticle_idの組み合わせが一意である場合' do
        tag = FactoryBot.create(:tag)
        article = FactoryBot.create(:article)
        tagmap = Tagmap.new(tag_id: tag.id, article_id: article.id)
        expect(tagmap.save).to be_truthy
      end
    end

    context 'tag_idとarticle_idの組み合わせが一意でない場合、無効である' do
      it 'tag_idとarticle_idの組み合わせが一意でない場合' do
        tag = FactoryBot.create(:tag)
        article = FactoryBot.create(:article)
        tagmap = Tagmap.create(tag_id: tag.id, article_id: article.id)
        another_tagmap = tagmap.dup
        expect(another_tagmap.save).to be_falsey
      end
    end
  end
end
