Rails.application.routes.draw do
  resources :main_characters, only: :create
  devise_for :users
  root to: "pages#home"
  # Define your application routes per the DSL in https://guides.rubyonrails.org/routing.html
  get 'game', to: 'pages#game'
  get 'gameover', to: 'pages#gameover'
end
