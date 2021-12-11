require 'rails_helper'

RSpec.describe Tag, type: :model do
  describe 'Tag作成機能' do
    context 'nameが1文字以上,10文字以下で且つ、nameが一意であれば有効である' do
      it 'nameが1文字で、且つ一意の場合' do
        valid_tag = FactoryBot.build(:tag)
        valid_tag.name = "a"
        expect(valid_tag).to be_valid
      end

      it '文字数が10文字で、且つ一意の場合' do
        valid_tag = FactoryBot.build(:tag)
        valid_tag.name = "a" * 10
        expect(valid_tag).to be_valid
      end
    end

    context 'nameが0文字、11文字以上、一意でない、いずれかの場合無効である' do
      it  'nameが0文字の場合' do
        invalid_tag = FactoryBot.build(:tag)
        invalid_tag.name = ""
        expect(invalid_tag.save).to be_falsey
      end

      it 'nameが11文字である場合' do
        invalid_tag = FactoryBot.build(:tag)
        invalid_tag.name = "a" * 11
        expect(invalid_tag.save).to be_falsey
      end

      it '一意でない場合' do
        registerd_tag =  FactoryBot.create(:tag)
        invalid_tag = FactoryBot.build(:tag)
        expect(invalid_tag.save).to be_falsey
      end
    end
  end
end
