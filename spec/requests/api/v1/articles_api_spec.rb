require 'rails_helper'

RSpec.describe "Api::V1::ArticlesControllers", type: :request do
  describe "#index" do
    # API仕様
    # ユーザーのログイン状態の有無に関わらずindexメソッドは、値を返す
    context "正常なリクエストの場合" do
      before do
        FactoryBot.create_list(:article,10)
      end
      it "ステータスコード「200 OK」を返す" do
        get '/api/v1/articles'
        expect(response).to have_http_status(:ok)
      end
      it "成功時はJSONデータのレスポンスを返す" do
        get '/api/v1/articles'
        expect(response.content_type).to eq "application/json; charset=utf-8"
      end
    end
  end

  describe "#show" do
    # API仕様
    # ユーザーのログイン状態の有無に関わらずshowメソッドは、値を1つ返す
    context "正常なリクエストの場合" do
      before do
        @article = FactoryBot.create(:article)
    end
      it "ステータスコード「200 OK」を返す" do
        get "/api/v1/articles/#{@article[:id]}"
        expect(response).to have_http_status(:ok)
      end
      it "JSONデータのレスポンスを返す" do
        get "/api/v1/articles/#{@article[:id]}"
        expect(response.content_type).to eq "application/json; charset=utf-8"
      end
    end
  end

  describe "#create" do
  end

  describe "#update" do
  end

  describe "#destroy" do
  end


end
