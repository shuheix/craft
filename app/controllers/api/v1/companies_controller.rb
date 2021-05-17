module Api
  module V1
    class CompaniesController < ApplicationController
      def index
        companies = Company.all

        render json: {
          companies: companies
        }, status: :ok
      end

      def show
        company = Company.find(params[:id])
        render json: {
          company: company
        }, status: :ok
      end
    end
  end
end

