Rails.application.routes.draw do
  mount_devise_token_auth_for "User", at: "api/auth"
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
  namespace :api do
    resources :things
    post "/memes/generate_chuck/:user_id", to: "memes#generate_chuck"
    post "/memes/generate_chuck_with_cu/", to: "memes#generate_chuck_cu"

    get "/memes", to: "memes#index"
  end
end
