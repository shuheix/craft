Rails.application.routes.draw do
  namespace :api do
    namespace :v1 do
      resources :users, only: [:create,:destroy,:update]
      resources :articles
    end
  end
end
