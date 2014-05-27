CorsTest::Application.routes.draw do

# resources :users, shallow: true do
  get '/sites/has_url', to: 'sites#has_url'
  resources :sites
# end

  # root 'users#new'
  root 'sites#index'
end
