module Api
  module V1
    class ArticlesController < ApplicationController
      skip_before_action :authenticate_user, only: [:index,:show,:destroy]

      def index
        articles = Article.recent.page(1).per(8)
        # articles = Article.all.as_json(include:[:user, :favorites])
        render json:{
          articles: articles
        },status: :ok
      end

      def show
        article = Article.find(params[:id]).as_json(include:[:user, :favorites])
        render json: {
          articles: article
        },status: :ok
      end

      def create
        article =  Article.new(article_params.merge(user_id: current_user.id))
        if article.save
          render json: {
            articles: article,
          }, status: :ok
        else
          render json: {status: :bad_request}
        end
        # pp FirebaseIdToken::Signature.verify(params.require(:headers).permit(:Authorization)[:Authorization])
      end

      def update
        article = Article.find(params[:id])
        if article.update(article_params)
          render json: {
            articles: article,
          },status: :ok
        else
          render json: {status: :bad_request}
        end
      end

      def destroy
        raise ArgumentError, 'BadRequest Parameter' if payload.blank?
        article = Article.find(params[:id])
        if article.user_id == current_user.id
          article.destroy
          render json: {status: :ok}
        else
          render json: {status: :bad_request}
        end
      end

      private

      def set_id_params
        params.require(:article).permit(:id)
      end

      def article_params
        params.require(:article).permit(:title,:text)
      end

      def token_from_request_headers
        params.require(:headers).permit(:Authorization)[:Authorization]
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

