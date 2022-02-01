Rails.application.routes.draw do
  namespace :api do
    namespace :v1 do
      get '/', to: 'articles#index'
      resources :users, only: %i[create destroy update show]
      get '/articles/search', to: 'articles#search'
      resources :articles do
        resource :favorites, only: %i[create destroy]
        resources :comments
        resource :tagmaps, only: %i[create destroy]
      end
      resources :tags , only: [:index]
      resources :tagmaps, only: [:index]
      resource :tags, only: %i[create destroy]
      post '/users/:uid/avatar', to: 'users#update_avatar'
    end
  end
end
