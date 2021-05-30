module Api
  module V1
    class ArticlesController < ApplicationController
      def index
        articles = Article.all

        render json:{
          articles: articles
        },status: :ok
      end
    end
  end
end

