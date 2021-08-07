require 'rails_helper'

RSpec.describe "Api::V1::ArticlesControllers", type: :request do
  describe "#index" do
    # API仕様
    # ユーザーのログイン状態の有無に関わらずindexメソッドは、値を返す

    context "ユーザーがログインしていない場合" do
      it "ステータスコード「200 OK」を返す" do
        get '/api/v1/articles'
        expect(response).to have_http_status(:ok)
      end
      it "成功時はarticlesのキーを持つJSONデータのレスポンスを返す" do
        get '/api/v1/articles'
        expect(JSON.parse(response.body)).to include("articles" => [])
      end
    end

    context "ユーザーがログインしている場合" do
      it "ステータスコード「200 OK」を返す" do
        get '/api/v1/articles',params{}
        expect(response).to have_http_status(:ok)
      end
      it "成功時はarticlesのキーを持つJSONデータのレスポンスを返す" do
        get '/api/v1/articles'
        expect(JSON.parse(response.body)).to include("articles" => [])
      end
    end

    context "リクエストパラメータが異常の場合" do
      it "ステータスコードは「400 Badrequest」を返す" do
      end
      it "パラメータが不正のJSONレスポンスを返す" do
      end
      it "articleのデータを返さない" do
      end
    end
  end
end
