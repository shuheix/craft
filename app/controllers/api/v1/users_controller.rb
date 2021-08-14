module Api
  module V1
    class UsersController < ApplicationController
      skip_before_action :authenticate_user, only: [:create,:show]

      def show
        user = User.find(params[:id])
        articles = Article.where(user_id: user.id)
        render json: { articles: articles, user: user }, status: :ok
      end

      def create
        raise ArgumentError, 'BadRequest Parameter' if payload.blank?
        #find_or_initialize_by
        @user = User.find_or_initialize_by(sign_up_params.merge(uid: payload['sub']))
        if @user.save
          render json: @user, status: :ok
        else
          render json: @user.errors, status: :unprocessable_entity
        end
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
    end
  end
end


