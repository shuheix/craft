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
        article = [ Article.find(params[:id]).as_json(include:[:user, :favorites]) ]
        render json: {
          articles: article
        },status: :ok
      end
    end
  end
end

