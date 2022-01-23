require 'rails_helper'

RSpec.describe 'Api::V1::ArticlesControllers', type: :request do
  describe '#index' do
    context '正常なリクエストの場合、ステータスコード、jsonデータを返す' do
      before do
        FactoryBot.create_list(:article, 10)
      end
      it 'ステータスコード「200 OK」を返す' do
        get '/api/v1/articles'
        expect(response).to have_http_status(:ok)
      end
      it '成功時はJSONデータのレスポンスを返す' do
        get '/api/v1/articles'
        expect(response.content_type).to eq 'application/json; charset=utf-8'
      end
    end
  end

  describe '#show' do
    context '正常なリクエストの場合、ステータスコード、jsonデータを返す' do
      let(:article){ FactoryBot.create(:article) }
      it 'ステータスコード「200 OK」を返す' do
        get "/api/v1/articles/#{article[:id]}"
        expect(response).to have_http_status(:ok)
      end
      it '成功時のJSONデータのレスポンスを返す' do
        get "/api/v1/articles/#{article[:id]}"
        expect(response.content_type).to eq 'application/json; charset=utf-8'
      end
    end
  end

  describe '#create' do
    let(:headers){
      {
        'Content-Type': 'application/json',
        Authorization: "Bearer token"
      }
    }

    let(:user){ FactoryBot.create(:user) }
    before { stub_firebase(user) }

    context '全てのパラメータが揃っているリクエストの場合' do
      it 'ステータスコード「200 OK」を返す' do
        post '/api/v1/articles', headers: headers, params: {title: 'a', text: 'a'}.to_json
        expect(response).to have_http_status(:ok)
      end
      it '成功時の作成したArticleのJSONデータのレスポンスを返す' do
        post '/api/v1/articles', headers: headers, params: {title: 'a', text: 'a'}.to_json
        expect(response.content_type).to eq 'application/json; charset=utf-8'
      end
      it '記事を作成する' do
        expect{
          post '/api/v1/articles', headers: headers, params: {title: 'a', text: 'a'}.to_json
        }
        .to change(Article, :count).by(+1)
      end
    end

    context 'titleパラメータが不足している場合' do
      let(:params){{ title: '', text: ''}}
      it 'ステータスコード「400 Bad Request」を返す' do
        post '/api/v1/articles', headers: headers, params: params.to_json
        expect(response).to have_http_status(:bad_request)
      end
      it '記事が作成されない' do
        expect{
          post '/api/v1/articles', headers: headers, params: params.to_json
        }
        .to change(Article, :count).by(0)
      end
    end
    context 'textパラメータが不足している場合' do
      let(:params){{ title: 'a', text: ''}}
      it 'ステータスコード「400 Bad Request」を返す' do
        post '/api/v1/articles', headers: headers, params: params.to_json
        expect(response).to have_http_status(:bad_request)
      end
      it '記事が作成されない' do
        expect{
          post '/api/v1/articles', headers: headers, params: params.to_json
        }
        .to change(Article, :count).by(0)
      end
    end
  end

  describe '#update' do
    context '全てのパラメータが揃っているリクエストの場合' do
      it 'ステータスコード「200 OK」を返す' do
      end
      it '成功時のJSONデータのレスポンスを返す' do
      end
      it '記事を更新する' do
      end
    end
    context 'titleパラメータが不足している場合' do
      it 'ステータスコード「400 Bad Request」を返す'
      it 'パラメータ不正のJSONデータのレスポンスを返す'
      it '記事を更新しない'
    end
    context 'textパラメータが不足している場合' do
      it 'ステータスコード「400 Bad Request」を返す'
      it 'パラメータ不正のJSONデータのレスポンスを返す'
      it '記事を更新しない'
    end
  end

  describe '#destroy' do
    context '全てのパラメータが揃っているリクエストの場合' do
      it 'ステータスコード「200 OK」を返す' do
      end
      it '成功時のJSONデータのレスポンスを返す' do
      end
      it '記事を削除する' do
      end
    end
    context '指定したidパラメータがDBない場合' do
      it 'ステータスコード「400 Bad Request」を返す'
      it 'パラメータ不正のJSONデータのレスポンスを返す'
      it '記事を削除しない'
    end
  end
end
