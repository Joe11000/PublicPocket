CorsTest::Application.routes.draw do
  resources :users
  root 'users#new'
end
