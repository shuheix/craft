require 'rails_helper'

RSpec.describe "Api::V1::ArticlesControllers", type: :request do
  describe "#index" do
    context "ユーザーがログインしていない場合"
      it "ステータスコード「200 OK」を返す"
      it "成功時はJSONデータのレスポンスを返す"
      it "1つ以上のarticleデータを返す"
    end

    context "ユーザーがログインしていない場合"
      it "ステータスコード「200 OK」を返す"
      it "成功時はJSONデータのレスポンスを返す"
      it "1つ以上のarticleデータを返す"
    end

    context "リクエストパラメータが異常の場合"
      it "ステータスコードは「400 Badrequest」を返す"
      it "パラメータが不正のJSONレスポンスを返す"
      it "articleのデータを返さない"
    end
end
