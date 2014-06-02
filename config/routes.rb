CorsTest::Application.routes.draw do

# resources :users, shallow: true do
  get '/sites/has_url_saved', to: 'sites#has_url_saved'
  resources :sites
# end

  # root 'users#new'
  root 'sites#index'
end
