module Api
  module V1
    class FavoritesController < ApplicationController
      def create
        favorite = current_user.favorite.new(article_id: params[:article_id])
        favorite.save
      end

      def destroy
        favorite = Favorite.find(article_id: params[:article_id], user_id: current_user.id)
        favorite.destroy
      end
    end
  end
end


