module Api
  module V1
    class UsersController < ApplicationController
      skip_before_action :authenticate_user, only: %i[create show]

      def show
        user = User.find_by(uid: params[:id])
        articles = Article.where(user_id: user.id)
        favorite_articles = user.favorite_articles
        render json: { articles: articles, user: user, favorite_articles: favorite_articles }, status: :ok
      end

      def create
        raise ArgumentError, 'BadRequest Parameter' if payload.blank?

        @user = User.find_or_initialize_by(sign_up_params.merge(uid: payload['sub']))
        if @user.save
          pp @user
          render json: @user, status: :ok
        else
          render json: @user.errors, status: :unprocessable_entity
        end
      end

      def update_avatar
        user = User.find_by(uid: params[:uid])
        user.update!(params.permit(:avatar))
        render json: user
      end

      private

      def sign_up_params
        params.require(:registration).permit(:name)
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

      def decode(str)
        Base64.decode64(str.split(',').last)
      end
    end
  end
end
