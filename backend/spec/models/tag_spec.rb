require 'rails_helper'

RSpec.describe Tag, type: :model do
  describe 'Tag作成機能' do
    context 'nameが1文字以上,10文字以下で且つ、nameが一意であれば有効である' do
      it 'nameが1文字で、且つ一意の場合' do
      end

      it '文字数が10文字で、且つ一意の場合' do
      end
    end

    context 'nameが0文字、11文字以上、一意でない、いずれかの場合無効である' do
      it  'nameが0文字の場合' do
      end

      it 'nameが11文字である場合' do
      end

      it '一意でない場合' do
      end
    end
  end
end
