module Api
  module V1
    class CompaniesController < ApplicationController
      def index
        companies = Company.all

        render json: {
          companies: companies
        }, status: :ok
      end

    end
  end
end

