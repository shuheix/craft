module Api
  module V1
    class ArticlesController < ApplicationController
      skip_before_action :authenticate_user, only: [:index,:show, :create]

      def index
        articles = Article.all.as_json(include:[:user, :favorites])
        render json:{
          articles: articles
        },status: :ok
      end

      def show
        article = [ Article.find(params[:id]).as_json(include:[:user, :favorites]) ]
        render json: {
          articles: article
        },status: :ok
      end

      def create
        s =  params.require(:headers)[:Authorization]
        pp FirebaseIdToken::Signature.verify s
      end

      private

    def sign_up_params
      params.require(:registration).permit(:user_name, :display_name)
    end

    def token_from_request_headers
      request.headers['Authorization']&.split&.last
    end

    def token
      params[:token] || token_from_request_headers
    end

    def payload
      @payload ||= FirebaseIdToken::Signature.verify token
    end


    end
  end
end

