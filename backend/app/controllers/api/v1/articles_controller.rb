module Api
  module V1
    class ArticlesController < ApplicationController
      skip_before_action :authenticate_user, only: %i[index show search]

      def index
        articles = Article.all.includes(:user, :comments, :favorites, :tagmaps, :tags).order(created_at: :desc).page(params[:page]).per(12)
        render json: articles, each_serializer: ArticleSerializer, status: :ok, meta: pagination_dict(articles)
      end

      def show
        article = Article.find(params[:id])
        render json: article, serializer: ArticleSerializer, status: :ok
      end

      def create
        article = Article.new(article_params.merge(user_id: current_user.id, uid: current_user.uid, is_answerd: false))
        if article.save
          render json: {
            articles: article
          }, status: :ok
        else
          render status: :bad_request
        end
      end

      def update
        article = Article.find(params[:id])
        if article.update(article_params)
          render json: {
            articles: article
          }, status: :ok
        else
          render status: :bad_request
        end
      end

      def destroy
        article = Article.find(params[:id])
        if article.destroy
          render status: :ok
        else
          render status: :bad_request
        end
      end

      def search
        articles = Article.ransack(tags_name_or_title_cont: params[:q])
        results = articles.result.includes(:user, :comments, :favorites, :tagmaps, :tags).page(params[:page]).per(12)
        render json: results, each_serializer: ArticleSerializer, status: :ok, meta: pagination_dict(results)
      end

      private

      def set_id_params
        params.require(:article).permit(:id)
      end

      def article_params
        params.permit(:title, :text, :image, :is_answerd)
      end

      def pagination_dict(collection)
        {
          current_page: collection.current_page,
          next_page: collection.next_page,
          prev_page: collection.prev_page,
          total_pages: collection.total_pages,
          total_count: collection.total_count
        }
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
