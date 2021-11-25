require 'rails_helper'

RSpec.describe "Tagmaps", type: :request do
  describe "GET /create" do
    it "returns http success" do
      get "/tagmaps/create"
      expect(response).to have_http_status(:success)
    end
  end

  describe "GET /destroy" do
    it "returns http success" do
      get "/tagmaps/destroy"
      expect(response).to have_http_status(:success)
    end
  end

end
