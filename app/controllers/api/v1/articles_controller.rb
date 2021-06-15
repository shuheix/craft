module Api
  module V1
    class ArticlesController < ApplicationController
      def index
        articles = Article.all.as_json(include:[:user])
        # render json: articles
        render json:{
          articles: articles
        },status: :ok
      end
    end
  end
end

