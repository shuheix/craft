module Api
  module V1
    class TagsController < ApplicationController
      skip_before_action :authenticate_user, only: :index

      def index
        tag_id_ranks = Tagmap.group(:tag_id).order("count(tag_id) desc").limit(10).pluck(:tag_id)
        tag_ranks = Tag.find(tag_id_ranks)
        render json: tag_ranks, status: :ok
      end

      def create
        return if exist_tag_name?

        tag = Tag.new(tag_params)
        tag.save!
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
