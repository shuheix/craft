module Api
  module V1
    class ArticlesController < ApplicationController
      skip_before_action :authenticate_user, only: [:index,:show]

      def index
        articles = Article.all.as_json(include:[:user, :favorites])
        render json:{
          articles: articles
        },status: :ok
      end

      def show
        article = Article.find(params[:id]).as_json(include:[:user, :favorites])
        render json: {
          articles: [article]
        },status: :ok
      end

      def edit

      end

      def create
        article =  Article.new(article_params.merge(user_id: current_user.id))
        if article.save
          render json: {
            articles: article,
          }, status: :ok
        else
          render json: {
            articles: article.error,
          }
        end
        # pp FirebaseIdToken::Signature.verify(params.require(:headers).permit(:Authorization)[:Authorization])
      end

      private

    def article_params
      params.require(:article).permit(:title,:text)
    end

    def token
      params.require(:headers).permit(:Authorization)[:Authorization]
    end

    def payload
      # tokenの検証が成功すれば、@payloadに入る
      # https://github.com/fschuindt/firebase_id_token
      @payload ||= FirebaseIdToken::Signature.verify token
    end


    end
  end
end

