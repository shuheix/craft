module Api
  module V1
    class ArticlesController < ApplicationController
      before_action :authenticate_user,
      def index
        articles = Article.all.as_json(include:[:user])
        # render json: articles
        render json:{
          articles: articles
        },status: :ok
      end

      def show
        article = Article.find(params[:id])
        render json: {
          article: article
        },status: :ok
      end
    end
  end
end

