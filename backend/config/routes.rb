Rails.application.routes.draw do
  namespace :api do
    namespace :v1 do
      resources :users, only: %i[create destroy update show]
      resources :articles do
        resource :favorites, only: %i[create destroy]
        resources :comments
      end
    end
  end
end
