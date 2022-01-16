module Api
  module V1
    class TagsController < ApplicationController
      def create
        unless exist_tag_name?
          tag = Tag.new(tag_params)
          tag.save!
        end
      end

      def destroy; end

      def tag_params
        params.permit(:name)
      end

      def exist_tag_name?
        Tag.exists?(name: params[:name])
      end
    end
  end
end
