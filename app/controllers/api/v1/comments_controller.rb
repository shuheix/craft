module Api
  module V1
    class CommentsController < ApplicationController
      skip_before_action :authenticate_user, only: [:index,:show]

      def index
        comments = Comment.where(article_id: params[:article_id])
        render json: comments
      end

      def create
        comment = Comment.new(comment_params.merge(user_id: current_user.id,article_id: params[:article_id]))
        if comment.save!
          render json: {
            comment: comment,
          }, status: :ok
        else
          render json: {status: :bad_request}
        end
      end

      def update
      end

      def destroy
      end

      private

      def comment_params
        params.require(:comment).permit(:text)
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

