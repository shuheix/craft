module Api
  module V1
    class FavoritesController < ApplicationController
      def create
        favorite = Favorite.new(favorite_params.merge(user_id: current_user.id,uid: current_user.uid))
        favorite.save
      end

      def destroy
        favorite = Favorite.find_by(article_id: params[:article_id],uid: current_user.uid)
        favorite.destroy
      end

      private
        def favorite_params
          params.require(:favorite).permit(:article_id,:uid)
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


