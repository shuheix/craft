module Api
  module V1
    class TagmapsController < ApplicationController
      def create
        unless exist_tag_name?
          tag = Tag.new(tag_params)
          tag.save!
        end
        tag_id = Tag.find_by(name: params[:name]).id
        tagmap = Tagmap.new(tag_id: tag_id, article_id: params[:article_id])
        tagmap.save!
      end

      def destroy
        tagmap = Tagmap.find_by(tag_id: params[:tag_id], article_id: params[:article_id])
        tagmap.destroy
      end

      private

      def tag_params
        params.permit(:name)
      end

      def exist_tag_name?
        Tag.exists?(name: params[:name])
      end
    end
  end
end
