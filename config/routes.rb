CorsTest::Application.routes.draw do

# resources :users, shallow: true do
  get '/sites/has_url_saved', to: 'sites#has_url_saved'
  post 'sites/:id/delete' => 'sites#destroy'
  post 'sites/:id/update' => 'sites#update'
  resources :sites, only: [:create, :index]
# end

 # match 'sites/:id' => 'sites#destroy', :via => [:delete, :options]
  root 'sites#index'
end
