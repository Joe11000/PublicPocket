CorsTest::Application.routes.draw do

# resources :users, shallow: true do
  get '/sites/has_url_saved', to: 'sites#has_url_saved'
  resources :sites
# end
  post 'sites/:id/delete' => 'sites#destroy'
 # match 'sites/:id' => 'sites#destroy', :via => [:delete, :options]
  root 'sites#index'
end
