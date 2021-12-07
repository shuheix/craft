module Api
  module V1
    class ArticlesController < ApplicationController
      skip_before_action :authenticate_user, only: %i[index show search]

      def index
        # articles = Article.recent.joins(:user, :tagmaps, :tags)
        # .select('articles.*, users.name as user_name,users.avatar, tags.name')
        # .page(params[:page]).per(12)
        # total_pages = articles.total_pages
        # render json: { articles: articles, total_pages: total_pages }, status: :ok
        articles = Article.all.includes(:user, :comments, :favorites, :tagmaps, :tags).order(created_at: :desc).page(params[:page]).per(12)
        total_pages = articles.total_pages
        render json: articles, each_serializer: ArticleSerializer, status: :ok
      end

      def show
        article = Article.find(params[:id]).as_json(include: %i[user favorites comments tags])
        render json: {
          articles: article,
        }, status: :ok
      end

      def create
        article = Article.new(article_params.merge(user_id: current_user.id))
        if article.save
          render json: {
            articles: article
          }, status: :ok
        else
          render json: { status: :bad_request }
        end
      end

      def update
        article = Article.find(params[:id])
        if article.update!(article_params)
          render json: {
            articles: article
          }, status: :ok
        else
          render json: { status: :bad_request }
        end
      end

      def destroy
        raise ArgumentError, 'BadRequest Parameter' if payload.blank?
        article = Article.find(params[:id])
        if article.user_id == current_user.id
          article.destroy
          render json: { status: :ok }
        else
          render json: { status: :bad_request }
        end
      end

      def search
        articles = Article.where("title Like?","%#{params[:title]}%").page(params[:page]).per(12)
        total_pages = articles.total_pages
        render json: { articles: articles, total_pages: total_pages }, status: :ok
      end

      private

      def set_id_params
        params.require(:article).permit(:id)
      end

      def article_params
        params.permit(:title, :text, :image)
      end

      # JWTトークン認証
      def token_from_request_headers
        request.headers['Authorization']&.split&.last
      end

      def token
        params[:token] || token_from_request_headers
      end

      def payload
        @payload ||= FirebaseIdToken::Signature.verify token
      end

      def decode(str)
        Base64.decode64(str.split(',').last)
      end
    end
  end
end
