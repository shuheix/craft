require 'rails_helper'

RSpec.describe User, type: :model do
  describe "ユーザー作成機能" do

    context "nameとuidがあれば、有効な状態である" do
      it "nameとuidがある状態" do
        valid_user = FactoryBot.build(:user)
        expect(valid_user).to be_valid
      end
    end

    context "nameとuidが無ければ、無効な状態である" do
      it "名前が入力されていない場合" do
        invalid_user_a = FactoryBot.build(:user, name: nil)
        invalid_user_a.valid?
        expect(invalid_user_a.errors[:name]).to include("を入力してください")
      end

      it "uidが入力されていない場合" do
        invalid_user_b = FactoryBot.build(:user, uid: nil)
        invalid_user_b.valid?
        expect(invalid_user_b.errors[:uid]).to include("を入力してください")
      end
    end
  end
end
